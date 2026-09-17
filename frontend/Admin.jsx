import React, { useState } from "react";
import "./Admin.css";
import ThemeToggle from "./ThemeToggle";
import {
  getCustomUsers,
  getAdminMasterCredentials,
  saveAdminMasterCredentials,
} from "./authStorage";

// Baseline Faculty Roster
const INITIAL_FACULTY = [
  {
    id: "FAC-001",
    empId: "EMP-MTH-101",
    name: "Dr. K. Senthil Kumar",
    degree: "Ph.D. (Applied Mathematics)",
    email: "senthil.k@institution.edu",
    phone: "+91 94441 12345",
    department: "Mathematics",
    role: "faculty",
    designation: "Professor & Course Head",
    assignedCourses: ["MA25C02 (Linear Algebra)"],
    status: "Active",
    joinDate: "2016-06-15",
  },
  {
    id: "FAC-002",
    empId: "EMP-MTH-102",
    name: "Dr. V. Anitha",
    degree: "Ph.D. (Linear Analysis)",
    email: "anitha.v@institution.edu",
    phone: "+91 94442 23456",
    department: "Mathematics",
    role: "faculty",
    designation: "Associate Professor",
    assignedCourses: ["MA25C02 (Linear Algebra)"],
    status: "Active",
    joinDate: "2018-08-01",
  },
  {
    id: "FAC-003",
    empId: "EMP-CSE-201",
    name: "Prof. Rajesh Sharma",
    degree: "M.Tech., (Ph.D.)",
    email: "rajesh.s@institution.edu",
    phone: "+91 94443 34567",
    department: "Computer Science",
    role: "faculty",
    designation: "Assistant Professor (Sr. Gr.)",
    assignedCourses: ["MA25C02 (Linear Algebra - Section B)"],
    status: "Active",
    joinDate: "2020-01-10",
  },
  {
    id: "FAC-004",
    empId: "EMP-AI-301",
    name: "Dr. Meenakshi Sundaram",
    degree: "Ph.D. (Machine Learning & Optimization)",
    email: "meenakshi.s@institution.edu",
    phone: "+91 94444 45678",
    department: "AI & DS",
    role: "faculty",
    designation: "Professor & Head of Dept",
    assignedCourses: ["MA25C02 (Linear Algebra - AI Stream)"],
    status: "Active",
    joinDate: "2015-11-20",
  },
];

// Baseline Student Cohort (sync with Faculty roster)
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
    role: "student",
    status: "Active",
    attendance: 96,
    hasTakenAssessment: true,
    score: 18,
    maxScore: 20,
    category: "category3",
    categoryLabel: "Category 3: Advanced Scholars",
    joinDate: "2025-08-10",
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
    role: "student",
    status: "Active",
    attendance: 92,
    hasTakenAssessment: true,
    score: 14,
    maxScore: 20,
    category: "category2",
    categoryLabel: "Category 2: Core Engineering",
    joinDate: "2025-08-11",
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
    role: "student",
    status: "Active",
    attendance: 84,
    hasTakenAssessment: true,
    score: 7,
    maxScore: 20,
    category: "category1",
    categoryLabel: "Category 1: Foundational Track",
    joinDate: "2025-08-11",
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
    role: "student",
    status: "Active",
    attendance: 98,
    hasTakenAssessment: true,
    score: 19,
    maxScore: 20,
    category: "category3",
    categoryLabel: "Category 3: Advanced Scholars",
    joinDate: "2025-08-12",
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
    role: "student",
    status: "Active",
    attendance: 88,
    hasTakenAssessment: true,
    score: 11,
    maxScore: 20,
    category: "category2",
    categoryLabel: "Category 2: Core Engineering",
    joinDate: "2025-08-12",
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
    role: "student",
    status: "Active",
    attendance: 94,
    hasTakenAssessment: true,
    score: 16,
    maxScore: 20,
    category: "category3",
    categoryLabel: "Category 3: Advanced Scholars",
    joinDate: "2025-08-14",
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
    role: "student",
    status: "Active",
    attendance: 82,
    hasTakenAssessment: true,
    score: 8,
    maxScore: 20,
    category: "category1",
    categoryLabel: "Category 1: Foundational Track",
    joinDate: "2025-08-15",
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
    role: "student",
    status: "Active",
    attendance: 91,
    hasTakenAssessment: true,
    score: 13,
    maxScore: 20,
    category: "category2",
    categoryLabel: "Category 2: Core Engineering",
    joinDate: "2025-08-16",
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
    role: "student",
    status: "Active",
    attendance: 79,
    hasTakenAssessment: true,
    score: 6,
    maxScore: 20,
    category: "category1",
    categoryLabel: "Category 1: Foundational Track",
    joinDate: "2025-08-16",
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
    role: "student",
    status: "Active",
    attendance: 95,
    hasTakenAssessment: true,
    score: 17,
    maxScore: 20,
    category: "category3",
    categoryLabel: "Category 3: Advanced Scholars",
    joinDate: "2025-08-17",
  },
];

// Baseline Curriculum Data - MA25C02 Only
const INITIAL_COURSES = [
  {
    code: "MA25C02",
    name: "Linear Algebra & Computational Foundations",
    department: "Mathematics",
    credits: 4,
    coordinator: "Dr. K. Senthil Kumar",
    status: "Active",
    enrolledCount: 148,
    units: [
      { id: "U1", number: "Unit I", title: "Matrices & Gaussian Elimination", status: "Active", lessons: 8 },
      { id: "U2", number: "Unit II", title: "Determinants & Matrix Inverses", status: "Active", lessons: 6 },
      { id: "U3", number: "Unit III", title: "Vector Spaces & Subspaces", status: "Active", lessons: 10 },
      { id: "U4", number: "Unit IV", title: "Eigenvalues, Eigenvectors & Diagonalization", status: "Active", lessons: 8 },
      { id: "U5", number: "Unit V", title: "Orthogonality & Singular Value Decomposition (SVD)", status: "Active", lessons: 7 },
    ],
  },
];

