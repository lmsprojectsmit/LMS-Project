// Centralized Authentication & Credentials Storage for EduVerse LMS

const CUSTOM_USERS_KEY = "lms_custom_users";
const ADMIN_CREDS_KEY = "lms_admin_credentials";
const RBAC_POLICY_KEY = "lms_rbac_policy";

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

// Baseline Built-in Users Roster (for fallback authentication)
const BASELINE_AUTH_USERS = [
  // Administrators
  {
    id: "ADM-001",
    empId: "ADM-INST-001",
    name: "Dr. Arunkumar Natarajan",
    fullName: "Dr. Arunkumar Natarajan",
    username: "admin",
    password: "password123",
    email: "admin@institution.edu",
    department: "Administration",
    role: "admin",
    designation: "Chief Academic Administrator",
    status: "Active",
  },
  {
    id: "ADM-002",
    empId: "ADM-INST-002",
    name: "Prof. S. Rangarajan",
    fullName: "Prof. S. Rangarajan",
    username: "rangarajan.s",
    password: "password123",
    email: "rangarajan.s@institution.edu",
    department: "Examination Cell",
    role: "admin",
    designation: "Controller of Examinations",
    status: "Active",
  },
  // Faculty
  {
    id: "FAC-001",
    empId: "EMP-MTH-101",
    name: "Dr. K. Senthil Kumar",
    fullName: "Dr. K. Senthil Kumar",
    username: "senthil.k",
    password: "faculty123",
    email: "senthil.k@institution.edu",
    department: "Mathematics",
    role: "faculty",
    designation: "Professor & Course Head",
    status: "Active",
  },
  {
    id: "FAC-002",
    empId: "EMP-MTH-102",
    name: "Dr. V. Anitha",
    fullName: "Dr. V. Anitha",
    username: "anitha.v",
    password: "faculty123",
    email: "anitha.v@institution.edu",
    department: "Mathematics",
    role: "faculty",
    designation: "Associate Professor",
    status: "Active",
  },
  {
    id: "FAC-003",
    empId: "EMP-CSE-201",
    name: "Prof. Rajesh Sharma",
    fullName: "Prof. Rajesh Sharma",
    username: "rajesh.s",
    password: "faculty123",
    email: "rajesh.s@institution.edu",
    department: "CSE",
    role: "faculty",
    designation: "Assistant Professor (Sr. Gr.)",
    status: "Active",
  },
  {
    id: "FAC-004",
    empId: "EMP-AI-301",
    name: "Dr. Meenakshi Sundaram",
    fullName: "Dr. Meenakshi Sundaram",
    username: "meenakshi.s",
    password: "faculty123",
    email: "meenakshi.s@institution.edu",
    department: "AI & DS",
    role: "faculty",
    designation: "Professor & Head of Dept",
    status: "Active",
  },
  // Students
  {
    id: "STU-001",
    rollNo: "25CS101",
    name: "Aadhavan Raman",
    fullName: "Aadhavan Raman",
    username: "aadhavan.r",
    password: "student123",
    email: "aadhavan.r@institution.edu",
    department: "CSE",
    role: "student",
    status: "Active",
  },
  {
    id: "STU-002",
    rollNo: "25CS102",
    name: "Bhavana Krishnan",
    fullName: "Bhavana Krishnan",
    username: "bhavana.k",
    password: "student123",
    email: "bhavana.k@institution.edu",
    department: "CSE",
    role: "student",
    status: "Active",
  },
  {
    id: "STU-003",
    rollNo: "25CS103",
    name: "Chirag Venkatesh",
    fullName: "Chirag Venkatesh",
    username: "chirag.v",
    password: "student123",
    email: "chirag.v@institution.edu",
    department: "CSE",
    role: "student",
    status: "Active",
  },
  {
    id: "STU-004",
    rollNo: "25IT101",
    name: "Divya Nambiar",
    fullName: "Divya Nambiar",
    username: "divya.n",
    password: "student123",
    email: "divya.n@institution.edu",
    department: "IT",
    role: "student",
    status: "Active",
  },
  {
    id: "STU-005",
    rollNo: "25IT102",
    name: "Eshwar Sundaram",
    fullName: "Eshwar Sundaram",
    username: "eshwar.s",
    password: "student123",
    email: "eshwar.s@institution.edu",
    department: "IT",
    role: "student",
    status: "Active",
  },
  {
    id: "STU-006",
    rollNo: "25AI101",
    name: "Fathima Noor",
    fullName: "Fathima Noor",
    username: "fathima.n",
    password: "student123",
    email: "fathima.n@institution.edu",
    department: "AI & DS",
    role: "student",
    status: "Active",
  },
  {
    id: "STU-007",
    rollNo: "25AI102",
    name: "Gokul Pranav",
    fullName: "Gokul Pranav",
    username: "gokul.p",
    password: "student123",
    email: "gokul.p@institution.edu",
    department: "AI & DS",
    role: "student",
    status: "Active",
  },
  {
    id: "STU-008",
    rollNo: "25EC101",
    name: "Harini Rajagopal",
    fullName: "Harini Rajagopal",
    username: "harini.r",
    password: "student123",
    email: "harini.r@institution.edu",
    department: "ECE",
    role: "student",
    status: "Active",
  },
  {
    id: "STU-009",
    rollNo: "25EC102",
    name: "Imran Baig",
    fullName: "Imran Baig",
    username: "imran.b",
    password: "student123",
    email: "imran.b@institution.edu",
    department: "ECE",
    role: "student",
    status: "Active",
  },
  {
    id: "STU-010",
    rollNo: "25CS104",
    name: "Jayashree Murali",
    fullName: "Jayashree Murali",
    username: "jayashree.m",
    password: "student123",
    email: "jayashree.m@institution.edu",
    department: "CSE",
    role: "student",
    status: "Active",
  },
];

