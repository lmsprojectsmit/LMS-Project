// facultyNotesStorage.js - Centralized Google Drive Study Notes Service
// Enables faculty to share targeted Drive notes/resources with specific students, departments, or learning categories.

const FACULTY_NOTES_STORAGE_KEY = "lms_faculty_drive_notes";

// Default Initial Study Notes provided by course faculties
const INITIAL_DRIVE_NOTES = [
  {
    id: "NOTE-2026-001",
    title: "Unit I: Vector Spaces & Basis Verification - Handwritten Master Notes",
    driveUrl: "https://drive.google.com/file/d/1vEctorSp4c3s_B4sis_Notes_MA25C02/view?usp=sharing",
    unitId: "unit1",
    unitName: "Unit I: Vector Spaces",
    fileType: "pdf",
    facultyId: "FAC-001",
    facultyName: "Dr. K. Senthil Kumar",
    facultyDept: "Mathematics",
    facultyEmail: "senthil.k@institution.edu",
    targetScope: "all", // "all" | "department" | "category" | "specific_students"
    targetDept: "all",
    targetCategory: "all",
    targetStudentRolls: [],
    description: "Detailed classroom derivations for the 10 Vector Space axioms, subspace closure criteria, spanning sets, and basis dimension theorems with 5 solved university questions.",
    instructions: "Mandatory reading before solving Assignment 1. Pay special attention to page 8 on linear independence testing.",
    createdAt: "2026-09-10T09:30:00.000Z",
    dateFormatted: "10 Sep 2026"
  },
  {
    id: "NOTE-2026-002",
    title: "Unit I: Foundational Track Remedial Practice Sheet & Step-by-Step Solutions",
    driveUrl: "https://drive.google.com/file/d/1R3m3dial_Worksheet_Cat1_Anitha/view?usp=sharing",
    unitId: "unit1",
    unitName: "Unit I: Vector Spaces",
    fileType: "pdf",
    facultyId: "FAC-002",
    facultyName: "Dr. V. Anitha",
    facultyDept: "Mathematics",
    facultyEmail: "anitha.v@institution.edu",
    targetScope: "category",
    targetDept: "all",
    targetCategory: "category1", // Only for Category 1 students
    targetStudentRolls: [],
    description: "Tailored worksheet for students in Category 1 (Foundational Track) covering elementary row operations, 2x2 and 3x3 matrix inverses, and Gaussian elimination basics.",
    instructions: "Complete worksheets 1A & 1B and review before attempting your next micro-topic quiz attempt.",
    createdAt: "2026-09-12T14:15:00.000Z",
    dateFormatted: "12 Sep 2026"
  },
  {
    id: "NOTE-2026-003",
    title: "Unit II: Linear Transformations & Diagonalization - Lecture Slides & Code",
    driveUrl: "https://drive.google.com/drive/folders/1CSE_LinTrans_Diag_Sharma_Folder/view?usp=sharing",
    unitId: "unit2",
    unitName: "Unit II: Linear Transformations & Diagonalization",
    fileType: "slides",
    facultyId: "FAC-003",
    facultyName: "Prof. Rajesh Sharma",
    facultyDept: "CSE",
    facultyEmail: "rajesh.s@institution.edu",
    targetScope: "department",
    targetDept: "CSE", // Only for CSE students
    targetCategory: "all",
    targetStudentRolls: [],
    description: "Lecture presentation slides, 2D/3D affine transformation visualizer python scripts, and matrix representation examples tailored for Computer Science students.",
    instructions: "Review slides 14 to 32 regarding Kernel/Range nullity theorem and computer graphics transformation matrices.",
    createdAt: "2026-09-13T11:00:00.000Z",
    dateFormatted: "13 Sep 2026"
  },
  {
    id: "NOTE-2026-004",
    title: "Advanced Research Paper Reading: SVD & Spectral Decomposition in Machine Learning",
    driveUrl: "https://drive.google.com/file/d/1Adv_SVD_Spectral_Decomposition_Paper/view?usp=sharing",
    unitId: "unit2",
    unitName: "Unit II: Linear Transformations & Diagonalization",
    fileType: "pdf",
    facultyId: "FAC-001",
    facultyName: "Dr. K. Senthil Kumar",
    facultyDept: "Mathematics",
    facultyEmail: "senthil.k@institution.edu",
    targetScope: "specific_students",
    targetDept: "all",
    targetCategory: "all",
    targetStudentRolls: ["25CS101", "25IT101"], // Only for Aadhavan Raman and Divya Nambiar
    description: "High-level supplemental notes covering Singular Value Decomposition (SVD), principal component analysis (PCA), and pseudoinverse applications for top-scoring scholars.",
    instructions: "Optional honors reading for students planning research projects or AI internships.",
    createdAt: "2026-09-14T16:20:00.000Z",
    dateFormatted: "14 Sep 2026"
  }
];

