import { useState, useMemo, useEffect } from "react";
import "./Faculty.css";
import ThemeToggle from "./ThemeToggle";
import {
  getStoredMicroTestScores,
  getFacultyUnlockRequests,
  unlockStudentMicroTest
} from "./microTopicTests";
import {
  getAllFacultyDriveNotes,
  addFacultyDriveNote,
  updateFacultyDriveNote,
  deleteFacultyDriveNote,
  getNotesForStudent
} from "./facultyNotesStorage";

// Realistic baseline cohort of engineering students enrolled in Linear Algebra (MA25C02)
const INITIAL_STUDENTS = [
  {
    id: "STU-001",
    rollNo: "25CS101",
    name: "Aadhavan Raman",
    email: "aadhavan.r@institution.edu",
    phone: "+91 98401 23456",
    department: "CSE",
    year: "I Year (Sem II)",
    section: "A",
    attendance: 96,
    hasTakenAssessment: true,
    score: 18,
    maxScore: 20,
    category: "category3",
    categoryLabel: "Category 3: Advanced Scholars",
    categoryBadge: "cat-badge-3",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 5, total: 5 },
      unit2: { name: "Determinants", score: 5, total: 5 },
      unit3: { name: "Linear Systems", score: 4, total: 5 },
      unit4: { name: "Eigenvalues", score: 4, total: 5 },
    },
    lessonsCompleted: 4,
    totalLessons: 4,
    remarks: "Demonstrates exceptional proof rigor. Recommended for research reading on Singular Value Decomposition.",
  },
  {
    id: "STU-002",
    rollNo: "25CS102",
    name: "Bhavana Krishnan",
    email: "bhavana.k@institution.edu",
    phone: "+91 98402 34567",
    department: "CSE",
    year: "I Year (Sem II)",
    section: "A",
    attendance: 92,
    hasTakenAssessment: true,
    score: 14,
    maxScore: 20,
    category: "category2",
    categoryLabel: "Category 2: Core Engineering",
    categoryBadge: "cat-badge-2",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 4, total: 5 },
      unit2: { name: "Determinants", score: 4, total: 5 },
      unit3: { name: "Linear Systems", score: 3, total: 5 },
      unit4: { name: "Eigenvalues", score: 3, total: 5 },
    },
    lessonsCompleted: 3,
    totalLessons: 4,
    remarks: "Good grasp of determinants and rank. Needs minor revision in characteristic polynomial roots.",
  },
  {
    id: "STU-003",
    rollNo: "25CS103",
    name: "Chirag Venkatesh",
    email: "chirag.v@institution.edu",
    phone: "+91 98403 45678",
    department: "CSE",
    year: "I Year (Sem II)",
    section: "B",
    attendance: 84,
    hasTakenAssessment: true,
    score: 7,
    maxScore: 20,
    category: "category1",
    categoryLabel: "Category 1: Foundational Track",
    categoryBadge: "cat-badge-1",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 2, total: 5 },
      unit2: { name: "Determinants", score: 2, total: 5 },
      unit3: { name: "Linear Systems", score: 2, total: 5 },
      unit4: { name: "Eigenvalues", score: 1, total: 5 },
    },
    lessonsCompleted: 1,
    totalLessons: 4,
    remarks: "Assigned remedial videos for elementary row operations and 2x2/3x3 determinant formulas.",
  },
  {
    id: "STU-004",
    rollNo: "25IT101",
    name: "Divya Nambiar",
    email: "divya.n@institution.edu",
    phone: "+91 98404 56789",
    department: "IT",
    year: "I Year (Sem II)",
    section: "A",
    attendance: 98,
    hasTakenAssessment: true,
    score: 19,
    maxScore: 20,
    category: "category3",
    categoryLabel: "Category 3: Advanced Scholars",
    categoryBadge: "cat-badge-3",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 5, total: 5 },
      unit2: { name: "Determinants", score: 5, total: 5 },
      unit3: { name: "Linear Systems", score: 5, total: 5 },
      unit4: { name: "Eigenvalues", score: 4, total: 5 },
    },
    lessonsCompleted: 4,
    totalLessons: 4,
    remarks: "Class topper in initial diagnostic test. Selected as peer study group mentor for Unit IV.",
  },
  {
    id: "STU-005",
    rollNo: "25IT102",
    name: "Eshwar Sundaram",
    email: "eshwar.s@institution.edu",
    phone: "+91 98405 67890",
    department: "IT",
    year: "I Year (Sem II)",
    section: "A",
    attendance: 88,
    hasTakenAssessment: true,
    score: 11,
    maxScore: 20,
    category: "category2",
    categoryLabel: "Category 2: Core Engineering",
    categoryBadge: "cat-badge-2",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 3, total: 5 },
      unit2: { name: "Determinants", score: 3, total: 5 },
      unit3: { name: "Linear Systems", score: 3, total: 5 },
      unit4: { name: "Eigenvalues", score: 2, total: 5 },
    },
    lessonsCompleted: 2,
    totalLessons: 4,
    remarks: "Understands Gaussian reduction well. Encouraged to practice Cayley-Hamilton inverse problems.",
  },
  {
    id: "STU-006",
    rollNo: "25AI101",
    name: "Fathima Noor",
    email: "fathima.n@institution.edu",
    phone: "+91 98406 78901",
    department: "AI & DS",
    year: "I Year (Sem II)",
    section: "A",
    attendance: 94,
    hasTakenAssessment: true,
    score: 16,
    maxScore: 20,
    category: "category3",
    categoryLabel: "Category 3: Advanced Scholars",
    categoryBadge: "cat-badge-3",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 4, total: 5 },
      unit2: { name: "Determinants", score: 4, total: 5 },
      unit3: { name: "Linear Systems", score: 4, total: 5 },
      unit4: { name: "Eigenvalues", score: 4, total: 5 },
    },
    lessonsCompleted: 3,
    totalLessons: 4,
    remarks: "Strong aptitude in vector spaces. Reviewing Gram-Schmidt orthogonalization exercises.",
  },
  {
    id: "STU-007",
    rollNo: "25AI102",
    name: "Gokul Pranav",
    email: "gokul.p@institution.edu",
    phone: "+91 98407 89012",
    department: "AI & DS",
    year: "I Year (Sem II)",
    section: "B",
    attendance: 82,
    hasTakenAssessment: true,
    score: 8,
    maxScore: 20,
    category: "category1",
    categoryLabel: "Category 1: Foundational Track",
    categoryBadge: "cat-badge-1",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 3, total: 5 },
      unit2: { name: "Determinants", score: 2, total: 5 },
      unit3: { name: "Linear Systems", score: 2, total: 5 },
      unit4: { name: "Eigenvalues", score: 1, total: 5 },
    },
    lessonsCompleted: 1,
    totalLessons: 4,
    remarks: "Requires guidance on non-homogeneous consistency conditions (Rouché–Capelli theorem).",
  },
  {
    id: "STU-008",
    rollNo: "25EC101",
    name: "Harini Rajagopal",
    email: "harini.r@institution.edu",
    phone: "+91 98408 90123",
    department: "ECE",
    year: "I Year (Sem II)",
    section: "A",
    attendance: 91,
    hasTakenAssessment: true,
    score: 13,
    maxScore: 20,
    category: "category2",
    categoryLabel: "Category 2: Core Engineering",
    categoryBadge: "cat-badge-2",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 4, total: 5 },
      unit2: { name: "Determinants", score: 3, total: 5 },
      unit3: { name: "Linear Systems", score: 3, total: 5 },
      unit4: { name: "Eigenvalues", score: 3, total: 5 },
    },
    lessonsCompleted: 2,
    totalLessons: 4,
    remarks: "Consistent performance. Working through Unit III linear independence problem sets.",
  },
  {
    id: "STU-009",
    rollNo: "25EC102",
    name: "Imran Baig",
    email: "imran.b@institution.edu",
    phone: "+91 98409 01234",
    department: "ECE",
    year: "I Year (Sem II)",
    section: "A",
    attendance: 79,
    hasTakenAssessment: true,
    score: 6,
    maxScore: 20,
    category: "category1",
    categoryLabel: "Category 1: Foundational Track",
    categoryBadge: "cat-badge-1",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 2, total: 5 },
      unit2: { name: "Determinants", score: 2, total: 5 },
      unit3: { name: "Linear Systems", score: 1, total: 5 },
      unit4: { name: "Eigenvalues", score: 1, total: 5 },
    },
    lessonsCompleted: 1,
    totalLessons: 4,
    remarks: "Scheduled for remedial tutorial class on Saturday. Needs to practice cofactor expansions.",
  },
  {
    id: "STU-010",
    rollNo: "25CS104",
    name: "Jayashree Murali",
    email: "jayashree.m@institution.edu",
    phone: "+91 98410 12345",
    department: "CSE",
    year: "I Year (Sem II)",
    section: "B",
    attendance: 95,
    hasTakenAssessment: true,
    score: 17,
    maxScore: 20,
    category: "category3",
    categoryLabel: "Category 3: Advanced Scholars",
    categoryBadge: "cat-badge-3",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 5, total: 5 },
      unit2: { name: "Determinants", score: 4, total: 5 },
      unit3: { name: "Linear Systems", score: 4, total: 5 },
      unit4: { name: "Eigenvalues", score: 4, total: 5 },
    },
    lessonsCompleted: 4,
    totalLessons: 4,
    remarks: "High conceptual clarity. Active in math discussion forum.",
  },
  {
    id: "STU-011",
    rollNo: "25CS105",
    name: "Karthik Subbaraj",
    email: "karthik.s@institution.edu",
    phone: "+91 98411 23456",
    department: "CSE",
    year: "I Year (Sem II)",
    section: "B",
    attendance: 89,
    hasTakenAssessment: true,
    score: 12,
    maxScore: 20,
    category: "category2",
    categoryLabel: "Category 2: Core Engineering",
    categoryBadge: "cat-badge-2",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 3, total: 5 },
      unit2: { name: "Determinants", score: 3, total: 5 },
      unit3: { name: "Linear Systems", score: 3, total: 5 },
      unit4: { name: "Eigenvalues", score: 3, total: 5 },
    },
    lessonsCompleted: 2,
    totalLessons: 4,
    remarks: "Progressing solidly through standard syllabus problem banks.",
  },
  {
    id: "STU-012",
    rollNo: "25IT103",
    name: "Lavanya Natarajan",
    email: "lavanya.n@institution.edu",
    phone: "+91 98412 34567",
    department: "IT",
    year: "I Year (Sem II)",
    section: "B",
    attendance: 90,
    hasTakenAssessment: true,
    score: 15,
    maxScore: 20,
    category: "category2",
    categoryLabel: "Category 2: Core Engineering",
    categoryBadge: "cat-badge-2",
    domainScores: {
      unit1: { name: "Matrix Algebra", score: 4, total: 5 },
      unit2: { name: "Determinants", score: 4, total: 5 },
      unit3: { name: "Linear Systems", score: 4, total: 5 },
      unit4: { name: "Eigenvalues", score: 3, total: 5 },
    },
    lessonsCompleted: 3,
    totalLessons: 4,
    remarks: "Borderline Category 3. Recommended to take challenge exercises in Unit IV.",
  },
];

