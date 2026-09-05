import { useState, useMemo } from "react";
import "./Admin.css";
import ThemeToggle from "./ThemeToggle";
import {
  getCustomUsers,
  saveCustomUser,
  deleteCustomUser,
  getAdminMasterCredentials,
  saveAdminMasterCredentials,
  generateRandomPassword,
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
    title: "EduVerse LMS System Maintenance Window (Sunday 02:00 AM - 04:00 AM)",
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

// Baseline Administrators
const INITIAL_ADMINS = [
  {
    id: "ADM-001",
    empId: "ADM-INST-001",
    name: "Dr. Arunkumar Natarajan",
    username: "admin",
    password: "password123",
    email: "admin@institution.edu",
    phone: "+91 94440 00001",
    department: "Administration",
    role: "admin",
    designation: "Chief Academic Administrator",
    status: "Active",
    joinDate: "2015-01-01",
  },
  {
    id: "ADM-002",
    empId: "ADM-INST-002",
    name: "Prof. S. Rangarajan",
    username: "rangarajan.s",
    password: "password123",
    email: "rangarajan.s@institution.edu",
    phone: "+91 94440 00002",
    department: "Examination Cell",
    role: "admin",
    designation: "Controller of Examinations",
    status: "Active",
    joinDate: "2017-04-10",
  },
];

function Admin({ onNavigate, onLogout, registeredStudent, theme, onToggleTheme }) {
  // Navigation Tabs: 'overview', 'users', 'curriculum', 'assessment', 'analytics', 'announcements', 'settings'
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
  const [revealedPasswords, setRevealedPasswords] = useState({});

  const toggleRevealPassword = (id) => {
    setRevealedPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyCredentialsToClipboard = (username, password, name) => {
    const text = `EduVerse LMS Credentials\nName: ${name}\nUsername: ${username}\nPassword: ${password}\nURL: http://localhost:5173/`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
      showToast(`Credentials for @${username} copied to clipboard!`);
    } else {
      alert(text);
    }
  };

  // User Management State
  const [userSubTab, setUserSubTab] = useState("students"); // 'students' | 'faculty' | 'admins'

  const [administrators, setAdministrators] = useState(() => {
    let list = [...INITIAL_ADMINS];
    const custom = getCustomUsers().filter((u) => u.role === "admin" || u.userType === "admin");
    custom.forEach((ca) => {
      if (!list.some((a) => a.id === ca.id || a.username === ca.username)) {
        list.unshift(ca);
      }
    });
    return list;
  });

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

  // Search & Filters in User Directory
  const [userSearch, setUserSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal States
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Add User Form State
  const [newUserForm, setNewUserForm] = useState({
    userType: "student", // 'student' | 'faculty' | 'admin'
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    department: "CSE",
    identifier: "", // Roll No or Emp ID or Admin ID
    section: "A",
    designation: "Assistant Professor",
    status: "Active",
  });
  const [showNewUserPassword, setShowNewUserPassword] = useState(false);

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

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const q = userSearch.toLowerCase().trim();
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.rollNo.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q);
      const matchesDept = deptFilter === "all" || s.department === deptFilter;
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesQuery && matchesDept && matchesStatus;
    });
  }, [students, userSearch, deptFilter, statusFilter]);

  // Filtered Faculty
  const filteredFaculty = useMemo(() => {
    return faculty.filter((f) => {
      const q = userSearch.toLowerCase().trim();
      const matchesQuery =
        !q ||
        f.name.toLowerCase().includes(q) ||
        f.empId.toLowerCase().includes(q) ||
        f.email.toLowerCase().includes(q);
      const matchesDept =
        deptFilter === "all" ||
        f.department.toLowerCase().includes(deptFilter.toLowerCase()) ||
        (deptFilter === "Mathematics" && f.department === "Mathematics");
      const matchesStatus = statusFilter === "all" || f.status === statusFilter;
      return matchesQuery && matchesDept && matchesStatus;
    });
  }, [faculty, userSearch, deptFilter, statusFilter]);

  // Filtered Administrators
  const filteredAdministrators = useMemo(() => {
    return administrators.filter((a) => {
      const q = userSearch.toLowerCase().trim();
      const matchesQuery =
        !q ||
        a.name.toLowerCase().includes(q) ||
        (a.username && a.username.toLowerCase().includes(q)) ||
        (a.empId && a.empId.toLowerCase().includes(q)) ||
        a.email.toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || a.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [administrators, userSearch, statusFilter]);

  // Handle Add User Submit
  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserForm.name || !newUserForm.email || !newUserForm.identifier) {
      alert("Please fill in all required fields (Name, Email, Roll No / Emp ID).");
      return;
    }

    const cleanUsername = (
      newUserForm.username.trim() ||
      newUserForm.email.split("@")[0] ||
      newUserForm.identifier.toLowerCase()
    ).toLowerCase().replace(/\s+/g, "");

    const cleanPassword = newUserForm.password.trim() || generateRandomPassword();

    if (newUserForm.userType === "student") {
      const newStu = {
        id: `STU-${Date.now().toString().slice(-4)}`,
        rollNo: newUserForm.identifier.toUpperCase(),
        name: newUserForm.name,
        username: cleanUsername,
        password: cleanPassword,
        email: newUserForm.email,
        phone: newUserForm.phone || "+91 98000 00000",
        department: newUserForm.department,
        year: "I Year (Sem II)",
        section: newUserForm.section || "A",
        role: "student",
        status: newUserForm.status,
        attendance: 100,
        hasTakenAssessment: false,
        score: 0,
        maxScore: 20,
        category: "category2",
        categoryLabel: "Category 2: Core Engineering (Pending Test)",
        joinDate: new Date().toISOString().slice(0, 10),
      };
      setStudents((prev) => [newStu, ...prev]);
      saveCustomUser(newStu);
      addLog("New Student Provisioned", "Admin Administrator", `Added ${newStu.name} (@${newStu.username})`, "user");
      showToast(`Student @${newStu.username} enrolled with login credentials!`);
    } else if (newUserForm.userType === "faculty") {
      const newFac = {
        id: `FAC-${Date.now().toString().slice(-4)}`,
        empId: newUserForm.identifier.toUpperCase(),
        name: newUserForm.name,
        username: cleanUsername,
        password: cleanPassword,
        degree: "M.Tech., Ph.D.",
        email: newUserForm.email,
        phone: newUserForm.phone || "+91 94000 00000",
        department: newUserForm.department,
        role: "faculty",
        designation: newUserForm.designation,
        assignedCourses: ["MA25C02 (Linear Algebra)"],
        status: newUserForm.status,
        joinDate: new Date().toISOString().slice(0, 10),
      };
      setFaculty((prev) => [newFac, ...prev]);
      saveCustomUser(newFac);
      addLog("Faculty Appointed", "Admin Administrator", `Added ${newFac.name} (@${newFac.username})`, "faculty");
      showToast(`Faculty coordinator @${newFac.username} registered with login credentials!`);
    } else {
      const newAdm = {
        id: `ADM-${Date.now().toString().slice(-4)}`,
        empId: newUserForm.identifier.toUpperCase(),
        name: newUserForm.name,
        username: cleanUsername,
        password: cleanPassword,
        email: newUserForm.email,
        phone: newUserForm.phone || "+91 94000 00000",
        department: newUserForm.department || "Administration",
        role: "admin",
        designation: newUserForm.designation || "System Administrator",
        status: newUserForm.status,
        joinDate: new Date().toISOString().slice(0, 10),
      };
      setAdministrators((prev) => [newAdm, ...prev]);
      saveCustomUser(newAdm);
      addLog("Administrator Provisioned", "Admin Administrator", `Added ${newAdm.name} (@${newAdm.username})`, "admin");
      showToast(`Administrator @${newAdm.username} registered with master credentials!`);
    }

    setIsAddUserModalOpen(false);
    setNewUserForm({
      userType: "student",
      name: "",
      username: "",
      password: "",
      email: "",
      phone: "",
      department: "CSE",
      identifier: "",
      section: "A",
      designation: "Assistant Professor",
      status: "Active",
    });
  };

  // Open Edit User Modal
  const handleOpenEditModal = (user, type) => {
    setUserToEdit({ ...user, editType: type });
    setIsEditUserModalOpen(true);
  };

  // Save Edit User
  const handleSaveEditUser = (e) => {
    e.preventDefault();
    if (!userToEdit) return;

    if (userToEdit.editType === "student") {
      setStudents((prev) =>
        prev.map((s) => (s.id === userToEdit.id ? { ...s, ...userToEdit } : s))
      );
      saveCustomUser(userToEdit);
      addLog("Student Profile Updated", "Admin Administrator", `Updated ${userToEdit.name} (@${userToEdit.username})`, "user");
      showToast(`Student record for @${userToEdit.username || userToEdit.name} updated.`);
    } else if (userToEdit.editType === "faculty") {
      setFaculty((prev) =>
        prev.map((f) => (f.id === userToEdit.id ? { ...f, ...userToEdit } : f))
      );
      saveCustomUser(userToEdit);
      addLog("Faculty Record Updated", "Admin Administrator", `Updated ${userToEdit.name}`, "faculty");
      showToast(`Faculty record for @${userToEdit.username || userToEdit.name} updated.`);
    } else {
      setAdministrators((prev) =>
        prev.map((a) => (a.id === userToEdit.id ? { ...a, ...userToEdit } : a))
      );
      saveCustomUser(userToEdit);
      addLog("Administrator Updated", "Admin Administrator", `Updated ${userToEdit.name}`, "admin");
      showToast(`Administrator record for @${userToEdit.username || userToEdit.name} updated.`);
    }
    setIsEditUserModalOpen(false);
  };

  // Toggle User Status
  const handleToggleStatus = (id, type, currentStatus) => {
    const nextStatus = currentStatus === "Active" ? "Suspended" : "Active";
    if (type === "student") {
      setStudents((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: nextStatus } : s))
      );
    } else if (type === "faculty") {
      setFaculty((prev) =>
        prev.map((f) => (f.id === id ? { ...f, status: nextStatus } : f))
      );
    } else {
      setAdministrators((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: nextStatus } : a))
      );
    }
    addLog("Account Status Changed", "Admin Administrator", `Toggled ID ${id} to ${nextStatus}`, "security");
    showToast(`Status updated to ${nextStatus}.`);
  };

  // Delete User
  const handleDeleteUser = (id, name, type) => {
    if (!window.confirm(`Are you sure you want to de-register ${name} from the institution records?`)) return;
    if (type === "student") {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } else if (type === "faculty") {
      setFaculty((prev) => prev.filter((f) => f.id !== id));
    } else {
      setAdministrators((prev) => prev.filter((a) => a.id !== id));
    }
    deleteCustomUser(id);
    addLog("User De-registered", "Admin Administrator", `Removed ${name} (${id})`, "warning");
    showToast(`${name} was removed from active roster.`);
  };

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

  // Reset Password Action
  const handleResetPassword = (email, name) => {
    alert(`A secure password reset link has been dispatched to ${email} for user ${name}.`);
    addLog("Password Reset Issued", "Admin Administrator", `Reset email dispatched to ${email}`, "security");
    showToast(`Password reset link dispatched to ${email}`);
  };

  // Export User CSV
  const handleExportUserCSV = () => {
    const isStudent = userSubTab === "students";
    let csv = "";
    if (isStudent) {
      csv = "Roll No,Full Name,Department,Section,Email,Phone,Score,Category,Status,Attendance\n";
      filteredStudents.forEach((s) => {
        csv += `"${s.rollNo}","${s.name}","${s.department}","${s.section}","${s.email}","${s.phone}",${s.score},"${s.categoryLabel}","${s.status}","${s.attendance}%"\n`;
      });
    } else {
      csv = "Emp ID,Full Name,Department,Designation,Email,Phone,Assigned Courses,Status\n";
      filteredFaculty.forEach((f) => {
        csv += `"${f.empId}","${f.name}","${f.department}","${f.designation}","${f.email}","${f.phone}","${f.assignedCourses.join(", ")}","${f.status}"\n`;
      });
    }
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `EduVerse_${userSubTab}_Roster_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("CSV roster generated and downloaded!");
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
      institution: "EduVerse Institute of Engineering & Technology",
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
    a.download = `EduVerse_LMS_FullBackup_${new Date().toISOString().slice(0, 10)}.json`;
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
        <span className="admin-bg-symbol as3">Admin • RBAC v2.4</span>
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
              <span className="admin-brand-title">EduVerse LMS</span>
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
              className={`admin-nav-item ${activeTab === "users" ? "active" : ""}`}
              onClick={() => setActiveTab("users")}
            >
              <span className="ani-icon">👥</span>
              <span className="ani-label">User & RBAC Directory</span>
              <span className="ani-count">{totalStudents + totalFaculty}</span>
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
              className={`admin-nav-item ${activeTab === "analytics" ? "active" : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              <span className="ani-icon">🏛️</span>
              <span className="ani-label">Department Analytics</span>
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
                    onClick={() => {
                      setUserSubTab("students");
                      setIsAddUserModalOpen(true);
                    }}
                  >
                    + Add New Student
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
              <div className="admin-card-section">
                <div className="acs-header">
                  <div>
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

                <div className="pathway-distribution-bar">
                  <div
                    className="pdb-segment cat1"
                    style={{ width: `${(cat1Count / totalStudents) * 100}%` }}
                    title={`Bronze (≤ 39%): ${cat1Count} students`}
                  >
                    {Math.round((cat1Count / totalStudents) * 100)}%
                  </div>
                  <div
                    className="pdb-segment cat2"
                    style={{ width: `${(cat2Count / totalStudents) * 100}%` }}
                    title={`Silver (40%–79%): ${cat2Count} students`}
                  >
                    {Math.round((cat2Count / totalStudents) * 100)}%
                  </div>
                  <div
                    className="pdb-segment cat3"
                    style={{ width: `${(cat3Count / totalStudents) * 100}%` }}
                    title={`Gold (≥ 80%): ${cat3Count} students`}
                  >
                    {Math.round((cat3Count / totalStudents) * 100)}%
                  </div>
                </div>

                <div className="pathway-legend-grid">
                  <div className="plg-item">
                    <span className="plg-indicator cat1-dot" />
                    <div>
                      <strong>🥉 Bronze Category (Score ≤ 39%)</strong>
                      <p>{cat1Count} Students ({Math.round((cat1Count / totalStudents) * 100)}%) • Remedial foundation & core operations</p>
                    </div>
                  </div>
                  <div className="plg-item">
                    <span className="plg-indicator cat2-dot" />
                    <div>
                      <strong>🥈 Silver Category (Score 40%–79%)</strong>
                      <p>{cat2Count} Students ({Math.round((cat2Count / totalStudents) * 100)}%) • Standard engineering pace & university papers</p>
                    </div>
                  </div>
                  <div className="plg-item">
                    <span className="plg-indicator cat3-dot" />
                    <div>
                      <strong>🥇 Gold Category (Score ≥ 80%)</strong>
                      <p>{cat3Count} Students ({Math.round((cat3Count / totalStudents) * 100)}%) • Honors track, SVD & quadratic forms</p>
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
              TAB 2: USER & RBAC DIRECTORY (STUDENTS & FACULTY)
             ============================================================ */}
          {activeTab === "users" && (
            <div className="admin-tab-content fade-in">
              <div className="users-page-header">
                <div>
                  <h2 className="section-title">Institutional User & RBAC Directory</h2>
                  <p className="section-desc">
                    Manage student enrollments, faculty appointments, roles, active statuses, and authentication credentials.
                  </p>
                </div>
                <div className="users-header-actions">
                  <button
                    type="button"
                    className="admin-btn-secondary"
                    onClick={handleExportUserCSV}
                  >
                    📥 Export CSV
                  </button>
                  <button
                    type="button"
                    className="admin-btn-primary"
                    onClick={() => setIsAddUserModalOpen(true)}
                  >
                    + Add New User
                  </button>
                </div>
              </div>

              {/* Sub-tab Pill Switcher */}
              <div className="user-subtab-bar">
                <button
                  type="button"
                  className={`subtab-btn ${userSubTab === "students" ? "active" : ""}`}
                  onClick={() => setUserSubTab("students")}
                >
                  Students ({students.length})
                </button>
                <button
                  type="button"
                  className={`subtab-btn ${userSubTab === "faculty" ? "active" : ""}`}
                  onClick={() => setUserSubTab("faculty")}
                >
                  👨‍🏫 Faculty Coordinators ({faculty.length})
                </button>
                <button
                  type="button"
                  className={`subtab-btn ${userSubTab === "admins" ? "active" : ""}`}
                  onClick={() => setUserSubTab("admins")}
                >
                  🛡️ Administrators ({administrators.length})
                </button>
              </div>

              {/* Search and Filters Bar */}
              <div className="user-filter-controls">
                <div className="search-input-wrap">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder={`Search by name, ${userSubTab === "students" ? "Roll No" : "Emp ID"}, or email...`}
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="user-search-input"
                  />
                  {userSearch && (
                    <button type="button" className="clear-search-btn" onClick={() => setUserSearch("")}>
                      ✕
                    </button>
                  )}
                </div>

                <div className="filter-group">
                  <label htmlFor="dept-filter" className="filter-label">Department:</label>
                  <select
                    id="dept-filter"
                    value={deptFilter}
                    onChange={(e) => setDeptFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Departments</option>
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="AI & DS">AI & DS</option>
                    <option value="ECE">ECE</option>
                    {userSubTab === "faculty" && <option value="Mathematics">Mathematics</option>}
                  </select>
                </div>

                <div className="filter-group">
                  <label htmlFor="status-filter" className="filter-label">Status:</label>
                  <select
                    id="status-filter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="admin-select"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {/* Students Table */}
              {userSubTab === "students" && (
                <div className="admin-table-container">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Roll No</th>
                        <th>Student Name & Contact</th>
                        <th>Dept / Sec</th>
                        <th>Login Credentials</th>
                        <th>Diagnostic Score</th>
                        <th>Pathway Category</th>
                        <th>Attendance</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="empty-table-cell">
                            No students match your search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredStudents.map((s) => (
                          <tr key={s.id}>
                            <td className="font-mono font-bold text-indigo">{s.rollNo}</td>
                            <td>
                              <div className="cell-user-info">
                                <span className="cell-user-name">{s.name}</span>
                                <span className="cell-user-sub">{s.email}</span>
                              </div>
                            </td>
                            <td>
                              <span className="dept-tag">{s.department}</span>
                              <span className="sec-tag">Sec {s.section}</span>
                            </td>
                            <td>
                              <div className="cred-badge-box">
                                <span className="cred-username">@{s.username || s.email?.split("@")[0]}</span>
                                <div className="cred-pwd-row">
                                  <span className="cred-pwd-text">
                                    {revealedPasswords[s.id] ? (s.password || "student123") : "••••••••"}
                                  </span>
                                  <button
                                    type="button"
                                    className="btn-cred-eye"
                                    onClick={() => toggleRevealPassword(s.id)}
                                    title={revealedPasswords[s.id] ? "Hide password" : "Show password"}
                                  >
                                    {revealedPasswords[s.id] ? "👁️" : "🙈"}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-cred-copy"
                                    onClick={() => copyCredentialsToClipboard(s.username || s.email?.split("@")[0], s.password || "student123", s.name)}
                                    title="Copy username & password"
                                  >
                                    📋
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td>
                              {s.hasTakenAssessment ? (
                                <span className="score-badge">
                                  <strong>{s.score}</strong> / {s.maxScore}
                                </span>
                              ) : (
                                <span className="pending-badge">Pending Test</span>
                              )}
                            </td>
                            <td>
                              <span className={`pathway-badge pb-${s.category === "category1" || s.category === "bronze" ? "category1" : s.category === "category3" || s.category === "gold" ? "category3" : "category2"}`}>
                                {(s.category === "category3" || s.category === "gold") && "🥇 Gold"}
                                {(s.category === "category2" || s.category === "silver") && "🥈 Silver"}
                                {(s.category === "category1" || s.category === "bronze") && "🥉 Bronze"}
                                {!s.category && "🥈 Silver"}
                              </span>
                            </td>
                            <td>
                              <div className="att-bar-wrap">
                                <span>{s.attendance}%</span>
                                <div className="att-track">
                                  <div
                                    className="att-fill"
                                    style={{
                                      width: `${s.attendance}%`,
                                      backgroundColor: s.attendance >= 85 ? "#10b981" : "#f59e0b",
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`status-pill pill-${s.status.toLowerCase()}`}>
                                {s.status}
                              </span>
                            </td>
                            <td>
                              <div className="row-action-buttons">
                                <button
                                  type="button"
                                  className="btn-icon-action"
                                  onClick={() => handleOpenEditModal(s, "student")}
                                  title="Edit Student Details"
                                >
                                  ✏️
                                </button>
                                <button
                                  type="button"
                                  className="btn-icon-action"
                                  onClick={() => handleResetPassword(s.email, s.name)}
                                  title="Dispatch Password Reset"
                                >
                                  🔑
                                </button>
                                <button
                                  type="button"
                                  className={`btn-icon-action ${s.status === "Active" ? "btn-warn" : "btn-ok"}`}
                                  onClick={() => handleToggleStatus(s.id, "student", s.status)}
                                  title={s.status === "Active" ? "Suspend Account" : "Activate Account"}
                                >
                                  {s.status === "Active" ? "⏸️" : "▶️"}
                                </button>
                                <button
                                  type="button"
                                  className="btn-icon-action btn-danger"
                                  onClick={() => handleDeleteUser(s.id, s.name, "student")}
                                  title="Remove Student"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Faculty Table */}
              {userSubTab === "faculty" && (
                <div className="admin-table-container">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Employee ID</th>
                        <th>Faculty Name</th>
                        <th>Department & Title</th>
                        <th>Contact Email</th>
                        <th>Login Credentials</th>
                        <th>Assigned Courses</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredFaculty.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="empty-table-cell">
                            No faculty members match your search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredFaculty.map((f) => (
                          <tr key={f.id}>
                            <td className="font-mono font-bold text-emerald">{f.empId}</td>
                            <td>
                              <div className="cell-user-info">
                                <span className="cell-user-name">{f.name}</span>
                                <span className="cell-user-sub">{f.degree}</span>
                              </div>
                            </td>
                            <td>
                              <span className="dept-tag">{f.department}</span>
                              <div className="cell-user-sub mt-1">{f.designation}</div>
                            </td>
                            <td>{f.email}</td>
                            <td>
                              <div className="cred-badge-box">
                                <span className="cred-username">@{f.username || f.email?.split("@")[0]}</span>
                                <div className="cred-pwd-row">
                                  <span className="cred-pwd-text">
                                    {revealedPasswords[f.id] ? (f.password || "faculty123") : "••••••••"}
                                  </span>
                                  <button
                                    type="button"
                                    className="btn-cred-eye"
                                    onClick={() => toggleRevealPassword(f.id)}
                                    title={revealedPasswords[f.id] ? "Hide password" : "Show password"}
                                  >
                                    {revealedPasswords[f.id] ? "👁️" : "🙈"}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-cred-copy"
                                    onClick={() => copyCredentialsToClipboard(f.username || f.email?.split("@")[0], f.password || "faculty123", f.name)}
                                    title="Copy username & password"
                                  >
                                    📋
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="course-chip-list">
                                {f.assignedCourses.map((c, idx) => (
                                  <span key={idx} className="course-chip">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td>
                              <span className={`status-pill pill-${f.status.toLowerCase()}`}>
                                {f.status}
                              </span>
                            </td>
                            <td>
                              <div className="row-action-buttons">
                                <button
                                  type="button"
                                  className="btn-icon-action"
                                  onClick={() => handleOpenEditModal(f, "faculty")}
                                  title="Edit Faculty Record"
                                >
                                  ✏️
                                </button>
                                <button
                                  type="button"
                                  className="btn-icon-action"
                                  onClick={() => handleResetPassword(f.email, f.name)}
                                  title="Dispatch Password Reset"
                                >
                                  🔑
                                </button>
                                <button
                                  type="button"
                                  className={`btn-icon-action ${f.status === "Active" ? "btn-warn" : "btn-ok"}`}
                                  onClick={() => handleToggleStatus(f.id, "faculty", f.status)}
                                  title={f.status === "Active" ? "Suspend Faculty" : "Activate Faculty"}
                                >
                                  {f.status === "Active" ? "⏸️" : "▶️"}
                                </button>
                                <button
                                  type="button"
                                  className="btn-icon-action btn-danger"
                                  onClick={() => handleDeleteUser(f.id, f.name, "faculty")}
                                  title="Remove Faculty Member"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Administrators Table */}
              {userSubTab === "admins" && (
                <div className="admin-table-container">
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Admin ID</th>
                        <th>Administrator Name</th>
                        <th>Department & Role</th>
                        <th>Contact Email</th>
                        <th>Login Credentials</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAdministrators.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="empty-table-cell">
                            No administrators match your search criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredAdministrators.map((a) => (
                          <tr key={a.id}>
                            <td className="font-mono font-bold text-indigo">{a.empId || a.id}</td>
                            <td>
                              <div className="cell-user-info">
                                <span className="cell-user-name">{a.name}</span>
                                <span className="cell-user-sub">{a.email}</span>
                              </div>
                            </td>
                            <td>
                              <span className="dept-tag">{a.department || "Admin"}</span>
                              <div className="cell-user-sub mt-1">{a.designation}</div>
                            </td>
                            <td>{a.email}</td>
                            <td>
                              <div className="cred-badge-box">
                                <span className="cred-username">@{a.username || a.email?.split("@")[0]}</span>
                                <div className="cred-pwd-row">
                                  <span className="cred-pwd-text">
                                    {revealedPasswords[a.id] ? (a.password || "password123") : "••••••••"}
                                  </span>
                                  <button
                                    type="button"
                                    className="btn-cred-eye"
                                    onClick={() => toggleRevealPassword(a.id)}
                                    title={revealedPasswords[a.id] ? "Hide password" : "Show password"}
                                  >
                                    {revealedPasswords[a.id] ? "👁️" : "🙈"}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn-cred-copy"
                                    onClick={() => copyCredentialsToClipboard(a.username || a.email?.split("@")[0], a.password || "password123", a.name)}
                                    title="Copy username & password"
                                  >
                                    📋
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className={`status-pill pill-${(a.status || "Active").toLowerCase()}`}>
                                {a.status || "Active"}
                              </span>
                            </td>
                            <td>
                              <div className="row-action-buttons">
                                <button
                                  type="button"
                                  className="btn-icon-action"
                                  onClick={() => handleOpenEditModal(a, "admin")}
                                  title="Edit Administrator Record"
                                >
                                  ✏️
                                </button>
                                <button
                                  type="button"
                                  className="btn-icon-action"
                                  onClick={() => handleResetPassword(a.email, a.name)}
                                  title="Dispatch Password Reset"
                                >
                                  🔑
                                </button>
                                {a.id !== "ADM-001" && (
                                  <button
                                    type="button"
                                    className="btn-icon-action btn-danger"
                                    onClick={() => handleDeleteUser(a.id, a.name, "admin")}
                                    title="Remove Administrator"
                                  >
                                    🗑️
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
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

              <div className="admin-two-col-grid">
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

                {/* Performance Analytics on Diagnostic */}
                <div className="admin-card-section">
                  <h3 className="acs-title">Cohort Diagnostic Performance Summary</h3>
                  <p className="acs-sub">Real-time statistics across all enrolled test takers</p>

                  <div className="diag-kpi-row">
                    <div className="diag-stat">
                      <span className="ds-value">{assessedStudents.length} / {totalStudents}</span>
                      <span className="ds-label">Tests Completed</span>
                    </div>
                    <div className="diag-stat">
                      <span className="ds-value">{classAvgScore}</span>
                      <span className="ds-label">Average Score (Out of 20)</span>
                    </div>
                    <div className="diag-stat">
                      <span className="ds-value">19 / 20</span>
                      <span className="ds-label">Cohort Highest (Divya N.)</span>
                    </div>
                  </div>

                  <div className="domain-breakdown-card">
                    <h4 className="dbc-title">Syllabus Domain Mastery Index</h4>
                    <div className="domain-bar-item">
                      <div className="dbi-top">
                        <span>Unit I: Matrix Algebra & Elementary Operations</span>
                        <strong>84% Avg</strong>
                      </div>
                      <div className="dbi-track"><div className="dbi-fill" style={{ width: "84%" }} /></div>
                    </div>

                    <div className="domain-bar-item">
                      <div className="dbi-top">
                        <span>Unit II: Determinants & Minors</span>
                        <strong>76% Avg</strong>
                      </div>
                      <div className="dbi-track"><div className="dbi-fill" style={{ width: "76%" }} /></div>
                    </div>

                    <div className="domain-bar-item">
                      <div className="dbi-top">
                        <span>Unit III: Linear Systems & Vector Spaces</span>
                        <strong>69% Avg</strong>
                      </div>
                      <div className="dbi-track"><div className="dbi-fill" style={{ width: "69%", backgroundColor: "#f59e0b" }} /></div>
                    </div>

                    <div className="domain-bar-item">
                      <div className="dbi-top">
                        <span>Unit IV: Characteristic Roots & Cayley-Hamilton</span>
                        <strong>61% Avg</strong>
                      </div>
                      <div className="dbi-track"><div className="dbi-fill" style={{ width: "61%", backgroundColor: "#ef4444" }} /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 5: DEPARTMENT & COHORT ANALYTICS
             ============================================================ */}
          {activeTab === "analytics" && (
            <div className="admin-tab-content fade-in">
              <div className="users-page-header">
                <div>
                  <h2 className="section-title">Departmental Performance & Cohort Intelligence</h2>
                  <p className="section-desc">
                    Comparative academic analytics across CSE, IT, AI & DS, and ECE student cohorts.
                  </p>
                </div>
              </div>

              <div className="dept-cards-grid">
                {[
                  { name: "Computer Science & Engineering", code: "CSE", students: 4, avg: 14.0, pass: "100%", coordinator: "Prof. Rajesh Sharma", cat3: 2, cat2: 1, cat1: 1 },
                  { name: "Information Technology", code: "IT", students: 2, avg: 15.0, pass: "100%", coordinator: "Dr. V. Anitha", cat3: 1, cat2: 1, cat1: 0 },
                  { name: "Artificial Intelligence & Data Science", code: "AI & DS", students: 2, avg: 12.0, pass: "100%", coordinator: "Dr. Meenakshi Sundaram", cat3: 1, cat2: 0, cat1: 1 },
                  { name: "Electronics & Communication Engineering", code: "ECE", students: 2, avg: 9.5, pass: "100%", coordinator: "Dr. K. Senthil Kumar", cat3: 0, cat2: 1, cat1: 1 },
                ].map((dept) => (
                  <div key={dept.code} className="dept-card">
                    <div className="dept-card-top">
                      <span className="dept-big-tag">{dept.code}</span>
                      <span className="dept-student-count">{dept.students} Cohort Students</span>
                    </div>
                    <h3 className="dept-name">{dept.name}</h3>
                    <p className="dept-coord">Faculty Liaison: {dept.coordinator}</p>

                    <div className="dept-metrics-row">
                      <div className="dm-cell">
                        <span className="dm-val">{dept.avg}</span>
                        <span className="dm-label">Avg Diagnostic Score</span>
                      </div>
                      <div className="dm-cell">
                        <span className="dm-val">{dept.pass}</span>
                        <span className="dm-label">Pass Rate</span>
                      </div>
                    </div>

                    <div className="dept-stream-bars">
                      <span className="dsb-label">Stream Split:</span>
                      <div className="dsb-cluster">
                        <span className="dsb-chip c3">{dept.cat3} Adv</span>
                        <span className="dsb-chip c2">{dept.cat2} Core</span>
                        <span className="dsb-chip c1">{dept.cat1} Found</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================
              TAB 6: CAMPUS ANNOUNCEMENTS
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
              TAB 7: SYSTEM SETTINGS & DATA BACKUPS
             ============================================================ */}
          {activeTab === "settings" && (
            <div className="admin-tab-content fade-in">
              <div className="users-page-header">
                <div>
                  <h2 className="section-title">System Settings & Data Integrity</h2>
                  <p className="section-desc">
                    LMS environment configuration, database backup snapshots, and institutional academic cycles.
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

                {/* Academic Configuration */}
                <div className="admin-card-section">
                  <h3 className="acs-title">Institutional Academic Framework</h3>
                  <p className="acs-sub">Global constants applied across all courses and reporting</p>

                  <div className="settings-field-group">
                    <div className="form-field">
                      <label className="field-label">Institution Name</label>
                      <input
                        type="text"
                        defaultValue="EduVerse Institute of Engineering & Technology"
                        className="admin-input"
                        readOnly
                      />
                    </div>

                    <div className="form-row-2">
                      <div className="form-field">
                        <label className="field-label">Current Academic Year</label>
                        <input
                          type="text"
                          defaultValue="2025–2026"
                          className="admin-input"
                          readOnly
                        />
                      </div>
                      <div className="form-field">
                        <label className="field-label">Current Term</label>
                        <input
                          type="text"
                          defaultValue="Semester II (Even)"
                          className="admin-input"
                          readOnly
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label className="field-label">Curriculum Regulation</label>
                      <input
                        type="text"
                        defaultValue="Regulation 2025 (Outcome Based Education / CBCS)"
                        className="admin-input"
                        readOnly
                      />
                    </div>
                  </div>
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
          MODAL 1: ADD USER MODAL (STUDENT / FACULTY)
         ============================================================ */}
      {isAddUserModalOpen && (
        <div className="admin-modal-overlay" onClick={() => setIsAddUserModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Provision New Institutional User</h3>
                <p className="modal-sub">Add student or faculty coordinator to EduVerse LMS</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsAddUserModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="modal-form">
              {/* User Type Toggle */}
              <div className="form-field">
                <label className="field-label">User Role</label>
                <div className="role-radio-group">
                  <label className={`radio-pill ${newUserForm.userType === "student" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="userType"
                      value="student"
                      checked={newUserForm.userType === "student"}
                      onChange={() => setNewUserForm({ ...newUserForm, userType: "student" })}
                    />
                    <span>Student</span>
                  </label>
                  <label className={`radio-pill ${newUserForm.userType === "faculty" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="userType"
                      value="faculty"
                      checked={newUserForm.userType === "faculty"}
                      onChange={() => setNewUserForm({ ...newUserForm, userType: "faculty" })}
                    />
                    <span>👨‍🏫 Faculty</span>
                  </label>
                  <label className={`radio-pill ${newUserForm.userType === "admin" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="userType"
                      value="admin"
                      checked={newUserForm.userType === "admin"}
                      onChange={() => setNewUserForm({ ...newUserForm, userType: "admin" })}
                    />
                    <span>🛡️ Administrator</span>
                  </label>
                </div>
              </div>

              {/* Login Credentials (Username & Password) */}
              <div className="auth-credentials-card">
                <div className="acc-header">
                  <span className="acc-icon">🔐</span>
                  <div>
                    <h4 className="acc-title">Login Credentials (Username & Password)</h4>
                    <p className="acc-sub">Credentials used to authenticate this user on the LMS login page</p>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label className="field-label">Username *</label>
                    <div className="input-with-prefix">
                      <span className="input-prefix">@</span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. arun25 or prof.senthil"
                        value={newUserForm.username}
                        onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value.toLowerCase().replace(/\s+/g, "") })}
                        className="admin-input prefix-input"
                      />
                    </div>
                    <span className="field-hint">Unique handle for portal sign in</span>
                  </div>

                  <div className="form-field">
                    <div className="field-label-row">
                      <label className="field-label">Initial Password *</label>
                      <button
                        type="button"
                        className="btn-gen-pwd"
                        onClick={() => setNewUserForm({ ...newUserForm, password: generateRandomPassword() })}
                      >
                        🎲 Auto-Generate
                      </button>
                    </div>
                    <div className="password-input-wrap">
                      <input
                        type={showNewUserPassword ? "text" : "password"}
                        required
                        placeholder="Min. 6 characters"
                        value={newUserForm.password}
                        onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })}
                        className="admin-input pwd-input font-mono"
                      />
                      <button
                        type="button"
                        className="btn-toggle-pwd"
                        onClick={() => setShowNewUserPassword(!showNewUserPassword)}
                        title={showNewUserPassword ? "Hide password" : "Show password"}
                      >
                        {showNewUserPassword ? "👁️" : "🙈"}
                      </button>
                    </div>
                    <span className="field-hint">Password to enter on login portal</span>
                  </div>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label className="field-label">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh K. or Dr. S. Priya"
                    value={newUserForm.name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">
                    {newUserForm.userType === "student" ? "Roll / Reg Number *" : "Employee ID *"}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={newUserForm.userType === "student" ? "e.g. 25CS105" : "e.g. EMP-MTH-105"}
                    value={newUserForm.identifier}
                    onChange={(e) => setNewUserForm({ ...newUserForm, identifier: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label className="field-label">Institutional Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="user@institution.edu"
                    value={newUserForm.email}
                    onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98400 00000"
                    value={newUserForm.phone}
                    onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label className="field-label">Department</label>
                  <select
                    value={newUserForm.department}
                    onChange={(e) => setNewUserForm({ ...newUserForm, department: e.target.value })}
                    className="admin-select"
                  >
                    <option value="CSE">Computer Science (CSE)</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="AI & DS">Artificial Intelligence (AI & DS)</option>
                    <option value="ECE">Electronics (ECE)</option>
                    {newUserForm.userType === "faculty" && <option value="Mathematics">Mathematics</option>}
                  </select>
                </div>

                {newUserForm.userType === "student" ? (
                  <div className="form-field">
                    <label className="field-label">Section</label>
                    <select
                      value={newUserForm.section}
                      onChange={(e) => setNewUserForm({ ...newUserForm, section: e.target.value })}
                      className="admin-select"
                    >
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>
                ) : (
                  <div className="form-field">
                    <label className="field-label">Designation</label>
                    <input
                      type="text"
                      value={newUserForm.designation}
                      onChange={(e) => setNewUserForm({ ...newUserForm, designation: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                )}
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setIsAddUserModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Confirm & Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 2: EDIT USER MODAL
         ============================================================ */}
      {isEditUserModalOpen && userToEdit && (
        <div className="admin-modal-overlay" onClick={() => setIsEditUserModalOpen(false)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 className="modal-title">Edit User Record</h3>
                <p className="modal-sub">
                  Modifying profile for {userToEdit.name} ({userToEdit.rollNo || userToEdit.empId})
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsEditUserModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditUser} className="modal-form">
              {/* Credentials Update Box */}
              <div className="auth-credentials-card">
                <div className="acc-header">
                  <span className="acc-icon">🔑</span>
                  <div>
                    <h4 className="acc-title">Login Credentials</h4>
                    <p className="acc-sub">Manage username and password for this account</p>
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-field">
                    <label className="field-label">Username</label>
                    <div className="input-with-prefix">
                      <span className="input-prefix">@</span>
                      <input
                        type="text"
                        value={userToEdit.username || userToEdit.email?.split("@")[0] || ""}
                        onChange={(e) => setUserToEdit({ ...userToEdit, username: e.target.value.toLowerCase().replace(/\s+/g, "") })}
                        className="admin-input prefix-input"
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <div className="field-label-row">
                      <label className="field-label">Password</label>
                      <button
                        type="button"
                        className="btn-gen-pwd"
                        onClick={() => setUserToEdit({ ...userToEdit, password: generateRandomPassword() })}
                      >
                        🎲 Reset / Gen
                      </button>
                    </div>
                    <input
                      type="text"
                      value={userToEdit.password || "password123"}
                      onChange={(e) => setUserToEdit({ ...userToEdit, password: e.target.value })}
                      className="admin-input font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label className="field-label">Full Name</label>
                  <input
                    type="text"
                    required
                    value={userToEdit.name}
                    onChange={(e) => setUserToEdit({ ...userToEdit, name: e.target.value })}
                    className="admin-input"
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Email</label>
                  <input
                    type="email"
                    required
                    value={userToEdit.email}
                    onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-field">
                  <label className="field-label">Department</label>
                  <select
                    value={userToEdit.department}
                    onChange={(e) => setUserToEdit({ ...userToEdit, department: e.target.value })}
                    className="admin-select"
                  >
                    <option value="CSE">CSE</option>
                    <option value="IT">IT</option>
                    <option value="AI & DS">AI & DS</option>
                    <option value="ECE">ECE</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="field-label">Account Status</label>
                  <select
                    value={userToEdit.status}
                    onChange={(e) => setUserToEdit({ ...userToEdit, status: e.target.value })}
                    className="admin-select"
                  >
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              {userToEdit.editType === "student" && (
                <div className="form-row-2">
                  <div className="form-field">
                    <label className="field-label">Section</label>
                    <input
                      type="text"
                      value={userToEdit.section || "A"}
                      onChange={(e) => setUserToEdit({ ...userToEdit, section: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Attendance (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={userToEdit.attendance || 90}
                      onChange={(e) => setUserToEdit({ ...userToEdit, attendance: Number(e.target.value) })}
                      className="admin-input"
                    />
                  </div>
                </div>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setIsEditUserModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================
          MODAL 3: BROADCAST ANNOUNCEMENT MODAL
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
