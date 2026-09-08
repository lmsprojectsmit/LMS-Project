import React, { useEffect, useMemo, useState } from "react";
import "./U1M01.css";
import { API_BASE_URL, getStudentId } from "./api";

const MICRO_UNIT_CODE = "U1-M01";
const VIDEO_URL = "https://www.youtube.com/watch?v=vtPuz4iKdTg";
const VIDEO_EMBED_URL = "https://www.youtube.com/embed/vtPuz4iKdTg";

function normaliseQuestion(raw, index) {
  // The API may expose options as `options`, `question_options`, a map,
  // or separate option_a/option_b/option_c/option_d fields. Prefer the
  // first non-empty representation so an empty `options: []` does not
  // hide the real question_options returned by the backend.
  const arrayOptions = [raw.options, raw.question_options, raw.questionOptions]
    .find((value) => Array.isArray(value) && value.length > 0);

  let normalisedOptions = [];

  if (arrayOptions) {
    normalisedOptions = arrayOptions
      .map((option, optionIndex) => {
        if (typeof option === "string") {
          return {
            key: String.fromCharCode(65 + optionIndex),
            text: option,
          };
        }

        return {
          key: option.key || option.option_key || option.optionKey || option.label || String.fromCharCode(65 + optionIndex),
          text: option.text || option.option_text || option.optionText || option.value || option.content || "",
        };
      })
      .filter((option) => option.text);
  } else {
    const optionsMap = raw.options_map || raw.options || raw.question_options || {};
    normalisedOptions = ["A", "B", "C", "D"]
      .map((key) => ({
        key,
        text:
          optionsMap[key] ||
          optionsMap[key.toLowerCase()] ||
          raw[`option_${key.toLowerCase()}`] ||
          raw[`option${key}`] ||
          "",
      }))
      .filter((option) => option.text);
  }

  return {
    id: raw.question_id || raw.id,
    number: index + 1,
    text: raw.question_text || raw.text || "",
    options: normalisedOptions,
    difficulty: raw.difficulty || "",
    bloom: raw.bloom_level || raw.bloom || "",
    hint: raw.hint || "",
  };
}

function getQuestionArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.questions)) return payload.questions;
  if (Array.isArray(payload.data)) return payload.data;
  if (Array.isArray(payload.items)) return payload.items;
  return [];
}