/**
 * Retrieve all faculty notes from localStorage (initialized with defaults if empty)
 */
export function getAllFacultyDriveNotes() {
  try {
    const raw = localStorage.getItem(FACULTY_NOTES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(FACULTY_NOTES_STORAGE_KEY, JSON.stringify(INITIAL_DRIVE_NOTES));
      return [...INITIAL_DRIVE_NOTES];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [...INITIAL_DRIVE_NOTES];
  } catch (err) {
    console.error("Error reading faculty drive notes from storage:", err);
    return [...INITIAL_DRIVE_NOTES];
  }
}

/**
 * Save all notes back to localStorage and notify other components
 */
function saveAllNotes(notes) {
  try {
    localStorage.setItem(FACULTY_NOTES_STORAGE_KEY, JSON.stringify(notes));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("lms_faculty_notes_updated", { detail: notes }));
    }
  } catch (err) {
    console.error("Error saving faculty drive notes to storage:", err);
  }
}

/**
 * Add a new Drive note created by a faculty member
 */
export function addFacultyDriveNote(noteData) {
  const all = getAllFacultyDriveNotes();
  const id = `NOTE-${Date.now()}`;
  const now = new Date();
  const dateFormatted = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const newNote = {
    ...noteData,
    id,
    createdAt: now.toISOString(),
    dateFormatted: dateFormatted || "Today"
  };

  const updated = [newNote, ...all];
  saveAllNotes(updated);
  return newNote;
}

/**
 * Update an existing Drive note
 */
export function updateFacultyDriveNote(noteId, updatedFields) {
  const all = getAllFacultyDriveNotes();
  const idx = all.findIndex((n) => n.id === noteId);
  if (idx === -1) return null;

  all[idx] = {
    ...all[idx],
    ...updatedFields,
    updatedAt: new Date().toISOString()
  };

  saveAllNotes(all);
  return all[idx];
}

/**
 * Delete a Drive note
 */
export function deleteFacultyDriveNote(noteId) {
  const all = getAllFacultyDriveNotes();
  const filtered = all.filter((n) => n.id !== noteId);
  saveAllNotes(filtered);
  return filtered;
}

/**
 * Get notes filtered for a specific student based on targeting rules
 * Ensures that a student ONLY sees notes their faculty specified for them!
 */
export function getNotesForStudent(student) {
  if (!student) return [];
  const allNotes = getAllFacultyDriveNotes();

  const studentRoll = (student.rollNo || student.id || "").toUpperCase().trim();
  const studentDept = (student.department || "").toUpperCase().trim();
  const studentCat = (student.category || "").toLowerCase().trim();

  return allNotes.filter((note) => {
    // Rule 1: "all" students scope
    if (note.targetScope === "all") {
      return true;
    }

    // Rule 2: By Department
    if (note.targetScope === "department") {
      if (!note.targetDept || note.targetDept === "all") return true;
      return note.targetDept.toUpperCase().trim() === studentDept;
    }

    // Rule 3: By Learning Category
    if (note.targetScope === "category") {
      if (!note.targetCategory || note.targetCategory === "all") return true;
      return note.targetCategory.toLowerCase().trim() === studentCat;
    }

    // Rule 4: Specific Students only
    if (note.targetScope === "specific_students") {
      if (!Array.isArray(note.targetStudentRolls) || note.targetStudentRolls.length === 0) {
        return false;
      }
      return note.targetStudentRolls.some((r) => {
        const cleanR = (r || "").toUpperCase().trim();
        return cleanR === studentRoll || (student.email && student.email.toUpperCase().includes(cleanR));
      });
    }

    return false;
  });
}

/**
 * Get notes created by a specific faculty (or all for administrator)
 */
export function getNotesForFaculty(facultyUser) {
  const all = getAllFacultyDriveNotes();
  if (!facultyUser) return all;

  // If master administrator, can view all
  if (facultyUser.role === "admin") return all;

  const facEmail = (facultyUser.email || "").toLowerCase().trim();
  const facName = (facultyUser.fullName || facultyUser.name || "").toLowerCase().trim();

  return all.filter((note) => {
    if (facEmail && note.facultyEmail && note.facultyEmail.toLowerCase().trim() === facEmail) {
      return true;
    }
    if (facName && note.facultyName && note.facultyName.toLowerCase().trim() === facName) {
      return true;
    }
    // Default fallback: show notes created by default head or math faculty if matching
    return true;
  });
}