// Baseline Announcements
const INITIAL_ANNOUNCEMENTS = [
  {
    id: "ANN-001",
    title: "Diagnostic Assessment Mandatory Window Closes on Friday",
    content: "All first-year engineering students enrolled in Linear Algebra (MA25C02) must complete the 25-minute diagnostic evaluation test to be assigned to their adaptive learning pathway.",
    audience: "All Students",
    target: "students",
    priority: "High",
    date: "2026-09-02",
    author: "System Administrator",
    active: true,
  },
  {
    id: "ANN-002",
    title: "Faculty Remedial Class Schedules Updated for Category 1",
    content: "Course coordinators are requested to verify their remedial session allocations for Unit II determinant revisions scheduled for Saturday morning.",
    audience: "Faculty Only",
    target: "faculty",
    priority: "Medium",
    date: "2026-09-01",
    author: "Academic Dean",
    active: true,
  },
  {
    id: "ANN-003",
    title: "Adaptive LMS System Maintenance Window (Sunday 02:00 AM - 04:00 AM)",
    content: "Routine database index optimization and cloud backup will be performed. Services may experience intermittent downtime.",
    audience: "Campus-wide",
    target: "all",
    priority: "Low",
    date: "2026-08-30",
    author: "IT Infrastructure Team",
    active: true,
  },
];

// Baseline Audit Logs
const INITIAL_LOGS = [
  { id: "LOG-101", action: "Diagnostic Assessment Submitted", user: "Jayashree Murali (25CS104)", detail: "Score: 17/20 • Assigned to Category 3: Advanced Scholars", time: "10 mins ago", type: "assessment" },
  { id: "LOG-102", action: "Faculty Remark Appended", user: "Dr. K. Senthil Kumar", detail: "Added remedial study recommendation for Chirag Venkatesh (25CS103)", time: "25 mins ago", type: "faculty" },
  { id: "LOG-103", action: "New Student Account Provisioned", user: "Portal Registrar", detail: "Registered Fathima Noor (25AI101) into AI & DS Section A", time: "1 hour ago", type: "user" },
  { id: "LOG-104", action: "Curriculum Unit Synchronized", user: "Dr. V. Anitha", detail: "Updated Unit III syllabus topics for MA25C02", time: "3 hours ago", type: "curriculum" },
  { id: "LOG-105", action: "System Backup Completed", user: "Automated Cron Daemon", detail: "Daily snapshot (14.2 MB) verified and encrypted to cloud vault", time: "6 hours ago", type: "system" },
];

