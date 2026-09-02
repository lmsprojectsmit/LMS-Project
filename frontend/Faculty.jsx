import { useState, useMemo } from "react";
import "./Faculty.css";

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

function Faculty({ onNavigate, registeredStudent }) {
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
          phone: registeredStudent.mobile || "+91 98000 00000",
          department: registeredStudent.department || "CSE",
          year: "I Year (Sem II)",
          section: registeredStudent.section || "A",
          attendance: 95,
          hasTakenAssessment: false,
          score: 15, // default or assessed
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
          lessonsCompleted: 2,
          totalLessons: 4,
          remarks: "Newly enrolled via student registration portal.",
        };
        list = [newStu, ...list];
      }
    }
    return list;
  });

  // Search, Filter & Sort States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [selectedDeptFilter, setSelectedDeptFilter] = useState("all");
  const [sortBy, setSortBy] = useState("score-desc");
  const [viewMode, setViewMode] = useState("table"); // "table" | "grid"

  // Selected Student Profile Modal
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentNotes, setStudentNotes] = useState("");
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  // Compute Class KPIs
  const totalCount = students.length;
  const assessedCount = students.filter((s) => s.hasTakenAssessment).length;
  const avgScore = totalCount > 0
    ? (students.reduce((sum, s) => sum + s.score, 0) / totalCount).toFixed(1)
    : 0;
  const avgPct = Math.round((avgScore / 20) * 100);

  const cat1Count = students.filter((s) => s.category === "category1").length;
  const cat2Count = students.filter((s) => s.category === "category2").length;
  const cat3Count = students.filter((s) => s.category === "category3").length;

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
    setStudentNotes(student.remarks || "");
    setIsNoteSaved(false);
  };

  const handleSaveNotes = () => {
    if (!selectedStudent) return;
    setStudents((prev) =>
      prev.map((s) =>
        s.id === selectedStudent.id ? { ...s, remarks: studentNotes } : s
      )
    );
    setIsNoteSaved(true);
    setTimeout(() => setIsNoteSaved(false), 2500);
  };

  const handleExportCSV = () => {
    const headers = "Roll No,Name,Department,Section,Email,Phone,Score (out of 20),Category,Attendance,Lessons Completed,Remarks\n";
    const rows = filteredStudents.map((s) =>
      `"${s.rollNo}","${s.name}","${s.department}","${s.section}","${s.email}","${s.phone}",${s.score},"${s.categoryLabel}",${s.attendance}%,"${s.lessonsCompleted}/${s.totalLessons}","${s.remarks.replace(/"/g, '""')}"`
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
            <h1 className="fac-nav-title">EduVerse LMS • Faculty Portal</h1>
            <p className="fac-nav-sub">Course Coordinator: Linear Algebra (MA25C02)</p>
          </div>
        </div>

        <div className="fac-nav-right">
          <div className="instructor-card">
            <span className="inst-avatar">🎓</span>
            <div className="inst-text">
              <span className="inst-name">Dr. K. Senthil Kumar, Ph.D.</span>
              <span className="inst-role">Professor & Course Head (Dept of Mathematics)</span>
            </div>
          </div>

          <div className="fac-nav-buttons">
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
              onClick={() => onNavigate && onNavigate("assessment")}
            >
              Preview Assessment
            </button>
            <button
              type="button"
              className="fac-btn-primary"
              onClick={() => onNavigate && onNavigate("register")}
            >
              + Student Registration
            </button>
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
              Comprehensive student records, 1-mark diagnostic test marks (20 Marks total), performance category distribution, and personalized lesson assignment statuses.
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

          {/* Card 3: Category 1 (Foundational) */}
          <div
            className={`kpi-card clickable ${selectedCategoryFilter === "category1" ? "active-kpi" : ""}`}
            onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === "category1" ? "all" : "category1")}
            title="Click to filter Category 1 students"
          >
            <div className="kpi-icon-row">
              <span className="kpi-icon bg-amber">🥉</span>
              <span className="kpi-chip bg-amber-chip">0 – 9 Marks</span>
            </div>
            <span className="kpi-value text-amber">{cat1Count}</span>
            <span className="kpi-label">Category 1: Foundational Track</span>
            <span className="kpi-footer">Requires remedial rows & 2×2 drills</span>
          </div>

          {/* Card 4: Category 2 (Core) */}
          <div
            className={`kpi-card clickable ${selectedCategoryFilter === "category2" ? "active-kpi" : ""}`}
            onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === "category2" ? "all" : "category2")}
            title="Click to filter Category 2 students"
          >
            <div className="kpi-icon-row">
              <span className="kpi-icon bg-blue">🥈</span>
              <span className="kpi-chip bg-blue-chip">10 – 15 Marks</span>
            </div>
            <span className="kpi-value text-blue">{cat2Count}</span>
            <span className="kpi-label">Category 2: Core Engineering</span>
            <span className="kpi-footer">Standard pace • University questions</span>
          </div>

          {/* Card 5: Category 3 (Advanced) */}
          <div
            className={`kpi-card clickable ${selectedCategoryFilter === "category3" ? "active-kpi" : ""}`}
            onClick={() => setSelectedCategoryFilter(selectedCategoryFilter === "category3" ? "all" : "category3")}
            title="Click to filter Category 3 students"
          >
            <div className="kpi-icon-row">
              <span className="kpi-icon bg-green">🥇</span>
              <span className="kpi-chip bg-green-chip">16 – 20 Marks</span>
            </div>
            <span className="kpi-value text-green">{cat3Count}</span>
            <span className="kpi-label">Category 3: Advanced Scholars</span>
            <span className="kpi-footer">Assigned SVD & Honors proofs</span>
          </div>
        </section>

        {/* Filter and Controls Toolbar */}
        <section className="faculty-toolbar-card">
          <div className="toolbar-search-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="toolbar-search-input"
              placeholder="Search by student name, roll number, department, or email..."
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
                <option value="category1">🥉 Category 1: Foundational (0-9 Marks) [{cat1Count}]</option>
                <option value="category2">🥈 Category 2: Core Engineering (10-15 Marks) [{cat2Count}]</option>
                <option value="category3">🥇 Category 3: Advanced Scholars (16-20 Marks) [{cat3Count}]</option>
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
                <option value="roll-asc">Roll Number</option>
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
                  <th>Roll No</th>
                  <th>Student Name & Info</th>
                  <th>Department & Sec</th>
                  <th>Contact Details</th>
                  <th>Diagnostic Score</th>
                  <th>Assigned Category</th>
                  <th>Curriculum Status</th>
                  <th>Attendance</th>
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
                          <div className="score-top-line">
                            <strong>{stu.score}</strong> / {stu.maxScore} marks
                            <span className="score-pct-pill">{pct}%</span>
                          </div>
                          <div className="mini-score-bar">
                            <div
                              className={`mini-fill ${pct >= 80 ? "fill-green" : pct >= 50 ? "fill-blue" : "fill-amber"}`}
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      {/* Assigned Category Badge */}
                      <td>
                        <span className={`category-tag-pill ${stu.categoryBadge}`}>
                          {stu.category === "category1" ? "🥉 Cat 1 (Foundational)" : stu.category === "category2" ? "🥈 Cat 2 (Core Engg)" : "🥇 Cat 3 (Advanced)"}
                        </span>
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

                      {/* Attendance */}
                      <td>
                        <span className={`att-pill ${stu.attendance >= 90 ? "att-good" : "att-warn"}`}>
                          {stu.attendance}%
                        </span>
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
                    <td colSpan="9" className="no-students-cell">
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
                      {stu.category === "category1" ? "🥉 Cat 1" : stu.category === "category2" ? "🥈 Cat 2" : "🥇 Cat 3"}
                    </span>
                  </div>

                  <div className="sgc-dept-row">
                    <span><strong>Dept:</strong> {stu.department} (Sec {stu.section})</span>
                    <span><strong>Att:</strong> {stu.attendance}%</span>
                  </div>

                  <div className="sgc-score-box">
                    <div className="sgc-score-labels">
                      <span className="lbl">Diagnostic Test:</span>
                      <strong>{stu.score} / 20 ({pct}%)</strong>
                    </div>
                    <div className="mini-score-bar">
                      <div
                        className={`mini-fill ${pct >= 80 ? "fill-green" : pct >= 50 ? "fill-blue" : "fill-amber"}`}
                        style={{ width: `${pct}%` }}
                      ></div>
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
                  <span className="spm-lbl">Attendance</span>
                  <span className="spm-val text-green">{selectedStudent.attendance}%</span>
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
                    <span className="den">/ 20 Marks</span>
                  </div>
                  <div className="spm-score-details">
                    <span className="spm-pct">{Math.round((selectedStudent.score / 20) * 100)}% Overall Proficiency</span>
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
                    {selectedStudent.category === "category1"
                      ? "Assigned to Foundational Remediation Module: Focusing on Matrix Algebra & Echelon Basics (LA-F101 to LA-F104) to reinforce fundamental row reduction techniques."
                      : selectedStudent.category === "category2"
                      ? "Assigned to Core Engineering Module: Focusing on Solvability & Spectral Theory (LA-C201 to LA-C204) to solve standard university question papers."
                      : "Assigned to Advanced Scholars Module: Focusing on Advanced Transformations, SVD & Diagonalization (LA-A301 to LA-A304) for honors research readiness."}
                  </p>
                </div>
              </div>

              {/* Faculty Intervention & Remarks Editor */}
              <div className="spm-section">
                <h4 className="spm-sec-heading">
                  ✍️ Faculty Remarks & Intervention Notes
                </h4>
                <textarea
                  className="spm-remarks-textarea"
                  rows="3"
                  value={studentNotes}
                  onChange={(e) => setStudentNotes(e.target.value)}
                  placeholder="Enter instructor notes, academic advice, or remedial session scheduling details for this student..."
                ></textarea>
                <div className="spm-remarks-actions">
                  {isNoteSaved && <span className="save-toast">✓ Notes saved successfully!</span>}
                  <button
                    type="button"
                    className="btn-save-note"
                    onClick={handleSaveNotes}
                  >
                    Save Faculty Notes
                  </button>
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
    </div>
  );
}

export default Faculty;
