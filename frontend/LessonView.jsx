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

const getLocalizedVideoData = (code, title, langId) => {
  const contentMap = {
    en: {
      summary: `Step-by-step examination of the core mathematical principles, formal proofs, and worked university problems for Section ${code} - ${title}.`,
      subtitles: [
        `Welcome students to Section ${code}. Today we analyze ${title} and its foundational mathematical axioms.`,
        "Notice the formal condition: any vector operations must preserve closure under vector addition and scalar multiplication.",
        "Now let us examine the matrix representation and solve the university 8-mark problem step-by-step.",
        "Full consistency is confirmed using elementary row reductions and rank-nullity criteria."
      ],
      audioNotice: "Original English Academic Audio (Prof. Dr. K. Senthil Kumar, Anna University)",
      activeNote: "English technical lecture audio active. Mathematical notations align with Dr. G. Balaji prescribed textbook."
    },
    ta: {
      summary: `பிரிவு ${code} - ${title} குறித்த விரிவான பாட விளக்கம். அண்ணா பல்கலைக்கழக தேர்வு வினாக்கள், முக்கிய தேற்றங்கள் மற்றும் படிநிலைகள் (Tamil Bilingual Dub).`,
      subtitles: [
        `வணக்கம் மாணவர்களே! பிரிவு ${code} - ${title} மற்றும் அதன் முக்கிய இயற்கணித விதிகளை கற்கவுள்ளோம்.`,
        "இங்கே கவனியுங்கள்: எந்த இரு வெக்டர்களுக்கும் கூட்டல் மற்றும் ஸ்கேலர் பெருக்கல் அடைவு விதி (Closure Axiom) கட்டாயம் பொருந்த வேண்டும்.",
        "அடுத்து அணி அமைப்பை (Matrix representation) கொண்டு அண்ணா பல்கலைக்கழக 8-மதிப்பெண் கணக்கை படிப்படியாக தீர்ப்போம்.",
        "ரோ-ரிடக்ஷன் (Row reduction) மற்றும் அணிக்கோவை மூலம் தீர்வு சரிபார்க்கப்பட்டு முழு மதிப்பெண் பெறப்படுகிறது."
      ],
      audioNotice: "தமிழ் இருமொழி ஆடியோ விளக்கம் (Tamil Bilingual Dubbed Audio)",
      activeNote: "அண்ணா பல்கலைக்கழக பொறியியல் கணித பாடத்திட்டத்திற்கு ஏற்ற தமிழ் வழி விளக்க ஆடியோ மற்றும் குறிப்புகள்."
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
    videoTopicSummary: "Step-by-step examination of the 10 algebraic axioms that define a vector space over ℝ. Includes visual geometric proofs for ℝⁿ and counterexamples.",
    timestamps: [
      { time: "00:00", label: "Introduction to Abstract Linear Spaces" },
      { time: "03:15", label: "Vector Addition Axioms (Closure, Associativity, Identity, Inverse)" },
      { time: "07:40", label: "Scalar Multiplication Axioms & Distributive Laws" },
      { time: "11:25", label: "Standard Examples: Euclidean ℝⁿ, Polynomials Pₙ(t), Matrices Mₘ×ₙ" }
    ],
    notes: {
      introduction: "A Vector Space V over the real field ℝ is an algebraic structure consisting of a non-empty set of objects (vectors), together with two operations—vector addition (+) and scalar multiplication (·)—satisfying 10 fundamental axioms.",
      axioms: [
        { name: "Closure under Addition", formula: "∀ u, v ∈ V ⟹ u + v ∈ V" },
        { name: "Commutativity of Addition", formula: "u + v = v + u" },
        { name: "Associativity of Addition", formula: "(u + v) + w = u + (v + w)" },
        { name: "Additive Identity (Zero Vector)", formula: "∃ 0 ∈ V such that u + 0 = u, ∀ u ∈ V" },
        { name: "Additive Inverse", formula: "∀ u ∈ V, ∃ (-u) ∈ V such that u + (-u) = 0" },
        { name: "Closure under Scalar Multiplication", formula: "∀ c ∈ ℝ, ∀ u ∈ V ⟹ c·u ∈ V" },
        { name: "Distributive over Vector Addition", formula: "c·(u + v) = c·u + c·v" },
        { name: "Distributive over Scalar Addition", formula: "(c + d)·u = c·u + d·u" },
        { name: "Associativity of Scalar Multiplication", formula: "(cd)·u = c·(d·u)" },
        { name: "Unit Scalar Identity", formula: "1·u = u, ∀ u ∈ V" }
      ],
      theorems: [
        {
          title: "Uniqueness of Zero Vector",
          statement: "The zero element 0 in a vector space V is unique.",
          proof: "Suppose 0₁ and 0₂ are two zero elements. Then 0₁ + 0₂ = 0₁ (since 0₂ is identity), and 0₁ + 0₂ = 0₂ + 0₁ = 0₂ (since 0₁ is identity). Therefore 0₁ = 0₂. Hence unique. (Q.E.D.)"
        },
        {
          title: "Zero Scalar Property",
          statement: "For any vector u ∈ V, 0 · u = 0.",
          proof: "0·u = (0 + 0)·u = 0·u + 0·u. Adding the additive inverse -(0·u) to both sides yields 0 = 0·u."
        }
      ],
      workedExample: {
        problem: "Determine whether the set V = {(x, y) ∈ ℝ² : x ≥ 0, y ≥ 0} with standard addition and scalar multiplication is a vector space over ℝ.",
        steps: [
          "Step 1: Check Closure under Vector Addition: Let u = (x₁, y₁) and v = (x₂, y₂) with x₁, y₁, x₂, y₂ ≥ 0. Then u + v = (x₁ + x₂, y₁ + y₂) where x₁ + x₂ ≥ 0 and y₁ + y₂ ≥ 0. Addition closure holds.",
          "Step 2: Check Additive Inverse: For u = (2, 3) ∈ V, the additive inverse is (-2, -3). However, -2 < 0 and -3 < 0, so (-2, -3) ∉ V.",
          "Step 3: Check Scalar Multiplication Closure: Take scalar c = -1 ∈ ℝ and u = (2, 3) ∈ V. Then c·u = -1·(2, 3) = (-2, -3) ∉ V.",
          "Conclusion: Since additive inverse and scalar multiplication closure fail, V is NOT a vector space over ℝ."
        ]
      },
      universityTips: [
        "In 2-mark Anna University questions, always state both closure axioms and the existence of the zero vector first.",
        "Remember that the set of all polynomials of degree strictly equal to n does NOT form a vector space (since (xⁿ + 1) + (-xⁿ + x) = x + 1, degree drops to 1, violating closure!). However, polynomials of degree ≤ n DO form a vector space Pₙ(t)."
      ]
    }
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
    videoTopicSummary: "Understanding the two-step and one-step subspace criteria. Detailed geometric visualization of planes passing through the origin versus affine planes in ℝ³.",
    timestamps: [
      { time: "00:00", label: "Definition of a Subspace" },
      { time: "02:45", label: "The Two-Step Closure Test" },
      { time: "06:10", label: "Geometry of Subspaces in ℝ³" },
      { time: "10:30", label: "Intersection and Union of Subspaces" },
      { time: "14:00", label: "Solved Anna University Problem" }
    ],
    notes: {
      introduction: "A non-empty subset W of a vector space V is called a subspace of V if W is itself a vector space under the vector addition and scalar multiplication defined on V.",
      axioms: [
        { name: "Zero Vector Requirement", formula: "0 ∈ W (Non-emptiness check)" },
        { name: "Closure under Addition", formula: "∀ u, v ∈ W ⟹ u + v ∈ W" },
        { name: "Closure under Scalar Multiplication", formula: "∀ c ∈ ℝ, ∀ u ∈ W ⟹ c·u ∈ W" },
        { name: "One-Step Criterion", formula: "∀ c, d ∈ ℝ and u, v ∈ W ⟹ cu + dv ∈ W" }
      ],
      theorems: [
        {
          title: "Intersection of Subspaces Theorem",
          statement: "If W₁ and W₂ are subspaces of a vector space V, then their intersection W₁ ∩ W₂ is also a subspace of V.",
          proof: "Since 0 ∈ W₁ and 0 ∈ W₂, 0 ∈ W₁ ∩ W₂ (non-empty). For u, v ∈ W₁ ∩ W₂ and c, d ∈ ℝ: cu + dv ∈ W₁ (since W₁ is a subspace) and cu + dv ∈ W₂ (since W₂ is a subspace). Therefore, cu + dv ∈ W₁ ∩ W₂. Thus W₁ ∩ W₂ is a subspace."
        }
      ],
      workedExample: {
        problem: "Show that the set W = {(x, y, z) ∈ ℝ³ : 2x - 3y + z = 0} is a subspace of ℝ³.",
        steps: [
          "Step 1: Check 0 ∈ W: 2(0) - 3(0) + 0 = 0. Zero vector is present.",
          "Step 2: Let u = (x₁, y₁, z₁) and v = (x₂, y₂, z₂) be in W. Then 2x₁ - 3y₁ + z₁ = 0 and 2x₂ - 3y₂ + z₂ = 0.",
          "Step 3: Form linear combination cu + dv = (cx₁ + dx₂, cy₁ + dy₂, cz₁ + dz₂).",
          "Step 4: Evaluate 2(cx₁ + dx₂) - 3(cy₁ + dy₂) + (cz₁ + dz₂) = c(2x₁ - 3y₁ + z₁) + d(2x₂ - 3y₂ + z₂) = c(0) + d(0) = 0.",
          "Conclusion: W is closed under linear combinations and contains 0. Therefore, W is a valid subspace of ℝ³ (a plane passing through the origin)."
        ]
      },
      universityTips: [
        "If an equation has a non-zero constant (e.g. 2x - 3y + z = 5), the zero vector (0, 0, 0) fails: 2(0) - 3(0) + 0 = 0 ≠ 5. Immediately conclude it is NOT a subspace!",
        "The union W₁ ∪ W₂ is generally NOT a subspace unless one is contained in the other."
      ]
    }
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
    videoTopicSummary: "Testing vector membership in Span(S) using augmented matrices, row echelon forms, and consistency criteria (Rouché-Capelli theorem).",
    timestamps: [
      { time: "00:00", label: "Concept of Linear Combinations" },
      { time: "04:10", label: "Span(S) Definition and Properties" },
      { time: "08:30", label: "Solving Augmented Systems Ax = b" },
      { time: "13:00", label: "University Solved Problem" }
    ],
    notes: {
      introduction: "A vector v is a linear combination of vectors v₁, v₂, ..., vₖ if there exist scalars c₁, c₂, ..., cₖ such that v = c₁v₁ + c₂v₂ + ... + cₖvₖ. The set of all linear combinations is denoted Span(S).",
      axioms: [
        { name: "Linear Combination Formula", formula: "v = ∑ cᵢ vᵢ" },
        { name: "Span Definition", formula: "Span(S) = { ∑ cᵢ vᵢ : cᵢ ∈ ℝ, vᵢ ∈ S }" },
        { name: "Minimal Subspace", formula: "Span(S) is the smallest subspace containing S" }
      ],
      theorems: [
        {
          title: "Span is a Subspace Theorem",
          statement: "For any non-empty subset S of a vector space V, Span(S) is a subspace of V.",
          proof: "0 = 0·v₁ ∈ Span(S). Any linear combination of linear combinations remains a linear combination by distributivity of scalars."
        }
      ],
      workedExample: {
        problem: "Determine whether the vector b = (2, 5, 3) belongs to the span of S = {(1, 2, 1), (0, 1, 1)}.",
        steps: [
          "Step 1: Set up vector equation: c₁(1, 2, 1) + c₂(0, 1, 1) = (2, 5, 3).",
          "Step 2: Equivalent linear system: c₁ = 2, 2c₁ + c₂ = 5, c₁ + c₂ = 3.",
          "Step 3: From eq 1, c₁ = 2. Substitute in eq 2: 2(2) + c₂ = 5 ⟹ c₂ = 1.",
          "Step 4: Check eq 3: c₁ + c₂ = 2 + 1 = 3. Consistent!",
          "Conclusion: Since unique scalars c₁ = 2 and c₂ = 1 exist, (2, 5, 3) ∈ Span(S)."
        ]
      },
      universityTips: [
        "Always express the vectors as columns of a matrix A and solve Ax = b via Gaussian elimination.",
        "If rank[A] = rank[A|b], the vector belongs to the span."
      ]
    }
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
    videoTopicSummary: "Linear operators, mapping properties, preservation of linear combinations, and standard matrix representation in ℝ² and ℝ³.",
    timestamps: [
      { time: "00:00", label: "Definition of Linear Mapping T: V → W" },
      { time: "04:30", label: "Properties: T(0) = 0 and T(-v) = -T(v)" },
      { time: "08:15", label: "Geometric Transformations (Rotations, Reflections, Shears)" },
      { time: "14:40", label: "Matrix Representation [T]" }
    ],
    notes: {
      introduction: "A function T: V → W between two vector spaces over ℝ is called a linear transformation if it preserves vector addition and scalar multiplication.",
      axioms: [
        { name: "Preservation of Addition", formula: "T(u + v) = T(u) + T(v), ∀ u, v ∈ V" },
        { name: "Preservation of Scalar Multiplication", formula: "T(c·u) = c·T(u), ∀ c ∈ ℝ, u ∈ V" },
        { name: "Superposition Principle", formula: "T(c₁u₁ + c₂u₂) = c₁T(u₁) + c₂T(u₂)" }
      ],
      theorems: [
        {
          title: "Zero Vector Preservation",
          statement: "If T: V → W is a linear transformation, then T(0_V) = 0_W.",
          proof: "T(0) = T(0 + 0) = T(0) + T(0). Subtracting T(0) from both sides gives 0 = T(0)."
        }
      ],
      workedExample: {
        problem: "Check whether T: ℝ² → ℝ² defined by T(x, y) = (2x - y, x + 3y) is linear.",
        steps: [
          "Step 1: Let u = (x₁, y₁) and v = (x₂, y₂). T(u + v) = T(x₁ + x₂, y₁ + y₂) = (2(x₁ + x₂) - (y₁ + y₂), (x₁ + x₂) + 3(y₁ + y₂)).",
          "Step 2: Group terms: = (2x₁ - y₁, x₁ + 3y₁) + (2x₂ - y₂, x₂ + 3y₂) = T(u) + T(v).",
          "Step 3: T(cu) = T(cx₁, cy₁) = (2cx₁ - cy₁, cx₁ + 3cy₁) = c(2x₁ - y₁, x₁ + 3y₁) = cT(u).",
          "Conclusion: T satisfies both linearity conditions, hence T is a linear transformation."
        ]
      },
      universityTips: [
        "If a transformation has constant terms (like T(x, y) = (x + 1, y)), then T(0, 0) = (1, 0) ≠ (0, 0). It is NEVER linear!"
      ]
    }
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
    videoTopicSummary: "Deep dive into the fundamental theorem of linear algebra: dim(V) = rank(T) + nullity(T). Calculating Ker(T), Im(T), and testing injectivity and surjectivity.",
    timestamps: [
      { time: "00:00", label: "Kernel (Null Space) Definition" },
      { time: "05:10", label: "Range (Image Space) Definition" },
      { time: "09:30", label: "Statement & Proof of Rank-Nullity Theorem" },
      { time: "16:00", label: "Comprehensive 8-Mark Solved Problem" }
    ],
    notes: {
      introduction: "The Kernel (Null Space) consists of all vectors mapped to zero, while the Range (Image) is the set of all transformation outputs. The Rank-Nullity Theorem ties their dimensions together.",
      axioms: [
        { name: "Kernel Definition", formula: "Ker(T) = { v ∈ V : T(v) = 0 }" },
        { name: "Range Definition", formula: "Range(T) = { T(v) : v ∈ V }" },
        { name: "Rank & Nullity", formula: "rank(T) = dim(Range(T)), nullity(T) = dim(Ker(T))" },
        { name: "Rank-Nullity Theorem", formula: "dim(V) = rank(T) + nullity(T)" }
      ],
      theorems: [
        {
          title: "Rank-Nullity Theorem (Dimension Theorem)",
          statement: "Let T: V → W be a linear transformation from a finite-dimensional vector space V to W. Then dim(V) = rank(T) + nullity(T).",
          proof: "Let nullity(T) = k, and let {v₁, ..., vₖ} be a basis for Ker(T). Extend this to a basis {v₁, ..., vₖ, u₁, ..., uᵣ} of V, where k + r = n = dim(V). We show {T(u₁), ..., T(uᵣ)} forms a basis for Range(T), meaning rank(T) = r. Hence n = k + r."
        }
      ],
      workedExample: {
        problem: "Verify Rank-Nullity Theorem for T: ℝ³ → ℝ³ defined by T(x, y, z) = (x + y, y + z, x - z).",
        steps: [
          "Step 1: Find Ker(T): Set T(x, y, z) = (0, 0, 0) ⟹ x + y = 0, y + z = 0, x - z = 0.",
          "Step 2: Express in terms of free variable: x = -y = z. Let z = t. Vector is (t, -t, t) = t(1, -1, 1).",
          "Step 3: Basis of Ker(T) = {(1, -1, 1)}. Hence nullity(T) = 1.",
          "Step 4: Find rank(T): Matrix representation A = [[1, 1, 0], [0, 1, 1], [1, 0, -1]]. Row reduce: R3 -> R3 - R1 ⟹ [[1, 1, 0], [0, 1, 1], [0, -1, -1]] -> R3 -> R3 + R2 ⟹ [[1, 1, 0], [0, 1, 1], [0, 0, 0]]. Number of non-zero rows = 2. Hence rank(T) = 2.",
          "Step 5: Verify: rank(T) + nullity(T) = 2 + 1 = 3 = dim(ℝ³). Theorem verified!"
        ]
      },
      universityTips: [
        "T is one-to-one (injective) if and only if Ker(T) = {0}, which means nullity(T) = 0.",
        "T is onto (surjective) if and only if rank(T) = dim(W)."
      ]
    }
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
    videoTopicSummary: "Algorithm for converting any linearly independent basis into an orthonormal basis. Step-by-step projection subtraction and normalization.",
    timestamps: [
      { time: "00:00", label: "Need for Orthonormal Bases" },
      { time: "03:40", label: "Orthogonal Projection Formula" },
      { time: "07:20", label: "The Gram-Schmidt Recurrence Formula" },
      { time: "14:15", label: "Full 16-Mark Solved Problem in ℝ³" }
    ],
    notes: {
      introduction: "The Gram-Schmidt algorithm takes a linearly independent set of vectors {v₁, v₂, ..., vₖ} and constructs an orthogonal set {u₁, u₂, ..., uₖ}, which is then normalized to form an orthonormal set {e₁, e₂, ..., eₖ}.",
      axioms: [
        { name: "First Vector", formula: "u₁ = v₁" },
        { name: "Second Vector", formula: "u₂ = v₂ - [⟨v₂, u₁⟩ / ⟨u₁, u₁⟩] u₁" },
        { name: "Third Vector", formula: "u₃ = v₃ - [⟨v₃, u₁⟩ / ⟨u₁, u₁⟩] u₁ - [⟨v₃, u₂⟩ / ⟨u₂, u₂⟩] u₂" },
        { name: "Orthonormalization Step", formula: "eᵢ = uᵢ / ||uᵢ||, ∀ i" }
      ],
      theorems: [
        {
          title: "Orthogonality Property",
          statement: "The set {u₁, u₂, ..., uₖ} produced by Gram-Schmidt satisfies ⟨uᵢ, uⱼ⟩ = 0 for all i ≠ j.",
          proof: "By construction, each uₖ is orthogonal to Span{u₁, ..., uₖ₋₁} via projection subtraction."
        }
      ],
      workedExample: {
        problem: "Transform the basis v₁ = (1, 1, 1), v₂ = (0, 1, 1), v₃ = (0, 0, 1) into an orthonormal basis using the Gram-Schmidt process.",
        steps: [
          "Step 1: u₁ = v₁ = (1, 1, 1). Compute ||u₁||² = 1² + 1² + 1² = 3.",
          "Step 2: ⟨v₂, u₁⟩ = 0(1) + 1(1) + 1(1) = 2. u₂ = v₂ - (2/3)u₁ = (0, 1, 1) - (2/3, 2/3, 2/3) = (-2/3, 1/3, 1/3). Multiply by 3 for convenience: u₂' = (-2, 1, 1). ||u₂'||² = 4 + 1 + 1 = 6.",
          "Step 3: ⟨v₃, u₁⟩ = 1, ⟨v₃, u₂'⟩ = 1. u₃ = v₃ - (1/3)u₁ - (1/6)u₂' = (0, 0, 1) - (1/3, 1/3, 1/3) - (-2/6, 1/6, 1/6) = (0, -1/2, 1/2). Multiply by 2: u₃' = (0, -1, 1). ||u₃'||² = 2.",
          "Step 4: Normalize: e₁ = (1/√3)(1, 1, 1), e₂ = (1/√6)(-2, 1, 1), e₃ = (1/√2)(0, -1, 1).",
          "Conclusion: {e₁, e₂, e₃} is the required orthonormal basis."
        ]
      },
      universityTips: [
        "Always double-check that ⟨e₁, e₂⟩ = 0 and ⟨e₂, e₃⟩ = 0 before submitting your final answer to catch arithmetic errors immediately."
      ]
    }
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
    videoTopicSummary: "The crown jewel of modern linear algebra: A = U Σ Vᵀ. Deriving singular values, constructing left and right singular vectors, and engineering applications.",
    timestamps: [
      { time: "00:00", label: "Intuition behind SVD vs Diagonalization" },
      { time: "05:20", label: "Singular Values σᵢ = √λᵢ(AᵀA)" },
      { time: "11:00", label: "Constructing V, Σ, and U matrices" },
      { time: "18:30", label: "Applications in Image Compression & PCA" }
    ],
    notes: {
      introduction: "Singular Value Decomposition factors any real m×n matrix A into the product A = U Σ Vᵀ, where U is an m×m orthogonal matrix, Σ is an m×n diagonal matrix with non-negative singular values, and V is an n×n orthogonal matrix.",
      axioms: [
        { name: "SVD Factorization", formula: "A = U Σ Vᵀ" },
        { name: "Singular Values", formula: "σᵢ = √λᵢ, where λᵢ are eigenvalues of AᵀA" },
        { name: "Right Singular Vectors", formula: "AᵀA vᵢ = λᵢ vᵢ (Columns of V)" },
        { name: "Left Singular Vectors", formula: "uᵢ = (1/σᵢ) A vᵢ (Columns of U)" }
      ],
      theorems: [
        {
          title: "SVD Existence Theorem",
          statement: "Every real m×n matrix A has a singular value decomposition A = U Σ Vᵀ with singular values ordered as σ₁ ≥ σ₂ ≥ ... ≥ σᵣ > 0.",
          proof: "Since AᵀA is symmetric and positive semi-definite, it has real non-negative eigenvalues λ₁ ≥ ... ≥ λₙ ≥ 0 and an orthonormal basis of eigenvectors {v₁, ..., vₙ} forming V."
        }
      ],
      workedExample: {
        problem: "Compute the Singular Value Decomposition (SVD) of the matrix A = [[3, 2, 2], [2, 3, -2]].",
        steps: [
          "Step 1: Compute A Aᵀ: [[3, 2, 2], [2, 3, -2]] × [[3, 2], [2, 3], [2, -2]] = [[17, 8], [8, 17]].",
          "Step 2: Find eigenvalues of A Aᵀ: det([[17 - λ, 8], [8, 17 - λ]]) = (17 - λ)² - 64 = 0 ⟹ 17 - λ = ±8 ⟹ λ₁ = 25, λ₂ = 9.",
          "Step 3: Singular values: σ₁ = √25 = 5, σ₂ = √9 = 3. Hence Σ = [[5, 0, 0], [0, 3, 0]].",
          "Step 4: Find eigenvectors of A Aᵀ for U: For λ₁ = 25, u₁ = (1/√2)(1, 1)ᵀ. For λ₂ = 9, u₂ = (1/√2)(1, -1)ᵀ. Hence U = (1/√2)[[1, 1], [1, -1]].",
          "Step 5: Compute vᵢ = (1/σᵢ) Aᵀ uᵢ to obtain columns of V.",
          "Conclusion: A = U Σ Vᵀ is fully determined."
        ]
      },
      universityTips: [
        "In image compression, keeping only the top k singular values gives the best rank-k approximation (Eckart-Young-Mirsky Theorem)."
      ]
    }
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
    videoTopicSummary: `Comprehensive video lecture covering theoretical proofs, worked examples, and university questions for topic ${code} - ${topicTitle}.`,
    timestamps: [
      { time: "00:00", label: `Introduction to ${topicTitle}` },
      { time: "04:15", label: "Fundamental Theorems and Definitions" },
      { time: "09:30", label: "Step-by-Step Derivation" },
      { time: "14:00", label: "University Model Problems and Exam Tips" }
    ],
    notes: {
      introduction: `This lecture module covers in-depth principles for ${topicTitle} (Section ${code}), following Anna University Regulation 2025 and Dr. G. Balaji curriculum.`,
      axioms: [
        { name: "Core Principle", formula: "A x = b • det(A - λI) = 0" },
        { name: "Mathematical Criterion", formula: "dim(V) = rank(T) + nullity(T)" },
        { name: "Orthogonality / Decomposition", formula: "⟨u, v⟩ = 0 ⟹ A = U Σ Vᵀ" }
      ],
      theorems: [
        {
          title: `Fundamental Theorem for ${topicTitle}`,
          statement: `Detailed mathematical theorem asserting existence, uniqueness, and algebraic structure for ${topicTitle}.`,
          proof: "Derived systematically through row echelon operations, basis invariance, and spectral decomposition as prescribed in Dr. G. Balaji."
        }
      ],
      workedExample: {
        problem: `Apply the principles of ${topicTitle} to evaluate a standard university 8-mark problem.`,
        steps: [
          "Step 1: Set up the governing matrix equation and verify consistency.",
          "Step 2: Execute elementary row transformations or orthogonal projections.",
          "Step 3: Deduce eigenvalues, basis coordinates, or canonical form.",
          "Conclusion: Solution verified with full marks justification."
        ]
      },
      universityTips: [
        "Ensure all intermediate row operations are clearly marked (e.g., R2 -> R2 - 2R1).",
        "Refer to Dr. G. Balaji Chapter Exercises for practice with previous 5-year Anna University question papers."
      ]
    }
  };
};

function LessonView({ onNavigate, student, lessonInfo, onLogout, theme, onToggleTheme }) {
  const [activeTab, setActiveTab] = useState("all"); // "all" | "video" | "notes"
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [microScores, setMicroScores] = useState(() => getStoredMicroTestScores());
  const [videoLanguage, setVideoLanguage] = useState("en");
  const [showCaptions, setShowCaptions] = useState(true);
  const [subtitleIndex, setSubtitleIndex] = useState(0);
  const [langToast, setLangToast] = useState(null);

  // Video Playback Watch Completion Gating
  const [videoWatched, setVideoWatched] = useState(() => {
    try {
      return localStorage.getItem(`eduverse_video_completed_${lessonInfo?.code || "1.1"}`) === "true";
    } catch {
      return false;
    }
  });
  const [videoProgress, setVideoProgress] = useState(() => {
    try {
      return localStorage.getItem(`eduverse_video_completed_${lessonInfo?.code || "1.1"}`) === "true" ? 100 : 0;
    } catch {
      return 0;
    }
  });

  const studentName = student?.fullName || student?.name || "Student";
  const topicCode = lessonInfo?.code || "1.1";
  const unitNumber = lessonInfo?.unitNumber || "UNIT I";
  const unitTitle = lessonInfo?.unitTitle || "Vector Spaces";
  const topicName = lessonInfo?.name || "Vector Spaces & Axioms";

  const lesson = getLessonData(topicCode, unitTitle, topicName, unitNumber);
  const topicScoreData = microScores[lesson.code];

  // Qualification to next module strictly requires passing the micro-unit assessment
  const isCurrentCompleted = isMicroUnitCompleted(lesson.code, microScores);
  const isCurrentUnlocked = isMicroUnitUnlocked(lesson.code, microScores);
  const nextTopic = getNextMicroTopic(lesson.code);
  const prevTopic = getPreviousMicroTopic(lesson.code);

  const selectedLangConfig = VIDEO_LANGUAGES.find((l) => l.id === videoLanguage) || VIDEO_LANGUAGES[0];
  const localizedVideoData = getLocalizedVideoData(lesson.code, lesson.title, videoLanguage);

  // Synchronize video watch completion status when lesson code changes
  useEffect(() => {
    try {
      const isCompleted = localStorage.getItem(`eduverse_video_completed_${lesson.code}`) === "true";
      setVideoWatched(isCompleted);
      setVideoProgress(isCompleted ? 100 : 0);
    } catch {
      setVideoWatched(false);
      setVideoProgress(0);
    }
  }, [lesson.code]);

  // Advance video playback watch progress steadily while isPlaying is true
  useEffect(() => {
    let watchTimer = null;
    if (isPlaying && !videoWatched) {
      watchTimer = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 98) {
            clearInterval(watchTimer);
            setVideoWatched(true);
            try {
              localStorage.setItem(`eduverse_video_completed_${lesson.code}`, "true");
            } catch (e) {
              console.error(e);
            }
            return 100;
          }
          return prev + 2;
        });
      }, 750);
    }
    return () => {
      if (watchTimer) clearInterval(watchTimer);
    };
  }, [isPlaying, videoWatched, lesson.code]);

  useEffect(() => {
    if (lessonInfo?.startTest) {
      try {
        const isDone = localStorage.getItem(`eduverse_video_completed_${lesson.code}`) === "true";
        if (isDone || videoWatched) {
          setShowTestModal(true);
        } else {
          alert(
            `🔒 Assessment Locked!\n\nYou must watch the entire video lecture before you can attend the Section ${lesson.code} assessment.\n\nPlease play and finish the video first.`
          );
        }
      } catch {
        setShowTestModal(true);
      }
    }
  }, [lessonInfo, lesson.code]);

  // Synchronize dynamic subtitle advancement when playing
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setSubtitleIndex((prev) => (prev + 1) % 4);
      }, 4000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleLanguageChange = (newLang) => {
    setVideoLanguage(newLang);
    const target = VIDEO_LANGUAGES.find((l) => l.id === newLang) || VIDEO_LANGUAGES[0];
    setLangToast(`Video Audio & Subtitles switched to ${target.name} (${target.native}) • ${target.dubType}`);
    setTimeout(() => setLangToast(null), 3500);
  };

  const handleOpenAssessment = () => {
    if (!videoWatched && videoProgress < 100) {
      alert(
        `🔒 Assessment Locked!\n\nYou must watch the entire video lecture before you can attend the Section ${lesson.code} assessment.\n\nCurrent Watch Progress: ${Math.round(videoProgress)}%\n\nPlease press ▶️ Play on the chalkboard and complete the video to unlock your test.`
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
            <span className="lhs-duration-pill">⏱️ {lesson.duration} Lecture Video</span>
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
                    ? `Watch full lecture video first (${Math.round(videoProgress)}% watched)`
                    : "Take 10-Minute Assessment"
                }
              >
                {!videoWatched ? (
                  `🔒 Watch Full Video to Unlock Test (${Math.round(videoProgress)}%)`
                ) : topicScoreData?.passed ? (
                  `✓ Assessment Passed: ${topicScoreData.score}/10 (Qualified)`
                ) : topicScoreData ? (
                  `⚡ Retake Assessment: ${topicScoreData.score}/10 (Pass to Qualify)`
                ) : (
                  "⚡ 10-Min Assessment (Pass to Qualify Next Unit)"
                )}
              </button>
              <button
                type="button"
                className="btn-print-notes"
                onClick={() => window.print()}
              >
                🖨️ Print Notes PDF
              </button>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="lesson-mode-switch">
            <button
              type="button"
              className={`mode-btn ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              🖥️ Video & Notes (Side-by-Side)
            </button>
            <button
              type="button"
              className={`mode-btn ${activeTab === "video" ? "active" : ""}`}
              onClick={() => setActiveTab("video")}
            >
              🎥 Video Lecture Only
            </button>
            <button
              type="button"
              className={`mode-btn ${activeTab === "notes" ? "active" : ""}`}
              onClick={() => setActiveTab("notes")}
            >
              📝 Dr. G. Balaji Written Notes Only
            </button>
            <button
              type="button"
              className="mode-btn test-pill-trigger"
              onClick={() => setShowTestModal(true)}
            >
              ⚡ Micro-Topic Test (10 Qs • 10m)
            </button>
          </div>
        </section>

        {/* Content Layout Grid */}
        <div className={`lesson-layout-grid ${activeTab}`}>
          {/* SECTION 1: VIDEO FILE PLAYER WITH MULTILINGUAL CONTROLS */}
          {(activeTab === "all" || activeTab === "video") && (
            <section className="video-player-section">
              <div className="video-card">
                {/* Visual Video Player Canvas / Screen */}
                <div className="video-viewport">
                  {/* Mathematical Blackboard Canvas Backdrop */}
                  <div className="chalkboard-screen">
                    <div className="cb-lecture-header">
                      <div className="cb-header-left">
                        <span className="cb-logo">EduVerse Virtual Lecture</span>
                        <span className="cb-live-rec">● HD 1080p</span>
                      </div>

                      {/* Video Language Selector in Blackboard Header */}
                      <div className="cb-header-right">
                        <div className="cb-lang-picker" title="Change Video Audio & Subtitles Language">
                          <span className="cb-lang-picker-icon">🌐</span>
                          <span className="cb-lang-picker-label">Language:</span>
                          <select
                            className="cb-lang-select"
                            value={videoLanguage}
                            onChange={(e) => handleLanguageChange(e.target.value)}
                            aria-label="Change Video Audio Language"
                          >
                            {VIDEO_LANGUAGES.map((lang) => (
                              <option key={lang.id} value={lang.id}>
                                {lang.flag} {lang.name} ({lang.native})
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="button"
                          className={`cb-cc-pill ${showCaptions ? "active" : ""}`}
                          onClick={() => setShowCaptions(!showCaptions)}
                          title="Toggle Closed Captions (CC)"
                        >
                          CC [{selectedLangConfig.tag}]
                        </button>
                      </div>
                    </div>

                    {/* Active Dub / Audio Track Notification Banner */}
                    <div className="cb-active-dub-badge">
                      <span className="cad-flag">{selectedLangConfig.flag}</span>
                      <span className="cad-text">
                        Audio: <strong>{selectedLangConfig.name} ({selectedLangConfig.native})</strong> • {selectedLangConfig.dubType}
                      </span>
                      {isPlaying && (
                        <span className="cad-audio-wave" title="Audio playing">
                          <span className="wave-bar"></span>
                          <span className="wave-bar"></span>
                          <span className="wave-bar"></span>
                          <span className="wave-bar"></span>
                        </span>
                      )}
                    </div>

                    {/* Language Switch Toast Pill */}
                    {langToast && (
                      <div className="cb-lang-toast-pill" role="status">
                        ✨ {langToast}
                      </div>
                    )}

                    <div className="cb-main-chalk">
                      <h3 className="cb-title">{lesson.title}</h3>
                      <div className="cb-formula-spotlight">
                        <code>{lesson.notes.axioms[0]?.formula || "A x = b • det(A - λI) = 0"}</code>
                      </div>
                      <p className="cb-sub">{localizedVideoData.summary}</p>
                    </div>

                    {/* Animated Professor / Speaker Avatar */}
                    <div className="cb-instructor-badge">
                      <div className="inst-avatar">👨‍🏫</div>
                      <div>
                        <span className="inst-name">{lesson.instructor}</span>
                        <span className="inst-dept">Dept of Mathematics • Anna University</span>
                      </div>
                    </div>

                    {/* Real-time Closed Captions Overlay Bar */}
                    {showCaptions && (
                      <div className="cb-subtitles-bar">
                        <span className="cb-sub-badge">CC {selectedLangConfig.tag}</span>
                        <span className="cb-sub-text">{localizedVideoData.subtitles[subtitleIndex]}</span>
                      </div>
                    )}

                    {/* Big Center Play Overlay Button */}
                    <button
                      type="button"
                      className={`center-play-trigger ${isPlaying ? "playing" : ""}`}
                      onClick={togglePlay}
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? "⏸️" : "▶️"}
                    </button>
                  </div>

                    {/* Lecture Video Playback Watch Completion Progress Bar */}
                    <div className="cb-lecture-progress-strip">
                      <div className="cb-lps-info">
                        <span className="cb-lps-status">
                          {videoWatched ? (
                            <span className="cb-lps-done">✅ Lecture Video Completed (100%) • Assessment Unlocked!</span>
                          ) : isPlaying ? (
                            <span className="cb-lps-playing">▶️ Watching Video: {Math.round(videoProgress)}% (Watch 100% to unlock assessment)</span>
                          ) : (
                            <span className="cb-lps-paused">⏸️ Video Paused ({Math.round(videoProgress)}% watched) — Press ▶ on board to continue watching</span>
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
                  </div>

                {/* Multilingual Audio Track & Transcript Banner */}
                <div className="video-lang-transcript-box">
                  <div className="vlt-header">
                    <div className="vlt-title">
                      <span className="vlt-icon">🌐</span>
                      <span>Video Language & Audio Track:</span>
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
              </div>
            </section>
          )}

          {/* SECTION 2: WRITTEN NOTES & DERIVATIONS */}
          {(activeTab === "all" || activeTab === "notes") && (
            <section className="written-notes-section">
              <div className="notes-paper-card">
                <div className="notes-header-badge">
                  <span className="nhb-tag">OFFICIAL WRITTEN LECTURE NOTES</span>
                  <span className="nhb-ref">{lesson.bookChapter}</span>
                </div>

                <h2 className="notes-topic-title">{lesson.title} - Complete Notes</h2>
                <p className="notes-intro-txt">{lesson.notes.introduction}</p>

                {/* Exam Tips & Dr. G. Balaji Advice */}
                <div className="notes-block">
                  <h3 className="block-title">🎯 Exam Tips & Common Mistakes (Dr. G. Balaji)</h3>
                  <div className="exam-tips-list">
                    {lesson.notes.universityTips.map((tip, idx) => (
                      <div key={idx} className="tip-item">
                        <span className="tip-bullet">⚠️</span>
                        <p>{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 10-Minute Micro-Topic Test CTA Card */}
                <div className="micro-test-cta-card">
                  <div className="mtc-left">
                    <div className="mtc-icon">📝</div>
                    <div>
                      <div className="mtc-tag">MANDATORY TOPIC ASSESSMENT • 10 QUESTIONS • 10 MINUTES</div>
                      <h3 className="mtc-title">Take the {lesson.code} {lesson.title} Test</h3>
                      <p className="mtc-desc">
                        Test your understanding of the definitions, theorems, and university exam problem patterns for this micro-topic. Time limit: <strong>10:00 minutes</strong> with auto-submission and full Dr. G. Balaji worked solutions.
                      </p>
                    </div>
                  </div>

                  <div className="mtc-right">
                    {topicScoreData ? (
                      <div className="mtc-score-badge">
                        <span className="mtc-score-num">{topicScoreData.score} / 10</span>
                        <span className={`mtc-score-status ${topicScoreData.passed ? "passed" : "needs-review"}`}>
                          {topicScoreData.passed ? "✓ Passed (Mastered)" : "⚠️ Needs Revision"}
                        </span>
                      </div>
                    ) : (
                      <div className="mtc-pending-badge">
                        <span>⏳ Test Not Attempted</span>
                      </div>
                    )}

                    <button
                      type="button"
                      className="btn-start-micro-test"
                      onClick={() => setShowTestModal(true)}
                    >
                      {topicScoreData ? "🔄 Retake Test (10 Mins)" : "Start Micro-Topic Test (10 Mins)"}
                    </button>
                  </div>
                </div>

                {/* Download / Practice Footer Strip */}
                <div className="notes-footer-actions">
                  <button
                    type="button"
                    className="btn-download-pdf"
                    onClick={() => window.print()}
                  >
                    📥 Download Notes as PDF
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
          )}
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
