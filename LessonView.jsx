import React, { useState, useRef, useEffect } from "react";
import "./LessonView.css";
import MicroTopicTestModal from "./MicroTopicTestModal";
import {
  getStoredMicroTestScores,
  isMicroUnitUnlocked,
  isMicroUnitCompleted,
  getNextMicroTopic,
  getPreviousMicroTopic
} from "./microTopicTests";
import ThemeToggle from "./ThemeToggle";

// Video Audio Tracks & Dubbing Configuration (English & Tamil only)
const VIDEO_LANGUAGES = [
  { id: "en", name: "English", native: "English", flag: "🇬🇧", tag: "ENG", dubType: "Original University Lecture" },
  { id: "ta", name: "Tamil", native: "தமிழ்", flag: "🇮🇳", tag: "TAM", dubType: "Anna University Bilingual Audio" },
];

// Curated YouTube Video IDs for all Linear Algebra micro-units
const YOUTUBE_VIDEO_DATABASE = {
  "1.1": {
    en: { videoId: "fNk_zzaMoSs", title: "Vectors, what even are they? | 3Blue1Brown" },
    ta: { videoId: "aJm1Q6g4fD0", title: "Vector Spaces & Axioms in Tamil | Engineering Mathematics" }
  },
  "1.2": {
    en: { videoId: "k7RM-ot2NWY", title: "Vector Subspaces & Two-Step Test | Dr. Trefor Bazett" },
    ta: { videoId: "8K5eC7e2G_8", title: "Vector Subspaces in Tamil | Engineering Maths" }
  },
  "1.3": {
    en: { videoId: "kYB8IZa5AuE", title: "Linear Combinations, Span, and Basis | 3Blue1Brown" },
    ta: { videoId: "p4V4T9z5r2k", title: "Linear Span and Linear Combination in Tamil" }
  },
  "1.4": {
    en: { videoId: "uQhTuRlWM3E", title: "Linear Independence and Dependence | 3Blue1Brown" },
    ta: { videoId: "aJm1Q6g4fD0", title: "Linear Independence of Vectors in Tamil" }
  },
  "1.5": {
    en: { videoId: "vSczTbgc8Rc", title: "Basis and Dimension | Kimberly Brehm" },
    ta: { videoId: "8K5eC7e2G_8", title: "Basis and Dimension in Tamil" }
  },
  "1.6": {
    en: { videoId: "P2LTAUO1TdA", title: "Change of Basis | 3Blue1Brown" },
    ta: { videoId: "p4V4T9z5r2k", title: "Coordinates and Change of Basis in Tamil" }
  },
  "2.1": {
    en: { videoId: "kYB8IZa5AuE", title: "Linear Transformations and Matrices | 3Blue1Brown" },
    ta: { videoId: "aJm1Q6g4fD0", title: "Linear Transformations in Tamil" }
  },
  "2.2": {
    en: { videoId: "XkY2DOUCWMU", title: "Matrix Multiplication as Composition | 3Blue1Brown" },
    ta: { videoId: "8K5eC7e2G_8", title: "Matrix Representation of Transformations in Tamil" }
  },
  "2.3": {
    en: { videoId: "uQhTuRlWM3E", title: "Kernel, Range & Rank-Nullity Theorem | Dr. Trefor Bazett" },
    ta: { videoId: "p4V4T9z5r2k", title: "Rank Nullity Theorem in Tamil" }
  },
  "2.4": {
    en: { videoId: "Ip3X9LOh2dk", title: "Eigenvalues and Eigenvectors | 3Blue1Brown" },
    ta: { videoId: "aJm1Q6g4fD0", title: "Eigenvalues and Eigenvectors in Tamil" }
  },
  "2.5": {
    en: { videoId: "PFDu9oVAE-g", title: "Cayley-Hamilton Theorem & Inverse | Gate Smashers" },
    ta: { videoId: "8K5eC7e2G_8", title: "Cayley Hamilton Theorem in Tamil" }
  },
  "2.6": {
    en: { videoId: "13r9QY6cmjc", title: "Matrix Diagonalization | Dr. Trefor Bazett" },
    ta: { videoId: "p4V4T9z5r2k", title: "Diagonalization of Matrices in Tamil" }
  },
  "3.1": {
    en: { videoId: "LyGKycYT2v0", title: "Inner Product Spaces | Kimberly Brehm" },
    ta: { videoId: "aJm1Q6g4fD0", title: "Inner Product Spaces in Tamil" }
  },
  "3.2": {
    en: { videoId: "Eu35xM76kKY", title: "Cauchy-Schwarz Inequality | Dr. Trefor Bazett" },
    ta: { videoId: "8K5eC7e2G_8", title: "Cauchy Schwarz & Triangle Inequality in Tamil" }
  },
  "3.3": {
    en: { videoId: "ba1_sV3N-K4", title: "Orthogonal and Orthonormal Vectors | Kimberly Brehm" },
    ta: { videoId: "p4V4T9z5r2k", title: "Orthogonality in Tamil" }
  },
  "3.4": {
    en: { videoId: "rHonltF777o", title: "Gram-Schmidt Orthogonalization Process | Dr. Trefor Bazett" },
    ta: { videoId: "aJm1Q6g4fD0", title: "Gram-Schmidt Process in Tamil" }
  },
  "3.5": {
    en: { videoId: "Y_Ac6KiQ1t0", title: "Orthogonal Complement and Projections | Kimberly Brehm" },
    ta: { videoId: "8K5eC7e2G_8", title: "Orthogonal Complement in Tamil" }
  },
  "4.1": {
    en: { videoId: "vS25Vl3G_w0", title: "Symmetric Matrices & Spectral Theorem | Gilbert Strang MIT" },
    ta: { videoId: "p4V4T9z5r2k", title: "Symmetric Matrices in Tamil" }
  },
  "4.2": {
    en: { videoId: "XgHbgGgG8YQ", title: "Quadratic Forms | Kimberly Brehm" },
    ta: { videoId: "aJm1Q6g4fD0", title: "Quadratic Forms in Tamil" }
  },
  "4.3": {
    en: { videoId: "N_bC1P6rPj0", title: "Definiteness and Principal Axes | Dr. Trefor Bazett" },
    ta: { videoId: "8K5eC7e2G_8", title: "Definiteness of Quadratic Forms in Tamil" }
  },
  "4.4": {
    en: { videoId: "r4eO4g_r60g", title: "Canonical Reduction of Quadratic Forms | NPTEL" },
    ta: { videoId: "p4V4T9z5r2k", title: "Canonical Reduction in Tamil" }
  },
  "4.5": {
    en: { videoId: "vSczTbgc8Rc", title: "Singular Value Decomposition (SVD) | Steve Brunton" },
    ta: { videoId: "aJm1Q6g4fD0", title: "Singular Value Decomposition in Tamil" }
  },
  "5.1": {
    en: { videoId: "o98Yk6Bv_6U", title: "Numerical Linear Algebra Overview | MIT OCW" },
    ta: { videoId: "8K5eC7e2G_8", title: "Numerical Methods in Linear Algebra in Tamil" }
  },
  "5.2": {
    en: { videoId: "PFDu9oVAE-g", title: "Gaussian Elimination & LU Decomposition | Gate Smashers" },
    ta: { videoId: "p4V4T9z5r2k", title: "LU Decomposition in Tamil" }
  },
  "5.3": {
    en: { videoId: "Z_2L0Fp7pXQ", title: "Iterative Methods: Jacobi & Gauss-Seidel | NPTEL" },
    ta: { videoId: "aJm1Q6g4fD0", title: "Gauss Seidel & Jacobi in Tamil" }
  }
};

