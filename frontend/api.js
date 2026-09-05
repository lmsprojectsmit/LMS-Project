export const API_BASE_URL = 'http://127.0.0.1:8000';

// TODO: Replace with real PostgreSQL student ID provided by backend authentication
// This is a temporary development configuration for integration testing
export const DEV_STUDENT_ID = 1;

export function getStudentId(studentInfo) {
    // Once auth is implemented, return studentInfo.id
    return DEV_STUDENT_ID;
}

