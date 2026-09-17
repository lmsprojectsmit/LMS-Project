export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://ma25c02-lms-api.onrender.com';

// Returns the student ID from the authenticated user
export function getStudentId(studentInfo) {
    if (studentInfo && studentInfo.id) {
        return studentInfo.id;
    }
    throw new Error("Authenticated student ID is unavailable");
}

export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Invalid email or password");
      }
      throw new Error("Login failed");
    }
    return response.json();
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Registration failed");
    }
    return response.json();
  },

  getCurrentUser: async (token) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error("Failed to fetch user");
    return response.json();
  }
};