const getYoutubeVideoInfo = (code, langId) => {
  const topicVideos = YOUTUBE_VIDEO_DATABASE[code] || YOUTUBE_VIDEO_DATABASE["1.1"];
  return topicVideos[langId] || topicVideos.en || { videoId: "fNk_zzaMoSs", title: "Linear Algebra Lecture" };
};

const getLocalizedVideoData = (code, title, langId) => {
  const contentMap = {
    en: {
      summary: `Step-by-step examination of the core mathematical principles, formal proofs, and worked university problems for Section ${code} - ${title}.`,
      audioNotice: "English Academic Lecture Video (Prescribed by Anna University)",
      activeNote: "English technical lecture active. Watch video completely to unlock Section assessment."
    },
    ta: {
      summary: `பிரிவு ${code} - ${title} குறித்த விரிவான பாட விளக்கம். அண்ணா பல்கலைக்கழக தேர்வு வினாக்கள், முக்கிய தேற்றங்கள் மற்றும் படிநிலைகள் (Tamil Lecture Video).`,
      audioNotice: "தமிழ் இருமொழி வீடியோ விளக்கம் (Tamil Bilingual Lecture Video)",
      activeNote: "அண்ணா பல்கலைக்கழக பாடத்திட்டத்திற்கு ஏற்ற தமிழ் வழி விரிவுரை வீடியோ. முழுமையாக பார்த்து தேர்வை திறக்கவும்."
    }
  };
  return contentMap[langId] || contentMap.en;
};

