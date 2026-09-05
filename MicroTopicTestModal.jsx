import React, { useState, useRef, useEffect } from "react";
import "./MicroTopicTestModal.css";
import {
  getMicroTopicTest,
  saveMicroTestScore
} from "./microTopicTests";

const TOTAL_TIME_SECONDS = 10 * 60; // 10 minutes

function MicroTopicTestModal({
  topicCode,
  topicName,
  unitNumber,
  unitTitle,
  student,
  onClose,
  onNextTopic,
  onCompleteScore
}) {
  const testData = getMicroTopicTest(topicCode, topicName, unitNumber);
  const questions = testData.questions || [];

  // Core Test session state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: "A" | "B" | ... }
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_SECONDS);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-test Warning and Strict Proctoring States
  const [isTestStarted, setIsTestStarted] = useState(false);
  const [rulesAgreed, setRulesAgreed] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [showViolationModal, setShowViolationModal] = useState(false);
  const [autoSubmittedViolation, setAutoSubmittedViolation] = useState(false);

  const timerRef = useRef(null);
  const timeTakenRef = useRef(0);
  const violationCountRef = useRef(0);
  const isSubmittedRef = useRef(false);
  const isTestStartedRef = useRef(false);

  useEffect(() => {
    isSubmittedRef.current = isSubmitted;
  }, [isSubmitted]);

  useEffect(() => {
    isTestStartedRef.current = isTestStarted;
  }, [isTestStarted]);

  // 10-Minute Countdown Timer (Only starts after student agrees to proctoring rules)
  useEffect(() => {
    if (!isTestStarted || isSubmitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          finishTest(false);
          return 0;
        }
        timeTakenRef.current = TOTAL_TIME_SECONDS - (prev - 1);
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTestStarted, isSubmitted]);

  // Active Proctoring: Detect Tab Switching, Window Blur, and App Exits
  useEffect(() => {
    if (!isTestStarted || isSubmitted) return;

    const recordViolation = () => {
      if (!isTestStartedRef.current || isSubmittedRef.current) return;

      const current = violationCountRef.current + 1;
      violationCountRef.current = current;
      setViolationCount(current);

      if (current === 1) {
        setShowViolationModal(true);
      } else if (current >= 2) {
        setShowViolationModal(false);
        setAutoSubmittedViolation(true);
        finishTest(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordViolation();
      }
    };

    const handleWindowBlur = () => {
      recordViolation();
    };

    const handleBeforeUnload = (e) => {
      if (isTestStartedRef.current && !isSubmittedRef.current) {
        e.preventDefault();
        e.returnValue = "Exiting this tab will auto-submit your test immediately!";
        return e.returnValue;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isTestStarted, isSubmitted]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (questionId, optionId) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const finishTest = (isViolationTermination = false) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSubmitted(true);
    isSubmittedRef.current = true;
    if (isViolationTermination) {
      setAutoSubmittedViolation(true);
    }

    // Calculate score
    let calculatedScore = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });

    const timeSpent = timeTakenRef.current || (TOTAL_TIME_SECONDS - timeLeft);
    const passed = calculatedScore >= 7; // Standard qualifying criterion (7+ / 10)

    const scoreResult = {
      score: calculatedScore,
      total: questions.length,
      percentage: Math.round((calculatedScore / questions.length) * 100),
      passed: passed,
      qualified: passed,
      timeSpentSeconds: timeSpent,
      topicCode: testData.topicCode,
      topicName: testData.topicName,
      unitNumber: testData.unitNumber,
      terminatedViolation: isViolationTermination
    };

    const updatedRecord = saveMicroTestScore(testData.topicCode, scoreResult, student);

    if (onCompleteScore) {
      onCompleteScore(updatedRecord);
    }
  };

  const handleRetake = () => {
    setUserAnswers({});
    setCurrentQIndex(0);
    setTimeLeft(TOTAL_TIME_SECONDS);
    setIsSubmitted(false);
    isSubmittedRef.current = false;
    setIsTestStarted(false);
    isTestStartedRef.current = false;
    setRulesAgreed(false);
    setViolationCount(0);
    violationCountRef.current = 0;
    setShowViolationModal(false);
    setAutoSubmittedViolation(false);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentQ = questions[currentQIndex] || questions[0];

  // Evaluation calculation
  let finalScore = 0;
  if (isSubmitted) {
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) finalScore += 1;
    });
  }
  const percentage = Math.round((finalScore / (questions.length || 10)) * 100);
  const isPassed = finalScore >= 7;

  return (
    <div className="mtt-overlay" role="dialog" aria-modal="true">
      <div className="mtt-container">
        {/* Top Header Bar */}
        <header className="mtt-header">
          <div className="mtt-header-left">
            <div className="mtt-tag-row">
              <span className="mtt-badge-unit">{testData.unitNumber}</span>
              <span className="mtt-badge-code">Micro-Unit {testData.topicCode}</span>
              <span className="mtt-badge-reg">10 Questions • 10 Mins</span>
            </div>
            <h2 className="mtt-topic-title">
              {testData.topicCode} {testData.topicName}
            </h2>
          </div>

          <div className="mtt-header-right">
            {!isTestStarted ? (
              <div className="mtt-pre-status-pill">
                <span>🛡️ Proctoring Verification</span>
              </div>
            ) : !isSubmitted ? (
              <div
                className={`mtt-timer-pill ${timeLeft <= 120 ? "critical" : ""}`}
                title="10-Minute Countdown Timer"
              >
                <span className="timer-icon">⏱️</span>
                <span className="timer-val">{formatTime(timeLeft)}</span>
              </div>
            ) : (
              <div className="mtt-completed-pill">
                <span>✅ Completed</span>
              </div>
            )}

            <button
              type="button"
              className="mtt-close-btn"
              onClick={onClose}
              title="Close Test"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </header>

        {/* VIEW 1: MANDATORY PRE-TEST BRIEFING & ANTI-TAB WARNING */}
        {!isTestStarted && !isSubmitted ? (
          <div className="mtt-pretest-briefing">
            <div className="ptb-shield-header">
              <span className="ptb-shield-icon">🛡️</span>
              <div>
                <h3 className="ptb-title">Examination Integrity & Anti-Cheating Protocol</h3>
                <p className="ptb-subtitle">
                  Academic Assessment for <strong>Section {testData.topicCode}: {testData.topicName}</strong>
                </p>
              </div>
            </div>

            {/* HIGH-VISIBILITY WARNING BOX */}
            <div className="ptb-warning-callout">
              <div className="pwc-top">
                <span className="pwc-icon">🚨</span>
                <strong className="pwc-heading">CRITICAL WARNING: DO NOT EXIT THIS TAB OR SWITCH APPS</strong>
              </div>
              <p className="pwc-desc">
                Once the assessment begins, <strong>you must not leave this browser tab or switch to any other application</strong>. The examination system continuously monitors window focus and page visibility.
              </p>
              <div className="pwc-rules-grid">
                <div className="pwc-rule-item">
                  <span className="pwc-badge warn">Violation 1</span>
                  <span>If you minimize the browser or switch tabs, an urgent proctoring alert will block your screen.</span>
                </div>
                <div className="pwc-rule-item">
                  <span className="pwc-badge crit">Violation 2</span>
                  <span>Any subsequent tab switch or application exit will <strong>immediately terminate and auto-submit</strong> your test.</span>
                </div>
              </div>
            </div>

            {/* ASSESSMENT SPECIFICATIONS */}
            <div className="ptb-specs-grid">
              <div className="ptb-spec-card">
                <span className="psc-icon">⏱️</span>
                <span className="psc-val">10 Minutes</span>
                <span className="psc-label">Strict Countdown</span>
              </div>
              <div className="ptb-spec-card">
                <span className="psc-icon">❓</span>
                <span className="psc-val">10 Questions</span>
                <span className="psc-label">Multiple Choice</span>
              </div>
              <div className="ptb-spec-card">
                <span className="psc-icon">🎯</span>
                <span className="psc-val">≥ 7 / 10 Marks</span>
                <span className="psc-label">Required to Qualify Next Unit</span>
              </div>
              <div className="ptb-spec-card">
                <span className="psc-icon">👁️</span>
                <span className="psc-val">Active Proctor</span>
                <span className="psc-label">Focus Monitoring On</span>
              </div>
            </div>

            {/* MANDATORY STUDENT ACKNOWLEDGEMENT */}
            <div className="ptb-acknowledgement-box">
              <label className="ptb-check-label">
                <input
                  type="checkbox"
                  checked={rulesAgreed}
                  onChange={(e) => setRulesAgreed(e.target.checked)}
                  className="ptb-checkbox"
                />
                <span className="ptb-check-text">
                  I confirm that I will not switch tabs, minimize this browser window, or open other applications during this test. I understand that doing so will result in immediate termination and automatic submission.
                </span>
              </label>
            </div>

            {/* START BUTTON */}
            <div className="ptb-actions-row">
              <button
                type="button"
                className="btn-cancel-test"
                onClick={onClose}
              >
                Cancel & Return to Lesson
              </button>
              <button
                type="button"
                className={`btn-start-proctored-test ${!rulesAgreed ? "disabled" : ""}`}
                disabled={!rulesAgreed}
                onClick={() => setIsTestStarted(true)}
              >
                I Agree — Start Assessment Now
              </button>
            </div>
          </div>
        ) : !isSubmitted ? (
          <div className="mtt-test-body-streamlined">
            {/* Quick Question Switcher Bar */}
            <div className="mtt-nav-pills-bar">
              <div className="mtt-progress-info">
                <span>
                  Question <strong>{currentQIndex + 1}</strong> of {questions.length}
                </span>
                <span className="mtt-answered-txt">
                  ({answeredCount} of {questions.length} answered)
                </span>
              </div>

              <div className="mtt-question-pills">
                {questions.map((q, idx) => {
                  const isAnswered = !!userAnswers[q.id];
                  const isCurrent = currentQIndex === idx;

                  let pillClass = "mtt-q-pill";
                  if (isCurrent) pillClass += " current";
                  else if (isAnswered) pillClass += " answered";

                  return (
                    <button
                      key={q.id}
                      type="button"
                      className={pillClass}
                      onClick={() => setCurrentQIndex(idx)}
                      title={`Jump to Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Question Card */}
            <main className="mtt-question-area-clean">
              <div className="question-box-card">
                <div className="qb-top-meta">
                  <span className="qb-qnum">
                    Question {currentQIndex + 1}
                  </span>
                  <span className="qb-weight-pill">1.0 Mark</span>
                </div>

                <h3 className="qb-prompt">{currentQ.question}</h3>

                {/* 4 Options */}
                <div className="options-container">
                  {currentQ.options.map((opt) => {
                    const isSelected = userAnswers[currentQ.id] === opt.id;
                    return (
                      <div
                        key={opt.id}
                        className={`opt-card ${isSelected ? "selected" : ""}`}
                        onClick={() => handleSelectOption(currentQ.id, opt.id)}
                        role="radio"
                        aria-checked={isSelected}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            handleSelectOption(currentQ.id, opt.id);
                          }
                        }}
                      >
                        <div className="opt-letter-circle">{opt.id}</div>
                        <div className="opt-text">{opt.text}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Navigation Actions */}
                <div className="qb-actions-bar">
                  <div className="qb-actions-left">
                    <button
                      type="button"
                      className="btn-nav-prev"
                      disabled={currentQIndex === 0}
                      onClick={() => setCurrentQIndex((p) => Math.max(0, p - 1))}
                    >
                      ← Previous
                    </button>
                  </div>

                  <div className="qb-actions-right">
                    {currentQIndex < questions.length - 1 ? (
                      <button
                        type="button"
                        className="btn-nav-next"
                        onClick={() => setCurrentQIndex((p) => Math.min(questions.length - 1, p + 1))}
                      >
                        Next →
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn-nav-submit"
                        onClick={finishTest}
                      >
                        Submit Test ✓
                      </button>
                    )}

                    {answeredCount > 0 && currentQIndex < questions.length - 1 && (
                      <button
                        type="button"
                        className="btn-quick-submit"
                        onClick={finishTest}
                        title="Submit all answers now"
                      >
                        Submit ({answeredCount}/{questions.length})
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </main>
          </div>
        ) : (
          /* RESULTS & SOLUTIONS VIEW */
          <div className="mtt-results-view">
            {autoSubmittedViolation && (
              <div className="mtt-violation-termination-banner">
                <span className="vtb-icon">🚨</span>
                <div className="vtb-content">
                  <strong className="vtb-title">Assessment Terminated & Auto-Submitted by Proctoring System</strong>
                  <p className="vtb-text">
                    Multiple tab switches, window minimizations, or application exits were detected during your examination. Your assessment was immediately finalized and scored with the answers submitted prior to termination.
                  </p>
                </div>
              </div>
            )}

            {/* Score Summary Card */}
            <div className="results-hero-card">
              <div className="rh-score-bubble">
                <span className="rh-num">{finalScore}</span>
                <span className="rh-denom">/ {questions.length}</span>
                <span className="rh-pct">{percentage}%</span>
              </div>

              <div className="rh-details">
                <div className={`rh-tag ${isPassed ? "tag-qualified" : "tag-failed"}`}>
                  {isPassed ? "🎉 PASSED (MASTERED)" : "⚠️ KEEP PRACTICING"}
                </div>
                <h3 className="rh-headline">
                  {isPassed
                    ? `Great job! You scored ${finalScore} out of ${questions.length} marks!`
                    : `You scored ${finalScore} out of ${questions.length}. Review the explanations below and retake to master!`}
                </h3>
                <p className="rh-subtext">
                  Topic: <strong>{testData.topicCode} {testData.topicName}</strong> • Passing Benchmark: <strong>7 / 10 (70%)</strong>
                </p>
              </div>

              <div className="rh-actions">
                <button type="button" className="btn-res-retake" onClick={handleRetake}>
                  🔄 Retake Test
                </button>
                <button type="button" className="btn-res-close" onClick={onClose}>
                  ✓ Done & Back to Lesson
                </button>
                {isPassed && onNextTopic && (
                  <button
                    type="button"
                    className="btn-res-next"
                    onClick={() => {
                      onClose();
                      onNextTopic();
                    }}
                  >
                    Next Micro-Topic ➔
                  </button>
                )}
              </div>
            </div>

            {/* Questions & Solutions List */}
            <div className="mtt-solutions-section">
              <h4 className="sfs-title">Question Solutions & Concept Explanations</h4>

              <div className="sol-cards-list">
                {questions.map((q) => {
                  const userPick = userAnswers[q.id];
                  const isCorrect = userPick === q.correctAnswer;
                  const correctOptObj = q.options.find((o) => o.id === q.correctAnswer);
                  const userOptObj = q.options.find((o) => o.id === userPick);

                  return (
                    <div
                      key={q.id}
                      className={`solution-card ${isCorrect ? "card-correct" : "card-incorrect"}`}
                    >
                      <div className="sc-header">
                        <span className={`sc-badge ${isCorrect ? "correct" : "incorrect"}`}>
                          {isCorrect ? "✓ Correct (+1)" : "✕ Incorrect (0)"}
                        </span>
                        <span className="sc-qnum">Question {q.id}</span>
                      </div>

                      <p className="sc-question-text">{q.question}</p>

                      <div className="sc-answers-compare">
                        <div className={`ans-pill ${isCorrect ? "good" : "bad"}`}>
                          <span className="ap-lbl">Your Answer:</span>
                          <span className="ap-val">
                            {userPick ? `${userPick}: ${userOptObj?.text}` : "Skipped"}
                          </span>
                        </div>

                        {!isCorrect && (
                          <div className="ans-pill correct-target">
                            <span className="ap-lbl">Correct Answer:</span>
                            <span className="ap-val">
                              {q.correctAnswer}: {correctOptObj?.text}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="sc-explanation-box">
                        <div className="exp-top">
                          <span className="exp-icon">💡</span>
                          <strong>Explanation:</strong>
                        </div>
                        <p className="exp-text">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Full-Screen Anti-Tab Violation Alert Overlay (Strike 1 Warning) */}
        {showViolationModal && (
          <div className="proctor-violation-overlay" role="alertdialog">
            <div className="proctor-violation-box">
              <div className="pvb-icon">🚨</div>
              <h2 className="pvb-title">PROCTORING VIOLATION: TAB / APP EXIT DETECTED!</h2>
              <div className="pvb-badge">Warning 1 of 2 Recorded</div>
              <p className="pvb-message">
                Our examination security engine detected that you navigated away from the active test tab or switched applications.
              </p>
              <div className="pvb-danger-notice">
                ⚠️ <strong>FINAL WARNING:</strong> Exiting this tab or app one more time will result in <strong>instant test termination and immediate automatic submission</strong>.
              </div>
              <button
                type="button"
                className="btn-pvb-acknowledge"
                onClick={() => setShowViolationModal(false)}
              >
                I Understand — Return to My Test (Final Warning) ➔
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MicroTopicTestModal;