// Default Role-Based Access Control (RBAC) Permissions Policy
export const DEFAULT_RBAC_POLICY = {
  student: {
    name: "Student Learner",
    description: "Access unit syllabus, interactive lessons, diagnostic evaluation tests, and pathway-specific micro-topics.",
    color: "#6366f1",
    badge: "🎓 Student",
    permissions: {
      viewSyllabus: true,
      attemptDiagnostic: true,
      viewPathwayContent: true,
      submitMicroTests: true,
      downloadResources: true,
      editCurriculum: false,
      gradeStudents: false,
      manageUsers: false,
      viewAnalytics: false,
      broadcastAnnouncements: false,
      manageSystem: false,
    },
  },
  faculty: {
    name: "Faculty Coordinator",
    description: "Manage assigned course modules, update unit syllabus topics, view student performance telemetry, and post notices.",
    color: "#10b981",
    badge: "👨‍🏫 Faculty",
    permissions: {
      viewSyllabus: true,
      attemptDiagnostic: true,
      viewPathwayContent: true,
      submitMicroTests: true,
      downloadResources: true,
      editCurriculum: true,
      gradeStudents: true,
      manageUsers: false,
      viewAnalytics: true,
      broadcastAnnouncements: true,
      manageSystem: false,
    },
  },
  admin: {
    name: "System Administrator",
    description: "Full institutional governance over user directory, RBAC policies, curriculum structure, assessment benchmarks, and audit logs.",
    color: "#f59e0b",
    badge: "🛡️ Administrator",
    permissions: {
      viewSyllabus: true,
      attemptDiagnostic: true,
      viewPathwayContent: true,
      submitMicroTests: true,
      downloadResources: true,
      editCurriculum: true,
      gradeStudents: true,
      manageUsers: true,
      viewAnalytics: true,
      broadcastAnnouncements: true,
      manageSystem: true,
    },
  },
};

/**
 * Get the current RBAC Policy
 */
export const getRBACPolicy = () => {
  try {
    const raw = localStorage.getItem(RBAC_POLICY_KEY);
    if (!raw) return DEFAULT_RBAC_POLICY;
    const parsed = JSON.parse(raw);
    return {
      student: { ...DEFAULT_RBAC_POLICY.student, ...parsed.student, permissions: { ...DEFAULT_RBAC_POLICY.student.permissions, ...(parsed.student?.permissions || {}) } },
      faculty: { ...DEFAULT_RBAC_POLICY.faculty, ...parsed.faculty, permissions: { ...DEFAULT_RBAC_POLICY.faculty.permissions, ...(parsed.faculty?.permissions || {}) } },
      admin: { ...DEFAULT_RBAC_POLICY.admin, ...parsed.admin, permissions: { ...DEFAULT_RBAC_POLICY.admin.permissions, ...(parsed.admin?.permissions || {}) } },
    };
  } catch (err) {
    console.error("Error loading RBAC policy", err);
    return DEFAULT_RBAC_POLICY;
  }
};

/**
 * Save updated RBAC Policy
 */
export const saveRBACPolicy = (policy) => {
  try {
    localStorage.setItem(RBAC_POLICY_KEY, JSON.stringify(policy));
    return policy;
  } catch (err) {
    console.error("Error saving RBAC policy", err);
    return DEFAULT_RBAC_POLICY;
  }
};

/**
 * Reset RBAC Policy to Factory Defaults
 */
export const resetRBACPolicy = () => {
  try {
    localStorage.removeItem(RBAC_POLICY_KEY);
    return DEFAULT_RBAC_POLICY;
  } catch (err) {
    console.error("Error resetting RBAC policy", err);
    return DEFAULT_RBAC_POLICY;
  }
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
    const index = existing.findIndex(
      (u) =>
        u.id === user.id ||
        (u.username && user.username && u.username.toLowerCase() === user.username.toLowerCase()) ||
        (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase())
    );
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
 * Authenticate login attempts using username/email/rollNo/empId and password
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
    if (role && customMatch.role !== role && customMatch.userType !== role) {
      const actualRole = customMatch.role || customMatch.userType;
      return {
        success: false,
        message: `This account is registered as a ${actualRole.toUpperCase()}. Please select the correct login role.`,
      };
    }
    return {
      success: true,
      user: {
        ...customMatch,
        role: customMatch.role || customMatch.userType,
        fullName: customMatch.name || customMatch.fullName,
      },
    };
  }

  // 3. Check Baseline Built-in Users Roster
  const baselineMatch = BASELINE_AUTH_USERS.find((u) => {
    const matchesId =
      (u.username && u.username.toLowerCase() === idClean) ||
      (u.email && u.email.toLowerCase() === idClean) ||
      (u.rollNo && u.rollNo.toLowerCase() === idClean) ||
      (u.empId && u.empId.toLowerCase() === idClean);
    return matchesId;
  });

  if (baselineMatch) {
    if (baselineMatch.password && baselineMatch.password !== pwdClean) {
      return { success: false, message: "Incorrect password. Please verify your credentials." };
    }
    if (role && baselineMatch.role !== role) {
      return {
        success: false,
        message: `This account is registered as a ${baselineMatch.role.toUpperCase()}. Please select the correct login role.`,
      };
    }
    return {
      success: true,
      user: {
        ...baselineMatch,
        fullName: baselineMatch.name || baselineMatch.fullName,
      },
    };
  }

  return { success: false, notFound: true };
};