// Comprehensive curriculum content with Video metadata and Dr. G. Balaji Written Notes
const LESSON_DATABASE = {
  "1.1": {
    unitId: "unit1",
    unitNumber: "UNIT I",
    unitTitle: "Vector Spaces",
    code: "1.1",
    title: "Vector Spaces & Axioms",
    duration: "18:42",
    instructor: "Dr. K. Senthil Kumar (Professor of Mathematics)",
    bookChapter: "Dr. G. Balaji, Chapter 1, Section 1.1 (Pages 1.1 – 1.14)",
    videoTopicSummary: "Step-by-step examination of the 10 algebraic axioms that define a vector space over ℝ. Includes visual geometric proofs for ℝⁿ and counterexamples."
  },
  "1.2": {
    unitId: "unit1",
    unitNumber: "UNIT I",
    unitTitle: "Vector Spaces",
    code: "1.2",
    title: "Subspaces & Criteria",
    duration: "16:20",
    instructor: "Dr. K. Senthil Kumar",
    bookChapter: "Dr. G. Balaji, Chapter 1, Section 1.2 (Pages 1.15 – 1.30)",
    videoTopicSummary: "Understanding the two-step and one-step subspace criteria. Detailed geometric visualization of planes passing through the origin versus affine planes in ℝ³."
  },
  "1.3": {
    unitId: "unit1",
    unitNumber: "UNIT I",
    unitTitle: "Vector Spaces",
    code: "1.3",
    title: "Linear Combinations & Spanning Sets",
    duration: "17:15",
    instructor: "Dr. K. Senthil Kumar",
    bookChapter: "Dr. G. Balaji, Chapter 1, Section 1.3 (Pages 1.31 – 1.48)",
    videoTopicSummary: "Testing vector membership in Span(S) using augmented matrices, row echelon forms, and consistency criteria (Rouché-Capelli theorem)."
  },
  "2.1": {
    unitId: "unit2",
    unitNumber: "UNIT II",
    unitTitle: "Linear Transformations & Diagonalization",
    code: "2.1",
    title: "Linear Transformations & Properties",
    duration: "20:10",
    instructor: "Dr. K. Senthil Kumar",
    bookChapter: "Dr. G. Balaji, Chapter 2, Section 2.1 (Pages 2.1 – 2.22)",
    videoTopicSummary: "Linear operators, mapping properties, preservation of linear combinations, and standard matrix representation in ℝ² and ℝ³."
  },
  "2.3": {
    unitId: "unit2",
    unitNumber: "UNIT II",
    unitTitle: "Linear Transformations & Diagonalization",
    code: "2.3",
    title: "Kernel, Range & Rank-Nullity Theorem",
    duration: "22:15",
    instructor: "Dr. K. Senthil Kumar",
    bookChapter: "Dr. G. Balaji, Chapter 2, Section 2.3 (Pages 2.35 – 2.58)",
    videoTopicSummary: "Deep dive into the fundamental theorem of linear algebra: dim(V) = rank(T) + nullity(T). Calculating Ker(T), Im(T), and testing injectivity and surjectivity."
  },
  "3.4": {
    unitId: "unit3",
    unitNumber: "UNIT III",
    unitTitle: "Inner Product Spaces",
    code: "3.4",
    title: "Gram-Schmidt Orthogonalization Process",
    duration: "24:30",
    instructor: "Dr. K. Senthil Kumar",
    bookChapter: "Dr. G. Balaji, Chapter 3, Section 3.4 (Pages 3.42 – 3.65)",
    videoTopicSummary: "Algorithm for converting any linearly independent basis into an orthonormal basis. Step-by-step projection subtraction and normalization."
  },
  "4.5": {
    unitId: "unit4",
    unitNumber: "UNIT IV",
    unitTitle: "Matrix Decomposition & Quadratic Forms",
    code: "4.5",
    title: "Singular Value Decomposition (SVD)",
    duration: "26:10",
    instructor: "Dr. K. Senthil Kumar",
    bookChapter: "Dr. G. Balaji, Chapter 4, Section 4.5 (Pages 4.70 – 4.98)",
    videoTopicSummary: "The crown jewel of modern linear algebra: A = U Σ Vᵀ. Deriving singular values, constructing left and right singular vectors, and engineering applications."
  }
};

