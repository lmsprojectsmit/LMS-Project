// Centralized Authentication & Credentials Storage for EduVerse LMS

const CUSTOM_USERS_KEY = "lms_custom_users";
const ADMIN_CREDS_KEY = "lms_admin_credentials";

// Default Master Administrator Credentials
const DEFAULT_ADMIN_CREDS = {
  username: "admin",
  email: "admin@institution.edu",
  password: "password123",
  fullName: "Dr. Arunkumar Natarajan",
  role: "admin",
  department: "Administration",
  designation: "Chief Academic Administrator",
};

/**
 * Get all custom users provisioned via Admin Console
 */
export const getCustomUsers = () => {
  try {
    const raw = localStorage.getItem(CUSTOM_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Error reading custom users from localStorage", err);
    return [];
  }
};

/**
 * Save or append a provisioned user
 */
export const saveCustomUser = (user) => {
  try {
    const existing = getCustomUsers();
    const index = existing.findIndex((u) => u.id === user.id || (u.username && user.username && u.username.toLowerCase() === user.username.toLowerCase()));
    let updated;
    if (index >= 0) {
      updated = [...existing];
      updated[index] = { ...updated[index], ...user, updatedAt: new Date().toISOString() };
    } else {
      updated = [{ ...user, createdAt: new Date().toISOString() }, ...existing];
    }
    localStorage.setItem(CUSTOM_USERS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error saving custom user", err);
    return [];
  }
};

/**
 * Delete a custom provisioned user
 */
export const deleteCustomUser = (userId) => {
  try {
    const existing = getCustomUsers();
    const filtered = existing.filter((u) => u.id !== userId);
    localStorage.setItem(CUSTOM_USERS_KEY, JSON.stringify(filtered));
    return filtered;
  } catch (err) {
    console.error("Error deleting custom user", err);
    return [];
  }
};

/**
 * Get master admin credentials
 */
export const getAdminMasterCredentials = () => {
  try {
    const raw = localStorage.getItem(ADMIN_CREDS_KEY);
    return raw ? { ...DEFAULT_ADMIN_CREDS, ...JSON.parse(raw) } : DEFAULT_ADMIN_CREDS;
  } catch (err) {
    console.error("Error loading admin credentials", err);
    return DEFAULT_ADMIN_CREDS;
  }
};

/**
 * Save master admin credentials
 */
export const saveAdminMasterCredentials = (creds) => {
  try {
    const current = getAdminMasterCredentials();
    const updated = { ...current, ...creds, updatedAt: new Date().toISOString() };
    localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Error saving admin credentials", err);
    return DEFAULT_ADMIN_CREDS;
  }
};

/**
 * Generate a clean, secure random password
 */
export const generateRandomPassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$*";
  let pwd = "";
  for (let i = 0; i < 9; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
};

/**
 * Authenticate login attempts using username/email and password
 */
export const authenticateUser = (identifier, password, role) => {
  if (!identifier || !password) return { success: false, message: "Username/Email and Password are required." };

  const idClean = identifier.trim().toLowerCase();
  const pwdClean = password.trim();

  // 1. Check Master Admin Credentials
  const adminCreds = getAdminMasterCredentials();
  const adminMatches =
    (idClean === adminCreds.username.toLowerCase() || idClean === adminCreds.email.toLowerCase()) &&
    pwdClean === adminCreds.password;

  if (adminMatches) {
    if (role && role !== "admin") {
      return { success: false, message: "Credentials belong to an Administrator. Please select 'Admin' role." };
    }
    return {
      success: true,
      user: {
        role: "admin",
        fullName: adminCreds.fullName,
        email: adminCreds.email,
        username: adminCreds.username,
        designation: adminCreds.designation,
      },
    };
  }

  // 2. Check Custom Provisioned Users from Admin Console
  const customUsers = getCustomUsers();
  const customMatch = customUsers.find((u) => {
    const matchesId =
      (u.username && u.username.toLowerCase() === idClean) ||
      (u.email && u.email.toLowerCase() === idClean) ||
      (u.rollNo && u.rollNo.toLowerCase() === idClean) ||
      (u.empId && u.empId.toLowerCase() === idClean);
    return matchesId;
  });

  if (customMatch) {
    if (customMatch.password && customMatch.password !== pwdClean) {
      return { success: false, message: "Incorrect password. Please verify your credentials." };
    }
    if (role && customMatch.role !== role) {
      return {
        success: false,
        message: `This account is registered as a ${customMatch.role.toUpperCase()}. Please select the correct login role.`,
      };
    }
    return {
      success: true,
      user: {
        ...customMatch,
        fullName: customMatch.name || customMatch.fullName,
      },
    };
  }

  return { success: false, notFound: true };
};