function U1M01({ onNavigate, student, onLogout }) {
  const [unit, setUnit] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [resources, setResources] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [attemptId, setAttemptId] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);

  const studentName = student?.fullName || student?.name || "Student";
  const studentId = getStudentId(student);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const [unitResponse, questionResponse, resourceResponse] = await Promise.all([
          fetch(`${API_BASE_URL}/api/micro-units/${MICRO_UNIT_CODE}`),
          fetch(`${API_BASE_URL}/api/micro-units/${MICRO_UNIT_CODE}/questions`),
          fetch(`${API_BASE_URL}/api/micro-units/${MICRO_UNIT_CODE}/resources`),
        ]);

        if (!unitResponse.ok) throw new Error(`Micro-unit request failed (${unitResponse.status})`);
        if (!questionResponse.ok) throw new Error(`Question request failed (${questionResponse.status})`);

        const unitData = await unitResponse.json();
        const questionData = await questionResponse.json();
        const resourceData = resourceResponse.ok ? await resourceResponse.json() : [];

        const loadedQuestions = getQuestionArray(questionData)
          .map(normaliseQuestion)
          .filter((q) => q.id && q.text)
          .slice(0, 10);

        if (loadedQuestions.length !== 10) {
          throw new Error(`Expected 10 U1-M01 MCQs, but the backend returned ${loadedQuestions.length}.`);
        }

        if (!cancelled) {
          setUnit(unitData);
          setQuestions(loadedQuestions);
          setResources(getQuestionArray(resourceData));
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Unable to load U1-M01.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, []);

  const resultant = useMemo(() => [2 * a + b, 1 * a + 1 * b], [a, b]);

  const chooseAnswer = (key) => {
    if (submitting || result) return;
    setAnswers((previous) => ({ ...previous, [questions[currentQuestion].id]: key }));
  };

  const startAttempt = async () => {
    const response = await fetch(`${API_BASE_URL}/api/micro-units/${MICRO_UNIT_CODE}/attempts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ student_id: studentId }),
    });
    if (!response.ok) throw new Error(`Could not start assessment (${response.status})`);
    const data = await response.json();
    const id = data.attempt_id || data.id;
    if (!id) throw new Error("Backend did not return an attempt id.");
    setAttemptId(id);
    return id;
  };

  const submitQuiz = async () => {
    if (Object.keys(answers).length !== questions.length) {
      setError("Please answer all 10 questions before submitting.");
      return;
    }

    setSubmitting(true);
    setError("");
    try {
      const activeAttemptId = attemptId || await startAttempt();

      for (const question of questions) {
        await fetch(`${API_BASE_URL}/api/attempts/${activeAttemptId}/responses`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question_id: question.id,
            student_answer: { option: answers[question.id] },
            time_seconds: 0,
            hint_used: false,
          }),
        }).then(async (response) => {
          if (!response.ok) throw new Error(`Could not save Q${question.number} (${response.status})`);
        });
      }

      const completeResponse = await fetch(`${API_BASE_URL}/api/attempts/${activeAttemptId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!completeResponse.ok) throw new Error(`Could not complete assessment (${completeResponse.status})`);

      const completion = await completeResponse.json();
      setResult(completion);
    } catch (err) {
      setError(err.message || "Assessment submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const retry = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setAttemptId(null);
    setResult(null);
    setError("");
  };

  if (loading) {
    return <div className="u1-loading">Loading U1-M01 from the LMS...</div>;
  }

  if (error && questions.length === 0) {
    return (
      <div className="u1-page">
        <header className="u1-topbar">
          <button onClick={() => onNavigate("syllabus", student)}>← Back to Syllabus</button>
          <strong>MA25C02 · Unit I</strong>
          <div className="u1-top-actions"><span>{studentName}</span>{onLogout && <button onClick={onLogout}>Logout</button>}</div>
        </header>
        <main className="u1-error-page">
          <h1>U1-M01 could not be loaded</h1>
          <p>{error}</p>
          <button className="u1-primary" onClick={() => window.location.reload()}>Try Again</button>
        </main>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selected = question ? answers[question.id] : null;
  const score = result?.score ?? result?.percentage;
  const status = result?.mastery_status || result?.status;
  const mastered = status === "Mastered" || Number(score) >= 80;

  return (
    <div className="u1-page">
      <header className="u1-topbar">
        <div className="u1-top-left">
          <button className="u1-back" onClick={() => onNavigate("syllabus", student)}>← Back to Syllabus</button>
          <span className="u1-breadcrumb">UNIT I / <strong>U1-M01</strong> / Understanding Vectors</span>
        </div>
        <div className="u1-course">Linear Algebra · MA25C02</div>
        <div className="u1-top-actions">
          <span>{studentName}</span>
          <button onClick={() => onNavigate("home", student)}>Home</button>
          {onLogout && <button className="u1-logout" onClick={onLogout}>Logout</button>}
        </div>
      </header>

      <main className="u1-main">
        <section className="u1-header-card">
          <div>
            <div className="u1-eyebrow">UNIT I · VECTOR SPACES · U1-M01</div>
            <h1>Understanding Vectors</h1>
            <p>Perform vector addition, scalar multiplication and represent vectors in R² and R³.</p>
          </div>
          <div className="u1-meta">
            <span>CO1</span><span>Understand</span><span>Easy</span><span>Mastery ≥ 80%</span>
          </div>
        </section>

        <section className="u1-learning-grid">
          <article className="u1-panel video-panel">
            <div className="u1-panel-heading"><h2>Reference Lecture</h2><a href={VIDEO_URL} target="_blank" rel="noreferrer">Open YouTube ↗</a></div>
            <div className="u1-video-wrap">
              <iframe src={VIDEO_EMBED_URL} title="U1-M01 Understanding Vectors reference lecture" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
            </div>
            <p className="u1-source-note">Reference video supplied for Unit I, Micro-topic U1-M01.</p>
          </article>

          <article className="u1-panel">
            <div className="u1-panel-heading"><h2>Learning objective</h2><span className="u1-code">U1-M01</span></div>
            <p>{unit?.description || "Build the basic operations needed to work with vectors in R² and R³."}</p>
            <div className="u1-objective-box">
              <strong>By the end of this micro-topic</strong>
              <ul>
                <li>Add vectors component-by-component.</li>
                <li>Multiply every component by a scalar.</li>
                <li>Interpret a vector as a directed displacement.</li>
                <li>Work confidently in R² and R³.</li>
              </ul>
            </div>
            {resources.length > 0 && (
              <div className="u1-resource-list">
                <strong>Learning resources</strong>
                {resources.map((resource, index) => (
                  <a key={resource.resource_id || resource.id || index} href={resource.url} target="_blank" rel="noreferrer">
                    {resource.title || resource.name || "Reference resource"}
                  </a>
                ))}
              </div>
            )}
          </article>
        </section>

        <section className="u1-panel u1-concepts">
          <div className="u1-panel-heading"><h2>Core concepts</h2><span>Vector operations</span></div>
          <div className="u1-concept-grid">
            <div><span>01</span><h3>Vector addition</h3><p>(x₁,y₁) + (x₂,y₂) = (x₁+x₂, y₁+y₂)</p></div>
            <div><span>02</span><h3>Scalar multiplication</h3><p>c(x,y) = (cx, cy)</p></div>
            <div><span>03</span><h3>Point representation</h3><p>PQ = Q − P</p></div>
          </div>
        </section>

        <section className="u1-panel u1-activity">
          <div className="u1-panel-heading"><div><h2>Interactive vector activity</h2><p>Change the scalars and observe the resultant vector.</p></div><span className="u1-live">Live calculation</span></div>
          <div className="u1-activity-grid">
            <div className="u1-controls">
              <div className="u1-vector-line"><strong>u</strong><span>(2, 1)</span><label>a <input type="range" min="-5" max="5" value={a} onChange={(e) => setA(Number(e.target.value))} /></label><b>{a}</b></div>
              <div className="u1-vector-line"><strong>v</strong><span>(1, 1)</span><label>b <input type="range" min="-5" max="5" value={b} onChange={(e) => setB(Number(e.target.value))} /></label><b>{b}</b></div>
              <div className="u1-equation">{a}u + {b}v = ({resultant[0]}, {resultant[1]})</div>
            </div>
            <div className="u1-vector-visual">
              <div className="u1-axis x-axis" /><div className="u1-axis y-axis" />
              <div className="u1-arrow arrow-u" style={{ transform: `rotate(${Math.atan2(1, 2)}rad)` }} />
              <div className="u1-result-label">Resultant: ({resultant[0]}, {resultant[1]})</div>
            </div>
          </div>
        </section>

        <section className="u1-panel u1-assessment">
          <div className="u1-assessment-head">
            <div><div className="u1-eyebrow">MASTERY CHECK</div><h2>U1-M01 Assessment</h2><p>10 MCQs · 3 Easy · 3 Medium · 4 Hard · Mastery threshold 80%</p></div>
            {!result && <span className="u1-progress">Question {currentQuestion + 1} of {questions.length}</span>}
          </div>

          {!result && question && (
            <>
              <div className="u1-question-nav">
                {questions.map((item, index) => <button key={item.id} className={index === currentQuestion ? "active" : answers[item.id] ? "answered" : ""} onClick={() => setCurrentQuestion(index)}>Q{index + 1}</button>)}
              </div>
              <div className="u1-question-card">
                <div className="u1-question-meta"><span>Q{question.number}</span><span>{question.difficulty}</span><span>{question.bloom}</span></div>
                <h3>{question.text}</h3>
                <div className="u1-options">
                  {question.options.map((option) => <button key={option.key} className={selected === option.key ? "selected" : ""} onClick={() => chooseAnswer(option.key)}><span>{option.key}</span><strong>{option.text}</strong></button>)}
                </div>
              </div>
              {error && <div className="u1-inline-error">{error}</div>}
              <div className="u1-assessment-actions">
                <button disabled={currentQuestion === 0} onClick={() => setCurrentQuestion((value) => value - 1)}>Previous</button>
                {currentQuestion < questions.length - 1 ? <button className="u1-primary" onClick={() => setCurrentQuestion((value) => value + 1)}>Next Question →</button> : <button className="u1-primary" disabled={submitting} onClick={submitQuiz}>{submitting ? "Submitting…" : "Submit Assessment"}</button>}
              </div>
            </>
          )}

          {result && (
            <div className="u1-result">
              <div className={mastered ? "u1-result-mark success" : "u1-result-mark remediation"}>{mastered ? "✓" : "!"}</div>
              <div><div className="u1-eyebrow">ASSESSMENT COMPLETE</div><h2>{mastered ? "U1-M01 Mastered" : "Remediation Required"}</h2><p>Your backend mastery status is <strong>{status || (mastered ? "Mastered" : "Remediation")}</strong>.</p></div>
              <div className="u1-score"><strong>{score ?? "—"}</strong><span>score</span></div>
              <div className="u1-result-actions">{!mastered && <button className="u1-primary" onClick={retry}>Retry Assessment</button>}<button onClick={() => onNavigate("syllabus", student)}>Back to Syllabus</button></div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default U1M01;