function Faculty({ onNavigate, registeredStudent, currentUser, onLogout, theme, onToggleTheme }) {
  // Combine registered student from current session if available
  const [students, setStudents] = useState(() => {
    let list = [...INITIAL_STUDENTS];
    if (registeredStudent && registeredStudent.fullName) {
      const alreadyExists = list.some(
        (s) => s.email.toLowerCase() === (registeredStudent.email || "").toLowerCase()
      );
      if (!alreadyExists) {
        const newStu = {
          id: `STU-NEW-${Date.now().toString().slice(-4)}`,
          rollNo: registeredStudent.rollNo || "25REG999",
          name: registeredStudent.fullName,
          email: registeredStudent.email || "student@institution.edu",
          phone: registeredStudent.phone || registeredStudent.mobile || "+91 98000 00000",
          department: registeredStudent.department || "CSE",
          year: registeredStudent.year || "I Year (Sem II)",
          section: registeredStudent.section || "A",
          attendance: 95,
          hasTakenAssessment: !!registeredStudent.hasTakenAssessment,
          score: registeredStudent.score !== undefined ? registeredStudent.score : 15,
          maxScore: 20,
          category: registeredStudent.category || "category2",
          categoryLabel: registeredStudent.categoryLabel || "Category 2: Core Engineering",
          categoryBadge: registeredStudent.categoryBadge || "cat-badge-2",
          domainScores: registeredStudent.domainScores || {
            unit1: { name: "Matrix Algebra", score: 4, total: 5 },
            unit2: { name: "Determinants", score: 4, total: 5 },
            unit3: { name: "Linear Systems", score: 4, total: 5 },
            unit4: { name: "Eigenvalues", score: 3, total: 5 },
          },
          lessonsCompleted: registeredStudent.hasTakenAssessment ? 1 : 0,
          totalLessons: 4,
          remarks: registeredStudent.hasTakenAssessment
            ? `Diagnostic Assessment completed with score ${registeredStudent.score}/20 (${registeredStudent.categoryLabel || "Assigned Pathway"}).`
            : "Newly enrolled via student registration portal.",
        };
        list = [newStu, ...list];
      }
    }
    return list;
  });

  // Portal Main View Tab: "roster" (Student Cohort Roster) | "driveNotes" (Google Drive Notes & Resources)
  const [activePortalTab, setActivePortalTab] = useState("roster");

  // Search, Filter & Sort States for Students Roster
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score-desc");
  const [viewMode, setViewMode] = useState("table"); // "table" | "grid"

  // Selected Student Profile Modal
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Micro-Topic Test Unlock Requests State
  const [unlockRequests, setUnlockRequests] = useState(() => getFacultyUnlockRequests());
  const [microScores, setMicroScores] = useState(() => getStoredMicroTestScores());

  // Drive Notes State
  const [driveNotes, setDriveNotes] = useState(() => getAllFacultyDriveNotes());

  // Keep notes synchronized across windows / custom events
  useEffect(() => {
    const handleNotesUpdate = () => {
      setDriveNotes(getAllFacultyDriveNotes());
    };
    window.addEventListener("lms_faculty_notes_updated", handleNotesUpdate);
    return () => window.removeEventListener("lms_faculty_notes_updated", handleNotesUpdate);
  }, []);

  // Drive Notes Filter & Search States
  const [noteSearchQuery, setNoteSearchQuery] = useState("");
  const [noteUnitFilter, setNoteUnitFilter] = useState("all");
  const [noteScopeFilter, setNoteScopeFilter] = useState("all");

  // Drive Notes Modal State
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [modalStudentSearch, setModalStudentSearch] = useState("");
  const [noteFormData, setNoteFormData] = useState({
    title: "",
    driveUrl: "",
    unitId: "unit1",
    unitName: "Unit I: Vector Spaces",
    fileType: "pdf",
    targetScope: "all", // "all" | "department" | "category" | "specific_students"
    targetDept: "all",
    targetCategory: "all",
    targetStudentRolls: [],
    description: "",
    instructions: "",
  });

  // Helper unit mapping
  const UNIT_NAMES = {
    unit1: "Unit I: Vector Spaces",
    unit2: "Unit II: Linear Transformations & Diagonalization",
    unit3: "Unit III: Inner Product Spaces",
    unit4: "Unit IV: Characteristic Roots & Quadratic Forms"
  };

  // Open modal to publish new notes (optionally pre-selecting a specific student)
  const handleOpenCreateNoteModal = (preselectedRollNo = null) => {
    setEditingNote(null);
    setModalStudentSearch("");
    setNoteFormData({
      title: "",
      driveUrl: "",
      unitId: "unit1",
      unitName: "Unit I: Vector Spaces",
      fileType: "pdf",
      targetScope: preselectedRollNo ? "specific_students" : "all",
      targetDept: "all",
      targetCategory: "all",
      targetStudentRolls: preselectedRollNo ? [preselectedRollNo] : [],
      description: "",
      instructions: "",
    });
    setIsDriveModalOpen(true);
  };

  // Open modal to edit existing note
  const handleOpenEditNoteModal = (note) => {
    setEditingNote(note);
    setModalStudentSearch("");
    setNoteFormData({
      title: note.title || "",
      driveUrl: note.driveUrl || "",
      unitId: note.unitId || "unit1",
      unitName: note.unitName || UNIT_NAMES[note.unitId] || "Unit I: Vector Spaces",
      fileType: note.fileType || "pdf",
      targetScope: note.targetScope || "all",
      targetDept: note.targetDept || "all",
      targetCategory: note.targetCategory || "all",
      targetStudentRolls: Array.isArray(note.targetStudentRolls) ? [...note.targetStudentRolls] : [],
      description: note.description || "",
      instructions: note.instructions || "",
    });
    setIsDriveModalOpen(true);
  };

  // Save/Publish Drive Note
  const handleSaveDriveNote = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!noteFormData.title.trim()) {
      alert("Please enter a title for the study notes.");
      return;
    }

    const driveUrlTrimmed = noteFormData.driveUrl.trim();
    if (!driveUrlTrimmed) {
      alert("Please enter a valid Google Drive shareable link.");
      return;
    }

    // Friendly validation for Google Drive URLs
    if (!driveUrlTrimmed.startsWith("http://") && !driveUrlTrimmed.startsWith("https://")) {
      alert("Please ensure the Google Drive link starts with https://");
      return;
    }

    if (noteFormData.targetScope === "specific_students" && noteFormData.targetStudentRolls.length === 0) {
      alert("Please select at least one specific student to receive these notes.");
      return;
    }

    const facName = currentUser?.fullName || currentUser?.name || "Dr. K. Senthil Kumar";
    const facDept = currentUser?.department || "Mathematics";
    const facEmail = currentUser?.email || "senthil.k@institution.edu";

    const payload = {
      ...noteFormData,
      driveUrl: driveUrlTrimmed,
      unitName: UNIT_NAMES[noteFormData.unitId] || "Unit I: Vector Spaces",
      facultyName: editingNote?.facultyName || facName,
      facultyDept: editingNote?.facultyDept || facDept,
      facultyEmail: editingNote?.facultyEmail || facEmail,
    };

    if (editingNote) {
      updateFacultyDriveNote(editingNote.id, payload);
      alert(`✓ Google Drive study notes "${payload.title}" updated successfully!`);
    } else {
      addFacultyDriveNote(payload);
      alert(`✓ New Google Drive study notes published and targeted to specified students!`);
    }

    setDriveNotes(getAllFacultyDriveNotes());
    setIsDriveModalOpen(false);
    setEditingNote(null);
  };

  // Delete Drive Note
  const handleDeleteDriveNote = (noteId, noteTitle) => {
    if (window.confirm(`Are you sure you want to remove "${noteTitle}"?\n\nStudents will no longer have access to this Google Drive link in their syllabus.`)) {
      deleteFacultyDriveNote(noteId);
      setDriveNotes(getAllFacultyDriveNotes());
    }
  };

  // Toggle individual student targeting in modal
  const handleToggleTargetStudent = (rollNo) => {
    setNoteFormData((prev) => {
      const exists = prev.targetStudentRolls.includes(rollNo);
      const updated = exists
        ? prev.targetStudentRolls.filter((r) => r !== rollNo)
        : [...prev.targetStudentRolls, rollNo];
      return { ...prev, targetStudentRolls: updated };
    });
  };

  // Filtered Drive Notes for the Faculty Drive View
  const filteredDriveNotes = useMemo(() => {
    return driveNotes.filter((note) => {
      // Search filter
      const q = noteSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        note.title?.toLowerCase().includes(q) ||
        note.description?.toLowerCase().includes(q) ||
        note.instructions?.toLowerCase().includes(q) ||
        note.unitName?.toLowerCase().includes(q) ||
        note.facultyName?.toLowerCase().includes(q) ||
        note.targetDept?.toLowerCase().includes(q) ||
        note.targetCategory?.toLowerCase().includes(q) ||
        note.targetStudentRolls?.some((r) => r.toLowerCase().includes(q));

      // Unit filter
      const matchesUnit = noteUnitFilter === "all" || note.unitId === noteUnitFilter;

      // Scope filter
      const matchesScope = noteScopeFilter === "all" || note.targetScope === noteScopeFilter;

      return matchesSearch && matchesUnit && matchesScope;
    });
  }, [driveNotes, noteSearchQuery, noteUnitFilter, noteScopeFilter]);

  // Compute Class KPIs
  const totalCount = students.length;
  const assessedCount = students.filter((s) => s.hasTakenAssessment).length;
  const avgScore = totalCount > 0
    ? (students.reduce((sum, s) => sum + s.score, 0) / totalCount).toFixed(1)
    : 0;
  const avgPct = Math.round((avgScore / 20) * 100);

  const cat1Count = students.filter((s) => s.category === "category1" || s.category === "bronze").length;
  const cat2Count = students.filter((s) => s.category === "category2" || s.category === "silver").length;
  const cat3Count = students.filter((s) => s.category === "category3" || s.category === "gold").length;

  // Filtered and Sorted Students
  const filteredStudents = useMemo(() => {
    return students
      .filter((s) => {
        // Search
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.department.toLowerCase().includes(q);

        // Category filter
        const matchesCategory =
          selectedCategoryFilter === "all" || s.category === selectedCategoryFilter;

        // Dept filter
        const matchesDept =
          selectedDeptFilter === "all" || s.department === selectedDeptFilter;

        return matchesSearch && matchesCategory && matchesDept;
      })
      .sort((a, b) => {
        if (sortBy === "score-desc") return b.score - a.score;
        if (sortBy === "score-asc") return a.score - b.score;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        if (sortBy === "roll-asc") return a.rollNo.localeCompare(b.rollNo);
        return 0;
      });
  }, [students, searchQuery, selectedCategoryFilter, selectedDeptFilter, sortBy]);

  const handleOpenStudentModal = (student) => {
    setSelectedStudent(student);
  };

  const handleExportCSV = () => {
    const headers = "Reg No,Name,Department,Section,Email,Phone,Score,Category,Lessons Completed,Remarks\n";
    const rows = filteredStudents.map((s) =>
      `"${s.rollNo}","${s.name}","${s.department}","${s.section}","${s.email}","${s.phone}",${s.score},"${s.categoryLabel}","${s.lessonsCompleted}/${s.totalLessons}","${s.remarks.replace(/"/g, '""')}"`
    ).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Linear_Algebra_MA25C02_Student_Roster_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="faculty-portal-page">
      {/* Background Decor */}
      <div className="faculty-bg-chalk" aria-hidden="true">
        <span className="fac-symbol fs1">A x = b</span>
        <span className="fac-symbol fs2">det(A) ≠ 0</span>
        <span className="fac-symbol fs3">Tr(A) = ∑ λᵢ</span>
        <span className="fac-symbol fs4">P⁻¹ A P = D</span>
      </div>

      {/* Top Navigation Bar */}
      <header className="faculty-nav">
        <div className="fac-nav-left" onClick={() => onNavigate && onNavigate("home")}>
          <div className="fac-logo">👨‍🏫</div>
          <div>
            <h1 className="fac-nav-title">Adaptive LMS • Faculty Portal</h1>
            <p className="fac-nav-sub">Course Coordinator: Linear Algebra (MA25C02)</p>
          </div>
        </div>

        <div className="fac-nav-right">
          <div className="instructor-card">
            <span className="inst-avatar">👨‍🏫</span>
            <div className="inst-text">
              <span className="inst-name">{currentUser?.fullName || currentUser?.name || "Dr. K. Senthil Kumar, Ph.D."}</span>
              <span className="inst-role">{currentUser?.designation ? `${currentUser.designation} (${currentUser.department || "Mathematics"})` : "Professor & Course Head (Dept of Mathematics)"}</span>
            </div>
          </div>

          <div className="fac-nav-buttons">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <button
              type="button"
              className="fac-btn-outline"
              onClick={() => onNavigate && onNavigate("home")}
            >
              Portal Home
            </button>
            <button
              type="button"
              className="fac-btn-outline"
              onClick={() => onNavigate && onNavigate("admin")}
              title="Switch to Admin Console"
            >
              Admin Console 🛡️
            </button>
            <button
              type="button"
              className="fac-btn-primary"
              onClick={() => onNavigate && onNavigate("register")}
            >
              + Student Registration
            </button>
            {onLogout && (
              <button
                type="button"
                className="fac-btn-logout"
                onClick={onLogout}
                title="Sign Out of Faculty Portal"
              >
                Sign Out 🚪
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="faculty-container">
        {/* Course Banner */}
        <section className="faculty-hero-banner">
          <div className="fh-left">
            <div className="fh-badge-cluster">
              <span className="fh-badge">ACADEMIC YEAR 2025–2026</span>
              <span className="fh-badge-sec">SEMESTER II • REGULATION 2025</span>
              <span className="fh-badge-live">● Active Classroom Roster</span>
            </div>
            <h2 className="fh-title">
              Linear Algebra (MA25C02) • Student Performance & Cohort Intelligence
            </h2>
            <p className="fh-desc">
              Comprehensive student records, 1-mark diagnostic test marks (30 Marks total • 25 Mins), performance category distribution, and personalized lesson assignment statuses.
            </p>
          </div>

          <div className="fh-actions">
            <button
              type="button"
              className="fh-export-btn"
              onClick={handleExportCSV}
              title="Download full student table as CSV"
            >
              📥 Export CSV Roster
            </button>
            <button
              type="button"
              className="fh-print-btn"
              onClick={() => window.print()}
            >
              🖨️ Print Cohort Report
            </button>
          </div>
        </section>

        {/* Main Faculty Navigation Switcher */}
        <section className="faculty-view-switcher-bar">
          <div className="fvs-tabs">
            <button
              type="button"
              className={`fvs-tab-btn ${activePortalTab === "roster" ? "active" : ""}`}
              onClick={() => setActivePortalTab("roster")}
            >
              <span className="fvs-tab-icon">👥</span>
              <span className="fvs-tab-text">Student Cohort Roster & Analytics</span>
              <span className="fvs-pill-count">{students.length}</span>
            </button>

            <button
              type="button"
              className={`fvs-tab-btn ${activePortalTab === "driveNotes" ? "active" : ""}`}
              onClick={() => setActivePortalTab("driveNotes")}
            >
              <span className="fvs-tab-icon">📁</span>
              <span className="fvs-tab-text">Google Drive Notes & Resources</span>
              <span className="fvs-pill-count fvs-pill-drive">{driveNotes.length} Shared</span>
            </button>
          </div>

          <div className="fvs-actions">
            <button
              type="button"
              className="fvs-btn-add-drive"
              onClick={() => handleOpenCreateNoteModal()}
              title="Provide new study materials via Google Drive link"
            >
              <span>+ Share New Notes via Drive 📁</span>
            </button>
          </div>
        </section>

        {/* ========================================================= */}
        {/* TAB 1: COHORT ROSTER & PERFORMANCE ANALYTICS               */}
        {/* ========================================================= */}
        {activePortalTab === "roster" && (
          <>
            {/* Micro-Topic Test Re-Test Unlock Requests Notification Banner */}
            {unlockRequests.filter((r) => r.status === "pending").length > 0 && (
              <div style={{
            background: "rgba(239, 68, 68, 0.12)",
            border: "1.5px solid rgba(239, 68, 68, 0.35)",
            borderRadius: "12px",
            padding: "16px 20px",
            marginBottom: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.35)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "24px" }}>🔔</span>
              <div>
                <strong style={{ fontSize: "15px", color: "#fca5a5" }}>
                  {unlockRequests.filter((r) => r.status === "pending").length} Student(s) Requesting Micro-Topic Re-Test Authorization
                </strong>
                <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#fecaca" }}>
                  These students have completed all 3 allowed attempts without achieving a qualifying score (&gt; 6 marks) and require faculty permission to re-take.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {unlockRequests.filter((r) => r.status === "pending").map((req) => (
                <div
                  key={req.id}
                  style={{
                    background: "#161f32",
                    border: "1px solid rgba(239, 68, 68, 0.35)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    fontSize: "13px",
                    color: "#f8fafc"
                  }}
                >
                  <div>
                    <strong style={{ color: "#ffffff" }}>{req.studentName}</strong> ({req.studentRollNo}) • <span style={{ color: "#c7d2fe" }}>Section {req.topicCode} (Last Score: {req.lastScore}/10)</span>
                  </div>
                  <button
                    type="button"
                    style={{
                      background: "#16a34a",
                      color: "#ffffff",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontWeight: "700",
                      fontSize: "12px",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      unlockStudentMicroTest(req.topicCode, req.studentRollNo);
                      setUnlockRequests(getFacultyUnlockRequests());
                      setMicroScores(getStoredMicroTestScores());
                      alert(`✓ Section ${req.topicCode} test unlocked for ${req.studentName}. Student's attempts have been reset to allow re-testing.`);
                    }}
                  >
                    🔓 Authorize & Unlock (Reset Attempts)
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Classroom Analytics / KPI Grid */}
        <section className="faculty-kpi-grid">
          {/* Card 1: Total Enrolled */}
          <div className="kpi-card">
            <div className="kpi-icon-row">
              <span className="kpi-icon bg-indigo">👥</span>
              <span className="kpi-chip">Enrolled</span>
            </div>
            <span className="kpi-value">{totalCount}</span>
            <span className="kpi-label">Total Engineering Students</span>
            <span className="kpi-footer">Across CSE, IT, AI & DS, ECE</span>
          </div>

          {/* Card 2: Class Average Score */}
          <div className="kpi-card">
            <div className="kpi-icon-row">
              <span className="kpi-icon bg-emerald">📊</span>
              <span className="kpi-chip">{avgPct}% Avg</span>
            </div>
            <span className="kpi-value">{avgScore} <small>/ 20</small></span>
            <span className="kpi-label">Diagnostic Test Average Marks</span>
            <span className="kpi-footer">Evaluated across 4 units</span>
          </div>

          {/* Card 3: Bronze (<= 39%) */}
          <div
            className={`kpi-card clickable ${selectedCategoryFilter === "category1" ? "active-kpi" : ""}`}
            onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === "category1" ? "all" : "category1")}
            title="Click to filter Bronze students"
          >
            <div className="kpi-icon-row">
              <span className="kpi-icon bg-amber">🥉</span>
              <span className="kpi-chip bg-amber-chip">≤ 39%</span>
            </div>
            <span className="kpi-value text-amber">{cat1Count}</span>
            <span className="kpi-label">Bronze: Foundational Support</span>
            <span className="kpi-footer">Score ≤ 39% • Remedial rows & drills</span>
          </div>

          {/* Card 4: Silver (40% - 79%) */}
          <div
            className={`kpi-card clickable ${selectedCategoryFilter === "category2" ? "active-kpi" : ""}`}
            onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === "category2" ? "all" : "category2")}
            title="Click to filter Silver students"
          >
            <div className="kpi-icon-row">
              <span className="kpi-icon bg-blue">🥈</span>
              <span className="kpi-chip bg-blue-chip">40% – 79%</span>
            </div>
            <span className="kpi-value text-blue">{cat2Count}</span>
            <span className="kpi-label">Silver: Core Engineering</span>
            <span className="kpi-footer">Score 40%–79% • Standard university pace</span>
          </div>

          {/* Card 5: Gold (>= 80%) */}
          <div
            className={`kpi-card clickable ${selectedCategoryFilter === "category3" ? "active-kpi" : ""}`}
            onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === "category3" ? "all" : "category3")}
            title="Click to filter Gold students"
          >
            <div className="kpi-icon-row">
              <span className="kpi-icon bg-green">🥇</span>
              <span className="kpi-chip bg-green-chip">≥ 80%</span>
            </div>
            <span className="kpi-value text-green">{cat3Count}</span>
            <span className="kpi-label">Gold: Advanced Scholars</span>
            <span className="kpi-footer">Score ≥ 80% • Assigned SVD & Honors proofs</span>
          </div>
        </section>

        {/* Filter and Controls Toolbar */}
        <section className="faculty-toolbar-card">
          <div className="toolbar-search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="toolbar-search-input"
              placeholder="Search by student name, registration number, department, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
              >
                ✕
              </button>
            )}
          </div>

          <div className="toolbar-filters-row">
            {/* Category Filter */}
            <div className="filter-group">
              <label className="filter-lbl">Category Filter:</label>
              <select
                className="filter-select"
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories ({totalCount})</option>
                <option value="category1">🥉 Bronze: Foundational (Score ≤ 39%) [{cat1Count}]</option>
                <option value="category2">🥈 Silver: Core Engineering (Score 40% – 79%) [{cat2Count}]</option>
                <option value="category3">🥇 Gold: Advanced Scholars (Score ≥ 80%) [{cat3Count}]</option>
              </select>
            </div>

            {/* Department Filter */}
            <div className="filter-group">
              <label className="filter-lbl">Department:</label>
              <select
                className="filter-select"
                value={selectedDeptFilter}
                onChange={(e) => setSelectedDeptFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="AI & DS">AI & DS</option>
                <option value="ECE">ECE</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="filter-group">
              <label className="filter-lbl">Sort By:</label>
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="score-desc">Highest Marks First</option>
                <option value="score-asc">Lowest Marks First</option>
                <option value="roll-asc">Registration Number</option>
                <option value="name-asc">Student Name (A-Z)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="view-mode-toggle">
              <button
                type="button"
                className={`vm-btn ${viewMode === "table" ? "active" : ""}`}
                onClick={() => setViewMode("table")}
                title="Table View"
              >
                📋 Table
              </button>
              <button
                type="button"
                className={`vm-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                title="Card Grid View"
              >
                🪟 Cards
              </button>
            </div>
          </div>
        </section>

        {/* Results Counter and Active Filters Info */}
        <div className="roster-meta-bar">
          <span className="roster-count">
            Showing <strong>{filteredStudents.length}</strong> of <strong>{totalCount}</strong> Students
          </span>
          {(selectedCategoryFilter !== "all" || selectedDeptFilter !== "all" || searchQuery) && (
            <button
              type="button"
              className="btn-reset-filters"
              onClick={() => {
                setSelectedCategoryFilter("all");
                setSelectedDeptFilter("all");
                setSearchQuery("");
              }}
            >
              Reset Filters ↺
            </button>
          )}
        </div>

        {/* ========================================================= */}
        {/* VIEW 1: ROSTER TABLE VIEW                                 */}
        {/* ========================================================= */}
        {viewMode === "table" ? (
          <div className="student-table-wrap">
            <table className="faculty-student-table">
              <thead>
                <tr>
                  <th>Reg No</th>
                  <th>Student Name & Info</th>
                  <th>Department & Sec</th>
                  <th>Contact Details</th>
                  <th>Diagnostic Score</th>
                  <th>Curriculum Status</th>
                  <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((stu) => {
                  const pct = Math.round((stu.score / stu.maxScore) * 100);
                  return (
                    <tr key={stu.id} className="student-row">
                      {/* Roll No */}
                      <td>
                        <span className="stu-roll-badge">{stu.rollNo}</span>
                      </td>

                      {/* Name & Avatar */}
                      <td>
                        <div className="stu-name-cell">
                          <div className="stu-avatar">
                            {stu.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </div>
                          <div>
                            <span className="stu-name-txt">{stu.name}</span>
                            <span className="stu-year-txt">{stu.year}</span>
                          </div>
                        </div>
                      </td>

                      {/* Dept & Section */}
                      <td>
                        <span className="stu-dept-pill">{stu.department}</span>
                        <span className="stu-sec-txt">Sec {stu.section}</span>
                      </td>

                      {/* Contact */}
                      <td>
                        <div className="stu-contact-cell">
                          <span className="stu-email">{stu.email}</span>
                          <span className="stu-phone">{stu.phone}</span>
                        </div>
                      </td>

                      {/* Diagnostic Score */}
                      <td>
                        <div className="stu-score-cell">
                          <span className={`score-pct-tag ${pct >= 80 ? "score-high" : pct >= 50 ? "score-mid" : "score-low"}`}>
                            {pct}%
                          </span>
                        </div>
                      </td>

                      {/* Curriculum Status */}
                      <td>
                        <div className="curriculum-status-cell">
                          <span className="curr-stat-txt">
                            {stu.lessonsCompleted} of {stu.totalLessons} Lessons
                          </span>
                          <span className="curr-sub">
                            {stu.lessonsCompleted === 4 ? "✓ Completed" : "In Progress"}
                          </span>
                        </div>
                      </td>

                      {/* Action */}
                      <td style={{ textAlign: "center" }}>
                        <button
                          type="button"
                          className="btn-view-stu"
                          onClick={() => handleOpenStudentModal(stu)}
                          title="View Full Profile & Performance Breakdown"
                        >
                          👁️ View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredStudents.length === 0 && (
                  <tr>
                    <td colSpan="7" className="no-students-cell">
                      <div className="empty-roster">
                        <span className="empty-icon">🔍</span>
                        <h4>No students found matching your criteria</h4>
                        <p>Try adjusting your search query, department, or category filter.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          /* ========================================================= */
          /* VIEW 2: CARD GRID VIEW                                    */
          /* ========================================================= */
          <div className="student-cards-grid">
            {filteredStudents.map((stu) => {
              const pct = Math.round((stu.score / stu.maxScore) * 100);
              return (
                <div key={stu.id} className="student-grid-card">
                  <div className="sgc-header">
                    <div className="stu-avatar large">
                      {stu.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div className="sgc-title">
                      <h4 className="sgc-name">{stu.name}</h4>
                      <span className="stu-roll-badge">{stu.rollNo}</span>
                    </div>
                    <span className={`category-tag-pill ${stu.categoryBadge}`}>
                      {stu.category === "category1" || stu.category === "bronze" ? "🥉 Bronze" : stu.category === "category2" || stu.category === "silver" ? "🥈 Silver" : "🥇 Gold"}
                    </span>
                  </div>

                  <div className="sgc-dept-row">
                    <span><strong>Dept:</strong> {stu.department} (Sec {stu.section})</span>
                  </div>

                  <div className="sgc-score-box">
                    <div className="sgc-score-labels">
                      <span className="lbl">Diagnostic Score:</span>
                      <strong className={`score-pct-tag ${pct >= 80 ? "score-high" : pct >= 50 ? "score-mid" : "score-low"}`}>
                        {pct}%
                      </strong>
                    </div>
                  </div>

                  <div className="sgc-contact">
                    <span className="c-item">✉️ {stu.email}</span>
                    <span className="c-item">📞 {stu.phone}</span>
                  </div>

                  <div className="sgc-footer">
                    <span className="l-stat">📚 {stu.lessonsCompleted}/{stu.totalLessons} Lessons Done</span>
                    <button
                      type="button"
                      className="btn-view-stu full-width"
                      onClick={() => handleOpenStudentModal(stu)}
                    >
                      View Student Profile ➔
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
          </>
        )}

        {/* ========================================================= */}
        {/* TAB 2: GOOGLE DRIVE STUDY NOTES & TARGETED RESOURCES      */}
        {/* ========================================================= */}
        {activePortalTab === "driveNotes" && (
          <section className="faculty-drive-notes-section">
            {/* Drive Notes Summary KPI Grid */}
            <div className="faculty-drive-kpi-grid">
              <div className="kpi-card">
                <div className="kpi-icon-row">
                  <span className="kpi-icon bg-indigo">📁</span>
                  <span className="kpi-chip">Google Drive</span>
                </div>
                <span className="kpi-value">{driveNotes.length}</span>
                <span className="kpi-label">Total Notes Published</span>
                <span className="kpi-footer">100% Stored & shared via Drive links</span>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-row">
                  <span className="kpi-icon bg-emerald">🔒</span>
                  <span className="kpi-chip">Student Specific</span>
                </div>
                <span className="kpi-value">
                  {driveNotes.filter((n) => n.targetScope === "specific_students").length}
                </span>
                <span className="kpi-label">Selective Individual Access</span>
                <span className="kpi-footer">Targeted to specific roll numbers only</span>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-row">
                  <span className="kpi-icon bg-amber">🎯</span>
                  <span className="kpi-chip">Track Specific</span>
                </div>
                <span className="kpi-value">
                  {driveNotes.filter((n) => n.targetScope === "category").length}
                </span>
                <span className="kpi-label">Targeted Learning Streams</span>
                <span className="kpi-footer">Bronze (Remedial), Silver, or Gold</span>
              </div>

              <div className="kpi-card">
                <div className="kpi-icon-row">
                  <span className="kpi-icon bg-blue">🏢</span>
                  <span className="kpi-chip">Branch Specific</span>
                </div>
                <span className="kpi-value">
                  {driveNotes.filter((n) => n.targetScope === "department").length}
                </span>
                <span className="kpi-label">Targeted by Department</span>
                <span className="kpi-footer">CSE, IT, AI & DS, or ECE branch</span>
              </div>
            </div>

            {/* Drive Notes Filter & Search Toolbar */}
            <div className="faculty-drive-toolbar">
              <div className="fdt-search-wrap">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  className="toolbar-search-input"
                  placeholder="Search Drive notes by title, unit, instructor, student roll..."
                  value={noteSearchQuery}
                  onChange={(e) => setNoteSearchQuery(e.target.value)}
                />
                {noteSearchQuery && (
                  <button
                    type="button"
                    className="search-clear-btn"
                    onClick={() => setNoteSearchQuery("")}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="fdt-filters-wrap">
                <div className="filter-group">
                  <label htmlFor="drive-unit-filter" className="filter-label">Curriculum Unit:</label>
                  <select
                    id="drive-unit-filter"
                    className="filter-select"
                    value={noteUnitFilter}
                    onChange={(e) => setNoteUnitFilter(e.target.value)}
                  >
                    <option value="all">All Units (I to IV)</option>
                    <option value="unit1">Unit I: Vector Spaces</option>
                    <option value="unit2">Unit II: Linear Transformations</option>
                    <option value="unit3">Unit III: Inner Product Spaces</option>
                    <option value="unit4">Unit IV: Characteristic Roots</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="drive-scope-filter" className="filter-label">Target Audience:</label>
                  <select
                    id="drive-scope-filter"
                    className="filter-select"
                    value={noteScopeFilter}
                    onChange={(e) => setNoteScopeFilter(e.target.value)}
                  >
                    <option value="all">All Audiences</option>
                    <option value="all">🌐 All Enrolled Students</option>
                    <option value="department">🏢 By Department</option>
                    <option value="category">🎯 By Learning Track</option>
                    <option value="specific_students">🔒 Specified Students Only</option>
                  </select>
                </div>

                <button
                  type="button"
                  className="btn-create-note-primary"
                  onClick={() => handleOpenCreateNoteModal()}
                >
                  + Share New Notes via Drive
                </button>
              </div>
            </div>

            {/* Drive Notes Cards Grid */}
            {filteredDriveNotes.length === 0 ? (
              <div className="drive-notes-empty-card">
                <span className="dne-icon">📁</span>
                <h3>No Google Drive Notes Found</h3>
                <p>No study notes match your search criteria or filter scope. Clear the filters or publish a new study resource via Google Drive.</p>
                <div className="dne-actions">
                  <button
                    type="button"
                    className="btn-clear-filters"
                    onClick={() => {
                      setNoteSearchQuery("");
                      setNoteUnitFilter("all");
                      setNoteScopeFilter("all");
                    }}
                  >
                    Clear Filters
                  </button>
                  <button
                    type="button"
                    className="btn-create-note-primary"
                    onClick={() => handleOpenCreateNoteModal()}
                  >
                    + Share New Notes via Drive
                  </button>
                </div>
              </div>
            ) : (
              <div className="drive-notes-grid">
                {filteredDriveNotes.map((note) => {
                  const formatIcon =
                    note.fileType === "pdf" ? "📄" :
                    note.fileType === "slides" ? "📊" :
                    note.fileType === "folder" ? "📁" :
                    note.fileType === "doc" ? "📝" :
                    note.fileType === "sheet" ? "📈" : "🎥";

                  return (
                    <div key={note.id} className="drive-note-card">
                      {/* Card Header Badges */}
                      <div className="dnc-header">
                        <div className="dnc-type-badge">
                          <span>{formatIcon}</span>
                          <span className="dnc-format-text">{note.fileType?.toUpperCase()}</span>
                        </div>
                        <span className="dnc-unit-pill">{note.unitName}</span>
                      </div>

                      {/* Scope Badge */}
                      <div className="dnc-scope-row">
                        {note.targetScope === "all" && (
                          <span className="scope-pill scope-all">🌐 All Enrolled Students</span>
                        )}
                        {note.targetScope === "department" && (
                          <span className="scope-pill scope-dept">🏢 Dept: {note.targetDept} Only</span>
                        )}
                        {note.targetScope === "category" && (
                          <span className="scope-pill scope-cat">
                            🎯 Track: {note.targetCategory === "category1" ? "Bronze (Foundational)" : note.targetCategory === "category3" ? "Gold (Advanced)" : "Silver (Core)"}
                          </span>
                        )}
                        {note.targetScope === "specific_students" && (
                          <span className="scope-pill scope-selective">
                            🔒 Selective: {note.targetStudentRolls?.length || 0} Specified Student(s)
                          </span>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h3 className="dnc-title">{note.title}</h3>
                      <p className="dnc-desc">{note.description}</p>

                      {/* Faculty Guidance Instructions */}
                      {note.instructions && (
                        <div className="dnc-instructions">
                          <span className="di-icon">📌</span>
                          <div className="di-text">
                            <strong>Faculty Guidance:</strong> {note.instructions}
                          </div>
                        </div>
                      )}

                      {/* Target Students Preview if specific */}
                      {note.targetScope === "specific_students" && Array.isArray(note.targetStudentRolls) && note.targetStudentRolls.length > 0 && (
                        <div className="dnc-targeted-students-box">
                          <span className="dts-label">Specified Students ({note.targetStudentRolls.length}):</span>
                          <div className="dts-chips-row">
                            {note.targetStudentRolls.map((r) => {
                              const sObj = students.find((s) => s.rollNo === r);
                              return (
                                <span key={r} className="dts-chip" title={sObj ? `${sObj.name} (${sObj.department})` : r}>
                                  👤 {r} {sObj ? `• ${sObj.name.split(" ")[0]}` : ""}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Google Drive Link Action */}
                      <div className="dnc-drive-action-strip">
                        <a
                          href={note.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="dnc-drive-btn"
                          title="Open this file or folder directly in Google Drive"
                        >
                          <span className="ddb-icon">📁</span>
                          <span className="ddb-txt">Open in Google Drive</span>
                          <span className="ddb-arrow">↗</span>
                        </a>
                      </div>

                      {/* Card Footer */}
                      <div className="dnc-footer">
                        <div className="dnc-author-meta">
                          <span className="dnc-author">👨‍🏫 {note.facultyName}</span>
                          <span className="dnc-date">📅 {note.dateFormatted}</span>
                        </div>
                        <div className="dnc-card-actions">
                          <button
                            type="button"
                            className="dnc-btn-edit"
                            onClick={() => handleOpenEditNoteModal(note)}
                            title="Edit note details or student targeting"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            type="button"
                            className="dnc-btn-delete"
                            onClick={() => handleDeleteDriveNote(note.id, note.title)}
                            title="Delete this note"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>

      {/* ========================================================= */}
      {/* DEEP-DIVE STUDENT PROFILE & PERFORMANCE MODAL             */}
      {/* ========================================================= */}
      {selectedStudent && (
        <div
          className="faculty-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedStudent(null);
          }}
        >
          <div className="student-profile-modal">
            {/* Modal Header */}
            <div className="spm-header">
              <div className="spm-avatar-cluster">
                <div className="spm-avatar">
                  {selectedStudent.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <div>
                  <h3 className="spm-name">{selectedStudent.name}</h3>
                  <div className="spm-pills-row">
                    <span className="stu-roll-badge">{selectedStudent.rollNo}</span>
                    <span className="stu-dept-pill">{selectedStudent.department} (Section {selectedStudent.section})</span>
                    <span className="stu-year-txt">{selectedStudent.year}</span>
                    <span className={`category-tag-pill ${selectedStudent.categoryBadge}`}>
                      {selectedStudent.categoryLabel}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="spm-close-btn"
                onClick={() => setSelectedStudent(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="spm-body">
              {/* Contact and Overview Strip */}
              <div className="spm-info-strip">
                <div className="spm-info-item">
                  <span className="spm-lbl">Institutional Email</span>
                  <span className="spm-val">{selectedStudent.email}</span>
                </div>
                <div className="spm-info-item">
                  <span className="spm-lbl">Mobile Number</span>
                  <span className="spm-val">{selectedStudent.phone}</span>
                </div>
                <div className="spm-info-item">
                  <span className="spm-lbl">Curriculum Progress</span>
                  <span className="spm-val text-blue">{selectedStudent.lessonsCompleted} of {selectedStudent.totalLessons} Lessons Done</span>
                </div>
              </div>

              {/* Assessment Performance Section */}
              <div className="spm-section">
                <h4 className="spm-sec-heading">
                  📊 Linear Algebra (MA25C02) Diagnostic Assessment Breakdown
                </h4>

                <div className="spm-score-banner">
                  <div className="spm-score-big">
                    <span className="num">{selectedStudent.score}</span>
                    <span className="den">/ {selectedStudent.maxScore || 30} Marks</span>
                  </div>
                  <div className="spm-score-details">
                    <span className="spm-pct">{Math.round((selectedStudent.score / (selectedStudent.maxScore || 30)) * 100)}% Overall Proficiency</span>
                    <p className="spm-score-desc">
                      Placed in <strong>{selectedStudent.categoryLabel}</strong> based on mathematical competency across the 4 syllabus units.
                    </p>
                  </div>
                </div>

                {/* 4 Domains Breakdown */}
                <div className="spm-domains-grid">
                  {Object.entries(selectedStudent.domainScores).map(([key, dom]) => {
                    const domPct = Math.round((dom.score / dom.total) * 100);
                    return (
                      <div key={key} className="spm-domain-card">
                        <div className="spm-dom-top">
                          <span className="dom-name">{dom.name}</span>
                          <span className="dom-score">{dom.score} / {dom.total} Marks</span>
                        </div>
                        <div className="mini-score-bar">
                          <div
                            className={`mini-fill ${domPct >= 80 ? "fill-green" : domPct >= 50 ? "fill-blue" : "fill-amber"}`}
                            style={{ width: `${domPct}%` }}
                          ></div>
                        </div>
                        <span className="dom-status">
                          {domPct >= 80 ? "✓ Mastered" : domPct >= 60 ? "⚡ Proficient" : "⚠️ Needs Review"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Assigned Curriculum Pathway */}
              <div className="spm-section">
                <h4 className="spm-sec-heading">
                  📚 Assigned Curriculum Pathway
                </h4>
                <div className="spm-pathway-box">
                  <p>
                    {selectedStudent.category === "category1" || selectedStudent.category === "bronze"
                      ? "🥉 Bronze Pathway (Score ≤ 39%): Assigned to Foundational Remediation Module focusing on Matrix Algebra & Echelon Basics (LA-F101 to LA-F104) to reinforce fundamental row reduction techniques."
                      : selectedStudent.category === "category2" || selectedStudent.category === "silver"
                      ? "🥈 Silver Pathway (Score 40% – 79%): Assigned to Core Engineering Module focusing on Solvability & Spectral Theory (LA-C201 to LA-C204) to solve standard university question papers."
                      : "🥇 Gold Pathway (Score ≥ 80%): Assigned to Advanced Scholars Module focusing on Advanced Transformations, SVD & Diagonalization (LA-A301 to LA-A304) for honors research readiness."}
                  </p>
                </div>
              </div>

              {/* Micro-Topic Assessment Performance & Unlock Controls */}
              <div className="spm-section">
                <h4 className="spm-sec-heading">
                  ⚡ Micro-Topic Assessment Status & Unlock Controls
                </h4>
                <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "14px" }}>
                  <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "10px" }}>
                    Qualifying Criterion: <strong>Score Above 6 Marks (&gt; 6 / 10)</strong> • Maximum Allowed: <strong>3 Attempts</strong>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {Object.keys(microScores).length > 0 ? (
                      Object.entries(microScores).map(([tCode, tData]) => {
                        const isLocked = !tData.qualified && (tData.isLocked || tData.attemptsCount >= 3);
                        return (
                          <div
                            key={tCode}
                            style={{
                              background: isLocked ? "#fef2f2" : tData.qualified ? "#ecfdf5" : "#ffffff",
                              border: `1px solid ${isLocked ? "#fca5a5" : tData.qualified ? "#a7f3d0" : "#cbd5e1"}`,
                              borderRadius: "8px",
                              padding: "10px 14px",
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              flexWrap: "wrap",
                              gap: "8px"
                            }}
                          >
                            <div>
                              <strong style={{ color: "#0f172a" }}>Section {tCode}: {tData.topicName || tCode}</strong>
                              <div style={{ fontSize: "12px", color: isLocked ? "#991b1b" : tData.qualified ? "#065f46" : "#64748b", marginTop: "2px" }}>
                                Score: <strong>{tData.score}/10 Marks</strong> • Attempt {tData.attemptsCount || 1} of 3 • {tData.qualified ? "🎉 Qualified (> 6 Marks)" : isLocked ? "⛔ Locked (3 Attempts Failed)" : "⚠️ In Progress (Not Yet Qualified)"}
                              </div>
                            </div>

                            {isLocked && (
                              <button
                                type="button"
                                style={{
                                  background: "#dc2626",
                                  color: "#ffffff",
                                  border: "none",
                                  padding: "6px 14px",
                                  borderRadius: "6px",
                                  fontSize: "12px",
                                  fontWeight: "700",
                                  cursor: "pointer"
                                }}
                                onClick={() => {
                                  unlockStudentMicroTest(tCode, selectedStudent?.rollNo);
                                  setMicroScores(getStoredMicroTestScores());
                                  setUnlockRequests(getFacultyUnlockRequests());
                                  alert(`Section ${tCode} test unlocked for ${selectedStudent?.name || "Student"}! Student can now re-test.`);
                                }}
                              >
                                🔓 Unlock Test & Reset Attempts
                              </button>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div style={{ fontSize: "13px", color: "#94a3b8", padding: "8px 0" }}>
                        No micro-topic assessment sessions recorded yet.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Targeted Google Drive Notes for this Student */}
              <div className="spm-section spm-drive-notes-section">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap", gap: "8px" }}>
                  <div>
                    <h4 className="spm-sec-heading" style={{ margin: 0 }}>
                      📁 Google Drive Notes Allocated to {selectedStudent.name}
                    </h4>
                    <span style={{ fontSize: "12px", color: "#64748b" }}>
                      Drive study resources accessible to this student based on track, department, or individual targeting
                    </span>
                  </div>
                  <button
                    type="button"
                    style={{
                      background: "linear-gradient(135deg, #4f46e5, #6366f1)",
                      color: "#ffffff",
                      border: "none",
                      padding: "7px 14px",
                      borderRadius: "7px",
                      fontSize: "12px",
                      fontWeight: "700",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                    onClick={() => {
                      handleOpenCreateNoteModal(selectedStudent.rollNo);
                    }}
                  >
                    <span>+ Provide Direct Drive Note</span>
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {(() => {
                    const studentNotes = getNotesForStudent(selectedStudent);
                    if (studentNotes.length === 0) {
                      return (
                        <div style={{ background: "#f8fafc", border: "1px dashed #cbd5e1", borderRadius: "8px", padding: "16px", textAlign: "center", color: "#64748b", fontSize: "13px" }}>
                          No specific Drive notes currently allocated to {selectedStudent.name}.
                          <div style={{ marginTop: "8px" }}>
                            <button
                              type="button"
                              style={{ background: "transparent", color: "#4f46e5", border: "none", fontWeight: "700", cursor: "pointer", textDecoration: "underline" }}
                              onClick={() => handleOpenCreateNoteModal(selectedStudent.rollNo)}
                            >
                              Share a tailored Google Drive note for this student now →
                            </button>
                          </div>
                        </div>
                      );
                    }
                    return studentNotes.map((sn) => (
                      <div
                        key={sn.id}
                        style={{
                          background: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "8px",
                          padding: "10px 14px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "12px",
                          flexWrap: "wrap"
                        }}
                      >
                        <div style={{ flex: 1, minWidth: "200px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "16px" }}>
                              {sn.fileType === "pdf" ? "📄" : sn.fileType === "slides" ? "📊" : sn.fileType === "folder" ? "📁" : "📝"}
                            </span>
                            <strong style={{ color: "#0f172a", fontSize: "13.5px" }}>{sn.title}</strong>
                          </div>
                          <div style={{ fontSize: "12px", color: "#64748b", marginTop: "3px" }}>
                            <span style={{ fontWeight: "600", color: "#4f46e5" }}>{sn.unitName}</span> • 
                            <span style={{ marginLeft: "4px" }}>
                              {sn.targetScope === "specific_students" ? "🔒 Targeted Exclusively to this Student" : sn.targetScope === "category" ? `🎯 Track: ${sn.targetCategory}` : sn.targetScope === "department" ? `🏢 Dept: ${sn.targetDept}` : "🌐 All Enrolled Students"}
                            </span> • 
                            <span style={{ marginLeft: "4px" }}>Author: {sn.facultyName}</span>
                          </div>
                          {sn.instructions && (
                            <div style={{ fontSize: "12px", color: "#4338ca", background: "#eef2ff", padding: "4px 8px", borderRadius: "4px", marginTop: "5px" }}>
                              📌 <strong>Guidance:</strong> {sn.instructions}
                            </div>
                          )}
                        </div>

                        <div>
                          <a
                            href={sn.driveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              background: "#0284c7",
                              color: "#ffffff",
                              padding: "6px 14px",
                              borderRadius: "6px",
                              fontSize: "12px",
                              fontWeight: "700",
                              textDecoration: "none",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px"
                            }}
                          >
                            <span>Open Drive</span> ↗
                          </a>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="spm-footer">
              <button
                type="button"
                className="spm-btn-secondary"
                onClick={() => {
                  alert(`Diagnostic report card generated for ${selectedStudent.name} (${selectedStudent.rollNo}). Opening print view.`);
                  window.print();
                }}
              >
                🖨️ Print Student Report
              </button>
              <button
                type="button"
                className="spm-btn-primary"
                onClick={() => setSelectedStudent(null)}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* GOOGLE DRIVE STUDY NOTES PUBLISH / EDIT MODAL             */}
      {/* ========================================================= */}
      {isDriveModalOpen && (
        <div
          className="faculty-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDriveModalOpen(false);
          }}
        >
          <div className="faculty-drive-modal">
            <div className="fdm-header">
              <div className="fdm-title-group">
                <span className="fdm-icon">📁</span>
                <div>
                  <h3 className="fdm-title">
                    {editingNote ? "Edit Google Drive Study Notes" : "Provide Specified Study Notes via Google Drive"}
                  </h3>
                  <p className="fdm-subtitle">
                    Share course notes, handwritten solutions, and slides strictly via Google Drive URLs with specified students or streams.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="spm-close-btn"
                onClick={() => setIsDriveModalOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveDriveNote} className="fdm-form">
              {/* Row 1: Title */}
              <div className="fdm-field">
                <label className="fdm-label">
                  Study Notes Title <span className="req">*</span>
                </label>
                <input
                  type="text"
                  className="fdm-input"
                  placeholder="e.g., Unit I: Vector Spaces & Basis Verification - Handwritten Master Notes"
                  value={noteFormData.title}
                  onChange={(e) => setNoteFormData({ ...noteFormData, title: e.target.value })}
                  required
                />
              </div>

              {/* Row 2: Google Drive URL */}
              <div className="fdm-field">
                <label className="fdm-label">
                  Google Drive Shareable Link <span className="req">*</span>
                </label>
                <div className="fdm-drive-input-wrap">
                  <span className="drive-prefix-icon">📁</span>
                  <input
                    type="url"
                    className="fdm-input drive-link-input"
                    placeholder="https://drive.google.com/file/d/... or /folders/..."
                    value={noteFormData.driveUrl}
                    onChange={(e) => setNoteFormData({ ...noteFormData, driveUrl: e.target.value })}
                    required
                  />
                  {noteFormData.driveUrl && (
                    <a
                      href={noteFormData.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fdm-test-link-btn"
                      title="Test open this link in new tab"
                    >
                      Test Link ↗
                    </a>
                  )}
                </div>
                <span className="fdm-hint">
                  ℹ️ Only Google Drive links are supported. Make sure share permissions are configured to allow student viewing.
                </span>
              </div>

              {/* Row 3: Unit & File Type */}
              <div className="fdm-row-2">
                <div className="fdm-field">
                  <label className="fdm-label">Curriculum Unit <span className="req">*</span></label>
                  <select
                    className="fdm-select"
                    value={noteFormData.unitId}
                    onChange={(e) => setNoteFormData({ ...noteFormData, unitId: e.target.value })}
                  >
                    <option value="unit1">Unit I: Vector Spaces</option>
                    <option value="unit2">Unit II: Linear Transformations & Diagonalization</option>
                    <option value="unit3">Unit III: Inner Product Spaces</option>
                    <option value="unit4">Unit IV: Characteristic Roots & Quadratic Forms</option>
                  </select>
                </div>

                <div className="fdm-field">
                  <label className="fdm-label">Resource Format</label>
                  <select
                    className="fdm-select"
                    value={noteFormData.fileType}
                    onChange={(e) => setNoteFormData({ ...noteFormData, fileType: e.target.value })}
                  >
                    <option value="pdf">PDF Document 📄</option>
                    <option value="slides">Presentation / Slides 📊</option>
                    <option value="folder">Google Drive Folder 📁</option>
                    <option value="doc">Word / Docs Worksheet 📝</option>
                    <option value="sheet">Spreadsheet / Numerical Data 📈</option>
                    <option value="video">Recorded Video Lecture 🎥</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Target Audience Scope Selector (The Core Requirement) */}
              <div className="fdm-field fdm-target-scope-field">
                <label className="fdm-label">
                  Target Audience & Access Scope <span className="req">*</span>
                  <span className="fdm-label-tag">Control who receives these notes</span>
                </label>

                <div className="fdm-scope-options-grid">
                  <label className={`fdm-scope-option ${noteFormData.targetScope === "all" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="targetScope"
                      value="all"
                      checked={noteFormData.targetScope === "all"}
                      onChange={() => setNoteFormData({ ...noteFormData, targetScope: "all" })}
                    />
                    <div className="fso-content">
                      <span className="fso-icon">🌐</span>
                      <strong>All Enrolled Students</strong>
                      <small>Broadcast to all enrolled students</small>
                    </div>
                  </label>

                  <label className={`fdm-scope-option ${noteFormData.targetScope === "department" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="targetScope"
                      value="department"
                      checked={noteFormData.targetScope === "department"}
                      onChange={() => setNoteFormData({ ...noteFormData, targetScope: "department" })}
                    />
                    <div className="fso-content">
                      <span className="fso-icon">🏢</span>
                      <strong>By Department</strong>
                      <small>Visible to selected branch only</small>
                    </div>
                  </label>

                  <label className={`fdm-scope-option ${noteFormData.targetScope === "category" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="targetScope"
                      value="category"
                      checked={noteFormData.targetScope === "category"}
                      onChange={() => setNoteFormData({ ...noteFormData, targetScope: "category" })}
                    />
                    <div className="fso-content">
                      <span className="fso-icon">🎯</span>
                      <strong>By Learning Track</strong>
                      <small>Bronze, Silver, or Gold track</small>
                    </div>
                  </label>

                  <label className={`fdm-scope-option ${noteFormData.targetScope === "specific_students" ? "selected" : ""}`}>
                    <input
                      type="radio"
                      name="targetScope"
                      value="specific_students"
                      checked={noteFormData.targetScope === "specific_students"}
                      onChange={() => setNoteFormData({ ...noteFormData, targetScope: "specific_students" })}
                    />
                    <div className="fso-content">
                      <span className="fso-icon">🔒</span>
                      <strong>Specified Students Only</strong>
                      <small>Direct access for selected individuals</small>
                    </div>
                  </label>
                </div>

                {/* Department Dropdown if targetScope === 'department' */}
                {noteFormData.targetScope === "department" && (
                  <div className="fdm-subscope-box">
                    <label className="fdm-sub-label">Select Engineering Branch:</label>
                    <select
                      className="fdm-select"
                      value={noteFormData.targetDept}
                      onChange={(e) => setNoteFormData({ ...noteFormData, targetDept: e.target.value })}
                    >
                      <option value="CSE">CSE • Computer Science & Engineering</option>
                      <option value="IT">IT • Information Technology</option>
                      <option value="AI & DS">AI & DS • Artificial Intelligence & Data Science</option>
                      <option value="ECE">ECE • Electronics & Communication Engineering</option>
                    </select>
                  </div>
                )}

                {/* Category Dropdown if targetScope === 'category' */}
                {noteFormData.targetScope === "category" && (
                  <div className="fdm-subscope-box">
                    <label className="fdm-sub-label">Select Learning Stream / Track:</label>
                    <select
                      className="fdm-select"
                      value={noteFormData.targetCategory}
                      onChange={(e) => setNoteFormData({ ...noteFormData, targetCategory: e.target.value })}
                    >
                      <option value="category1">Bronze Track: Category 1 (Foundational Remedial Support)</option>
                      <option value="category2">Silver Track: Category 2 (Core Engineering Curriculum)</option>
                      <option value="category3">Gold Track: Category 3 (Advanced Scholars & Honors Proofs)</option>
                    </select>
                  </div>
                )}

                {/* Specific Student Interactive Picker if targetScope === 'specific_students' */}
                {noteFormData.targetScope === "specific_students" && (
                  <div className="fdm-student-picker-card">
                    <div className="fsp-header">
                      <div>
                        <strong style={{ fontSize: "13px", color: "var(--fac-text-main)" }}>
                          Select Specified Students from Cohort Roster:
                        </strong>
                        <span className="fsp-counter">
                          {noteFormData.targetStudentRolls.length} student(s) selected
                        </span>
                      </div>
                      <div className="fsp-actions">
                        <button
                          type="button"
                          className="fsp-btn-text"
                          onClick={() => {
                            const allRolls = students.map((s) => s.rollNo);
                            setNoteFormData({ ...noteFormData, targetStudentRolls: allRolls });
                          }}
                        >
                          Select All ({students.length})
                        </button>
                        <button
                          type="button"
                          className="fsp-btn-text"
                          onClick={() => {
                            setNoteFormData({ ...noteFormData, targetStudentRolls: [] });
                          }}
                        >
                          Clear Selection
                        </button>
                      </div>
                    </div>

                    <div className="fsp-search-bar">
                      <span className="fsp-search-icon">🔍</span>
                      <input
                        type="text"
                        className="fsp-search-input"
                        placeholder="Filter students by name, roll number, department..."
                        value={modalStudentSearch}
                        onChange={(e) => setModalStudentSearch(e.target.value)}
                      />
                    </div>

                    <div className="fsp-students-checklist">
                      {students
                        .filter((s) => {
                          const sq = modalStudentSearch.toLowerCase().trim();
                          return (
                            !sq ||
                            s.name.toLowerCase().includes(sq) ||
                            s.rollNo.toLowerCase().includes(sq) ||
                            s.department.toLowerCase().includes(sq)
                          );
                        })
                        .map((s) => {
                          const isSelected = noteFormData.targetStudentRolls.includes(s.rollNo);
                          return (
                            <label
                              key={s.id}
                              className={`fsp-student-row ${isSelected ? "checked" : ""}`}
                            >
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleTargetStudent(s.rollNo)}
                              />
                              <span className="fsp-roll">{s.rollNo}</span>
                              <span className="fsp-name">{s.name}</span>
                              <span className="fsp-dept">{s.department}</span>
                              <span className={`fsp-cat-badge ${s.categoryBadge}`}>
                                {s.category === "category1" ? "🥉 Bronze" : s.category === "category3" ? "🥇 Gold" : "🥈 Silver"}
                              </span>
                            </label>
                          );
                        })}
                    </div>
                  </div>
                )}
              </div>

              {/* Row 5: Description / Overview */}
              <div className="fdm-field">
                <label className="fdm-label">Summary / Notes Abstract</label>
                <textarea
                  className="fdm-textarea"
                  rows={2}
                  placeholder="Briefly describe what topics, theorems, or problem solutions this Drive note covers..."
                  value={noteFormData.description}
                  onChange={(e) => setNoteFormData({ ...noteFormData, description: e.target.value })}
                />
              </div>

              {/* Row 6: Faculty Instructions */}
              <div className="fdm-field">
                <label className="fdm-label">Faculty Guidance & Instructions for Students</label>
                <textarea
                  className="fdm-textarea"
                  rows={2}
                  placeholder="e.g., Mandatory reading before next unit test. Review worked examples on pages 8-10..."
                  value={noteFormData.instructions}
                  onChange={(e) => setNoteFormData({ ...noteFormData, instructions: e.target.value })}
                />
              </div>

              {/* Modal Footer */}
              <div className="fdm-footer">
                <button
                  type="button"
                  className="fdm-btn-cancel"
                  onClick={() => setIsDriveModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="fdm-btn-submit"
                >
                  {editingNote ? "✓ Update Google Drive Notes" : "🚀 Publish Specified Drive Notes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Faculty;