function Admin({ onNavigate, onLogout, registeredStudent, theme, onToggleTheme }) {
  // Navigation Tabs: 'overview', 'curriculum', 'assessment', 'announcements', 'settings'
  const [activeTab, setActiveTab] = useState("overview");

  // Admin Master Credentials State
  const [adminCreds, setAdminCreds] = useState(() => getAdminMasterCredentials());
  const [editAdminForm, setEditAdminForm] = useState({
    username: adminCreds.username,
    password: adminCreds.password,
    email: adminCreds.email,
    fullName: adminCreds.fullName,
  });
  const [showAdminMasterPwd, setShowAdminMasterPwd] = useState(false);

  const [students, setStudents] = useState(() => {
    const enrichedInitial = INITIAL_STUDENTS.map((s) => ({
      ...s,
      username: s.username || s.email.split("@")[0],
      password: s.password || "student123",
    }));
    let list = [...enrichedInitial];

    const custom = getCustomUsers().filter((u) => u.role === "student" || u.userType === "student");
    custom.forEach((cs) => {
      if (!list.some((s) => s.id === cs.id || (cs.username && s.username === cs.username))) {
        list.unshift(cs);
      }
    });

    if (registeredStudent && registeredStudent.email) {
      const exists = list.some(
        (s) =>
          s.email.toLowerCase() === registeredStudent.email.toLowerCase() ||
          (registeredStudent.rollNo && s.rollNo.toLowerCase() === registeredStudent.rollNo.toLowerCase())
      );
      if (!exists) {
        list.unshift({
          id: `STU-NEW-${Date.now().toString().slice(-4)}`,
          rollNo: registeredStudent.rollNo || "25NEW001",
          name: registeredStudent.fullName || "Registered Student",
          username: registeredStudent.username || (registeredStudent.email ? registeredStudent.email.split("@")[0] : "newstudent"),
          password: registeredStudent.password || "student123",
          email: registeredStudent.email,
          phone: registeredStudent.phone || "+91 98000 00000",
          department: registeredStudent.department || "CSE",
          year: registeredStudent.year || "I Year (Sem II)",
          section: registeredStudent.section || "A",
          role: "student",
          status: "Active",
          attendance: 95,
          hasTakenAssessment: Boolean(registeredStudent.hasTakenAssessment),
          score: registeredStudent.score || 15,
          maxScore: 20,
          category: registeredStudent.category || "category2",
          categoryLabel: registeredStudent.categoryLabel || "Category 2: Core Engineering",
          joinDate: new Date().toISOString().slice(0, 10),
        });
      }
    }
    return list;
  });

  const [faculty, setFaculty] = useState(() => {
    const enrichedInitial = INITIAL_FACULTY.map((f) => ({
      ...f,
      username: f.username || f.email.split("@")[0],
      password: f.password || "faculty123",
    }));
    let list = [...enrichedInitial];
    const custom = getCustomUsers().filter((u) => u.role === "faculty" || u.userType === "faculty");
    custom.forEach((cf) => {
      if (!list.some((f) => f.id === cf.id || (cf.username && f.username === cf.username))) {
        list.unshift(cf);
      }
    });
    return list;
  });
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [announcements, setAnnouncements] = useState(INITIAL_ANNOUNCEMENTS);
  const [logs, setLogs] = useState(INITIAL_LOGS);

  // Modal States
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Announcement Form State
  const [newAnnouncementForm, setNewAnnouncementForm] = useState({
    title: "",
    content: "",
    target: "all",
    priority: "Medium",
  });

  // Assessment Governance Benchmark State
  const [assessmentConfig, setAssessmentConfig] = useState({
    timeLimitMins: 25,
    totalQuestions: 20,
    passingScore: 8,
    cat1Max: 9, // 0 - 9 -> Cat 1
    cat2Min: 10, // 10 - 15 -> Cat 2
    cat2Max: 15,
    cat3Min: 16, // 16 - 20 -> Cat 3
    randomizeOrder: true,
    showImmediateBreakdown: true,
    remedialMandatory: true,
  });

  // Show Toast
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Add Log Entry
  const addLog = (action, user, detail, type = "admin") => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      action,
      user,
      detail,
      time: "Just now",
      type,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  // Computed KPIs
  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const assessedStudents = students.filter((s) => s.hasTakenAssessment);
  const assessmentCompletionRate = totalStudents > 0 ? Math.round((assessedStudents.length / totalStudents) * 100) : 0;
  const classAvgScore =
    assessedStudents.length > 0
      ? (assessedStudents.reduce((acc, s) => acc + s.score, 0) / assessedStudents.length).toFixed(1)
      : 0;

  const cat1Count = students.filter((s) => s.category === "category1" || s.category === "bronze").length;
  const cat2Count = students.filter((s) => s.category === "category2" || s.category === "silver").length;
  const cat3Count = students.filter((s) => s.category === "category3" || s.category === "gold").length;

  // Save Master Admin Credentials
  const handleSaveAdminMasterCreds = (e) => {
    e.preventDefault();
    if (!editAdminForm.username || !editAdminForm.password) {
      alert("Admin username and password cannot be blank.");
      return;
    }
    const updated = saveAdminMasterCredentials(editAdminForm);
    setAdminCreds(updated);
    addLog("Master Admin Credentials Updated", "Admin Administrator", `Username: @${updated.username}`, "security");
    showToast(`Master Admin credentials updated! Username: @${updated.username}`);
  };

  // Add Announcement
  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncementForm.title || !newAnnouncementForm.content) {
      alert("Please enter title and content for the campus broadcast.");
      return;
    }
    const newAnn = {
      id: `ANN-${Date.now().toString().slice(-4)}`,
      title: newAnnouncementForm.title,
      content: newAnnouncementForm.content,
      audience:
        newAnnouncementForm.target === "all"
          ? "Campus-wide (All)"
          : newAnnouncementForm.target === "students"
          ? "Students Only"
          : "Faculty Only",
      target: newAnnouncementForm.target,
      priority: newAnnouncementForm.priority,
      date: new Date().toISOString().slice(0, 10),
      author: "Institutional Admin",
      active: true,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    addLog("Campus Broadcast Published", "Admin Administrator", `"${newAnn.title}" (${newAnn.priority})`, "announcement");
    setIsAnnouncementModalOpen(false);
    setNewAnnouncementForm({ title: "", content: "", target: "all", priority: "Medium" });
    showToast("Announcement broadcasted successfully!");
  };

  // Toggle Unit Active Status
  const handleToggleUnit = (courseCode, unitId) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.code !== courseCode) return c;
        return {
          ...c,
          units: c.units.map((u) =>
            u.id === unitId ? { ...u, status: u.status === "Active" ? "Draft" : "Active" } : u
          ),
        };
      })
    );
    showToast(`Updated unit availability for ${courseCode}.`);
  };

  // Save Assessment Config
  const handleSaveAssessmentConfig = (e) => {
    e.preventDefault();
    addLog("Assessment Governance Altered", "Admin Administrator", "Modified diagnostic scoring thresholds and timing parameters", "assessment");
    showToast("Assessment governance benchmarks saved successfully!");
  };

  // Backup Full LMS Data (JSON export)
  const handleExportFullJSON = () => {
    const backupData = {
      institution: "Adaptive Institute of Engineering & Technology",
      academicYear: "2025–2026",
      semester: "II (Even Semester)",
      exportTimestamp: new Date().toISOString(),
      students,
      faculty,
      courses,
      announcements,
      assessmentConfig,
      auditLogs: logs,
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Adaptive_LMS_FullBackup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("Full database backup exported as JSON.");
  };

  return (
    <div className="admin-portal-root">
      {/* Background Ambience */}
      <div className="admin-bg-decor" aria-hidden="true">
        <div className="admin-decor-circle c1" />
        <div className="admin-decor-circle c2" />
        <span className="admin-bg-symbol as1">Rank(A) + Nullity(A) = n</span>
        <span className="admin-bg-symbol as2">P⁻¹ A P = D</span>
        <span className="admin-bg-symbol as3">Admin • Regulation 2025</span>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="admin-toast-alert" role="alert">
          <span className="toast-icon">✨</span>
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation Bar */}
      <header className="admin-header">
        <div className="admin-header-left" onClick={() => onNavigate && onNavigate("home")}>
          <div className="admin-crest">🛡️</div>
          <div>
            <div className="admin-brand-line">
              <span className="admin-brand-title">Adaptive LMS</span>
              <span className="admin-badge-super">ADMIN CONSOLE</span>
            </div>
            <p className="admin-brand-sub">System Administration & Academic Governance</p>
          </div>
        </div>

        {/* Global Quick Switchers & User Capsule */}
        <div className="admin-header-right">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <div className="admin-switch-buttons">
            <button
              type="button"
              className="admin-switch-btn"
              onClick={() => onNavigate && onNavigate("home")}
              title="Return to Student Landing Page"
            >
              🌐 Home
            </button>
            <button
              type="button"
              className="admin-switch-btn"
              onClick={() => onNavigate && onNavigate("faculty")}
              title="Open Faculty Cohort Dashboard"
            >
              👨‍🏫 Faculty Portal
            </button>
            <button
              type="button"
              className="admin-switch-btn"
              onClick={() => onNavigate && onNavigate("syllabus")}
              title="Preview Student Syllabus View"
            >
              Syllabus
            </button>
          </div>

          <div className="admin-profile-pill">
            <span className="admin-avatar">⚡</span>
            <div className="admin-profile-info">
              <span className="admin-user-name">Dr. Arunkumar Natarajan</span>
              <span className="admin-user-role">Chief Academic Administrator</span>
            </div>
            <button
              type="button"
              className="admin-logout-btn"
              onClick={() => {
                if (onLogout) onLogout();
                else if (onNavigate) onNavigate("home");
              }}
              title="Logout from Admin Console"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Workspace with Sidebar and Content Area */}
      <div className="admin-body-layout">
        {/* Navigation Sidebar */}
        <aside className="admin-sidebar">
          <div className="admin-sidebar-header">
            <span className="ash-title">GOVERNANCE MODULES</span>
            <span className="ash-pill">Regulation 2025</span>
          </div>

          <nav className="admin-nav-menu">
            <button
              type="button"
              className={`admin-nav-item ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              <span className="ani-icon">📊</span>
              <span className="ani-label">Executive Overview</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === "curriculum" ? "active" : ""}`}
              onClick={() => setActiveTab("curriculum")}
            >
              <span className="ani-icon">📚</span>
              <span className="ani-label">Curriculum & Syllabus</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === "assessment" ? "active" : ""}`}
              onClick={() => setActiveTab("assessment")}
            >
              <span className="ani-icon">📝</span>
              <span className="ani-label">Diagnostic Governance</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === "announcements" ? "active" : ""}`}
              onClick={() => setActiveTab("announcements")}
            >
              <span className="ani-icon">📢</span>
              <span className="ani-label">Campus Announcements</span>
              <span className="ani-badge">{announcements.filter((a) => a.active).length}</span>
            </button>

            <button
              type="button"
              className={`admin-nav-item ${activeTab === "settings" ? "active" : ""}`}
              onClick={() => setActiveTab("settings")}
            >
              <span className="ani-icon">⚙️</span>
              <span className="ani-label">System & Backups</span>
            </button>
          </nav>

          {/* System Health Widget in Sidebar */}
          <div className="admin-sidebar-footer">
            <div className="system-health-card">
              <div className="sh-header">
                <span className="sh-status-dot" />
                <span className="sh-status-text">System Normal</span>
              </div>
              <p className="sh-detail">Vite Dev Engine • Port 5173</p>
              <div className="sh-metric-row">
                <span>Database Sync</span>
                <strong>100% OK</strong>
              </div>
              <div className="sh-metric-row">
                <span>Active Cohort</span>
                <strong>AY 2025–26</strong>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="admin-viewport">
          {/* ============================================================
              TAB 1: EXECUTIVE OVERVIEW
             ============================================================ */}
          {activeTab === "overview" && (
            <div className="admin-tab-content fade-in">
              {/* Top Banner */}
              <div className="admin-hero-card">
                <div className="ahc-text">
                  <div className="ahc-badges">
                    <span className="badge-purple">INSTITUTIONAL DASHBOARD</span>
                    <span className="badge-emerald">AY 2025–2026 • EVEN SEMESTER</span>
                    <span className="badge-cyan">● Real-time Telemetry</span>
                  </div>
                  <h2 className="ahc-title">Campus-Wide Academic Performance & Governance</h2>
                  <p className="ahc-desc">
                    Centralized management for Linear Algebra (MA25C02) adaptive learning streams, student diagnostic pathway assignments, faculty course coordinator rosters, and institution compliance.
                  </p>
                </div>
                <div className="ahc-quick-actions">
                  <button
                    type="button"
                    className="admin-btn-primary"
                    onClick={() => setActiveTab("curriculum")}
                  >
                    📚 Manage Curriculum
                  </button>
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={() => setIsAnnouncementModalOpen(true)}
                  >
                    📢 Broadcast Alert
                  </button>
                  <button
                    type="button"
                    className="admin-btn-outline"
                    onClick={handleExportFullJSON}
                  >
                    💾 Export Backup
                  </button>
                </div>
              </div>

              {/* 4 Key Stat Cards */}
              <div className="admin-kpi-grid">
                <div className="admin-kpi-card border-indigo">
                  <div className="kpi-top">
                    <span className="kpi-symbol bg-indigo-light">👥</span>
                    <span className="kpi-trend positive">+12% vs last term</span>
                  </div>
                  <div className="kpi-big-num">{totalStudents}</div>
                  <div className="kpi-title">Enrolled Students</div>
                  <p className="kpi-sub">Across CSE, IT, AI & DS, ECE branches</p>
                </div>

                <div className="admin-kpi-card border-emerald">
                  <div className="kpi-top">
                    <span className="kpi-symbol bg-emerald-light">👨‍🏫</span>
                    <span className="kpi-trend neutral">4 Departments</span>
                  </div>
                  <div className="kpi-big-num">{totalFaculty}</div>
                  <div className="kpi-title">Faculty Coordinators</div>
                  <p className="kpi-sub">Mathematics & Allied Engineering</p>
                </div>

                <div className="admin-kpi-card border-amber">
                  <div className="kpi-top">
                    <span className="kpi-symbol bg-amber-light">📝</span>
                    <span className="kpi-trend positive">{assessmentCompletionRate}% completed</span>
                  </div>
                  <div className="kpi-big-num">{classAvgScore} <span className="kpi-unit">/ 20</span></div>
                  <div className="kpi-title">Diagnostic Test Average</div>
                  <p className="kpi-sub">{assessedStudents.length} of {totalStudents} evaluated</p>
                </div>

                <div className="admin-kpi-card border-blue">
                  <div className="kpi-top">
                    <span className="kpi-symbol bg-blue-light">⚡</span>
                    <span className="kpi-trend positive">99.98% Uptime</span>
                  </div>
                  <div className="kpi-big-num">{courses.length} <span className="kpi-unit">Active</span></div>
                  <div className="kpi-title">Core Courses Configured</div>
                  <p className="kpi-sub">5 Curriculum Units Online (MA25C02)</p>
                </div>
              </div>

              {/* Adaptive Learning Stream Distribution Card */}
              <div className="admin-card-section pathway-section-card">
                <div className="acs-header">
                  <div className="acs-header-text">
                    <h3 className="acs-title">Adaptive Learning Pathway Distribution (MA25C02)</h3>
                    <p className="acs-sub">Automatic student segregation according to 1-mark diagnostic performance</p>
                  </div>
                  <button
                    type="button"
                    className="acs-link-btn"
                    onClick={() => setActiveTab("assessment")}
                  >
                    Adjust Thresholds →
                  </button>
                </div>

                <div className="pathway-distribution-bar" role="progressbar" aria-label="Pathway distribution">
                  <div
                    className="pdb-segment cat1"
                    style={{ width: `${(cat1Count / totalStudents) * 100}%` }}
                    title={`Bronze (≤ 39%): ${cat1Count} students`}
                  >
                    <span>{Math.round((cat1Count / totalStudents) * 100)}%</span>
                  </div>
                  <div
                    className="pdb-segment cat2"
                    style={{ width: `${(cat2Count / totalStudents) * 100}%` }}
                    title={`Silver (40%–79%): ${cat2Count} students`}
                  >
                    <span>{Math.round((cat2Count / totalStudents) * 100)}%</span>
                  </div>
                  <div
                    className="pdb-segment cat3"
                    style={{ width: `${(cat3Count / totalStudents) * 100}%` }}
                    title={`Gold (≥ 80%): ${cat3Count} students`}
                  >
                    <span>{Math.round((cat3Count / totalStudents) * 100)}%</span>
                  </div>
                </div>

                <div className="pathway-legend-grid">
                  <div className="plg-item plg-cat1">
                    <span className="plg-indicator cat1-dot" />
                    <div className="plg-content">
                      <div className="plg-title-row">
                        <strong className="plg-name">🥉 Bronze Category (Score ≤ 39%)</strong>
                        <span className="plg-pct-badge cat1-badge">{Math.round((cat1Count / totalStudents) * 100)}%</span>
                      </div>
                      <p className="plg-desc">
                        <span className="plg-count-txt">{cat1Count} Students</span> • Remedial foundation & core operations
                      </p>
                    </div>
                  </div>
                  <div className="plg-item plg-cat2">
                    <span className="plg-indicator cat2-dot" />
                    <div className="plg-content">
                      <div className="plg-title-row">
                        <strong className="plg-name">🥈 Silver Category (Score 40%–79%)</strong>
                        <span className="plg-pct-badge cat2-badge">{Math.round((cat2Count / totalStudents) * 100)}%</span>
                      </div>
                      <p className="plg-desc">
                        <span className="plg-count-txt">{cat2Count} Students</span> • Standard engineering pace & university papers
                      </p>
                    </div>
                  </div>
                  <div className="plg-item plg-cat3">
                    <span className="plg-indicator cat3-dot" />
                    <div className="plg-content">
                      <div className="plg-title-row">
                        <strong className="plg-name">🥇 Gold Category (Score ≥ 80%)</strong>
                        <span className="plg-pct-badge cat3-badge">{Math.round((cat3Count / totalStudents) * 100)}%</span>
                      </div>
                      <p className="plg-desc">
                        <span className="plg-count-txt">{cat3Count} Students</span> • Honors track, SVD & quadratic forms
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Two-Column: Recent Audit Stream & Active Announcements */}
              <div className="admin-two-col-grid">
                {/* Audit Stream */}
                <div className="admin-card-section">
                  <div className="acs-header">
                    <div>
                      <h3 className="acs-title">Institutional Activity & Audit Stream</h3>
                      <p className="acs-sub">Real-time system events, submissions, and security actions</p>
                    </div>
                    <span className="acs-pill">Live Telemetry</span>
                  </div>

                  <div className="audit-list">
                    {logs.map((log) => (
                      <div key={log.id} className="audit-item">
                        <div className={`audit-badge-icon badge-${log.type}`}>
                          {log.type === "assessment" && "📝"}
                          {log.type === "faculty" && "👨‍🏫"}
                          {log.type === "user" && "👤"}
                          {log.type === "curriculum" && "📚"}
                          {log.type === "system" && "⚙️"}
                          {log.type === "security" && "🔒"}
                          {log.type === "announcement" && "📢"}
                        </div>
                        <div className="audit-details">
                          <div className="audit-row-top">
                            <strong className="audit-action">{log.action}</strong>
                            <span className="audit-time">{log.time}</span>
                          </div>
                          <p className="audit-desc">{log.detail}</p>
                          <span className="audit-user">Triggered by: {log.user}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Campus Announcements Widget */}
                <div className="admin-card-section">
                  <div className="acs-header">
                    <div>
                      <h3 className="acs-title">Active Campus Broadcasts</h3>
                      <p className="acs-sub">Notices visible to students and faculty</p>
                    </div>
                    <button
                      type="button"
                      className="admin-btn-sm"
                      onClick={() => setIsAnnouncementModalOpen(true)}
                    >
                      + New
                    </button>
                  </div>

                  <div className="announcements-mini-list">
                    {announcements.map((ann) => (
                      <div key={ann.id} className="ann-mini-card">
                        <div className="ann-mini-top">
                          <span className={`ann-priority-tag tag-${ann.priority.toLowerCase()}`}>
                            {ann.priority} Priority
                          </span>
                          <span className="ann-target-tag">{ann.audience}</span>
                          <span className="ann-date">{ann.date}</span>
                        </div>
                        <h4 className="ann-mini-title">{ann.title}</h4>
                        <p className="ann-mini-content">{ann.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 3: CURRICULUM & SYLLABUS GOVERNANCE
             ============================================================ */}
          {activeTab === "curriculum" && (
            <div className="admin-tab-content fade-in">
              <div className="users-page-header">
                <div>
                  <h2 className="section-title">Academic Curriculum & Syllabus Management</h2>
                  <p className="section-desc">
                    Control course structures, unit modules, learning outcomes, credit distribution, and coordinator assignments.
                  </p>
                </div>
                <button
                  type="button"
                  className="admin-btn-primary"
                  onClick={() => alert("New Course Specification wizard will launch for Academic Regulation 2025.")}
                >
                  + Add New Course
                </button>
              </div>

              <div className="courses-grid">
                {courses.map((course) => (
                  <div key={course.code} className="course-card-admin">
                    <div className="cca-header">
                      <div>
                        <div className="cca-badges">
                          <span className="course-code-tag">{course.code}</span>
                          <span className="course-credit-tag">{course.credits} Credits</span>
                          <span className="course-dept-tag">{course.department}</span>
                        </div>
                        <h3 className="cca-title">{course.name}</h3>
                      </div>
                      <span className="cca-status-badge">{course.status}</span>
                    </div>

                    <div className="cca-meta-row">
                      <span><strong>Coordinator:</strong> {course.coordinator}</span>
                      <span><strong>Enrolled:</strong> {course.enrolledCount} Students</span>
                    </div>

                    <div className="cca-units-section">
                      <div className="cca-units-title">
                        <span>Unit Syllabus Modules</span>
                        <span className="units-count">{course.units.length} Modules</span>
                      </div>

                      <div className="cca-units-list">
                        {course.units.map((unit) => (
                          <div key={unit.id} className="unit-row-admin">
                            <div className="ura-left">
                              <span className="ura-number">{unit.number}</span>
                              <div className="ura-info">
                                <span className="ura-title">{unit.title}</span>
                                <span className="ura-lessons">{unit.lessons} Interactive Lessons</span>
                              </div>
                            </div>
                            <div className="ura-right">
                              <button
                                type="button"
                                className={`unit-toggle-btn ${unit.status === "Active" ? "active" : "draft"}`}
                                onClick={() => handleToggleUnit(course.code, unit.id)}
                              >
                                {unit.status === "Active" ? "Active" : "Draft"}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="cca-footer">
                      <button
                        type="button"
                        className="admin-btn-sm btn-secondary"
                        onClick={() => onNavigate && onNavigate("syllabus")}
                      >
                        Preview Student Syllabus ↗
                      </button>
                      <button
                        type="button"
                        className="admin-btn-sm btn-outline"
                        onClick={() => alert(`Opening Syllabus Editor for ${course.code}`)}
                      >
                        Edit Syllabus Content
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 4: DIAGNOSTIC & ASSESSMENT GOVERNANCE
             ============================================================ */}
          {activeTab === "assessment" && (
            <div className="admin-tab-content fade-in">
              <div className="users-page-header">
                <div>
                  <h2 className="section-title">Diagnostic Assessment & Benchmark Governance</h2>
                  <p className="section-desc">
                    Configure passing marks, score thresholds for automatic student categorization, time limits, and test behavioral rules.
                  </p>
                </div>
              </div>

              <div className="admin-assessment-layout">
                {/* Configuration Form */}
                <div className="admin-card-section">
                  <h3 className="acs-title">1-Mark Diagnostic Test Parameters (MA25C02)</h3>
                  <p className="acs-sub">Adjust global evaluation rules that drive student pathway allocations</p>

                  <form onSubmit={handleSaveAssessmentConfig} className="admin-form-styled">
                    <div className="form-row-2">
                      <div className="form-field">
                        <label className="field-label">Time Limit (Minutes)</label>
                        <input
                          type="number"
                          value={assessmentConfig.timeLimitMins}
                          onChange={(e) =>
                            setAssessmentConfig({ ...assessmentConfig, timeLimitMins: Number(e.target.value) })
                          }
                          min="10"
                          max="60"
                          className="admin-input"
                        />
                        <span className="field-hint">Default is 25 minutes for 20 questions</span>
                      </div>

                      <div className="form-field">
                        <label className="field-label">Total Questions Pool</label>
                        <input
                          type="number"
                          value={assessmentConfig.totalQuestions}
                          onChange={(e) =>
                            setAssessmentConfig({ ...assessmentConfig, totalQuestions: Number(e.target.value) })
                          }
                          min="10"
                          max="50"
                          className="admin-input"
                        />
                        <span className="field-hint">1 mark per diagnostic question</span>
                      </div>
                    </div>

                    <div className="benchmark-box">
                      <h4 className="benchmark-title">Automatic Category Allocation Cut-Offs</h4>
                      <p className="benchmark-sub">Determines whether a student enters Foundational, Core, or Advanced syllabus</p>

                      <div className="benchmark-row">
                        <span className="b-badge cat1">Category 1: Foundational</span>
                        <div className="b-inputs">
                          <span>0 to</span>
                          <input
                            type="number"
                            value={assessmentConfig.cat1Max}
                            onChange={(e) =>
                              setAssessmentConfig({ ...assessmentConfig, cat1Max: Number(e.target.value) })
                            }
                            className="admin-input-sm"
                          />
                          <span>Marks (&lt; 50%)</span>
                        </div>
                      </div>

                      <div className="benchmark-row">
                        <span className="b-badge cat2">Category 2: Core Engineering</span>
                        <div className="b-inputs">
                          <input
                            type="number"
                            value={assessmentConfig.cat2Min}
                            onChange={(e) =>
                              setAssessmentConfig({ ...assessmentConfig, cat2Min: Number(e.target.value) })
                            }
                            className="admin-input-sm"
                          />
                          <span>to</span>
                          <input
                            type="number"
                            value={assessmentConfig.cat2Max}
                            onChange={(e) =>
                              setAssessmentConfig({ ...assessmentConfig, cat2Max: Number(e.target.value) })
                            }
                            className="admin-input-sm"
                          />
                          <span>Marks (50% – 75%)</span>
                        </div>
                      </div>

                      <div className="benchmark-row">
                        <span className="b-badge cat3">Category 3: Advanced Scholars</span>
                        <div className="b-inputs">
                          <input
                            type="number"
                            value={assessmentConfig.cat3Min}
                            onChange={(e) =>
                              setAssessmentConfig({ ...assessmentConfig, cat3Min: Number(e.target.value) })
                            }
                            className="admin-input-sm"
                          />
                          <span>to {assessmentConfig.totalQuestions} Marks (&gt; 75%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="toggle-list">
                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={assessmentConfig.randomizeOrder}
                          onChange={(e) =>
                            setAssessmentConfig({ ...assessmentConfig, randomizeOrder: e.target.checked })
                          }
                        />
                        <span>Shuffle question sequence and options dynamically per student</span>
                      </label>

                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={assessmentConfig.showImmediateBreakdown}
                          onChange={(e) =>
                            setAssessmentConfig({ ...assessmentConfig, showImmediateBreakdown: e.target.checked })
                          }
                        />
                        <span>Show domain-wise scorecard immediately upon submission</span>
                      </label>

                      <label className="toggle-label">
                        <input
                          type="checkbox"
                          checked={assessmentConfig.remedialMandatory}
                          onChange={(e) =>
                            setAssessmentConfig({ ...assessmentConfig, remedialMandatory: e.target.checked })
                          }
                        />
                        <span>Lock Unit III & IV until Category 1 students complete remedial worksheets</span>
                      </label>
                    </div>

                    <button type="submit" className="admin-btn-primary mt-4">
                      💾 Save Assessment Benchmarks
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 4: CAMPUS ANNOUNCEMENTS
             ============================================================ */}
          {activeTab === "announcements" && (
            <div className="admin-tab-content fade-in">
              <div className="users-page-header">
                <div>
                  <h2 className="section-title">Campus Announcements & Push Broadcasts</h2>
                  <p className="section-desc">
                    Publish high-visibility updates, exam notices, and circulars directly to student and faculty portals.
                  </p>
                </div>
                <button
                  type="button"
                  className="admin-btn-primary"
                  onClick={() => setIsAnnouncementModalOpen(true)}
                >
                  + Broadcast New Notice
                </button>
              </div>

              <div className="announcements-full-list">
                {announcements.map((ann) => (
                  <div key={ann.id} className="ann-full-card">
                    <div className="afc-header">
                      <div className="afc-title-group">
                        <span className={`ann-priority-tag tag-${ann.priority.toLowerCase()}`}>
                          {ann.priority} Priority
                        </span>
                        <span className="ann-target-tag">{ann.audience}</span>
                        <span className="ann-date">📅 {ann.date}</span>
                      </div>
                      <button
                        type="button"
                        className="btn-delete-ann"
                        onClick={() => {
                          setAnnouncements((prev) => prev.filter((a) => a.id !== ann.id));
                          showToast("Announcement deleted.");
                        }}
                        title="Delete Announcement"
                      >
                        🗑️
                      </button>
                    </div>
                    <h3 className="afc-title">{ann.title}</h3>
                    <p className="afc-body">{ann.content}</p>
                    <div className="afc-footer">
                      <span className="afc-author">Author: {ann.author}</span>
                      <span className="afc-status">Status: {ann.active ? "● Live on Portals" : "Archived"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 5: SYSTEM SETTINGS & DATA BACKUPS
             ============================================================ */}
          {activeTab === "settings" && (
            <div className="admin-tab-content fade-in">
              <div className="users-page-header">
                <div>
                  <h2 className="section-title">System Settings & Data Integrity</h2>
                  <p className="section-desc">
                    LMS environment configuration, administrator credentials, and database backup snapshots.
                  </p>
                </div>
              </div>

              <div className="admin-two-col-grid">
                {/* Master Administrator Account Credentials */}
                <div className="admin-card-section">
                  <div className="acs-header">
                    <div>
                      <h3 className="acs-title">Administrator Master Account Credentials</h3>
                      <p className="acs-sub">Configure master username and password for high-privilege administrative access</p>
                    </div>
                    <span className="badge-purple">Master Access</span>
                  </div>

                  <form onSubmit={handleSaveAdminMasterCreds} className="settings-field-group">
                    <div className="form-row-2">
                      <div className="form-field">
                        <label className="field-label">Admin Username *</label>
                        <div className="input-with-prefix">
                          <span className="input-prefix">@</span>
                          <input
                            type="text"
                            required
                            value={editAdminForm.username}
                            onChange={(e) => setEditAdminForm({ ...editAdminForm, username: e.target.value.toLowerCase().replace(/\s+/g, "") })}
                            className="admin-input prefix-input"
                          />
                        </div>
                        <span className="field-hint">Used to sign in as Administrator</span>
                      </div>

                      <div className="form-field">
                        <label className="field-label">Admin Master Password *</label>
                        <div className="password-input-wrap">
                          <input
                            type={showAdminMasterPwd ? "text" : "password"}
                            required
                            value={editAdminForm.password}
                            onChange={(e) => setEditAdminForm({ ...editAdminForm, password: e.target.value })}
                            className="admin-input pwd-input font-mono"
                          />
                          <button
                            type="button"
                            className="btn-toggle-pwd"
                            onClick={() => setShowAdminMasterPwd(!showAdminMasterPwd)}
                            title={showAdminMasterPwd ? "Hide password" : "Show password"}
                          >
                            {showAdminMasterPwd ? "👁️" : "🙈"}
                          </button>
                        </div>
                        <span className="field-hint">Current master login password</span>
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-field">
                        <label className="field-label">Admin Email</label>
                        <input
                          type="email"
                          required
                          value={editAdminForm.email}
                          onChange={(e) => setEditAdminForm({ ...editAdminForm, email: e.target.value })}
                          className="admin-input"
                        />
                      </div>

                      <div className="form-field">
                        <label className="field-label">Administrator Display Name</label>
                        <input
                          type="text"
                          required
                          value={editAdminForm.fullName}
                          onChange={(e) => setEditAdminForm({ ...editAdminForm, fullName: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                    </div>

                    <button type="submit" className="admin-btn-primary mt-2">
                      💾 Update Admin Master Credentials
                    </button>
                  </form>
                </div>



                {/* Backups and Maintenance */}
                <div className="admin-card-section">
                  <h3 className="acs-title">Data Backup & Disaster Recovery</h3>
                  <p className="acs-sub">Generate verifiable JSON snapshots of all student records and diagnostic scores</p>

                  <div className="backup-box">
                    <div className="bb-icon">💾</div>
                    <div className="bb-text">
                      <strong>Full LMS JSON Database Snapshot</strong>
                      <p>Includes {totalStudents} Students, {totalFaculty} Faculty, 3 Courses, Benchmarks & Audit Logs.</p>
                    </div>
                  </div>

                  <div className="backup-actions">
                    <button
                      type="button"
                      className="admin-btn-primary w-full"
                      onClick={handleExportFullJSON}
                    >
                      Download Full JSON Backup Archive
                    </button>
                    <button
                      type="button"
                      className="admin-btn-secondary w-full"
                      onClick={() => {
                        addLog("Diagnostic Audit Exported", "Admin Administrator", "Downloaded complete test logs", "system");
                        showToast("Audit records compiled and saved.");
                      }}
                    >
                      Export System Security Log (.txt)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ============================================================
          MODAL: BROADCAST ANNOUNCEMENT MODAL
         ============================================================ */}
      {isAnnouncementModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsAnnouncementModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Broadcast Campus Notice</h3>
                <p className="modal-sub">Publish real-time alert across student and faculty dashboards</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsAnnouncementModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAnnouncement} className="modal-form">
              <div className="form-field">
                <label className="field-label">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diagnostic Evaluation Window Extended"
                  value={newAnnouncementForm.title}
                  onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, title: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="form-field">
                <label className="field-label">Detailed Content *</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Type the full announcement message here..."
                  value={newAnnouncementForm.content}
                  onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, content: e.target.value })}
                  className="admin-textarea"
                />
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label className="field-label">Target Audience</label>
                  <select
                    value={newAnnouncementForm.target}
                    onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, target: e.target.value })}
                    className="admin-select"
                  >
                    <option value="all">Campus-wide (All Students & Faculty)</option>
                    <option value="students">Students Only</option>
                    <option value="faculty">Faculty Only</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="field-label">Priority Level</label>
                  <select
                    value={newAnnouncementForm.priority}
                    onChange={(e) => setNewAnnouncementForm({ ...newAnnouncementForm, priority: e.target.value })}
                    className="admin-select"
                  >
                    <option value="High">High (Urgent Banner)</option>
                    <option value="Medium">Medium (Standard Circular)</option>
                    <option value="Low">Low (Informational)</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setIsAnnouncementModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  📢 Dispatch Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