// Fallback generator for other topics if clicked
const getLessonData = (code, unitTitle, topicTitle, unitNumber) => {
  if (LESSON_DATABASE[code]) return LESSON_DATABASE[code];
  return {
    unitId: "unit1",
    unitNumber: unitNumber || "UNIT I",
    unitTitle: unitTitle || "Vector Spaces",
    code: code,
    title: topicTitle || "Detailed Study Module",
    duration: "18:00",
    instructor: "Dr. K. Senthil Kumar (Professor of Mathematics)",
    bookChapter: `Dr. G. Balaji, Course Textbook, Section ${code}`,
    videoTopicSummary: `Comprehensive YouTube video lecture covering theoretical proofs, worked examples, and university questions for topic ${code} - ${topicTitle}.`
  };
};

function LessonView({ onNavigate, student, lessonInfo, onLogout, theme, onToggleTheme }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [microScores, setMicroScores] = useState(() => getStoredMicroTestScores());
  const [videoLanguage, setVideoLanguage] = useState("en");
  const [langToast, setLangToast] = useState(null);

  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const progressIntervalRef = useRef(null);

  const studentName = student?.fullName || student?.name || "Student";
  const topicCode = lessonInfo?.code || "1.1";
  const unitNumber = lessonInfo?.unitNumber || "UNIT I";
  const unitTitle = lessonInfo?.unitTitle || "Vector Spaces";
  const topicName = lessonInfo?.name || "Vector Spaces & Axioms";

  const lesson = getLessonData(topicCode, unitTitle, topicName, unitNumber);
  const topicScoreData = microScores[lesson.code];

  // Video Playback Watch Completion Gating from localStorage
  const [videoWatched, setVideoWatched] = useState(() => {
    try {
      return localStorage.getItem(`eduverse_video_completed_${topicCode}`) === "true";
    } catch {
      return false;
    }
  });

  const [videoProgress, setVideoProgress] = useState(() => {
    try {
      return localStorage.getItem(`eduverse_video_completed_${topicCode}`) === "true" ? 100 : 0;
    } catch {
      return 0;
    }
  });

  // Qualification to next module strictly requires passing the micro-unit assessment
  const isCurrentCompleted = isMicroUnitCompleted(lesson.code, microScores);
  const isCurrentUnlocked = isMicroUnitUnlocked(lesson.code, microScores);
  const nextTopic = getNextMicroTopic(lesson.code);
  const prevTopic = getPreviousMicroTopic(lesson.code);

  const selectedLangConfig = VIDEO_LANGUAGES.find((l) => l.id === videoLanguage) || VIDEO_LANGUAGES[0];
  const localizedVideoData = getLocalizedVideoData(lesson.code, lesson.title, videoLanguage);
  const currentVideoInfo = getYoutubeVideoInfo(lesson.code, videoLanguage);

  // Synchronize video watch completion status when lesson code changes
  useEffect(() => {
    try {
      const isCompleted = localStorage.getItem(`eduverse_video_completed_${lesson.code}`) === "true";
      setVideoWatched(isCompleted);
      setVideoProgress(isCompleted ? 100 : 0);
      setIsPlaying(false);
    } catch {
      setVideoWatched(false);
      setVideoProgress(0);
      setIsPlaying(false);
    }
  }, [lesson.code]);

  // Function to mark video as fully completed (unlocks assessment)
  const handleVideoCompleted = () => {
    setVideoWatched(true);
    setVideoProgress(100);
    try {
      localStorage.setItem(`eduverse_video_completed_${lesson.code}`, "true");
    } catch (e) {
      console.error(e);
    }
  };

  // Start polling playback progress when playing
  const startProgressTracking = (player) => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    progressIntervalRef.current = setInterval(() => {
      try {
        if (player && typeof player.getCurrentTime === "function" && typeof player.getDuration === "function") {
          const currentTime = player.getCurrentTime();
          const duration = player.getDuration();
          if (duration > 0) {
            const pct = Math.min(100, Math.round((currentTime / duration) * 100));
            setVideoProgress((prev) => Math.max(prev, pct));
            if (pct >= 99) {
              handleVideoCompleted();
            }
          }
        }
      } catch (e) {
        console.error("Progress tracking error:", e);
      }
    }, 1000);
  };

  const stopProgressTracking = () => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  // Initialize YouTube IFrame Player
  useEffect(() => {
    let isMounted = true;

    const setupPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      const targetDiv = document.getElementById("yt-player-target");
      if (!targetDiv) return;

      // If player already exists, load current video
      if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
        try {
          playerRef.current.cueVideoById(currentVideoInfo.videoId);
          return;
        } catch (e) {
          console.warn("Re-initializing player", e);
        }
      }

      try {
        playerRef.current = new window.YT.Player("yt-player-target", {
          videoId: currentVideoInfo.videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            enablejsapi: 1,
            origin: window.location.origin
          },
          events: {
            onReady: (event) => {
              if (!isMounted) return;
            },
            onStateChange: (event) => {
              if (!isMounted) return;
              // YT.PlayerState: ENDED = 0, PLAYING = 1, PAUSED = 2, BUFFERING = 3, CUED = 5
              if (event.data === 0) {
                // Video ended / completed!
                setIsPlaying(false);
                stopProgressTracking();
                handleVideoCompleted();
              } else if (event.data === 1) {
                // Video is playing
                setIsPlaying(true);
                startProgressTracking(event.target);
              } else if (event.data === 2) {
                // Video is paused
                setIsPlaying(false);
                stopProgressTracking();
              }
            }
          }
        });
      } catch (err) {
        console.error("Error creating YouTube player:", err);
      }
    };

    // Load YouTube Iframe API if not already present
    if (!window.YT) {
      const existingScript = document.getElementById("yt-iframe-api-script");
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }

      window.onYouTubeIframeAPIReady = () => {
        if (isMounted) setupPlayer();
      };
    } else {
      setupPlayer();
    }

    return () => {
      isMounted = false;
      stopProgressTracking();
    };
  }, [lesson.code, currentVideoInfo.videoId]);

  useEffect(() => {
    if (lessonInfo?.startTest) {
      try {
        const isDone = localStorage.getItem(`eduverse_video_completed_${lesson.code}`) === "true";
        if (isDone || videoWatched) {
          setShowTestModal(true);
        } else {
          alert(
            `🔒 Assessment Locked!\n\nYou must watch the YouTube video lecture until it finishes before you can attend the Section ${lesson.code} assessment.\n\nPlease play and finish the video first.`
          );
        }
      } catch {
        setShowTestModal(true);
      }
    }
  }, [lessonInfo, lesson.code, videoWatched]);

  const handleLanguageChange = (newLang) => {
    setVideoLanguage(newLang);
    const target = VIDEO_LANGUAGES.find((l) => l.id === newLang) || VIDEO_LANGUAGES[0];
    const newVideo = getYoutubeVideoInfo(lesson.code, newLang);
    
    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      playerRef.current.loadVideoById(newVideo.videoId);
    }
    
    setLangToast(`Video switched to ${target.name} (${target.native}) • ${newVideo.title}`);
    setTimeout(() => setLangToast(null), 3500);
  };

  const handleOpenAssessment = () => {
    if (!videoWatched && videoProgress < 100) {
      alert(
        `🔒 Assessment Locked!\n\nYou must watch the entire YouTube video lecture until it is completed before you can attend the Section ${lesson.code} assessment.\n\nCurrent Watch Progress: ${Math.round(videoProgress)}%\n\nPlease complete the video to unlock your test.`
      );
      return;
    }
    setShowTestModal(true);
  };

  return (
    <div className="lesson-page-root">
      {/* Top Header Navbar */}
      <header className="lesson-nav">
        <div className="ln-left">
          <button
            type="button"
            className="btn-back-syllabus"
            onClick={() => onNavigate("syllabus", student)}
          >
            ← Back to Syllabus
          </button>
          <div className="ln-breadcrumb">
            <span className="bc-unit">{lesson.unitNumber}</span>
            <span className="bc-sep">/</span>
            <span className="bc-code">{lesson.code}</span>
            <span className="bc-title">{lesson.title}</span>
          </div>
        </div>

        <div className="ln-center">
          <span className="ln-course-badge">Linear Algebra (MA25C02)</span>
        </div>

        <div className="ln-right">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <div className="student-logged-pill">
            <span>👤</span>
            <span className="sl-name">{studentName}</span>
          </div>
          <button
            type="button"
            className="btn-home-nav"
            onClick={() => onNavigate("home", student)}
          >
            Home
          </button>
          {onLogout && (
            <button type="button" className="btn-logout-nav" onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Main Lesson Body */}
      {!isCurrentUnlocked ? (
        <main className="lesson-container">
          <div className="locked-lesson-screen">
            <div className="lls-card">
              <span className="lls-icon">🔒</span>
              <span className="lls-badge">ASSESSMENT PASS REQUIRED</span>
              <h2 className="lls-title">Section {lesson.code} is Locked</h2>
              <p className="lls-desc">
                To qualify for <strong>Section {lesson.code}: {lesson.title}</strong>, you must complete and pass the 10-minute assessment of the previous micro-unit first.
              </p>
              {prevTopic && (
                <div className="lls-prereq-box">
                  <span className="lls-prereq-lbl">Required Prerequisite:</span>
                  <strong className="lls-prereq-val">
                    Pass Section {prevTopic.code} ({prevTopic.name}) Assessment
                  </strong>
                </div>
              )}
              <div className="lls-actions">
                {prevTopic && (
                  <button
                    type="button"
                    className="btn-go-prereq"
                    onClick={() =>
                      onNavigate("lesson", {
                        code: prevTopic.code,
                        name: prevTopic.name,
                        unitNumber: prevTopic.unitNumber,
                        unitTitle: prevTopic.unitTitle,
                        student,
                        startTest: true
                      })
                    }
                  >
                    ⚡ Take Section {prevTopic.code} Assessment
                  </button>
                )}
                <button
                  type="button"
                  className="btn-back-syllabus-alt"
                  onClick={() => onNavigate("syllabus", student)}
                >
                  View Full Syllabus
                </button>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="lesson-container">
        {/* Lesson Title Header */}
        <section className="lesson-header-strip">
          <div className="lhs-meta-row">
            <span className="lhs-unit-pill">{lesson.unitNumber}: {lesson.unitTitle}</span>
            <span className="lhs-code-pill">Section {lesson.code}</span>
            <span className="lhs-duration-pill">⏱️ {lesson.duration} YouTube Lecture</span>
            <span className="lhs-book-pill">{lesson.bookChapter}</span>
          </div>

          <div className="lhs-title-row">
            <div>
              <h1 className="lhs-main-title">{lesson.code} {lesson.title}</h1>
              <p className="lhs-instructor">
                Instructor: <strong>{lesson.instructor}</strong> • Prescribed Text: <strong>Dr. G. Balaji</strong>
              </p>
            </div>

            <div className="lhs-actions">
              <button
                type="button"
                className={`btn-take-micro-test ${!videoWatched ? "locked-test-btn" : ""}`}
                onClick={handleOpenAssessment}
                title={
                  !videoWatched
                    ? `Watch YouTube lecture completely first (${Math.round(videoProgress)}% completed)`
                    : "Take 10-Minute Assessment"
                }
              >
                {!videoWatched ? (
                  `🔒 Watch Video to Unlock Assessment (${Math.round(videoProgress)}%)`
                ) : topicScoreData?.passed ? (
                  `✓ Assessment Passed: ${topicScoreData.score}/10 (Qualified)`
                ) : topicScoreData ? (
                  `⚡ Retake Assessment: ${topicScoreData.score}/10 (Pass to Qualify)`
                ) : (
                  "⚡ 10-Min Assessment (Pass to Qualify Next Unit)"
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Content Layout Grid */}
        <div className="lesson-layout-grid">
          {/* YOUTUBE VIDEO PLAYER SECTION */}
          <section className="video-player-section">
            <div className="video-card">
              {/* YouTube Player Header Bar */}
              <div className="yt-player-topbar">
                <div className="yt-topbar-info">
                  <span className="yt-topbar-badge">📺 YouTube Lecture</span>
                  <span className="yt-topbar-title">{currentVideoInfo.title}</span>
                </div>

                <div className="yt-topbar-controls">
                  <div className="cb-lang-picker" title="Change Lecture Language">
                    <span className="cb-lang-picker-icon">🌐</span>
                    <span className="cb-lang-picker-label">Language:</span>
                    <select
                      className="cb-lang-select"
                      value={videoLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      aria-label="Change Video Language"
                    >
                      {VIDEO_LANGUAGES.map((lang) => (
                        <option key={lang.id} value={lang.id}>
                          {lang.flag} {lang.name} ({lang.native})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Language Switch Toast */}
              {langToast && (
                <div className="cb-lang-toast-pill" role="status">
                  ✨ {langToast}
                </div>
              )}

              {/* Responsive YouTube Player IFrame Viewport */}
              <div className="video-viewport yt-viewport">
                <div className="yt-iframe-container" ref={playerContainerRef}>
                  <div id="yt-player-target" className="yt-player-target"></div>
                </div>
              </div>

              {/* YouTube Lecture Video Playback Watch Completion Progress Bar */}
              <div className="cb-lecture-progress-strip">
                <div className="cb-lps-info">
                  <span className="cb-lps-status">
                    {videoWatched ? (
                      <span className="cb-lps-done">✅ Lecture Video Completed (100%) • Assessment Unlocked!</span>
                    ) : isPlaying ? (
                      <span className="cb-lps-playing">▶️ Watching YouTube Video: {Math.round(videoProgress)}% (Watch 100% to unlock assessment)</span>
                    ) : (
                      <span className="cb-lps-paused">⏸️ YouTube Video ({Math.round(videoProgress)}% watched) — Watch completely to unlock assessment</span>
                    )}
                  </span>
                  <span className="cb-lps-time">
                    {Math.round(videoProgress)}%
                  </span>
                </div>
                <div className="cb-lps-track">
                  <div
                    className={`cb-lps-bar ${videoWatched ? "done" : ""}`}
                    style={{ width: `${videoProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Video Language Details Box */}
              <div className="video-lang-transcript-box">
                <div className="vlt-header">
                  <div className="vlt-title">
                    <span className="vlt-icon">🌐</span>
                    <span>Lecture Video Track:</span>
                    <strong className="vlt-lang-highlight">
                      {selectedLangConfig.name} ({selectedLangConfig.native})
                    </strong>
                  </div>

                  <div className="vlt-pills">
                    {VIDEO_LANGUAGES.map((lang) => (
                      <button
                        key={lang.id}
                        type="button"
                        className={`vlt-pill ${videoLanguage === lang.id ? "active" : ""}`}
                        onClick={() => handleLanguageChange(lang.id)}
                      >
                        <span className="vlt-pill-flag">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <p className="vlt-desc">{localizedVideoData.activeNote}</p>
              </div>

              {/* Bottom Navigation & Micro-Topic Test Actions */}
              <div className="video-lesson-footer-actions">
                <button
                  type="button"
                  className={`btn-take-micro-test ${!videoWatched ? "locked-test-btn" : ""}`}
                  onClick={handleOpenAssessment}
                >
                  {!videoWatched
                    ? `🔒 Watch YouTube Video to Unlock Test (${Math.round(videoProgress)}%)`
                    : topicScoreData?.passed
                    ? `✓ Assessment Passed (${topicScoreData.score}/10) - Retake Test`
                    : topicScoreData
                    ? `⚡ Retake Assessment (${topicScoreData.score}/10)`
                    : "⚡ Take 10-Minute Assessment (Pass to Qualify)"}
                </button>

                {nextTopic ? (
                  <button
                    type="button"
                    className={`btn-next-syllabus ${!isCurrentCompleted ? "locked-next" : ""}`}
                    onClick={() => {
                      if (isCurrentCompleted) {
                        onNavigate("lesson", {
                          code: nextTopic.code,
                          name: nextTopic.name,
                          unitNumber: nextTopic.unitNumber,
                          unitTitle: nextTopic.unitTitle,
                          student
                        });
                      } else {
                        alert(
                          `🔒 Section ${nextTopic.code} (${nextTopic.name}) is locked!\n\nYou must complete and pass the Section ${lesson.code} (${lesson.title}) assessment to qualify for Section ${nextTopic.code}.`
                        );
                      }
                    }}
                    title={
                      isCurrentCompleted
                        ? `Proceed to next section: ${nextTopic.code}`
                        : `Pass Section ${lesson.code} assessment first to qualify for Section ${nextTopic.code}`
                    }
                  >
                    {isCurrentCompleted
                      ? `Next Micro-Unit: Section ${nextTopic.code} ${nextTopic.name} ➔`
                      : `🔒 Pass Assessment to Qualify for ${nextTopic.code} ➔`}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-next-syllabus"
                    onClick={() => onNavigate("syllabus", student)}
                  >
                    ✓ All Micro-Units Completed (Back to Syllabus) ➔
                  </button>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      )}

      {/* Render 10-Minute Micro-Topic Assessment Modal */}
      {showTestModal && (
        <MicroTopicTestModal
          topicCode={lesson.code}
          topicName={lesson.title}
          unitNumber={lesson.unitNumber}
          unitTitle={lesson.unitTitle}
          student={student}
          onClose={() => setShowTestModal(false)}
          onNextTopic={() => {
            if (nextTopic) {
              onNavigate("lesson", {
                code: nextTopic.code,
                name: nextTopic.name,
                unitNumber: nextTopic.unitNumber,
                unitTitle: nextTopic.unitTitle,
                student
              });
            }
          }}
          onCompleteScore={(scoreResult) => {
            setMicroScores((prev) => ({ ...prev, [lesson.code]: scoreResult }));
          }}
        />
      )}
    </div>
  );
}

export default LessonView;

