// microTopicTests.js - 10-Question 10-Minute Assessment Engine for All 22 Micro-Topics
// Based on Anna University Regulation 2025 & Dr. G. Balaji "Linear Algebra"

export const MICRO_TOPIC_TESTS = {
  // =========================================================================
  // UNIT I: VECTOR SPACES (Topics 1.1 to 1.6)
  // =========================================================================

  "1.1": {
    topicCode: "1.1",
    topicName: "Vector Spaces & Axioms",
    unitNumber: "UNIT I",
    unitTitle: "Vector Spaces",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 1, Section 1.1 (Pages 1.1 – 1.14)",
    questions: [
      {
        id: 1,
        question: "How many fundamental algebraic axioms must a non-empty set V satisfy with addition (+) and scalar multiplication (·) over ℝ to be called a Vector Space?",
        options: [
          { id: "A", text: "4 axioms" },
          { id: "B", text: "8 axioms" },
          { id: "C", text: "10 axioms" },
          { id: "D", text: "12 axioms" }
        ],
        correctAnswer: "C",
        explanation: "A vector space over ℝ must satisfy 10 axioms: 5 for vector addition (closure, commutativity, associativity, zero element, additive inverse) and 5 for scalar multiplication (closure, two distributive laws, associativity of scalars, and identity scalar 1·u = u).",
        ref: "Dr. G. Balaji, Page 1.2"
      },
      {
        id: 2,
        question: "Why does the set of all polynomials of degree strictly equal to 2 NOT form a vector space over ℝ?",
        options: [
          { id: "A", text: "It lacks scalar multiplication closure" },
          { id: "B", text: "It is not closed under addition (e.g. (x² + 2) + (-x² + x) = x + 2, degree is 1 ≠ 2)" },
          { id: "C", text: "Addition is non-commutative" },
          { id: "D", text: "Polynomials cannot be multiplied by negative numbers" }
        ],
        correctAnswer: "B",
        explanation: "Adding two polynomials of degree 2 whose leading terms cancel results in a polynomial of degree < 2, thus violating closure under addition. Also, the zero polynomial has undefined/no degree, so the additive identity 0 is missing.",
        ref: "Dr. G. Balaji, Page 1.6"
      },
      {
        id: 3,
        question: "In any vector space V, what is the value of 0 · u for any vector u ∈ V?",
        options: [
          { id: "A", text: "The scalar 0" },
          { id: "B", text: "The zero vector 0_V" },
          { id: "C", text: "u itself" },
          { id: "D", text: "Undefined" }
        ],
        correctAnswer: "B",
        explanation: "By theorem: 0 · u = (0 + 0) · u = 0 · u + 0 · u. Adding -(0 · u) to both sides gives 0 · u = 0_V (the zero vector in V).",
        ref: "Dr. G. Balaji, Page 1.8"
      },
      {
        id: 4,
        question: "Which of the following subsets of ℝ² with standard operations forms a valid vector space over ℝ?",
        options: [
          { id: "A", text: "V = {(x, y) : x ≥ 0, y ≥ 0}" },
          { id: "B", text: "V = {(x, y) : y = 2x}" },
          { id: "C", text: "V = {(x, y) : x² + y² = 1}" },
          { id: "D", text: "V = {(x, y) : xy ≥ 0}" }
        ],
        correctAnswer: "B",
        explanation: "The line y = 2x passes through the origin (0,0) and satisfies all 10 axioms (it is a 1-dimensional subspace of ℝ²). Options A, C, and D fail additive inverse and/or addition closure.",
        ref: "Dr. G. Balaji, Page 1.9"
      },
      {
        id: 5,
        question: "If u is a vector in a vector space V, what is the relation between (-1) · u and the additive inverse -u?",
        options: [
          { id: "A", text: "(-1) · u = -u" },
          { id: "B", text: "(-1) · u = u" },
          { id: "C", text: "(-1) · u = 0" },
          { id: "D", text: "They are unrelated concepts" }
        ],
        correctAnswer: "A",
        explanation: "By algebraic deduction: u + (-1) · u = 1 · u + (-1) · u = (1 - 1) · u = 0 · u = 0. By uniqueness of the additive inverse, (-1) · u = -u.",
        ref: "Dr. G. Balaji, Page 1.4"
      },
      {
        id: 6,
        question: "Consider ℝ² with standard addition, but scalar multiplication defined by c · (x, y) = (c x, 0). Which axiom fails?",
        options: [
          { id: "A", text: "Closure under scalar multiplication" },
          { id: "B", text: "Commutativity of vector addition" },
          { id: "C", text: "Unit scalar identity 1 · u = u" },
          { id: "D", text: "Additive identity" }
        ],
        correctAnswer: "C",
        explanation: "Taking u = (2, 5), 1 · (2, 5) = (1·2, 0) = (2, 0) ≠ (2, 5). Axiom 1 · u = u fails, so it is not a vector space.",
        ref: "Dr. G. Balaji, Page 1.11"
      },
      {
        id: 7,
        question: "What is the additive identity element in the vector space M₂×₂(ℝ) of all 2×2 real matrices?",
        options: [
          { id: "A", text: "The identity matrix [[1, 0], [0, 1]]" },
          { id: "B", text: "The zero matrix [[0, 0], [0, 0]]" },
          { id: "C", text: "Any scalar matrix" },
          { id: "D", text: "A matrix with all entries equal to 1" }
        ],
        correctAnswer: "B",
        explanation: "Under matrix addition, A + O = O + A = A where O = [[0, 0], [0, 0]]. Hence the 2×2 zero matrix is the additive identity.",
        ref: "Dr. G. Balaji, Page 1.3"
      },
      {
        id: 8,
        question: "Which of the following is TRUE regarding the zero element in any vector space V?",
        options: [
          { id: "A", text: "A vector space may contain multiple distinct zero vectors" },
          { id: "B", text: "The zero vector is unique" },
          { id: "C", text: "The zero vector has norm equal to 1" },
          { id: "D", text: "The zero vector is never an element of a subspace" }
        ],
        correctAnswer: "B",
        explanation: "Proof: If 0₁ and 0₂ are zero elements, 0₁ = 0₁ + 0₂ = 0₂ + 0₁ = 0₂. Therefore, the zero vector in any vector space is strictly unique.",
        ref: "Dr. G. Balaji, Page 1.7"
      },
      {
        id: 9,
        question: "Does the set of all continuous real-valued functions C[0, 1] with pointwise addition and scalar multiplication form a vector space over ℝ?",
        options: [
          { id: "A", text: "No, functions are not geometric vectors" },
          { id: "B", text: "Yes, sums and scalar multiples of continuous functions are continuous" },
          { id: "C", text: "No, because the zero function does not exist" },
          { id: "D", text: "Only if the functions are polynomials" }
        ],
        correctAnswer: "B",
        explanation: "C[a, b] is one of the classic function vector spaces: the sum of two continuous functions is continuous, c·f(x) is continuous, and all 10 axioms hold identically.",
        ref: "Dr. G. Balaji, Page 1.13"
      },
      {
        id: 10,
        question: "For vectors u, v, w ∈ V, if u + v = u + w, what does the cancellation law in vector spaces conclude?",
        options: [
          { id: "A", text: "u = 0" },
          { id: "B", text: "v = w" },
          { id: "C", text: "v + w = 0" },
          { id: "D", text: "No conclusion can be drawn" }
        ],
        correctAnswer: "B",
        explanation: "Adding the additive inverse (-u) to both sides: (-u) + (u + v) = (-u) + (u + w) ⟹ ((-u) + u) + v = ((-u) + u) + w ⟹ 0 + v = 0 + w ⟹ v = w. (Left Cancellation Law).",
        ref: "Dr. G. Balaji, Page 1.5"
      }
    ]
  },

  "1.2": {
    topicCode: "1.2",
    topicName: "Subspaces & Criteria",
    unitNumber: "UNIT I",
    unitTitle: "Vector Spaces",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 1, Section 1.2 (Pages 1.15 – 1.30)",
    questions: [
      {
        id: 1,
        question: "What is the necessary and sufficient two-step condition for a non-empty subset W of V to be a subspace?",
        options: [
          { id: "A", text: "W contains 0 and has non-zero determinant" },
          { id: "B", text: "∀ u, v ∈ W, u + v ∈ W and ∀ c ∈ ℝ, u ∈ W, c·u ∈ W" },
          { id: "C", text: "W has the same dimension as V" },
          { id: "D", text: "W contains at least 3 vectors" }
        ],
        correctAnswer: "B",
        explanation: "A subset W ⊆ V is a subspace if and only if: (1) 0 ∈ W (W is non-empty), (2) W is closed under vector addition, and (3) W is closed under scalar multiplication.",
        ref: "Dr. G. Balaji, Page 1.16"
      },
      {
        id: 2,
        question: "Which of the following sets is NOT a subspace of ℝ³?",
        options: [
          { id: "A", text: "W = {(x, y, z) : x + 2y - z = 0}" },
          { id: "B", text: "W = {(x, y, z) : x = 0 and y = 0}" },
          { id: "C", text: "W = {(x, y, z) : 2x - 3y + z = 4}" },
          { id: "D", text: "W = {(x, y, z) : x = y = z}" }
        ],
        correctAnswer: "C",
        explanation: "In option C, substituting (0, 0, 0) gives 2(0) - 3(0) + 0 = 0 ≠ 4. Since the zero vector is not in W, it can NEVER be a subspace!",
        ref: "Dr. G. Balaji, Page 1.19"
      },
      {
        id: 3,
        question: "If W₁ and W₂ are two subspaces of a vector space V, what can always be stated about their intersection W₁ ∩ W₂?",
        options: [
          { id: "A", text: "W₁ ∩ W₂ is always a subspace of V" },
          { id: "B", text: "W₁ ∩ W₂ is never a subspace" },
          { id: "C", text: "W₁ ∩ W₂ is only a subspace if W₁ = W₂" },
          { id: "D", text: "W₁ ∩ W₂ is empty" }
        ],
        correctAnswer: "A",
        explanation: "The intersection of any collection of subspaces is always a subspace because 0 is in both, and linear combinations of elements in both stay in both.",
        ref: "Dr. G. Balaji, Page 1.22"
      },
      {
        id: 4,
        question: "Is the union W₁ ∪ W₂ of two subspaces always a subspace of V?",
        options: [
          { id: "A", text: "Yes, always" },
          { id: "B", text: "No, in general W₁ ∪ W₂ is a subspace if and only if W₁ ⊆ W₂ or W₂ ⊆ W₁" },
          { id: "C", text: "Yes, if dim(V) ≤ 3" },
          { id: "D", text: "No, union is never closed under scalar multiplication" }
        ],
        correctAnswer: "B",
        explanation: "For example, in ℝ², the x-axis and y-axis are subspaces, but their union contains (1, 0) and (0, 1), whose sum (1, 1) is not on either axis, violating closure under addition.",
        ref: "Dr. G. Balaji, Page 1.24"
      },
      {
        id: 5,
        question: "What geometric objects in ℝ³ represent non-trivial proper subspaces?",
        options: [
          { id: "A", text: "All spheres and cylinders" },
          { id: "B", text: "Lines and planes passing through the origin (0, 0, 0)" },
          { id: "C", text: "Any plane parallel to the xy-plane" },
          { id: "D", text: "Lines with slope 1" }
        ],
        correctAnswer: "B",
        explanation: "In ℝ³, the only subspaces are: {0} (0-dim), straight lines passing through the origin (1-dim), planes passing through the origin (2-dim), and ℝ³ itself (3-dim).",
        ref: "Dr. G. Balaji, Page 1.18"
      },
      {
        id: 6,
        question: "The sum of two subspaces W₁ and W₂ is defined as W₁ + W₂ = {u + v : u ∈ W₁, v ∈ W₂}. Which is TRUE?",
        options: [
          { id: "A", text: "W₁ + W₂ is always a subspace of V" },
          { id: "B", text: "W₁ + W₂ is only a subspace if W₁ ∩ W₂ = {0}" },
          { id: "C", text: "W₁ + W₂ is smaller than W₁ ∩ W₂" },
          { id: "D", text: "W₁ + W₂ does not contain 0" }
        ],
        correctAnswer: "A",
        explanation: "W₁ + W₂ is the smallest subspace containing both W₁ and W₂, and it is always a valid subspace of V.",
        ref: "Dr. G. Balaji, Page 1.26"
      },
      {
        id: 7,
        question: "What is a direct sum V = W₁ ⊕ W₂?",
        options: [
          { id: "A", text: "V = W₁ + W₂ and W₁ ∩ W₂ = {0}" },
          { id: "B", text: "V = W₁ ∪ W₂" },
          { id: "C", text: "dim(W₁) = dim(W₂)" },
          { id: "D", text: "W₁ and W₂ are identical" }
        ],
        correctAnswer: "A",
        explanation: "A sum is a direct sum V = W₁ ⊕ W₂ if every vector in V can be uniquely represented as w₁ + w₂, which is equivalent to V = W₁ + W₂ and W₁ ∩ W₂ = {0}.",
        ref: "Dr. G. Balaji, Page 1.28"
      },
      {
        id: 8,
        question: "Which of the following sets of matrices is a subspace of Mₙ×ₙ(ℝ)?",
        options: [
          { id: "A", text: "All invertible n×n matrices (det ≠ 0)" },
          { id: "B", text: "All symmetric n×n matrices (Aᵀ = A)" },
          { id: "C", text: "All matrices with det(A) = 1" },
          { id: "D", text: "All matrices with all non-zero entries" }
        ],
        correctAnswer: "B",
        explanation: "For symmetric matrices, (cA + dB)ᵀ = cAᵀ + dBᵀ = cA + dB, and the zero matrix is symmetric. Invertible matrices fail because the zero matrix has det = 0, so it's not invertible.",
        ref: "Dr. G. Balaji, Page 1.20"
      },
      {
        id: 9,
        question: "Let W = {(x, y) ∈ ℝ² : y = x²}. Is W a subspace of ℝ²?",
        options: [
          { id: "A", text: "Yes, it passes through (0, 0)" },
          { id: "B", text: "No, it is not closed under addition (e.g. (1, 1) + (2, 4) = (3, 5), but 3² = 9 ≠ 5)" },
          { id: "C", text: "Yes, because x² is continuous" },
          { id: "D", text: "Yes, all parabolas are subspaces" }
        ],
        correctAnswer: "B",
        explanation: "Parabolas are non-linear; (1, 1) and (2, 4) belong to y = x², but their sum (3, 5) gives 5 ≠ 3² = 9. Subspace closure fails.",
        ref: "Dr. G. Balaji, Page 1.21"
      },
      {
        id: 10,
        question: "What is the trivial subspace of any vector space V?",
        options: [
          { id: "A", text: "V itself" },
          { id: "B", text: "The zero subspace {0}" },
          { id: "C", text: "The empty set ∅" },
          { id: "D", text: "Any 1-dimensional line" }
        ],
        correctAnswer: "B",
        explanation: "The set consisting only of the zero vector {0} satisfies 0 + 0 = 0 and c · 0 = 0, making it the minimal or trivial subspace of V.",
        ref: "Dr. G. Balaji, Page 1.17"
      }
    ]
  },

  "1.3": {
    topicCode: "1.3",
    topicName: "Linear Combinations & Spanning Sets",
    unitNumber: "UNIT I",
    unitTitle: "Vector Spaces",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 1, Section 1.3 (Pages 1.31 – 1.48)",
    questions: [
      {
        id: 1,
        question: "What is the mathematical definition of Span(S) for a non-empty set of vectors S = {v₁, v₂, ..., vₖ}?",
        options: [
          { id: "A", text: "The set of all cross products of vectors in S" },
          { id: "B", text: "The set of all linear combinations c₁v₁ + c₂v₂ + ... + cₖvₖ with cᵢ ∈ ℝ" },
          { id: "C", text: "The set of all unit vectors parallel to S" },
          { id: "D", text: "The determinant of the matrix formed by S" }
        ],
        correctAnswer: "B",
        explanation: "Span(S) is the set of all possible linear combinations of vectors from S with real coefficients. It is the smallest subspace of V containing S.",
        ref: "Dr. G. Balaji, Page 1.32"
      },
      {
        id: 2,
        question: "Does the vector (2, 5, 3) belong to the span of S = {(1, 2, 1), (0, 1, 1)}?",
        options: [
          { id: "A", text: "No, system is inconsistent" },
          { id: "B", text: "Yes, with c₁ = 2 and c₂ = 1" },
          { id: "C", text: "Yes, with c₁ = 1 and c₂ = 3" },
          { id: "D", text: "No, span only contains two vectors" }
        ],
        correctAnswer: "B",
        explanation: "Solving c₁(1, 2, 1) + c₂(0, 1, 1) = (2, 5, 3): c₁ = 2; 2(2) + c₂ = 5 ⟹ c₂ = 1; check third component: 2(1) + 1(1) = 3 (consistent). Thus (2, 5, 3) ∈ Span(S).",
        ref: "Dr. G. Balaji, Page 1.36"
      },
      {
        id: 3,
        question: "What is the span of the standard vectors e₁ = (1, 0) and e₂ = (0, 1) in ℝ²?",
        options: [
          { id: "A", text: "The x-axis only" },
          { id: "B", text: "The entire plane ℝ²" },
          { id: "C", text: "A unit square" },
          { id: "D", text: "The line y = x" }
        ],
        correctAnswer: "B",
        explanation: "Any vector (x, y) ∈ ℝ² can be written as x(1, 0) + y(0, 1). Therefore, Span{e₁, e₂} = ℝ².",
        ref: "Dr. G. Balaji, Page 1.34"
      },
      {
        id: 4,
        question: "If S ⊆ W where W is a subspace of V, what is the relation between Span(S) and W?",
        options: [
          { id: "A", text: "Span(S) ⊆ W" },
          { id: "B", text: "W ⊆ Span(S)" },
          { id: "C", text: "Span(S) ∩ W = {0}" },
          { id: "D", text: "Span(S) = V" }
        ],
        correctAnswer: "A",
        explanation: "Since W is a subspace and contains S, it is closed under linear combinations of elements in S. Hence Span(S) must be a subset of W.",
        ref: "Dr. G. Balaji, Page 1.35"
      },
      {
        id: 5,
        question: "How many vectors are required at minimum to span ℝ³?",
        options: [
          { id: "A", text: "1 vector" },
          { id: "B", text: "2 vectors" },
          { id: "C", text: "3 vectors" },
          { id: "D", text: "4 vectors" }
        ],
        correctAnswer: "C",
        explanation: "Since dim(ℝ³) = 3, at least 3 linearly independent vectors are required to span the entire 3-dimensional space.",
        ref: "Dr. G. Balaji, Page 1.38"
      },
      {
        id: 6,
        question: "Can two vectors span ℝ³?",
        options: [
          { id: "A", text: "Yes, if they are perpendicular" },
          { id: "B", text: "No, their span is at most a 2-dimensional plane passing through the origin" },
          { id: "C", text: "Yes, if their cross product is non-zero" },
          { id: "D", text: "Yes, if they have length 1" }
        ],
        correctAnswer: "B",
        explanation: "The span of two vectors in ℝ³ is a plane through the origin (if independent) or a line (if dependent). It can never cover the 3rd dimension.",
        ref: "Dr. G. Balaji, Page 1.40"
      },
      {
        id: 7,
        question: "If a vector v is added to S where v is already in Span(S), what happens to Span(S ∪ {v})?",
        options: [
          { id: "A", text: "The dimension increases by 1" },
          { id: "B", text: "Span(S ∪ {v}) = Span(S) (the span remains unchanged)" },
          { id: "C", text: "The span doubles" },
          { id: "D", text: "Span becomes empty" }
        ],
        correctAnswer: "B",
        explanation: "Since v is already a linear combination of vectors in S, adding v provides no new directions; Span(S ∪ {v}) = Span(S).",
        ref: "Dr. G. Balaji, Page 1.42"
      },
      {
        id: 8,
        question: "In matrix terms, a vector b belongs to Span{v₁, v₂, ..., vₙ} if and only if the system Ax = b (where columns of A are vᵢ) is:",
        options: [
          { id: "A", text: "Homogeneous" },
          { id: "B", text: "Consistent (i.e. rank(A) = rank([A|b]))" },
          { id: "C", text: "Singular" },
          { id: "D", text: "Inconsistent" }
        ],
        correctAnswer: "B",
        explanation: "Ax = x₁v₁ + ... + xₙvₙ = b. A solution x exists if and only if b can be expressed as a linear combination of columns of A, which means rank(A) = rank([A|b]).",
        ref: "Dr. G. Balaji, Page 1.44"
      },
      {
        id: 9,
        question: "Which of the following polynomial sets spans P₂(t) (polynomials of degree ≤ 2)?",
        options: [
          { id: "A", text: "{1, t, t²}" },
          { id: "B", text: "{t, t²}" },
          { id: "C", text: "{1 + t, 2 + 2t}" },
          { id: "D", text: "{1, t}" }
        ],
        correctAnswer: "A",
        explanation: "Any quadratic polynomial p(t) = a + bt + ct² is directly a linear combination of the monomial basis {1, t, t²}.",
        ref: "Dr. G. Balaji, Page 1.45"
      },
      {
        id: 10,
        question: "What is Span(∅) (the span of the empty set) by convention?",
        options: [
          { id: "A", text: "Undefined" },
          { id: "B", text: "{0} (the zero subspace)" },
          { id: "C", text: "The entire space V" },
          { id: "D", text: "{-1, 1}" }
        ],
        correctAnswer: "B",
        explanation: "By mathematical convention and consistency with the intersection definition of span, Span(∅) = {0}.",
        ref: "Dr. G. Balaji, Page 1.33"
      }
    ]
  },

  "1.4": {
    topicCode: "1.4",
    topicName: "Linear Independence & Dependence",
    unitNumber: "UNIT I",
    unitTitle: "Vector Spaces",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 1, Section 1.4 (Pages 1.49 – 1.62)",
    questions: [
      {
        id: 1,
        question: "A set of vectors {v₁, v₂, ..., vₖ} is linearly independent if the equation c₁v₁ + c₂v₂ + ... + cₖvₖ = 0 implies:",
        options: [
          { id: "A", text: "At least one cᵢ is non-zero" },
          { id: "B", text: "c₁ = c₂ = ... = cₖ = 0 (only the trivial solution exists)" },
          { id: "C", text: "All vectors are parallel" },
          { id: "D", text: "The sum of cᵢ is 1" }
        ],
        correctAnswer: "B",
        explanation: "Linear independence means no vector can be written as a combination of the others; thus the only way to form the zero vector is with all zero coefficients.",
        ref: "Dr. G. Balaji, Page 1.50"
      },
      {
        id: 2,
        question: "Any set of vectors that contains the zero vector 0 is:",
        options: [
          { id: "A", text: "Always linearly independent" },
          { id: "B", text: "Always linearly dependent" },
          { id: "C", text: "A basis for V" },
          { id: "D", text: "Orthogonal" }
        ],
        correctAnswer: "B",
        explanation: "If 0 ∈ S, we can choose non-zero coefficient c = 1 for 0: 1 · 0 + 0 · v₁ + ... = 0. Since a non-zero coefficient works, S is linearly dependent.",
        ref: "Dr. G. Balaji, Page 1.52"
      },
      {
        id: 3,
        question: "Determine whether v₁ = (1, 0, 0), v₂ = (0, 1, 0), v₃ = (1, 1, 0) in ℝ³ are linearly independent or dependent:",
        options: [
          { id: "A", text: "Linearly Independent" },
          { id: "B", text: "Linearly Dependent, because v₃ = v₁ + v₂" },
          { id: "C", text: "Orthogonal" },
          { id: "D", text: "Cannot be determined" }
        ],
        correctAnswer: "B",
        explanation: "Notice that v₁ + v₂ - v₃ = (1, 0, 0) + (0, 1, 0) - (1, 1, 0) = (0, 0, 0). Since non-zero coefficients (1, 1, -1) satisfy the equation, the vectors are linearly dependent.",
        ref: "Dr. G. Balaji, Page 1.54"
      },
      {
        id: 4,
        question: "What is the maximum number of linearly independent vectors that can exist in ℝ⁴?",
        options: [
          { id: "A", text: "3" },
          { id: "B", text: "4" },
          { id: "C", text: "5" },
          { id: "D", text: "Infinite" }
        ],
        correctAnswer: "B",
        explanation: "In an n-dimensional space, any set with more than n vectors is automatically linearly dependent. For ℝ⁴, the maximum number is 4.",
        ref: "Dr. G. Balaji, Page 1.55"
      },
      {
        id: 5,
        question: "If A is an n×n square matrix whose columns are vectors v₁, ..., vₙ, what determinant condition ensures linear independence?",
        options: [
          { id: "A", text: "det(A) = 0" },
          { id: "B", text: "det(A) ≠ 0" },
          { id: "C", text: "det(A) < 0" },
          { id: "D", text: "Trace(A) = 0" }
        ],
        correctAnswer: "B",
        explanation: "The column vectors are linearly independent if and only if the homogeneous system Ax = 0 has only the trivial solution x = 0, which requires det(A) ≠ 0.",
        ref: "Dr. G. Balaji, Page 1.57"
      },
      {
        id: 6,
        question: "Two non-zero vectors in ℝ² are linearly dependent if and only if:",
        options: [
          { id: "A", text: "They are perpendicular" },
          { id: "B", text: "They are collinear (one is a scalar multiple of the other)" },
          { id: "C", text: "Their sum is zero" },
          { id: "D", text: "They both have length 1" }
        ],
        correctAnswer: "B",
        explanation: "Geometrically, two vectors in ℝ² or ℝ³ are dependent if and only if they lie on the same straight line through the origin, i.e., v₂ = k v₁.",
        ref: "Dr. G. Balaji, Page 1.51"
      },
      {
        id: 7,
        question: "If S = {v₁, v₂, v₃} is a linearly independent set, what can be said about any subset, such as {v₁, v₂}?",
        options: [
          { id: "A", text: "It is also linearly independent" },
          { id: "B", text: "It becomes linearly dependent" },
          { id: "C", text: "It spans the entire space" },
          { id: "D", text: "It has determinant 0" }
        ],
        correctAnswer: "A",
        explanation: "Theorem: Any non-empty subset of a linearly independent set is also linearly independent.",
        ref: "Dr. G. Balaji, Page 1.53"
      },
      {
        id: 8,
        question: "To test whether differentiable functions f₁(x) and f₂(x) are linearly independent, which determinant is computed?",
        options: [
          { id: "A", text: "Hessian" },
          { id: "B", text: "Jacobian" },
          { id: "C", text: "Wronskian: W(x) = det([[f₁, f₂], [f₁', f₂']])" },
          { id: "D", text: "Vandermonde" }
        ],
        correctAnswer: "C",
        explanation: "The Wronskian determinant W(f₁, f₂)(x) is the standard calculus tool for testing linear independence of functions in differential equations and linear algebra.",
        ref: "Dr. G. Balaji, Page 1.60"
      },
      {
        id: 9,
        question: "Are the functions eˣ and e²ˣ linearly independent on ℝ?",
        options: [
          { id: "A", text: "Yes, W(x) = eˣ(2e²ˣ) - e²ˣ(eˣ) = e³ˣ ≠ 0" },
          { id: "B", text: "No, they are exponential functions" },
          { id: "C", text: "No, e²ˣ = (eˣ)²" },
          { id: "D", text: "Only at x = 0" }
        ],
        correctAnswer: "A",
        explanation: "The Wronskian is W(x) = 2e³ˣ - e³ˣ = e³ˣ, which is non-zero for all real x. Therefore, {eˣ, e²ˣ} is linearly independent.",
        ref: "Dr. G. Balaji, Page 1.61"
      },
      {
        id: 10,
        question: "If a set S in ℝⁿ has k vectors where k > n, then S is:",
        options: [
          { id: "A", text: "Always linearly independent" },
          { id: "B", text: "Always linearly dependent" },
          { id: "C", text: "A basis for ℝⁿ" },
          { id: "D", text: "Orthogonal" }
        ],
        correctAnswer: "B",
        explanation: "By the fundamental theorem of linear algebra, any set of vectors containing more elements than the dimension of the space is necessarily linearly dependent.",
        ref: "Dr. G. Balaji, Page 1.56"
      }
    ]
  },

  "1.5": {
    topicCode: "1.5",
    topicName: "Basis & Dimension",
    unitNumber: "UNIT I",
    unitTitle: "Vector Spaces",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 1, Section 1.5 (Pages 1.63 – 1.74)",
    questions: [
      {
        id: 1,
        question: "A subset B of a vector space V is called a Basis for V if:",
        options: [
          { id: "A", text: "B is orthogonal and normal" },
          { id: "B", text: "B is linearly independent and Span(B) = V" },
          { id: "C", text: "B contains at least dim(V) + 1 vectors" },
          { id: "D", text: "All vectors in B have unit length" }
        ],
        correctAnswer: "B",
        explanation: "By formal definition, a basis is a minimal spanning set, which requires: (1) B is linearly independent, and (2) B spans V.",
        ref: "Dr. G. Balaji, Page 1.64"
      },
      {
        id: 2,
        question: "What is the dimension of the vector space M₂×₂(ℝ) of all 2×2 real matrices?",
        options: [
          { id: "A", text: "2" },
          { id: "B", text: "4" },
          { id: "C", text: "8" },
          { id: "D", text: "16" }
        ],
        correctAnswer: "B",
        explanation: "The standard basis for M₂×₂(ℝ) consists of 4 matrices: [[1,0],[0,0]], [[0,1],[0,0]], [[0,0],[1,0]], [[0,0],[0,1]]. Hence dimension = 2 × 2 = 4.",
        ref: "Dr. G. Balaji, Page 1.67"
      },
      {
        id: 3,
        question: "What is the dimension of the polynomial vector space Pₙ(t) of degree ≤ n?",
        options: [
          { id: "A", text: "n" },
          { id: "B", text: "n + 1" },
          { id: "C", text: "n - 1" },
          { id: "D", text: "2n" }
        ],
        correctAnswer: "B",
        explanation: "The standard basis is {1, t, t², ..., tⁿ}, which contains exactly n + 1 linearly independent polynomials. Thus dim(Pₙ) = n + 1.",
        ref: "Dr. G. Balaji, Page 1.68"
      },
      {
        id: 4,
        question: "What is the Dimension Formula for the sum of two finite-dimensional subspaces U and W?",
        options: [
          { id: "A", text: "dim(U + W) = dim(U) + dim(W)" },
          { id: "B", text: "dim(U + W) = dim(U) + dim(W) - dim(U ∩ W)" },
          { id: "C", text: "dim(U + W) = dim(U) · dim(W)" },
          { id: "D", text: "dim(U + W) = dim(U ∩ W)" }
        ],
        correctAnswer: "B",
        explanation: "This is the Grassmann Dimension Theorem: dim(U + W) = dim(U) + dim(W) - dim(U ∩ W), analogous to the inclusion-exclusion principle in set theory.",
        ref: "Dr. G. Balaji, Page 1.70"
      },
      {
        id: 5,
        question: "If dim(U) = 3, dim(W) = 3, and U + W = ℝ⁴, what is dim(U ∩ W)?",
        options: [
          { id: "A", text: "0" },
          { id: "B", text: "1" },
          { id: "C", text: "2" },
          { id: "D", text: "3" }
        ],
        correctAnswer: "C",
        explanation: "Using dim(U ∩ W) = dim(U) + dim(W) - dim(U + W): dim(U ∩ W) = 3 + 3 - 4 = 2.",
        ref: "Dr. G. Balaji, Page 1.71"
      },
      {
        id: 6,
        question: "What is the dimension of the subspace of all 3×3 real symmetric matrices?",
        options: [
          { id: "A", text: "3" },
          { id: "B", text: "6" },
          { id: "C", text: "9" },
          { id: "D", text: "5" }
        ],
        correctAnswer: "B",
        explanation: "For an n×n symmetric matrix, independent entries are n on the diagonal and n(n-1)/2 above: n(n+1)/2. For n = 3: 3(4)/2 = 6.",
        ref: "Dr. G. Balaji, Page 1.69"
      },
      {
        id: 7,
        question: "What is the dimension of the zero vector space {0}?",
        options: [
          { id: "A", text: "0" },
          { id: "B", text: "1" },
          { id: "C", text: "-1" },
          { id: "D", text: "Undefined" }
        ],
        correctAnswer: "A",
        explanation: "The basis of {0} is the empty set ∅, which contains 0 vectors. Hence dim({0}) = 0.",
        ref: "Dr. G. Balaji, Page 1.65"
      },
      {
        id: 8,
        question: "If B = {v₁, ..., vₙ} is a basis for V, then every vector v ∈ V can be expressed as a linear combination of B:",
        options: [
          { id: "A", text: "In infinitely many ways" },
          { id: "B", text: "In exactly one unique way" },
          { id: "C", text: "Only if all coefficients are positive" },
          { id: "D", text: "In at least two ways" }
        ],
        correctAnswer: "B",
        explanation: "Theorem: A set B is a basis if and only if every vector in V has a unique representation as a linear combination of elements of B.",
        ref: "Dr. G. Balaji, Page 1.66"
      },
      {
        id: 9,
        question: "If W is a proper subspace of a finite-dimensional vector space V (W ⊊ V), then:",
        options: [
          { id: "A", text: "dim(W) = dim(V)" },
          { id: "B", text: "dim(W) < dim(V)" },
          { id: "C", text: "dim(W) > dim(V)" },
          { id: "D", text: "dim(W) = 0" }
        ],
        correctAnswer: "B",
        explanation: "A proper subspace cannot contain a full basis of V; hence its dimension must be strictly strictly less than dim(V).",
        ref: "Dr. G. Balaji, Page 1.72"
      },
      {
        id: 10,
        question: "Can any linearly independent set in a finite-dimensional vector space V be extended to form a basis for V?",
        options: [
          { id: "A", text: "No, only spanning sets can be modified" },
          { id: "B", text: "Yes, by the Basis Extension Theorem" },
          { id: "C", text: "Only if the set already contains the zero vector" },
          { id: "D", text: "Only for ℝ³" }
        ],
        correctAnswer: "B",
        explanation: "Basis Extension Theorem: Any linearly independent subset of a finite-dimensional space V can be extended to a complete basis by adjoining suitable vectors.",
        ref: "Dr. G. Balaji, Page 1.73"
      }
    ]
  },

  "1.6": {
    topicCode: "1.6",
    topicName: "Coordinates & Change of Basis",
    unitNumber: "UNIT I",
    unitTitle: "Vector Spaces",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 1, Section 1.6 (Pages 1.75 – 1.84)",
    questions: [
      {
        id: 1,
        question: "If B = {v₁, v₂} is an ordered basis and v = c₁v₁ + c₂v₂, the coordinate vector [v]_B is:",
        options: [
          { id: "A", text: "The column vector [c₁, c₂]ᵀ" },
          { id: "B", text: "The dot product v₁ · v₂" },
          { id: "C", text: "The magnitude ||v||" },
          { id: "D", text: "c₁ + c₂" }
        ],
        correctAnswer: "A",
        explanation: "The coordinate vector relative to ordered basis B is the column vector of the unique scalar coefficients: [v]_B = [c₁, c₂]ᵀ.",
        ref: "Dr. G. Balaji, Page 1.76"
      },
      {
        id: 2,
        question: "Find the coordinate vector of p(x) = 2x² - 3x + 5 with respect to standard basis B = {1, x, x²}:",
        options: [
          { id: "A", text: "[2, -3, 5]ᵀ" },
          { id: "B", text: "[5, -3, 2]ᵀ" },
          { id: "C", text: "[5, 3, 2]ᵀ" },
          { id: "D", text: "[-3, 5, 2]ᵀ" }
        ],
        correctAnswer: "B",
        explanation: "p(x) = 5(1) + (-3)(x) + 2(x²). With respect to ordered basis {1, x, x²}, the coefficients are 5, -3, 2, so [p]_B = [5, -3, 2]ᵀ.",
        ref: "Dr. G. Balaji, Page 1.77"
      },
      {
        id: 3,
        question: "The transition matrix P_{B→C} from basis B to basis C is always:",
        options: [
          { id: "A", text: "Singular (det = 0)" },
          { id: "B", text: "Invertible (det ≠ 0)" },
          { id: "C", text: "Symmetric" },
          { id: "D", text: "Diagonal" }
        ],
        correctAnswer: "B",
        explanation: "Because both B and C are bases, the transition matrix P relates two full rank coordinate systems; hence it is always non-singular and invertible.",
        ref: "Dr. G. Balaji, Page 1.79"
      },
      {
        id: 4,
        question: "What is the relationship between the transition matrix P_{B→C} and P_{C→B}?",
        options: [
          { id: "A", text: "P_{C→B} = (P_{B→C})ᵀ" },
          { id: "B", text: "P_{C→B} = (P_{B→C})⁻¹" },
          { id: "C", text: "P_{C→B} = -P_{B→C}" },
          { id: "D", text: "P_{C→B} = I" }
        ],
        correctAnswer: "B",
        explanation: "Going from basis B to C and then back from C to B corresponds to matrix inversion: P_{C→B} = (P_{B→C})⁻¹.",
        ref: "Dr. G. Balaji, Page 1.80"
      },
      {
        id: 5,
        question: "How are the columns of the transition matrix P_{B→C} constructed?",
        options: [
          { id: "A", text: "They are the coordinate vectors of the vectors in basis B relative to basis C" },
          { id: "B", text: "They are random orthogonal vectors" },
          { id: "C", text: "They are the eigenvectors of B" },
          { id: "D", text: "They are identity vectors" }
        ],
        correctAnswer: "A",
        explanation: "By definition, the j-th column of P_{B→C} is [bⱼ]_C, the coordinate vector of the j-th basis vector of B relative to C.",
        ref: "Dr. G. Balaji, Page 1.78"
      },
      {
        id: 6,
        question: "If [v]_B is the coordinate vector in basis B, what formula computes [v]_C?",
        options: [
          { id: "A", text: "[v]_C = P_{B→C} · [v]_B" },
          { id: "B", text: "[v]_C = [v]_B · P_{B→C}" },
          { id: "C", text: "[v]_C = P_{B→C} + [v]_B" },
          { id: "D", text: "[v]_C = (P_{B→C})ᵀ [v]_B" }
        ],
        correctAnswer: "A",
        explanation: "The coordinate transformation equation is [v]_C = P_{B→C} [v]_B.",
        ref: "Dr. G. Balaji, Page 1.81"
      },
      {
        id: 7,
        question: "What is the transition matrix from a basis B to itself P_{B→B}?",
        options: [
          { id: "A", text: "The zero matrix O" },
          { id: "B", text: "The identity matrix I" },
          { id: "C", text: "Undefined" },
          { id: "D", text: "A scalar matrix with 2 on the diagonal" }
        ],
        correctAnswer: "B",
        explanation: "Representing each basis vector bᵢ in terms of B gives bᵢ = 1·bᵢ + 0·others, which produces the identity matrix I.",
        ref: "Dr. G. Balaji, Page 1.80"
      },
      {
        id: 8,
        question: "If B = {(1, 0), (0, 1)} is the standard basis and C = {(1, 1), (1, -1)}, what is the dimension of the coordinate space?",
        options: [
          { id: "A", text: "1" },
          { id: "B", text: "2" },
          { id: "C", text: "3" },
          { id: "D", text: "4" }
        ],
        correctAnswer: "B",
        explanation: "Both bases span ℝ², which is 2-dimensional. Every coordinate vector in ℝ² has 2 components.",
        ref: "Dr. G. Balaji, Page 1.82"
      },
      {
        id: 9,
        question: "The coordinate mapping v ↦ [v]_B from V to ℝⁿ (where dim(V) = n) is an example of a:",
        options: [
          { id: "A", text: "Non-linear map" },
          { id: "B", text: "Vector space isomorphism (bijective linear transformation)" },
          { id: "C", text: "Singular transformation" },
          { id: "D", text: "Projection onto a line" }
        ],
        correctAnswer: "B",
        explanation: "The coordinate mapping preserves addition, scalar multiplication, is one-to-one, and onto, proving every real n-dimensional vector space is isomorphic to ℝⁿ.",
        ref: "Dr. G. Balaji, Page 1.83"
      },
      {
        id: 10,
        question: "For a linear operator T: V → V, if [T]_B is its matrix representation in basis B and P is the change of basis matrix, what is [T]_C?",
        options: [
          { id: "A", text: "[T]_C = P [T]_B P⁻¹" },
          { id: "B", text: "[T]_C = P⁻¹ [T]_B P" },
          { id: "C", text: "[T]_C = [T]_B P" },
          { id: "D", text: "[T]_C = [T]_B + P" }
        ],
        correctAnswer: "B",
        explanation: "The similarity transformation formula for change of basis of an operator is [T]_C = P⁻¹ [T]_B P (where P is the transition matrix from C to B).",
        ref: "Dr. G. Balaji, Page 1.84"
      }
    ]
  },

  // =========================================================================
  // UNIT II: LINEAR TRANSFORMATIONS & DIAGONALIZATION (Topics 2.1 to 2.6)
  // =========================================================================

  "2.1": {
    topicCode: "2.1",
    topicName: "Linear Transformations & Properties",
    unitNumber: "UNIT II",
    unitTitle: "Linear Transformations & Diagonalization",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 2, Section 2.1 (Pages 2.1 – 2.22)",
    questions: [
      {
        id: 1,
        question: "A mapping T: V → W between vector spaces is called a Linear Transformation if:",
        options: [
          { id: "A", text: "T(u · v) = T(u) · T(v)" },
          { id: "B", text: "T(u + v) = T(u) + T(v) and T(c·u) = c·T(u) for all u, v ∈ V and c ∈ ℝ" },
          { id: "C", text: "T(u) = ||u||" },
          { id: "D", text: "det(T) = 0" }
        ],
        correctAnswer: "B",
        explanation: "Linearity requires preservation of vector addition (additivity) and scalar multiplication (homogeneity). Combined: T(c₁u₁ + c₂u₂) = c₁T(u₁) + c₂T(u₂).",
        ref: "Dr. G. Balaji, Page 2.2"
      },
      {
        id: 2,
        question: "Which of the following is a mandatory property of any linear transformation T: V → W?",
        options: [
          { id: "A", text: "T(0_V) = 0_W (maps zero vector to zero vector)" },
          { id: "B", text: "T(u) = u for all u" },
          { id: "C", text: "T is always invertible" },
          { id: "D", text: "Range(T) = W" }
        ],
        correctAnswer: "A",
        explanation: "T(0) = T(0 + 0) = T(0) + T(0) ⟹ T(0) = 0. Any transformation that does not send 0 to 0 is instantly non-linear.",
        ref: "Dr. G. Balaji, Page 2.4"
      },
      {
        id: 3,
        question: "Is T: ℝ² → ℝ² defined by T(x, y) = (x + 1, y) a linear transformation?",
        options: [
          { id: "A", text: "Yes, it is a simple translation" },
          { id: "B", text: "No, because T(0, 0) = (1, 0) ≠ (0, 0)" },
          { id: "C", text: "Yes, x and y are degree 1" },
          { id: "D", text: "Yes, it preserves distance" }
        ],
        correctAnswer: "B",
        explanation: "Translations do NOT map the zero vector to the zero vector; T(0, 0) = (1, 0) ≠ (0, 0). Therefore it is affine, not linear.",
        ref: "Dr. G. Balaji, Page 2.5"
      },
      {
        id: 4,
        question: "Is T: ℝ² → ℝ defined by T(x, y) = xy a linear transformation?",
        options: [
          { id: "A", text: "Yes, it is continuous" },
          { id: "B", text: "No, T(2(1, 1)) = T(2, 2) = 4 ≠ 2 · T(1, 1) = 2" },
          { id: "C", text: "Yes, because T(0, 0) = 0" },
          { id: "D", text: "Yes, multiplication is commutative" }
        ],
        correctAnswer: "B",
        explanation: "T(c u) = (cx)(cy) = c²(xy) = c² T(u) ≠ c T(u). It fails scalar multiplication homogeneity.",
        ref: "Dr. G. Balaji, Page 2.6"
      },
      {
        id: 5,
        question: "Which of the following geometric operations in ℝ² is NOT a linear transformation?",
        options: [
          { id: "A", text: "Counter-clockwise rotation about the origin" },
          { id: "B", text: "Reflection across the line y = x" },
          { id: "C", text: "Translation by vector (3, 2)" },
          { id: "D", text: "Orthogonal projection onto the x-axis" }
        ],
        correctAnswer: "C",
        explanation: "Translations do not fix the origin (T(0) = (3, 2) ≠ 0), whereas rotations, reflections across lines through origin, and projections are linear.",
        ref: "Dr. G. Balaji, Page 2.8"
      },
      {
        id: 6,
        question: "For T: V → W, if T(-v) = -T(v), this is guaranteed because:",
        options: [
          { id: "A", text: "T(-v) = T((-1) · v) = (-1) · T(v) = -T(v) by scalar homogeneity" },
          { id: "B", text: "All functions are odd" },
          { id: "C", text: "Negative signs cancel out" },
          { id: "D", text: "W is always ℝ" }
        ],
        correctAnswer: "A",
        explanation: "Since -v = (-1)·v, linearity guarantees T(-v) = T((-1)v) = (-1)T(v) = -T(v).",
        ref: "Dr. G. Balaji, Page 2.4"
      },
      {
        id: 7,
        question: "If T: ℝ² → ℝ² satisfies T(1, 0) = (2, 3) and T(0, 1) = (-1, 4), what is T(2, 5)?",
        options: [
          { id: "A", text: "(-1, 26)" },
          { id: "B", text: "(1, 26)" },
          { id: "C", text: "(4, 15)" },
          { id: "D", text: "(3, 7)" }
        ],
        correctAnswer: "A",
        explanation: "(2, 5) = 2(1, 0) + 5(0, 1). T(2, 5) = 2T(1, 0) + 5T(0, 1) = 2(2, 3) + 5(-1, 4) = (4 - 5, 6 + 20) = (-1, 26).",
        ref: "Dr. G. Balaji, Page 2.10"
      },
      {
        id: 8,
        question: "A linear transformation T: V → V from a space to itself is called a:",
        options: [
          { id: "A", text: "Linear functional" },
          { id: "B", text: "Linear operator" },
          { id: "C", text: "Bilinear form" },
          { id: "D", text: "Quadratic form" }
        ],
        correctAnswer: "B",
        explanation: "A linear transformation whose domain and codomain are identical (T: V → V) is called a linear operator or endomorphism.",
        ref: "Dr. G. Balaji, Page 2.3"
      },
      {
        id: 9,
        question: "Is the differentiation operator D: Pₙ(t) → Pₙ(t) defined by D(p(t)) = p'(t) linear?",
        options: [
          { id: "A", text: "Yes, (f + g)' = f' + g' and (cf)' = c f'" },
          { id: "B", text: "No, derivative decreases polynomial degree" },
          { id: "C", text: "No, D(1) = 0" },
          { id: "D", text: "Only for linear polynomials" }
        ],
        correctAnswer: "A",
        explanation: "From calculus, differentiation satisfies d/dt[f + g] = f' + g' and d/dt[c f] = c f'. Hence D is a linear operator.",
        ref: "Dr. G. Balaji, Page 2.12"
      },
      {
        id: 10,
        question: "Is the norm function T: ℝ³ → ℝ defined by T(v) = ||v|| a linear transformation?",
        options: [
          { id: "A", text: "Yes, it produces a scalar" },
          { id: "B", text: "No, || -v || = ||v|| ≠ -||v|| for non-zero v (fails homogeneity for negative scalars)" },
          { id: "C", text: "Yes, by triangle inequality" },
          { id: "D", text: "Yes, because ||0|| = 0" }
        ],
        correctAnswer: "B",
        explanation: "Taking c = -1 and v ≠ 0: T(-v) = ||-v|| = ||v||, while -T(v) = -||v||. Since ||v|| ≠ -||v||, T is not linear.",
        ref: "Dr. G. Balaji, Page 2.7"
      }
    ]
  },

  "2.2": {
    topicCode: "2.2",
    topicName: "Matrix Representation of Transformations",
    unitNumber: "UNIT II",
    unitTitle: "Linear Transformations & Diagonalization",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 2, Section 2.2 (Pages 2.23 – 2.34)",
    questions: [
      {
        id: 1,
        question: "How is the standard matrix [T] for a linear transformation T: ℝⁿ → ℝᵐ determined?",
        options: [
          { id: "A", text: "Its columns are the images of standard basis vectors: [T(e₁), T(e₂), ..., T(eₙ)]" },
          { id: "B", text: "Its rows are the eigenvalues of T" },
          { id: "C", text: "By taking the inverse of T" },
          { id: "D", text: "By computing the determinant of T" }
        ],
        correctAnswer: "A",
        explanation: "Theorem: The standard matrix representing T has columns equal to T(e₁), T(e₂), ..., T(eₙ) where eᵢ are standard basis vectors.",
        ref: "Dr. G. Balaji, Page 2.24"
      },
      {
        id: 2,
        question: "What is the standard matrix for counter-clockwise rotation by angle θ in ℝ²?",
        options: [
          { id: "A", text: "[[cos θ, -sin θ], [sin θ, cos θ]]" },
          { id: "B", text: "[[cos θ, sin θ], [-sin θ, cos θ]]" },
          { id: "C", text: "[[sin θ, cos θ], [cos θ, -sin θ]]" },
          { id: "D", text: "[[1, θ], [0, 1]]" }
        ],
        correctAnswer: "A",
        explanation: "T(1, 0) = (cos θ, sin θ) and T(0, 1) = (-sin θ, cos θ). Writing these as columns gives [[cos θ, -sin θ], [sin θ, cos θ]].",
        ref: "Dr. G. Balaji, Page 2.26"
      },
      {
        id: 3,
        question: "For T: ℝ² → ℝ² defined by T(x, y) = (2x - 3y, x + 4y), what is the matrix [T]?",
        options: [
          { id: "A", text: "[[2, -3], [1, 4]]" },
          { id: "B", text: "[[2, 1], [-3, 4]]" },
          { id: "C", text: "[[1, 4], [2, -3]]" },
          { id: "D", text: "[[-3, 2], [4, 1]]" }
        ],
        correctAnswer: "A",
        explanation: "T(1, 0) = (2, 1) is column 1; T(0, 1) = (-3, 4) is column 2. Thus [T] = [[2, -3], [1, 4]].",
        ref: "Dr. G. Balaji, Page 2.27"
      },
      {
        id: 4,
        question: "If T: V → W and S: W → U are linear transformations with matrices [T] and [S], what matrix represents the composite transformation S ∘ T?",
        options: [
          { id: "A", text: "[S] + [T]" },
          { id: "B", text: "[S] [T] (matrix product)" },
          { id: "C", text: "[T] [S]" },
          { id: "D", text: "([S] [T])ᵀ" }
        ],
        correctAnswer: "B",
        explanation: "Composition of linear mappings corresponds to matrix multiplication: [S ∘ T] = [S][T].",
        ref: "Dr. G. Balaji, Page 2.29"
      },
      {
        id: 5,
        question: "What is the standard matrix representing reflection across the x-axis in ℝ²?",
        options: [
          { id: "A", text: "[[1, 0], [0, -1]]" },
          { id: "B", text: "[[-1, 0], [0, 1]]" },
          { id: "C", text: "[[0, 1], [1, 0]]" },
          { id: "D", text: "[[-1, 0], [0, -1]]" }
        ],
        correctAnswer: "A",
        explanation: "Reflection across x-axis maps (x, y) to (x, -y). T(1, 0) = (1, 0) and T(0, 1) = (0, -1), giving [[1, 0], [0, -1]].",
        ref: "Dr. G. Balaji, Page 2.28"
      },
      {
        id: 6,
        question: "If a linear operator T: ℝⁿ → ℝⁿ is invertible, what can be said about its matrix [T]?",
        options: [
          { id: "A", text: "[T] is singular" },
          { id: "B", text: "[T] is invertible and [T⁻¹] = [T]⁻¹" },
          { id: "C", text: "det([T]) = 0" },
          { id: "D", text: "[T] must be diagonal" }
        ],
        correctAnswer: "B",
        explanation: "T is invertible if and only if [T] is an invertible matrix, with the inverse transformation represented by [T]⁻¹.",
        ref: "Dr. G. Balaji, Page 2.31"
      },
      {
        id: 7,
        question: "What is the order of matrix [T] if T: ℝ³ → ℝ²?",
        options: [
          { id: "A", text: "3 × 2" },
          { id: "B", text: "2 × 3" },
          { id: "C", text: "3 × 3" },
          { id: "D", text: "2 × 2" }
        ],
        correctAnswer: "B",
        explanation: "For T: ℝⁿ → ℝᵐ, the matrix has m rows and n columns (m × n). Here m = 2 and n = 3, so [T] is 2 × 3.",
        ref: "Dr. G. Balaji, Page 2.25"
      },
      {
        id: 8,
        question: "What matrix represents the identity operator I(v) = v on ℝⁿ?",
        options: [
          { id: "A", text: "The n×n zero matrix" },
          { id: "B", text: "The n×n identity matrix Iₙ" },
          { id: "C", text: "A matrix of all 1s" },
          { id: "D", text: "Undefined" }
        ],
        correctAnswer: "B",
        explanation: "I(eᵢ) = eᵢ for each standard basis vector, giving the identity matrix Iₙ with 1s on the main diagonal and 0 elsewhere.",
        ref: "Dr. G. Balaji, Page 2.24"
      },
      {
        id: 9,
        question: "What is the determinant of a 2D reflection matrix?",
        options: [
          { id: "A", text: "+1" },
          { id: "B", text: "-1" },
          { id: "C", text: "0" },
          { id: "D", text: "2" }
        ],
        correctAnswer: "B",
        explanation: "Reflections reverse orientation in space. For any reflection matrix in ℝ², det = -1.",
        ref: "Dr. G. Balaji, Page 2.28"
      },
      {
        id: 10,
        question: "For non-standard bases B of V and C of W, how is [T]_{B,C} defined?",
        options: [
          { id: "A", text: "Columns are [T(vⱼ)]_C, coordinate vectors of T(vⱼ) in basis C" },
          { id: "B", text: "Columns are vⱼ" },
          { id: "C", text: "The dot products of basis vectors" },
          { id: "D", text: "Always the identity matrix" }
        ],
        correctAnswer: "A",
        explanation: "The general matrix representation has columns equal to the coordinates of the transformed domain basis vectors expressed in terms of the codomain basis C.",
        ref: "Dr. G. Balaji, Page 2.33"
      }
    ]
  },

  "2.3": {
    topicCode: "2.3",
    topicName: "Kernel, Range & Rank-Nullity Theorem",
    unitNumber: "UNIT II",
    unitTitle: "Linear Transformations & Diagonalization",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 2, Section 2.3 (Pages 2.35 – 2.58)",
    questions: [
      {
        id: 1,
        question: "What is the Kernel (Null space) of a linear transformation T: V → W?",
        options: [
          { id: "A", text: "Ker(T) = {v ∈ V : T(v) = 0_W}" },
          { id: "B", text: "Ker(T) = {w ∈ W : w = T(v)}" },
          { id: "C", text: "The set of all non-zero eigenvalues" },
          { id: "D", text: "The determinant of T" }
        ],
        correctAnswer: "A",
        explanation: "Ker(T) is the set of all vectors in domain V that are mapped by T to the zero vector in W.",
        ref: "Dr. G. Balaji, Page 2.36"
      },
      {
        id: 2,
        question: "State the Rank-Nullity Theorem (Dimension Theorem) for T: V → W where dim(V) is finite:",
        options: [
          { id: "A", text: "dim(V) = rank(T) + nullity(T)" },
          { id: "B", text: "dim(W) = rank(T) + nullity(T)" },
          { id: "C", text: "rank(T) = nullity(T)" },
          { id: "D", text: "dim(V) = rank(T) · nullity(T)" }
        ],
        correctAnswer: "A",
        explanation: "The Rank-Nullity Theorem states that the dimension of the domain V equals the rank (dimension of Range) plus the nullity (dimension of Kernel): dim(V) = rank(T) + nullity(T).",
        ref: "Dr. G. Balaji, Page 2.40"
      },
      {
        id: 3,
        question: "A linear transformation T: ℝ⁵ → ℝ³ has a kernel of dimension 2. What is the rank of T?",
        options: [
          { id: "A", text: "1" },
          { id: "B", text: "2" },
          { id: "C", text: "3" },
          { id: "D", text: "5" }
        ],
        correctAnswer: "C",
        explanation: "dim(Domain) = dim(ℝ⁵) = 5. nullity(T) = 2. By Rank-Nullity: rank(T) = 5 - 2 = 3.",
        ref: "Dr. G. Balaji, Page 2.42"
      },
      {
        id: 4,
        question: "A linear transformation T: V → W is one-to-one (injective) if and only if:",
        options: [
          { id: "A", text: "Ker(T) = {0} (i.e. nullity(T) = 0)" },
          { id: "B", text: "rank(T) = 0" },
          { id: "C", text: "dim(V) > dim(W)" },
          { id: "D", text: "T(v) = 0 for all v" }
        ],
        correctAnswer: "A",
        explanation: "Theorem: T is injective ⟺ T(u) = T(v) implies u = v ⟺ T(u - v) = 0 implies u - v = 0 ⟺ Ker(T) = {0}.",
        ref: "Dr. G. Balaji, Page 2.44"
      },
      {
        id: 5,
        question: "A linear transformation T: V → W is onto (surjective) if and only if:",
        options: [
          { id: "A", text: "rank(T) = dim(W)" },
          { id: "B", text: "nullity(T) = dim(V)" },
          { id: "C", text: "Ker(T) = W" },
          { id: "D", text: "dim(V) = 0" }
        ],
        correctAnswer: "A",
        explanation: "T is surjective if its Range equals the entire codomain W, meaning dim(Range(T)) = rank(T) = dim(W).",
        ref: "Dr. G. Balaji, Page 2.45"
      },
      {
        id: 6,
        question: "Can there exist an injective linear transformation T: ℝ⁴ → ℝ²?",
        options: [
          { id: "A", text: "Yes, if the matrix is full rank" },
          { id: "B", text: "No, by Rank-Nullity: nullity = 4 - rank ≥ 4 - 2 = 2 > 0, so Ker(T) cannot be {0}" },
          { id: "C", text: "Yes, for orthogonal transformations" },
          { id: "D", text: "Yes, if det ≠ 0" }
        ],
        correctAnswer: "B",
        explanation: "Rank cannot exceed codomain dim(ℝ²) = 2. Hence nullity(T) = 4 - rank(T) ≥ 4 - 2 = 2. Since nullity > 0, T can never be injective.",
        ref: "Dr. G. Balaji, Page 2.46"
      },
      {
        id: 7,
        question: "For T: ℝ³ → ℝ³ defined by T(x, y, z) = (x, y, 0), what is Ker(T)?",
        options: [
          { id: "A", text: "The xy-plane: {(x, y, 0)}" },
          { id: "B", text: "The z-axis: {(0, 0, z) : z ∈ ℝ}" },
          { id: "C", text: "The origin {(0, 0, 0)}" },
          { id: "D", text: "ℝ³" }
        ],
        correctAnswer: "B",
        explanation: "Setting T(x, y, z) = (x, y, 0) = (0, 0, 0) yields x = 0, y = 0, while z can be any real number. Hence Ker(T) is the z-axis (nullity = 1).",
        ref: "Dr. G. Balaji, Page 2.38"
      },
      {
        id: 8,
        question: "If A is an m×n matrix, the Range (Image) of T_A: ℝⁿ → ℝᵐ is identical to:",
        options: [
          { id: "A", text: "The Null space of A" },
          { id: "B", text: "The Column space Col(A)" },
          { id: "C", text: "The Row space Row(A)" },
          { id: "D", text: "The Left Null space" }
        ],
        correctAnswer: "B",
        explanation: "Because Ax = x₁a₁ + ... + xₙaₙ, any output of T_A is a linear combination of the columns of A. Hence Range(T_A) = Col(A).",
        ref: "Dr. G. Balaji, Page 2.39"
      },
      {
        id: 9,
        question: "If T: V → V is a linear operator on a finite-dimensional space V, which statement is TRUE?",
        options: [
          { id: "A", text: "T is one-to-one if and only if T is onto" },
          { id: "B", text: "T can be one-to-one without being onto" },
          { id: "C", text: "rank(T) is always equal to nullity(T)" },
          { id: "D", text: "Ker(T) must be empty" }
        ],
        correctAnswer: "A",
        explanation: "When domain and codomain have equal finite dimension n: nullity = 0 ⟺ rank = n ⟺ onto. Injective and surjective are completely equivalent.",
        ref: "Dr. G. Balaji, Page 2.48"
      },
      {
        id: 10,
        question: "What is the nullity of the zero transformation T(v) = 0 on ℝⁿ?",
        options: [
          { id: "A", text: "0" },
          { id: "B", text: "n" },
          { id: "C", text: "1" },
          { id: "D", text: "Undefined" }
        ],
        correctAnswer: "B",
        explanation: "Every vector v ∈ ℝⁿ is mapped to 0, so Ker(T) = ℝⁿ. Therefore nullity(T) = dim(ℝⁿ) = n.",
        ref: "Dr. G. Balaji, Page 2.37"
      }
    ]
  },

  "2.4": {
    topicCode: "2.4",
    topicName: "Eigenvalues & Eigenvectors",
    unitNumber: "UNIT II",
    unitTitle: "Linear Transformations & Diagonalization",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 2, Section 2.4 (Pages 2.59 – 2.80)",
    questions: [
      {
        id: 1,
        question: "For a square matrix A, a scalar λ is an eigenvalue and non-zero vector x is an eigenvector if:",
        options: [
          { id: "A", text: "A x = λ x" },
          { id: "B", text: "A + x = λ" },
          { id: "C", text: "A x = 0" },
          { id: "D", text: "xᵀ A x = 1" }
        ],
        correctAnswer: "A",
        explanation: "By definition, an eigenvector is a non-zero vector x that is only scaled by factor λ when multiplied by A: A x = λ x.",
        ref: "Dr. G. Balaji, Page 2.60"
      },
      {
        id: 2,
        question: "How is the characteristic equation used to find the eigenvalues of an n×n matrix A?",
        options: [
          { id: "A", text: "det(A - λI) = 0" },
          { id: "B", text: "Tr(A) = λ" },
          { id: "C", text: "A - λI = 0" },
          { id: "D", text: "xᵀ (A - λI) = 0" }
        ],
        correctAnswer: "A",
        explanation: "(A - λI)x = 0 has a non-trivial solution x ≠ 0 if and only if the matrix (A - λI) is singular, meaning det(A - λI) = 0.",
        ref: "Dr. G. Balaji, Page 2.62"
      },
      {
        id: 3,
        question: "What is the relationship between the sum of the eigenvalues of A and the trace of A?",
        options: [
          { id: "A", text: "Sum of eigenvalues = Tr(A) (sum of diagonal entries)" },
          { id: "B", text: "Sum of eigenvalues = det(A)" },
          { id: "C", text: "Sum of eigenvalues = 0" },
          { id: "D", text: "Sum of eigenvalues = (Tr(A))²" }
        ],
        correctAnswer: "A",
        explanation: "Property of eigenvalues: The sum of all eigenvalues of A equals the trace of A: λ₁ + λ₂ + ... + λₙ = Tr(A) = ∑ aᵢᵢ.",
        ref: "Dr. G. Balaji, Page 2.64"
      },
      {
        id: 4,
        question: "What is the relationship between the product of the eigenvalues of A and the determinant of A?",
        options: [
          { id: "A", text: "Product of eigenvalues = det(A)" },
          { id: "B", text: "Product of eigenvalues = Tr(A)" },
          { id: "C", text: "Product of eigenvalues = 1" },
          { id: "D", text: "Product of eigenvalues = rank(A)" }
        ],
        correctAnswer: "A",
        explanation: "Property of eigenvalues: The product of all eigenvalues of A equals the determinant of A: λ₁ · λ₂ · ... · λₙ = det(A).",
        ref: "Dr. G. Balaji, Page 2.65"
      },
      {
        id: 5,
        question: "What are the eigenvalues of a triangular (upper or lower) or diagonal matrix?",
        options: [
          { id: "A", text: "All equal to 1" },
          { id: "B", text: "The main diagonal entries themselves" },
          { id: "C", text: "All equal to 0" },
          { id: "D", text: "The determinant divided by 2" }
        ],
        correctAnswer: "B",
        explanation: "For a triangular matrix, det(A - λI) = (a₁₁ - λ)(a₂₂ - λ)...(aₙₙ - λ) = 0. Hence the roots λᵢ are simply the diagonal entries.",
        ref: "Dr. G. Balaji, Page 2.66"
      },
      {
        id: 6,
        question: "If λ is an eigenvalue of an invertible matrix A, what is the corresponding eigenvalue of A⁻¹?",
        options: [
          { id: "A", text: "-λ" },
          { id: "B", text: "1 / λ" },
          { id: "C", text: "λ²" },
          { id: "D", text: "1 - λ" }
        ],
        correctAnswer: "B",
        explanation: "From Ax = λx, multiplying by A⁻¹ gives x = λ A⁻¹x ⟹ A⁻¹x = (1/λ)x. Thus 1/λ is the eigenvalue of A⁻¹.",
        ref: "Dr. G. Balaji, Page 2.68"
      },
      {
        id: 7,
        question: "Find the eigenvalues of A = [[3, 1], [0, 2]]:",
        options: [
          { id: "A", text: "λ = 3 and λ = 2" },
          { id: "B", text: "λ = 1 and λ = 5" },
          { id: "C", text: "λ = 0 and λ = 6" },
          { id: "D", text: "λ = -3 and λ = -2" }
        ],
        correctAnswer: "A",
        explanation: "A is an upper triangular matrix; its eigenvalues are its diagonal entries: λ₁ = 3 and λ₂ = 2.",
        ref: "Dr. G. Balaji, Page 2.70"
      },
      {
        id: 8,
        question: "If x is an eigenvector of A with eigenvalue λ, what is the eigenvalue of Aᵏ for positive integer k?",
        options: [
          { id: "A", text: "k λ" },
          { id: "B", text: "λᵏ" },
          { id: "C", text: "λ / k" },
          { id: "D", text: "λ + k" }
        ],
        correctAnswer: "B",
        explanation: "Repeated multiplication yields A²x = A(λx) = λ(Ax) = λ²x, and by induction Aᵏx = λᵏx. The eigenvalue is λᵏ.",
        ref: "Dr. G. Balaji, Page 2.67"
      },
      {
        id: 9,
        question: "Eigenvectors corresponding to distinct eigenvalues of a matrix are always:",
        options: [
          { id: "A", text: "Linearly dependent" },
          { id: "B", text: "Linearly independent" },
          { id: "C", text: "Orthogonal in all norms" },
          { id: "D", text: "Equal" }
        ],
        correctAnswer: "B",
        explanation: "Theorem: If v₁, v₂, ..., vₖ are eigenvectors corresponding to distinct eigenvalues λ₁, λ₂, ..., λₖ, then {v₁, ..., vₖ} is linearly independent.",
        ref: "Dr. G. Balaji, Page 2.74"
      },
      {
        id: 10,
        question: "What does the geometric multiplicity of an eigenvalue λ represent?",
        options: [
          { id: "A", text: "The multiplicity of λ as a root of det(A - λI) = 0" },
          { id: "B", text: "The dimension of the eigenspace E_λ = Ker(A - λI)" },
          { id: "C", text: "The trace of A" },
          { id: "D", text: "The number of rows in A" }
        ],
        correctAnswer: "B",
        explanation: "The geometric multiplicity is the number of linearly independent eigenvectors associated with λ, which is dim(Ker(A - λI)). It is always ≤ algebraic multiplicity.",
        ref: "Dr. G. Balaji, Page 2.76"
      }
    ]
  },

  "2.5": {
    topicCode: "2.5",
    topicName: "Cayley-Hamilton Theorem",
    unitNumber: "UNIT II",
    unitTitle: "Linear Transformations & Diagonalization",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 2, Section 2.5 (Pages 2.81 – 2.96)",
    questions: [
      {
        id: 1,
        question: "What is the formal statement of the Cayley-Hamilton Theorem?",
        options: [
          { id: "A", text: "Every square matrix is diagonal" },
          { id: "B", text: "Every square matrix satisfies its own characteristic equation" },
          { id: "C", text: "A matrix equals its transpose" },
          { id: "D", text: "det(A) is always positive" }
        ],
        correctAnswer: "B",
        explanation: "The Cayley-Hamilton Theorem states that if p(λ) = det(A - λI) = λⁿ + cₙ₋₁λⁿ⁻¹ + ... + c₀ = 0 is the characteristic polynomial of A, then p(A) = Aⁿ + cₙ₋₁Aⁿ⁻¹ + ... + c₀I = O (zero matrix).",
        ref: "Dr. G. Balaji, Page 2.82"
      },
      {
        id: 2,
        question: "If A is a 2×2 matrix with characteristic equation λ² - 5λ + 6 = 0, what matrix equation is guaranteed by Cayley-Hamilton?",
        options: [
          { id: "A", text: "A² - 5A + 6I = O" },
          { id: "B", text: "A² + 5A - 6I = O" },
          { id: "C", text: "A² = 5A" },
          { id: "D", text: "6A = I" }
        ],
        correctAnswer: "A",
        explanation: "Substituting A into the characteristic polynomial gives A² - 5A + 6I = O (where O is the 2×2 zero matrix).",
        ref: "Dr. G. Balaji, Page 2.84"
      },
      {
        id: 3,
        question: "Using A² - 5A + 6I = O, what is the formula for A⁻¹ in terms of A and I?",
        options: [
          { id: "A", text: "A⁻¹ = (1/6)(5I - A)" },
          { id: "B", text: "A⁻¹ = 5A - 6I" },
          { id: "C", text: "A⁻¹ = 6A - 5I" },
          { id: "D", text: "A⁻¹ = (1/5)(6I - A)" }
        ],
        correctAnswer: "A",
        explanation: "Multiply A² - 5A + 6I = O by A⁻¹: A - 5I + 6A⁻¹ = O ⟹ 6A⁻¹ = 5I - A ⟹ A⁻¹ = (1/6)(5I - A).",
        ref: "Dr. G. Balaji, Page 2.86"
      },
      {
        id: 4,
        question: "How does the Cayley-Hamilton Theorem allow computing high matrix powers, such as A⁴ for a 2×2 matrix?",
        options: [
          { id: "A", text: "By setting A⁴ = 4A" },
          { id: "B", text: "By expressing higher powers as linear combinations of A and I (reducing degree)" },
          { id: "C", text: "By computing 4 times det(A)" },
          { id: "D", text: "It only works for powers up to 2" }
        ],
        correctAnswer: "B",
        explanation: "Since A² = 5A - 6I, A³ = 5A² - 6A = 5(5A - 6I) - 6A = 19A - 30I, and so on. Higher powers are reduced to degree < n.",
        ref: "Dr. G. Balaji, Page 2.88"
      },
      {
        id: 5,
        question: "For a 3×3 matrix A, the characteristic equation is λ³ - c₁λ² + c₂λ - c₃ = 0. What are the coefficients c₁, c₂, and c₃?",
        options: [
          { id: "A", text: "c₁ = Tr(A), c₂ = Sum of leading principal minors, c₃ = det(A)" },
          { id: "B", text: "c₁ = det(A), c₂ = Tr(A), c₃ = 1" },
          { id: "C", text: "c₁ = 1, c₂ = 2, c₃ = 3" },
          { id: "D", text: "They are the three diagonal entries" }
        ],
        correctAnswer: "A",
        explanation: "Standard Anna University expansion: c₁ = trace(A) = a₁₁ + a₂₂ + a₃₃, c₂ = M₁₁ + M₂₂ + M₃₃ (sum of principal minors), and c₃ = det(A).",
        ref: "Dr. G. Balaji, Page 2.83"
      },
      {
        id: 6,
        question: "Can the Cayley-Hamilton theorem be used to invert a singular matrix (det(A) = 0)?",
        options: [
          { id: "A", text: "Yes, always" },
          { id: "B", text: "No, because the constant term c₀ = (-1)ⁿ det(A) = 0, so A⁻¹ cannot be isolated" },
          { id: "C", text: "Yes, by dividing by zero" },
          { id: "D", text: "Only for symmetric matrices" }
        ],
        correctAnswer: "B",
        explanation: "If det(A) = 0, the constant term in the polynomial is 0 (i.e. Aⁿ + ... + c₁A = O), so A cannot be multiplied by A⁻¹ to isolate an identity matrix.",
        ref: "Dr. G. Balaji, Page 2.87"
      },
      {
        id: 7,
        question: "For A = [[1, 2], [3, 4]], what is Tr(A) and det(A)?",
        options: [
          { id: "A", text: "Tr = 5, det = -2" },
          { id: "B", text: "Tr = 4, det = 2" },
          { id: "C", text: "Tr = 5, det = 10" },
          { id: "D", text: "Tr = -2, det = 5" }
        ],
        correctAnswer: "A",
        explanation: "Tr(A) = 1 + 4 = 5. det(A) = (1)(4) - (2)(3) = 4 - 6 = -2.",
        ref: "Dr. G. Balaji, Page 2.85"
      },
      {
        id: 8,
        question: "What is the characteristic equation for A = [[1, 2], [3, 4]]?",
        options: [
          { id: "A", text: "λ² - 5λ - 2 = 0" },
          { id: "B", text: "λ² + 5λ - 2 = 0" },
          { id: "C", text: "λ² - 5λ + 2 = 0" },
          { id: "D", text: "λ² - 2λ - 5 = 0" }
        ],
        correctAnswer: "A",
        explanation: "The formula for a 2×2 matrix is λ² - Tr(A)λ + det(A) = 0. With Tr = 5 and det = -2, we get λ² - 5λ - 2 = 0.",
        ref: "Dr. G. Balaji, Page 2.85"
      },
      {
        id: 9,
        question: "The minimal polynomial m(λ) of a matrix A divides:",
        options: [
          { id: "A", text: "The characteristic polynomial p(λ)" },
          { id: "B", text: "Only the trace of A" },
          { id: "C", text: "No other polynomial" },
          { id: "D", text: "The determinant of A" }
        ],
        correctAnswer: "A",
        explanation: "The minimal polynomial m(λ) is the monic polynomial of least degree such that m(A) = O. By Cayley-Hamilton, m(λ) always divides p(λ).",
        ref: "Dr. G. Balaji, Page 2.92"
      },
      {
        id: 10,
        question: "If A² = I for a square matrix A (an involutory matrix), what are its possible eigenvalues?",
        options: [
          { id: "A", text: "+1 and -1 only" },
          { id: "B", text: "0 only" },
          { id: "C", text: "Any real number" },
          { id: "D", text: "+2 and -2" }
        ],
        correctAnswer: "A",
        explanation: "If Ax = λx, then A²x = λ²x = x ⟹ (λ² - 1)x = 0. Since x ≠ 0, λ² = 1 ⟹ λ = ±1.",
        ref: "Dr. G. Balaji, Page 2.94"
      }
    ]
  },

  "2.6": {
    topicCode: "2.6",
    topicName: "Diagonalization of Matrices",
    unitNumber: "UNIT II",
    unitTitle: "Linear Transformations & Diagonalization",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 2, Section 2.6 (Pages 2.97 – 2.112)",
    questions: [
      {
        id: 1,
        question: "An n×n matrix A is diagonalizable if and only if:",
        options: [
          { id: "A", text: "A has n linearly independent eigenvectors" },
          { id: "B", text: "det(A) = 0" },
          { id: "C", text: "A is triangular" },
          { id: "D", text: "All diagonal entries are positive" }
        ],
        correctAnswer: "A",
        explanation: "Diagonalization requires constructing modal matrix P whose columns are eigenvectors; P is invertible if and only if the n eigenvectors are linearly independent.",
        ref: "Dr. G. Balaji, Page 2.98"
      },
      {
        id: 2,
        question: "If A is diagonalizable with modal matrix P and diagonal eigenvalue matrix D, what is the similarity transformation?",
        options: [
          { id: "A", text: "P⁻¹ A P = D (or equivalently A = P D P⁻¹)" },
          { id: "B", text: "P A P⁻¹ = D" },
          { id: "C", text: "A + P = D" },
          { id: "D", text: "Pᵀ A = D" }
        ],
        correctAnswer: "A",
        explanation: "The diagonalizing similarity transformation is P⁻¹ A P = D, where D = diag(λ₁, ..., λₙ) and columns of P are corresponding eigenvectors.",
        ref: "Dr. G. Balaji, Page 2.100"
      },
      {
        id: 3,
        question: "If an n×n matrix A has n distinct eigenvalues, is A guaranteed to be diagonalizable?",
        options: [
          { id: "A", text: "Yes, distinct eigenvalues always guarantee n linearly independent eigenvectors" },
          { id: "B", text: "No, only if det(A) > 0" },
          { id: "C", text: "No, only if A is symmetric" },
          { id: "D", text: "Only for 2×2 matrices" }
        ],
        correctAnswer: "A",
        explanation: "Theorem: If an n×n matrix has n distinct eigenvalues, their corresponding eigenvectors are automatically linearly independent, making A unconditionally diagonalizable.",
        ref: "Dr. G. Balaji, Page 2.102"
      },
      {
        id: 4,
        question: "How is Aᵏ easily computed once A is diagonalized as A = P D P⁻¹?",
        options: [
          { id: "A", text: "Aᵏ = P Dᵏ P⁻¹" },
          { id: "B", text: "Aᵏ = Pᵏ D P⁻ᵏ" },
          { id: "C", text: "Aᵏ = k P D P⁻¹" },
          { id: "D", text: "Aᵏ = Dᵏ" }
        ],
        correctAnswer: "A",
        explanation: "Aᵏ = (P D P⁻¹)(P D P⁻¹)...(P D P⁻¹) = P D (P⁻¹ P) D ... D P⁻¹ = P Dᵏ P⁻¹. Since D is diagonal, Dᵏ is simply diag(λ₁ᵏ, ..., λₙᵏ).",
        ref: "Dr. G. Balaji, Page 2.104"
      },
      {
        id: 5,
        question: "Is the defective matrix A = [[2, 1], [0, 2]] diagonalizable?",
        options: [
          { id: "A", text: "Yes, it has eigenvalue 2" },
          { id: "B", text: "No, eigenvalue λ = 2 has algebraic multiplicity 2 but geometric multiplicity only 1" },
          { id: "C", text: "Yes, all 2×2 matrices diagonalize" },
          { id: "D", text: "Yes, with P = I" }
        ],
        correctAnswer: "B",
        explanation: "(A - 2I) = [[0, 1], [0, 0]], which has rank 1 and nullity 1. There is only 1 independent eigenvector, so it lacks a full basis of eigenvectors and cannot be diagonalized.",
        ref: "Dr. G. Balaji, Page 2.106"
      },
      {
        id: 6,
        question: "For any real symmetric matrix A, what does the Spectral Theorem guarantee about its diagonalizability?",
        options: [
          { id: "A", text: "It is always orthogonally diagonalizable via an orthogonal matrix Q (Qᵀ A Q = D)" },
          { id: "B", text: "It is never diagonalizable" },
          { id: "C", text: "Only if its trace is zero" },
          { id: "D", text: "Only if all entries are integers" }
        ],
        correctAnswer: "A",
        explanation: "The Spectral Theorem guarantees that every real symmetric matrix has real eigenvalues, orthogonal eigenspaces, and is orthogonally diagonalizable with Q⁻¹ = Qᵀ.",
        ref: "Dr. G. Balaji, Page 2.108"
      },
      {
        id: 7,
        question: "Two matrices A and B are said to be similar (A ~ B) if:",
        options: [
          { id: "A", text: "B = P⁻¹ A P for some invertible matrix P" },
          { id: "B", text: "A + B = I" },
          { id: "C", text: "det(A) = det(B) only" },
          { id: "D", text: "A B = B A" }
        ],
        correctAnswer: "A",
        explanation: "By definition, similarity means B = P⁻¹ A P for an invertible transition matrix P. Similar matrices share the same eigenvalues, determinant, trace, and characteristic polynomial.",
        ref: "Dr. G. Balaji, Page 2.99"
      },
      {
        id: 8,
        question: "If A and B are similar matrices, which of the following is NOT necessarily equal?",
        options: [
          { id: "A", text: "Determinant" },
          { id: "B", text: "Trace" },
          { id: "C", text: "Eigenvalues" },
          { id: "D", text: "Eigenvectors" }
        ],
        correctAnswer: "D",
        explanation: "Similar matrices have the exact same eigenvalues, determinant, and trace, but their eigenvectors are rotated by the transformation matrix P: x_A = P x_B.",
        ref: "Dr. G. Balaji, Page 2.101"
      },
      {
        id: 9,
        question: "If D = [[3, 0], [0, 5]], what is D³?",
        options: [
          { id: "A", text: "[[9, 0], [0, 15]]" },
          { id: "B", text: "[[27, 0], [0, 125]]" },
          { id: "C", text: "[[6, 0], [0, 8]]" },
          { id: "D", text: "[[3, 0], [0, 5]]" }
        ],
        correctAnswer: "B",
        explanation: "For a diagonal matrix, powers are taken component-wise: 3³ = 27 and 5³ = 125.",
        ref: "Dr. G. Balaji, Page 2.105"
      },
      {
        id: 10,
        question: "What is the geometric condition for an n×n matrix A to be diagonalizable?",
        options: [
          { id: "A", text: "For each eigenvalue λᵢ, Geometric Multiplicity = Algebraic Multiplicity" },
          { id: "B", text: "All eigenvalues must be zero" },
          { id: "C", text: "Geometric multiplicity must be 0" },
          { id: "D", text: "Algebraic multiplicity must be 1 for all roots" }
        ],
        correctAnswer: "A",
        explanation: "A matrix is diagonalizable if and only if the eigenspace dimension (geometric multiplicity) equals the root multiplicity (algebraic multiplicity) for every eigenvalue.",
        ref: "Dr. G. Balaji, Page 2.110"
      }
    ]
  },

  // =========================================================================
  // UNIT III: INNER PRODUCT SPACES (Topics 3.1 to 3.5)
  // =========================================================================

  "3.1": {
    topicCode: "3.1",
    topicName: "Inner Products & Norms",
    unitNumber: "UNIT III",
    unitTitle: "Inner Product Spaces",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 3, Section 3.1 (Pages 3.1 – 3.16)",
    questions: [
      {
        id: 1,
        question: "Which of the following is NOT an axiom of a real Inner Product ⟨u, v⟩ on vector space V?",
        options: [
          { id: "A", text: "Symmetry: ⟨u, v⟩ = ⟨v, u⟩" },
          { id: "B", text: "Linearity: ⟨c u + d w, v⟩ = c⟨u, v⟩ + d⟨w, v⟩" },
          { id: "C", text: "Positive Definiteness: ⟨u, u⟩ ≥ 0, and ⟨u, u⟩ = 0 ⟺ u = 0" },
          { id: "D", text: "Multiplicativity: ⟨u, v · w⟩ = ⟨u, v⟩ · ⟨u, w⟩" }
        ],
        correctAnswer: "D",
        explanation: "An inner product on a real vector space requires symmetry, linearity in the first argument, and positive definiteness. Option D is mathematically invalid.",
        ref: "Dr. G. Balaji, Page 3.2"
      },
      {
        id: 2,
        question: "In any inner product space, how is the induced norm (length) ||v|| defined?",
        options: [
          { id: "A", text: "||v|| = ⟨v, v⟩" },
          { id: "B", text: "||v|| = √⟨v, v⟩" },
          { id: "C", text: "||v|| = ⟨v, v⟩²" },
          { id: "D", text: "||v|| = 1 / ⟨v, v⟩" }
        ],
        correctAnswer: "B",
        explanation: "The norm (length) of a vector induced by an inner product is defined as the non-negative square root of the inner product of the vector with itself: ||v|| = √⟨v, v⟩.",
        ref: "Dr. G. Balaji, Page 3.5"
      },
      {
        id: 3,
        question: "What is the standard Euclidean inner product of u = (1, -2, 3) and v = (4, 1, -1) in ℝ³?",
        options: [
          { id: "A", text: "-1" },
          { id: "B", text: "1" },
          { id: "C", text: "0" },
          { id: "D", text: "9" }
        ],
        correctAnswer: "A",
        explanation: "⟨u, v⟩ = (1)(4) + (-2)(1) + (3)(-1) = 4 - 2 - 3 = -1.",
        ref: "Dr. G. Balaji, Page 3.4"
      },
      {
        id: 4,
        question: "What is the norm (length) of the vector v = (2, -3, 6) in ℝ³ with the Euclidean inner product?",
        options: [
          { id: "A", text: "5" },
          { id: "B", text: "7" },
          { id: "C", text: "49" },
          { id: "D", text: "11" }
        ],
        correctAnswer: "B",
        explanation: "||v|| = √(2² + (-3)² + 6²) = √(4 + 9 + 36) = √49 = 7.",
        ref: "Dr. G. Balaji, Page 3.6"
      },
      {
        id: 5,
        question: "How is the metric distance d(u, v) between two vectors u and v defined in an inner product space?",
        options: [
          { id: "A", text: "d(u, v) = ||u - v|| = √⟨u - v, u - v⟩" },
          { id: "B", text: "d(u, v) = ||u|| - ||v||" },
          { id: "C", text: "d(u, v) = ⟨u, v⟩" },
          { id: "D", text: "d(u, v) = ||u + v||" }
        ],
        correctAnswer: "A",
        explanation: "The metric distance is the norm of the difference vector: d(u, v) = ||u - v|| = √⟨u - v, u - v⟩.",
        ref: "Dr. G. Balaji, Page 3.8"
      },
      {
        id: 6,
        question: "A vector u is called a unit vector if:",
        options: [
          { id: "A", text: "||u|| = 0" },
          { id: "B", text: "||u|| = 1" },
          { id: "C", text: "⟨u, u⟩ = 2" },
          { id: "D", text: "u = (1, 1, 1)" }
        ],
        correctAnswer: "B",
        explanation: "A unit vector is any vector having norm (length) strictly equal to 1. Given any non-zero vector v, v / ||v|| is a unit vector.",
        ref: "Dr. G. Balaji, Page 3.7"
      },
      {
        id: 7,
        question: "In the function space C[0, 1], what is the standard L² inner product of f(t) and g(t)?",
        options: [
          { id: "A", text: "⟨f, g⟩ = ∫₀¹ f(t) g(t) dt" },
          { id: "B", text: "⟨f, g⟩ = f(1) g(1)" },
          { id: "C", text: "⟨f, g⟩ = f'(0) g'(0)" },
          { id: "D", text: "⟨f, g⟩ = ∫₀¹ [f(t) + g(t)] dt" }
        ],
        correctAnswer: "A",
        explanation: "The standard inner product on continuous functions C[a, b] is defined by integration: ⟨f, g⟩ = ∫ₐᵇ f(t) g(t) dt.",
        ref: "Dr. G. Balaji, Page 3.10"
      },
      {
        id: 8,
        question: "For any vector v and scalar c ∈ ℝ, what is ||c v||?",
        options: [
          { id: "A", text: "c ||v||" },
          { id: "B", text: "|c| ||v|| (absolute value of c times norm of v)" },
          { id: "C", text: "c² ||v||" },
          { id: "D", text: "√c ||v||" }
        ],
        correctAnswer: "B",
        explanation: "||c v|| = √⟨cv, cv⟩ = √(c² ⟨v, v⟩) = |c| √⟨v, v⟩ = |c| ||v||.",
        ref: "Dr. G. Balaji, Page 3.6"
      },
      {
        id: 9,
        question: "Why is ⟨u, v⟩ = u₁ v₁ - u₂ v₂ on ℝ² NOT a valid inner product?",
        options: [
          { id: "A", text: "It is not symmetric" },
          { id: "B", text: "Positive definiteness fails: for u = (0, 1), ⟨u, u⟩ = 0 - 1 = -1 < 0" },
          { id: "C", text: "It is not linear" },
          { id: "D", text: "Determinant is 0" }
        ],
        correctAnswer: "B",
        explanation: "An inner product strictly requires ⟨u, u⟩ ≥ 0 for all vectors. Here ⟨(0, 1), (0, 1)⟩ = -1 < 0, violating positive definiteness.",
        ref: "Dr. G. Balaji, Page 3.12"
      },
      {
        id: 10,
        question: "What is the Parallelogram Law in an inner product space?",
        options: [
          { id: "A", text: "||u + v||² + ||u - v||² = 2||u||² + 2||v||²" },
          { id: "B", text: "||u + v|| = ||u|| + ||v||" },
          { id: "C", text: "||u + v||² = ||u||² + ||v||²" },
          { id: "D", text: "⟨u, v⟩ = ||u|| ||v||" }
        ],
        correctAnswer: "A",
        explanation: "Expanding ||u + v||² + ||u - v||²: (||u||² + 2⟨u,v⟩ + ||v||²) + (||u||² - 2⟨u,v⟩ + ||v||²) = 2||u||² + 2||v||².",
        ref: "Dr. G. Balaji, Page 3.14"
      }
    ]
  },

  "3.2": {
    topicCode: "3.2",
    topicName: "Angle & Orthogonality",
    unitNumber: "UNIT III",
    unitTitle: "Inner Product Spaces",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 3, Section 3.2 (Pages 3.17 – 3.28)",
    questions: [
      {
        id: 1,
        question: "Two vectors u and v in an inner product space are orthogonal (perpendicular) if and only if:",
        options: [
          { id: "A", text: "⟨u, v⟩ = 0" },
          { id: "B", text: "||u|| = ||v||" },
          { id: "C", text: "⟨u, v⟩ = 1" },
          { id: "D", text: "u + v = 0" }
        ],
        correctAnswer: "A",
        explanation: "By definition, two vectors in any inner product space are orthogonal if their inner product is identically zero: ⟨u, v⟩ = 0.",
        ref: "Dr. G. Balaji, Page 3.18"
      },
      {
        id: 2,
        question: "How is the angle θ between two non-zero vectors u and v defined in a real inner product space?",
        options: [
          { id: "A", text: "cos θ = ⟨u, v⟩ / (||u|| ||v||)" },
          { id: "B", text: "sin θ = ⟨u, v⟩ / (||u|| ||v||)" },
          { id: "C", text: "cos θ = ||u - v||" },
          { id: "D", text: "tan θ = ⟨u, v⟩" }
        ],
        correctAnswer: "A",
        explanation: "The angle θ between two vectors is given by cos θ = ⟨u, v⟩ / (||u|| ||v||), where 0 ≤ θ ≤ π.",
        ref: "Dr. G. Balaji, Page 3.20"
      },
      {
        id: 3,
        question: "State the generalized Pythagorean Theorem in an inner product space for orthogonal vectors u and v (⟨u, v⟩ = 0):",
        options: [
          { id: "A", text: "||u + v||² = ||u||² + ||v||²" },
          { id: "B", text: "||u + v|| = ||u|| + ||v||" },
          { id: "C", text: "||u + v||² = ||u||² - ||v||²" },
          { id: "D", text: "||u + v|| = √⟨u, v⟩" }
        ],
        correctAnswer: "A",
        explanation: "||u + v||² = ⟨u + v, u + v⟩ = ||u||² + 2⟨u, v⟩ + ||v||². If ⟨u, v⟩ = 0, this simplifies to ||u + v||² = ||u||² + ||v||².",
        ref: "Dr. G. Balaji, Page 3.22"
      },
      {
        id: 4,
        question: "Find the angle between u = (1, 1) and v = (1, 0) in ℝ² with the standard Euclidean inner product:",
        options: [
          { id: "A", text: "30° (π/6)" },
          { id: "B", text: "45° (π/4)" },
          { id: "C", text: "60° (π/3)" },
          { id: "D", text: "90° (π/2)" }
        ],
        correctAnswer: "B",
        explanation: "⟨u, v⟩ = 1(1) + 1(0) = 1. ||u|| = √(1 + 1) = √2, ||v|| = 1. cos θ = 1 / (√2 · 1) = 1/√2 ⟹ θ = 45° (π/4).",
        ref: "Dr. G. Balaji, Page 3.21"
      },
      {
        id: 5,
        question: "Which vector in ℝ³ is orthogonal to u = (2, -1, 3)?",
        options: [
          { id: "A", text: "(1, 2, 0) because 2(1) + (-1)(2) + 3(0) = 0" },
          { id: "B", text: "(2, -1, 3)" },
          { id: "C", text: "(1, 1, 1)" },
          { id: "D", text: "(-2, 1, -3)" }
        ],
        correctAnswer: "A",
        explanation: "Compute ⟨(2, -1, 3), (1, 2, 0)⟩ = 2 - 2 + 0 = 0. Since the dot product is zero, they are orthogonal.",
        ref: "Dr. G. Balaji, Page 3.19"
      },
      {
        id: 6,
        question: "What vector in V is orthogonal to EVERY vector in V?",
        options: [
          { id: "A", text: "The zero vector 0" },
          { id: "B", text: "Any unit vector" },
          { id: "C", text: "No such vector exists" },
          { id: "D", text: "The vector of all 1s" }
        ],
        correctAnswer: "A",
        explanation: "For any vector v ∈ V, ⟨0, v⟩ = 0. Thus the zero vector is orthogonal to every vector in the space.",
        ref: "Dr. G. Balaji, Page 3.18"
      },
      {
        id: 7,
        question: "A set of non-zero vectors {v₁, v₂, ..., vₖ} is an orthogonal set if:",
        options: [
          { id: "A", text: "⟨vᵢ, vⱼ⟩ = 0 for all i ≠ j" },
          { id: "B", text: "⟨vᵢ, vⱼ⟩ = 1 for all i, j" },
          { id: "C", text: "All vectors are parallel" },
          { id: "D", text: "The matrix of vectors has trace 0" }
        ],
        correctAnswer: "A",
        explanation: "By definition, a set is orthogonal if every pair of distinct vectors in the set has an inner product of zero.",
        ref: "Dr. G. Balaji, Page 3.24"
      },
      {
        id: 8,
        question: "Theorem: Any orthogonal set of non-zero vectors is always:",
        options: [
          { id: "A", text: "Linearly dependent" },
          { id: "B", text: "Linearly independent" },
          { id: "C", text: "Infinite" },
          { id: "D", text: "Of dimension 1" }
        ],
        correctAnswer: "B",
        explanation: "If c₁v₁ + ... + cₖvₖ = 0, taking the inner product with vᵢ yields cᵢ ⟨vᵢ, vᵢ⟩ = 0. Since vᵢ ≠ 0, ⟨vᵢ, vᵢ⟩ > 0, so cᵢ = 0 for all i. Hence linearly independent.",
        ref: "Dr. G. Balaji, Page 3.25"
      },
      {
        id: 9,
        question: "An orthonormal set is an orthogonal set of vectors where additionally:",
        options: [
          { id: "A", text: "Each vector is a unit vector: ||vᵢ|| = 1 for all i" },
          { id: "B", text: "All vectors have integer coordinates" },
          { id: "C", text: "The vectors sum to zero" },
          { id: "D", text: "They span the entire space" }
        ],
        correctAnswer: "A",
        explanation: "An orthonormal set satisfies ⟨eᵢ, eⱼ⟩ = δᵢⱼ (Kronecker delta: 1 if i = j, 0 if i ≠ j).",
        ref: "Dr. G. Balaji, Page 3.26"
      },
      {
        id: 10,
        question: "If B = {e₁, e₂, ..., eₙ} is an orthonormal basis for V, the coordinates of any vector v relative to B are simply:",
        options: [
          { id: "A", text: "cᵢ = ⟨v, eᵢ⟩" },
          { id: "B", text: "cᵢ = ||v|| / ||eᵢ||" },
          { id: "C", text: "cᵢ = det([v, eᵢ])" },
          { id: "D", text: "cᵢ = 1 / ⟨v, eᵢ⟩" }
        ],
        correctAnswer: "A",
        explanation: "For an orthonormal basis, v = ∑ ⟨v, eᵢ⟩ eᵢ. The coordinate coefficients are directly computed via inner products without solving systems of linear equations.",
        ref: "Dr. G. Balaji, Page 3.27"
      }
    ]
  },

  "3.3": {
    topicCode: "3.3",
    topicName: "Cauchy-Schwarz & Triangle Inequalities",
    unitNumber: "UNIT III",
    unitTitle: "Inner Product Spaces",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 3, Section 3.3 (Pages 3.29 – 3.41)",
    questions: [
      {
        id: 1,
        question: "State the Cauchy-Schwarz Inequality for any vectors u and v in an inner product space:",
        options: [
          { id: "A", text: "|⟨u, v⟩| ≤ ||u|| ||v||" },
          { id: "B", text: "⟨u, v⟩ ≥ ||u|| ||v||" },
          { id: "C", text: "||u + v|| ≤ |⟨u, v⟩|" },
          { id: "D", text: "|⟨u, v⟩| = ||u|| + ||v||" }
        ],
        correctAnswer: "A",
        explanation: "The Cauchy-Schwarz inequality states that the absolute value of the inner product of two vectors never exceeds the product of their norms: |⟨u, v⟩| ≤ ||u|| ||v||.",
        ref: "Dr. G. Balaji, Page 3.30"
      },
      {
        id: 2,
        question: "Under what condition does equality hold in the Cauchy-Schwarz Inequality (|⟨u, v⟩| = ||u|| ||v||)?",
        options: [
          { id: "A", text: "If and only if u and v are orthogonal" },
          { id: "B", text: "If and only if u and v are linearly dependent (collinear)" },
          { id: "C", text: "If and only if ||u|| = 1" },
          { id: "D", text: "Equality never holds" }
        ],
        correctAnswer: "B",
        explanation: "Equality occurs if and only if one vector is a scalar multiple of the other (u = c v), i.e., the angle between them is 0 or π.",
        ref: "Dr. G. Balaji, Page 3.32"
      },
      {
        id: 3,
        question: "State the Triangle Inequality (Minkowski's Inequality) in an inner product space:",
        options: [
          { id: "A", text: "||u + v|| ≤ ||u|| + ||v||" },
          { id: "B", text: "||u + v|| ≥ ||u|| + ||v||" },
          { id: "C", text: "||u + v|| = ||u|| - ||v||" },
          { id: "D", text: "||u + v||² ≤ ||u||² + ||v||²" }
        ],
        correctAnswer: "A",
        explanation: "The Triangle Inequality states that the length of any side of a triangle is at most the sum of the lengths of the other two sides: ||u + v|| ≤ ||u|| + ||v||.",
        ref: "Dr. G. Balaji, Page 3.34"
      },
      {
        id: 4,
        question: "How is the Triangle Inequality proven using the Cauchy-Schwarz Inequality?",
        options: [
          { id: "A", text: "||u + v||² = ||u||² + 2⟨u, v⟩ + ||v||² ≤ ||u||² + 2||u||||v|| + ||v||² = (||u|| + ||v||)²" },
          { id: "B", text: "By using matrix determinants" },
          { id: "C", text: "By assuming u and v are parallel" },
          { id: "D", text: "By integration by parts" }
        ],
        correctAnswer: "A",
        explanation: "Applying ⟨u, v⟩ ≤ |⟨u, v⟩| ≤ ||u|| ||v|| directly yields ||u + v||² ≤ (||u|| + ||v||)², and taking the square root completes the proof.",
        ref: "Dr. G. Balaji, Page 3.35"
      },
      {
        id: 5,
        question: "For real numbers a₁, a₂, b₁, b₂, what does the Cauchy-Schwarz inequality state in ℝ²?",
        options: [
          { id: "A", text: "(a₁b₁ + a₂b₂)² ≤ (a₁² + a₂²)(b₁² + b₂²)" },
          { id: "B", text: "(a₁ + a₂)(b₁ + b₂) ≤ a₁b₁ + a₂b₂" },
          { id: "C", text: "a₁b₁ + a₂b₂ = 1" },
          { id: "D", text: "a₁² + b₁² = a₂² + b₂²" }
        ],
        correctAnswer: "A",
        explanation: "In ℝⁿ, Cauchy-Schwarz takes the algebraic form (∑ aᵢ bᵢ)² ≤ (∑ aᵢ²)(∑ bᵢ²). For n = 2, this is (a₁b₁ + a₂b₂)² ≤ (a₁² + a₂²)(b₁² + b₂²).",
        ref: "Dr. G. Balaji, Page 3.31"
      },
      {
        id: 6,
        question: "What is the Reverse Triangle Inequality for norms?",
        options: [
          { id: "A", text: "|||u|| - ||v||| ≤ ||u - v||" },
          { id: "B", text: "||u - v|| ≤ ||u|| - ||v||" },
          { id: "C", text: "||u|| + ||v|| ≤ ||u - v||" },
          { id: "D", text: "||u - v|| = 0" }
        ],
        correctAnswer: "A",
        explanation: "From ||u|| = ||(u - v) + v|| ≤ ||u - v|| + ||v||, we get ||u|| - ||v|| ≤ ||u - v||. Symmetrically, |||u|| - ||v||| ≤ ||u - v||.",
        ref: "Dr. G. Balaji, Page 3.36"
      },
      {
        id: 7,
        question: "In C[a, b], the continuous version of the Cauchy-Schwarz inequality is:",
        options: [
          { id: "A", text: "(∫ₐᵇ f(x)g(x) dx)² ≤ (∫ₐᵇ f(x)² dx)(∫ₐᵇ g(x)² dx)" },
          { id: "B", text: "∫ₐᵇ f(x)g(x) dx = ∫ₐᵇ f(x) dx · ∫ₐᵇ g(x) dx" },
          { id: "C", text: "∫ f² + ∫ g² ≤ 1" },
          { id: "D", text: "(f(b) - f(a))(g(b) - g(a)) ≤ 0" }
        ],
        correctAnswer: "A",
        explanation: "This is the Bunyakovsky-Schwarz integral inequality: |∫ f g|² ≤ (∫ f²)(∫ g²).",
        ref: "Dr. G. Balaji, Page 3.38"
      },
      {
        id: 8,
        question: "If ||u|| = 3 and ||v|| = 4, what is the maximum possible value of ⟨u, v⟩?",
        options: [
          { id: "A", text: "7" },
          { id: "B", text: "12" },
          { id: "C", text: "25" },
          { id: "D", text: "1" }
        ],
        correctAnswer: "B",
        explanation: "By Cauchy-Schwarz: ⟨u, v⟩ ≤ ||u|| ||v|| = 3 × 4 = 12. Maximum value occurs when they are in the same direction (cos θ = 1).",
        ref: "Dr. G. Balaji, Page 3.33"
      },
      {
        id: 9,
        question: "If ||u|| = 3 and ||v|| = 4, what is the maximum possible value of ||u + v||?",
        options: [
          { id: "A", text: "5" },
          { id: "B", text: "7" },
          { id: "C", text: "12" },
          { id: "D", text: "1" }
        ],
        correctAnswer: "B",
        explanation: "By the Triangle Inequality: ||u + v|| ≤ ||u|| + ||v|| = 3 + 4 = 7.",
        ref: "Dr. G. Balaji, Page 3.35"
      },
      {
        id: 10,
        question: "Why does the Cauchy-Schwarz inequality guarantee that the cosine of the angle cos θ = ⟨u, v⟩ / (||u|| ||v||) is mathematically well-defined?",
        options: [
          { id: "A", text: "Because it guarantees -1 ≤ ⟨u, v⟩ / (||u|| ||v||) ≤ 1" },
          { id: "B", text: "Because it makes the denominator zero" },
          { id: "C", text: "Because angles are always 90°" },
          { id: "D", text: "Because norms are integers" }
        ],
        correctAnswer: "A",
        explanation: "Since |⟨u, v⟩| ≤ ||u|| ||v||, dividing by ||u|| ||v|| gives |⟨u, v⟩ / (||u|| ||v||)| ≤ 1, which ensures the ratio lies in [-1, 1], within the domain of arccos.",
        ref: "Dr. G. Balaji, Page 3.30"
      }
    ]
  },

  "3.4": {
    topicCode: "3.4",
    topicName: "Gram-Schmidt Orthogonalization Process",
    unitNumber: "UNIT III",
    unitTitle: "Inner Product Spaces",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 3, Section 3.4 (Pages 3.42 – 3.65)",
    questions: [
      {
        id: 1,
        question: "What is the goal of the Gram-Schmidt Orthogonalization Process?",
        options: [
          { id: "A", text: "To invert a square matrix" },
          { id: "B", text: "To convert any linearly independent basis into an orthogonal (or orthonormal) basis" },
          { id: "C", text: "To compute the eigenvalues of a matrix" },
          { id: "D", text: "To find the characteristic polynomial" }
        ],
        correctAnswer: "B",
        explanation: "The Gram-Schmidt algorithm takes a linearly independent set {v₁, ..., vₖ} and constructs an orthogonal set {u₁, ..., uₖ} having the exact same span.",
        ref: "Dr. G. Balaji, Page 3.43"
      },
      {
        id: 2,
        question: "In the Gram-Schmidt process, what is the formula for the first orthogonal vector u₁ given basis {v₁, v₂, v₃}?",
        options: [
          { id: "A", text: "u₁ = v₁" },
          { id: "B", text: "u₁ = v₁ / ||v₁||" },
          { id: "C", text: "u₁ = v₁ - v₂" },
          { id: "D", text: "u₁ = 0" }
        ],
        correctAnswer: "A",
        explanation: "The algorithm initiates by choosing the first orthogonal vector directly as u₁ = v₁.",
        ref: "Dr. G. Balaji, Page 3.44"
      },
      {
        id: 3,
        question: "What is the formula for the second orthogonal vector u₂ in the Gram-Schmidt process?",
        options: [
          { id: "A", text: "u₂ = v₂ - [⟨v₂, u₁⟩ / ⟨u₁, u₁⟩] u₁" },
          { id: "B", text: "u₂ = v₂ + u₁" },
          { id: "C", text: "u₂ = v₂ - ⟨v₂, u₁⟩" },
          { id: "D", text: "u₂ = u₁ / ||u₁||" }
        ],
        correctAnswer: "A",
        explanation: "u₂ is obtained by subtracting the orthogonal projection of v₂ onto u₁: u₂ = v₂ - proj_{u₁}(v₂) = v₂ - [⟨v₂, u₁⟩ / ||u₁||²] u₁.",
        ref: "Dr. G. Balaji, Page 3.44"
      },
      {
        id: 4,
        question: "What is the formula for the third orthogonal vector u₃ in the Gram-Schmidt process?",
        options: [
          { id: "A", text: "u₃ = v₃ - [⟨v₃, u₁⟩ / ⟨u₁, u₁⟩] u₁ - [⟨v₃, u₂⟩ / ⟨u₂, u₂⟩] u₂" },
          { id: "B", text: "u₃ = v₃ - u₁ - u₂" },
          { id: "C", text: "u₃ = v₃ × v₂" },
          { id: "D", text: "u₃ = v₁ + v₂ + v₃" }
        ],
        correctAnswer: "A",
        explanation: "u₃ is obtained by subtracting from v₃ its projections onto both previous orthogonal vectors u₁ and u₂.",
        ref: "Dr. G. Balaji, Page 3.45"
      },
      {
        id: 5,
        question: "How are the orthogonal vectors {u₁, u₂, u₃} converted into an orthonormal basis {e₁, e₂, e₃}?",
        options: [
          { id: "A", text: "By normalizing each vector: eᵢ = uᵢ / ||uᵢ||" },
          { id: "B", text: "By multiplying by 2" },
          { id: "C", text: "By taking the transpose" },
          { id: "D", text: "By setting eᵢ = 1" }
        ],
        correctAnswer: "A",
        explanation: "Orthonormalization requires dividing each orthogonal vector by its Euclidean length (norm): eᵢ = uᵢ / ||uᵢ||.",
        ref: "Dr. G. Balaji, Page 3.46"
      },
      {
        id: 6,
        question: "Apply Gram-Schmidt to v₁ = (1, 1) and v₂ = (1, 2) in ℝ². What is u₁?",
        options: [
          { id: "A", text: "(1, 1)" },
          { id: "B", text: "(1, 2)" },
          { id: "C", text: "(0, 1)" },
          { id: "D", text: "(2, 3)" }
        ],
        correctAnswer: "A",
        explanation: "Step 1: u₁ = v₁ = (1, 1).",
        ref: "Dr. G. Balaji, Page 3.48"
      },
      {
        id: 7,
        question: "Continuing with v₁ = (1, 1) and v₂ = (1, 2), what is u₂?",
        options: [
          { id: "A", text: "(-1/2, 1/2)" },
          { id: "B", text: "(1, 0)" },
          { id: "C", text: "(0, 1)" },
          { id: "D", text: "(1, -1)" }
        ],
        correctAnswer: "A",
        explanation: "⟨v₂, u₁⟩ = 1(1) + 2(1) = 3. ⟨u₁, u₁⟩ = 1² + 1² = 2. u₂ = (1, 2) - (3/2)(1, 1) = (1 - 3/2, 2 - 3/2) = (-1/2, 1/2). Notice ⟨u₁, u₂⟩ = -1/2 + 1/2 = 0.",
        ref: "Dr. G. Balaji, Page 3.48"
      },
      {
        id: 8,
        question: "What is the normalized vector e₁ for u₁ = (1, 1)?",
        options: [
          { id: "A", text: "(1/√2, 1/√2)" },
          { id: "B", text: "(1, 1)" },
          { id: "C", text: "(1/2, 1/2)" },
          { id: "D", text: "(2, 2)" }
        ],
        correctAnswer: "A",
        explanation: "||u₁|| = √(1² + 1²) = √2. Hence e₁ = (1, 1) / √2 = (1/√2, 1/√2).",
        ref: "Dr. G. Balaji, Page 3.49"
      },
      {
        id: 9,
        question: "What happens if the input set {v₁, v₂, ..., vₖ} in Gram-Schmidt is linearly dependent?",
        options: [
          { id: "A", text: "At least one uᵢ will evaluate to the zero vector 0" },
          { id: "B", text: "The process creates complex numbers" },
          { id: "C", text: "The vectors become longer" },
          { id: "D", text: "Nothing, it always succeeds" }
        ],
        correctAnswer: "A",
        explanation: "If vᵢ is in the span of previous vectors, subtracting its projection removes the entire vector, leaving uᵢ = 0 (which cannot be normalized).",
        ref: "Dr. G. Balaji, Page 3.52"
      },
      {
        id: 10,
        question: "At each step k of the Gram-Schmidt process, what is the span of {u₁, ..., uₖ}?",
        options: [
          { id: "A", text: "Span{u₁, ..., uₖ} = Span{v₁, ..., vₖ}" },
          { id: "B", text: "Span{u₁, ..., uₖ} is smaller than Span{v₁, ..., vₖ}" },
          { id: "C", text: "Span{u₁, ..., uₖ} = {0}" },
          { id: "D", text: "Span{u₁, ..., uₖ} = ℝⁿ" }
        ],
        correctAnswer: "A",
        explanation: "Gram-Schmidt preserves the nested sequence of spanned subspaces at every step: Span{u₁, ..., uₖ} = Span{v₁, ..., vₖ} for each k.",
        ref: "Dr. G. Balaji, Page 3.46"
      }
    ]
  },

  "3.5": {
    topicCode: "3.5",
    topicName: "Orthogonal Complement & Projections",
    unitNumber: "UNIT III",
    unitTitle: "Inner Product Spaces",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 3, Section 3.5 (Pages 3.66 – 3.76)",
    questions: [
      {
        id: 1,
        question: "What is the Orthogonal Complement W^⊥ of a subspace W in an inner product space V?",
        options: [
          { id: "A", text: "W^⊥ = {v ∈ V : ⟨v, w⟩ = 0 for all w ∈ W}" },
          { id: "B", text: "W^⊥ = V \\ W" },
          { id: "C", text: "W^⊥ = {w ∈ W : ||w|| = 1}" },
          { id: "D", text: "W^⊥ = {0}" }
        ],
        correctAnswer: "A",
        explanation: "W^⊥ (W perp) is the set of all vectors in V that are orthogonal to every vector in W.",
        ref: "Dr. G. Balaji, Page 3.67"
      },
      {
        id: 2,
        question: "What is the intersection of a subspace W and its orthogonal complement W^⊥?",
        options: [
          { id: "A", text: "W ∩ W^⊥ = {0}" },
          { id: "B", text: "W ∩ W^⊥ = W" },
          { id: "C", text: "W ∩ W^⊥ = ∅" },
          { id: "D", text: "W ∩ W^⊥ = V" }
        ],
        correctAnswer: "A",
        explanation: "If v ∈ W ∩ W^⊥, then ⟨v, v⟩ = 0 (since v is in W^⊥, it is orthogonal to any element in W, including itself). By positive definiteness, v = 0.",
        ref: "Dr. G. Balaji, Page 3.68"
      },
      {
        id: 3,
        question: "For any finite-dimensional subspace W of V, the Direct Sum Decomposition states:",
        options: [
          { id: "A", text: "V = W ⊕ W^⊥ and dim(V) = dim(W) + dim(W^⊥)" },
          { id: "B", text: "V = W ∪ W^⊥" },
          { id: "C", text: "dim(W) = dim(W^⊥)" },
          { id: "D", text: "W = W^⊥" }
        ],
        correctAnswer: "A",
        explanation: "Every vector v ∈ V can be uniquely decomposed as v = w + w^⊥ with w ∈ W and w^⊥ ∈ W^⊥. Hence V = W ⊕ W^⊥.",
        ref: "Dr. G. Balaji, Page 3.70"
      },
      {
        id: 4,
        question: "What is (W^⊥)^⊥ (the orthogonal complement of the orthogonal complement)?",
        options: [
          { id: "A", text: "W" },
          { id: "B", text: "{0}" },
          { id: "C", text: "V" },
          { id: "D", text: "W^⊥" }
        ],
        correctAnswer: "A",
        explanation: "For any finite-dimensional subspace W, taking the orthogonal complement twice returns the original subspace: (W^⊥)^⊥ = W.",
        ref: "Dr. G. Balaji, Page 3.69"
      },
      {
        id: 5,
        question: "What is the orthogonal projection formula of vector v onto a 1-dimensional subspace spanned by non-zero vector u?",
        options: [
          { id: "A", text: "proj_u(v) = [⟨v, u⟩ / ⟨u, u⟩] u" },
          { id: "B", text: "proj_u(v) = ⟨v, u⟩ u" },
          { id: "C", text: "proj_u(v) = u / ||v||" },
          { id: "D", text: "proj_u(v) = v - u" }
        ],
        correctAnswer: "A",
        explanation: "The orthogonal projection of v along u is the scalar component [⟨v, u⟩ / ||u||²] times the direction vector u.",
        ref: "Dr. G. Balaji, Page 3.72"
      },
      {
        id: 6,
        question: "What does the Best Approximation Theorem state regarding the projection p = proj_W(v)?",
        options: [
          { id: "A", text: "p is the vector in W closest to v, minimizing distance ||v - w|| for all w ∈ W" },
          { id: "B", text: "p has the maximum length in W" },
          { id: "C", text: "p is parallel to v" },
          { id: "D", text: "p = 0" }
        ],
        correctAnswer: "A",
        explanation: "The Best Approximation Theorem states that ||v - proj_W(v)|| < ||v - w|| for any w ∈ W with w ≠ proj_W(v). This is the foundation of least-squares approximation.",
        ref: "Dr. G. Balaji, Page 3.73"
      },
      {
        id: 7,
        question: "In ℝ³, what is the orthogonal complement of the xy-plane W = {(x, y, 0)}?",
        options: [
          { id: "A", text: "The z-axis: {(0, 0, z) : z ∈ ℝ}" },
          { id: "B", text: "The x-axis" },
          { id: "C", text: "The y-axis" },
          { id: "D", text: "The line x = y = z" }
        ],
        correctAnswer: "A",
        explanation: "Any vector in the xy-plane has z = 0. Vectors orthogonal to all (x, y, 0) must satisfy x·0 + y·0 + z·c = 0 ⟹ only the z-component (0, 0, z) survives.",
        ref: "Dr. G. Balaji, Page 3.68"
      },
      {
        id: 8,
        question: "In an m×n matrix A, what is the orthogonal complement of the Row space Row(A) in ℝⁿ?",
        options: [
          { id: "A", text: "The Null space Nul(A)" },
          { id: "B", text: "The Column space Col(A)" },
          { id: "C", text: "The Left Null space Nul(Aᵀ)" },
          { id: "D", text: "ℝᵐ" }
        ],
        correctAnswer: "A",
        explanation: "Fundamental Theorem of Linear Algebra: (Row(A))^⊥ = Nul(A). Ax = 0 means x is orthogonal to every row of A.",
        ref: "Dr. G. Balaji, Page 3.75"
      },
      {
        id: 9,
        question: "If P is an orthogonal projection matrix onto a subspace W (i.e. P v = proj_W(v)), what are its key properties?",
        options: [
          { id: "A", text: "P² = P (idempotent) and Pᵀ = P (symmetric)" },
          { id: "B", text: "P⁻¹ = P" },
          { id: "C", text: "det(P) = -1" },
          { id: "D", text: "P is skew-symmetric" }
        ],
        correctAnswer: "A",
        explanation: "A matrix represents an orthogonal projection if and only if it is idempotent (P² = P) and symmetric (Pᵀ = P).",
        ref: "Dr. G. Balaji, Page 3.74"
      },
      {
        id: 10,
        question: "What is the orthogonal complement of the zero subspace {0} in V?",
        options: [
          { id: "A", text: "V (the entire space)" },
          { id: "B", text: "{0}" },
          { id: "C", text: "∅" },
          { id: "D", text: "A 1D line" }
        ],
        correctAnswer: "A",
        explanation: "Every vector in V is orthogonal to the zero vector (⟨v, 0⟩ = 0 for all v). Hence {0}^⊥ = V.",
        ref: "Dr. G. Balaji, Page 3.67"
      }
    ]
  },

  // =========================================================================
  // UNIT IV: MATRIX DECOMPOSITION & QUADRATIC FORMS (Topics 4.1 to 4.5)
  // =========================================================================

  "4.1": {
    topicCode: "4.1",
    topicName: "Symmetric Matrices & Orthogonal Diagonalization",
    unitNumber: "UNIT IV",
    unitTitle: "Matrix Decomposition & Quadratic Forms",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 4, Section 4.1 (Pages 4.1 – 4.22)",
    questions: [
      {
        id: 1,
        question: "A real square matrix A is called symmetric if:",
        options: [
          { id: "A", text: "Aᵀ = A" },
          { id: "B", text: "Aᵀ = -A" },
          { id: "C", text: "A⁻¹ = A" },
          { id: "D", text: "det(A) = 1" }
        ],
        correctAnswer: "A",
        explanation: "A matrix is symmetric when it equals its own transpose: Aᵀ = A, meaning aᵢⱼ = aⱼᵢ for all i, j.",
        ref: "Dr. G. Balaji, Page 4.2"
      },
      {
        id: 2,
        question: "According to the Spectral Theorem, all eigenvalues of any real symmetric matrix are:",
        options: [
          { id: "A", text: "Purely imaginary" },
          { id: "B", text: "Strictly real numbers" },
          { id: "C", text: "Always positive" },
          { id: "D", text: "All equal to 0" }
        ],
        correctAnswer: "B",
        explanation: "Fundamental theorem: Every real symmetric matrix has exclusively real eigenvalues (no complex roots with non-zero imaginary parts).",
        ref: "Dr. G. Balaji, Page 4.4"
      },
      {
        id: 3,
        question: "Eigenvectors corresponding to DISTINCT eigenvalues of a real symmetric matrix are always:",
        options: [
          { id: "A", text: "Mutually orthogonal" },
          { id: "B", text: "Collinear" },
          { id: "C", text: "Complex" },
          { id: "D", text: "Linearly dependent" }
        ],
        correctAnswer: "A",
        explanation: "If A is symmetric and Av₁ = λ₁v₁, Av₂ = λ₂v₂ with λ₁ ≠ λ₂: λ₁⟨v₁, v₂⟩ = ⟨Av₁, v₂⟩ = ⟨v₁, Av₂⟩ = λ₂⟨v₁, v₂⟩ ⟹ (λ₁ - λ₂)⟨v₁, v₂⟩ = 0 ⟹ ⟨v₁, v₂⟩ = 0. They are orthogonal.",
        ref: "Dr. G. Balaji, Page 4.6"
      },
      {
        id: 4,
        question: "A real matrix Q is called an Orthogonal Matrix if:",
        options: [
          { id: "A", text: "Qᵀ Q = Q Qᵀ = I (i.e. Q⁻¹ = Qᵀ)" },
          { id: "B", text: "det(Q) = 0" },
          { id: "C", text: "Q² = O" },
          { id: "D", text: "Q is diagonal" }
        ],
        correctAnswer: "A",
        explanation: "An orthogonal matrix is an invertible square matrix whose transpose equals its inverse: Q⁻¹ = Qᵀ.",
        ref: "Dr. G. Balaji, Page 4.8"
      },
      {
        id: 5,
        question: "What are the columns of an orthogonal matrix Q?",
        options: [
          { id: "A", text: "An orthonormal basis of ℝⁿ" },
          { id: "B", text: "All zero vectors" },
          { id: "C", text: "Arbitrary linearly dependent vectors" },
          { id: "D", text: "Vectors of length 2" }
        ],
        correctAnswer: "A",
        explanation: "Qᵀ Q = I means qᵢᵀ qⱼ = δᵢⱼ; the columns of Q form a complete orthonormal set of unit vectors in ℝⁿ.",
        ref: "Dr. G. Balaji, Page 4.9"
      },
      {
        id: 6,
        question: "What are the only possible determinant values for any real orthogonal matrix Q?",
        options: [
          { id: "A", text: "+1 or -1" },
          { id: "B", text: "0 or 1" },
          { id: "C", text: "Any positive number" },
          { id: "D", text: "Strictly 0" }
        ],
        correctAnswer: "A",
        explanation: "det(Qᵀ Q) = det(Qᵀ) det(Q) = (det(Q))² = det(I) = 1 ⟹ det(Q) = ±1.",
        ref: "Dr. G. Balaji, Page 4.10"
      },
      {
        id: 7,
        question: "Orthogonal diagonalization of a real symmetric matrix A is given by:",
        options: [
          { id: "A", text: "Qᵀ A Q = D (where Q is orthogonal and D is diagonal)" },
          { id: "B", text: "Q A Q = D" },
          { id: "C", text: "A + Q = D" },
          { id: "D", text: "A = Q + D" }
        ],
        correctAnswer: "A",
        explanation: "Since Q⁻¹ = Qᵀ, the similarity transformation P⁻¹AP = D becomes Qᵀ A Q = D.",
        ref: "Dr. G. Balaji, Page 4.12"
      },
      {
        id: 8,
        question: "Orthogonal transformations preserve:",
        options: [
          { id: "A", text: "Vector lengths (norms) and angles (dot products)" },
          { id: "B", text: "Only vector slopes" },
          { id: "C", text: "Determinants of rectangular matrices" },
          { id: "D", text: "Matrix sizes" }
        ],
        correctAnswer: "A",
        explanation: "⟨Q u, Q v⟩ = (Q u)ᵀ (Q v) = uᵀ Qᵀ Q v = uᵀ I v = ⟨u, v⟩. Hence lengths and angles are completely invariant under orthogonal transformations.",
        ref: "Dr. G. Balaji, Page 4.11"
      },
      {
        id: 9,
        question: "For A = [[2, 1], [1, 2]], what are the eigenvalues?",
        options: [
          { id: "A", text: "λ = 3 and λ = 1" },
          { id: "B", text: "λ = 2 and λ = 2" },
          { id: "C", text: "λ = 4 and λ = 0" },
          { id: "D", text: "λ = -3 and λ = -1" }
        ],
        correctAnswer: "A",
        explanation: "det(A - λI) = (2 - λ)² - 1 = 0 ⟹ 2 - λ = ±1 ⟹ λ₁ = 3, λ₂ = 1.",
        ref: "Dr. G. Balaji, Page 4.14"
      },
      {
        id: 10,
        question: "For the matrix A = [[2, 1], [1, 2]], the normalized eigenvectors for λ₁ = 3 and λ₂ = 1 are:",
        options: [
          { id: "A", text: "q₁ = (1/√2)(1, 1)ᵀ and q₂ = (1/√2)(-1, 1)ᵀ" },
          { id: "B", text: "q₁ = (1, 0)ᵀ and q₂ = (0, 1)ᵀ" },
          { id: "C", text: "q₁ = (1, 1)ᵀ and q₂ = (2, 2)ᵀ" },
          { id: "D", text: "q₁ = (1, 2)ᵀ and q₂ = (2, 1)ᵀ" }
        ],
        correctAnswer: "A",
        explanation: "For λ = 3: (A - 3I)x = 0 ⟹ -x₁ + x₂ = 0 ⟹ (1, 1)ᵀ, normalized: (1/√2)(1, 1)ᵀ. For λ = 1: x₁ + x₂ = 0 ⟹ (-1, 1)ᵀ, normalized: (1/√2)(-1, 1)ᵀ.",
        ref: "Dr. G. Balaji, Page 4.15"
      }
    ]
  },

  "4.2": {
    topicCode: "4.2",
    topicName: "Quadratic Forms & Canonical Reduction",
    unitNumber: "UNIT IV",
    unitTitle: "Matrix Decomposition & Quadratic Forms",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 4, Section 4.2 (Pages 4.23 – 4.45)",
    questions: [
      {
        id: 1,
        question: "What is the matrix representation of a quadratic form Q(x) in variables x = (x₁, x₂, ..., xₙ)ᵀ?",
        options: [
          { id: "A", text: "Q(x) = xᵀ A x where A is a symmetric matrix" },
          { id: "B", text: "Q(x) = A x" },
          { id: "C", text: "Q(x) = det(A)" },
          { id: "D", text: "Q(x) = xᵀ + A" }
        ],
        correctAnswer: "A",
        explanation: "Every quadratic form can be uniquely represented in matrix notation as Q(x) = xᵀ A x where A is a real symmetric matrix (aᵢⱼ = aⱼᵢ = half the coefficient of xᵢ xⱼ).",
        ref: "Dr. G. Balaji, Page 4.24"
      },
      {
        id: 2,
        question: "What is the symmetric matrix A for the quadratic form Q = 2x₁² + 5x₂² + 4x₁x₂?",
        options: [
          { id: "A", text: "[[2, 2], [2, 5]]" },
          { id: "B", text: "[[2, 4], [4, 5]]" },
          { id: "C", text: "[[2, 0], [0, 5]]" },
          { id: "D", text: "[[4, 2], [2, 5]]" }
        ],
        correctAnswer: "A",
        explanation: "The diagonal entries are the squared term coefficients: a₁₁ = 2, a₂₂ = 5. The off-diagonal entries split the cross-product coefficient: a₁₂ = a₂₁ = 4 / 2 = 2. Thus [[2, 2], [2, 5]].",
        ref: "Dr. G. Balaji, Page 4.26"
      },
      {
        id: 3,
        question: "What is the Canonical Form (Sum of Squares form) of a quadratic form?",
        options: [
          { id: "A", text: "A form containing only squared terms with zero cross-product terms: Q = λ₁y₁² + λ₂y₂² + ... + λₙyₙ²" },
          { id: "B", text: "A form with only linear terms" },
          { id: "C", text: "det(A) = 0" },
          { id: "D", text: "A form equal to 1" }
        ],
        correctAnswer: "A",
        explanation: "The canonical form eliminates all cross-product terms xᵢ xⱼ through an orthogonal transformation, leaving only squared terms whose coefficients are the eigenvalues λᵢ.",
        ref: "Dr. G. Balaji, Page 4.28"
      },
      {
        id: 4,
        question: "Under the orthogonal coordinate transformation x = Q y (where Qᵀ A Q = D), what does Q(x) = xᵀ A x become?",
        options: [
          { id: "A", text: "yᵀ D y = λ₁y₁² + λ₂y₂² + ... + λₙyₙ²" },
          { id: "B", text: "yᵀ y" },
          { id: "C", text: "yᵀ A y" },
          { id: "D", text: "det(D)" }
        ],
        correctAnswer: "A",
        explanation: "xᵀ A x = (Q y)ᵀ A (Q y) = yᵀ (Qᵀ A Q) y = yᵀ D y = λ₁y₁² + ... + λₙyₙ² (Principal Axes Theorem).",
        ref: "Dr. G. Balaji, Page 4.30"
      },
      {
        id: 5,
        question: "The rank of a quadratic form Q = xᵀ A x is defined as:",
        options: [
          { id: "A", text: "The rank of the associated symmetric matrix A (number of non-zero eigenvalues)" },
          { id: "B", text: "The number of variables" },
          { id: "C", text: "The trace of A" },
          { id: "D", text: "The maximum eigenvalue" }
        ],
        correctAnswer: "A",
        explanation: "The rank r of a quadratic form is the number of non-zero terms in its canonical form, which equals the rank of matrix A.",
        ref: "Dr. G. Balaji, Page 4.32"
      },
      {
        id: 6,
        question: "What is the Index (s) of a quadratic form?",
        options: [
          { id: "A", text: "The number of strictly positive terms in its canonical form (number of positive eigenvalues)" },
          { id: "B", text: "The number of negative terms" },
          { id: "C", text: "The total number of terms" },
          { id: "D", text: "The determinant of A" }
        ],
        correctAnswer: "A",
        explanation: "By Sylvester's definition, the index s is the count of strictly positive eigenvalues in the canonical reduction.",
        ref: "Dr. G. Balaji, Page 4.33"
      },
      {
        id: 7,
        question: "The Signature of a quadratic form with s positive and (r - s) negative terms is defined as:",
        options: [
          { id: "A", text: "Signature = s - (r - s) = 2s - r (difference between positive and negative terms)" },
          { id: "B", text: "Signature = s + r" },
          { id: "C", text: "Signature = s · r" },
          { id: "D", text: "Signature = det(A)" }
        ],
        correctAnswer: "A",
        explanation: "Signature = (number of positive eigenvalues) - (number of negative eigenvalues) = s - (r - s) = 2s - r.",
        ref: "Dr. G. Balaji, Page 4.34"
      },
      {
        id: 8,
        question: "What is the matrix A for Q = x₁² + 2x₂² + 3x₃²?",
        options: [
          { id: "A", text: "diag(1, 2, 3)" },
          { id: "B", text: "[[1, 1, 1], [2, 2, 2], [3, 3, 3]]" },
          { id: "C", text: "[[1, 2, 3], [2, 1, 3], [3, 2, 1]]" },
          { id: "D", text: "I₃" }
        ],
        correctAnswer: "A",
        explanation: "Since there are no cross-product terms, the matrix is purely diagonal: diag(1, 2, 3).",
        ref: "Dr. G. Balaji, Page 4.25"
      },
      {
        id: 9,
        question: "Sylvester's Law of Inertia states that for any non-singular transformation, the number of positive and negative terms:",
        options: [
          { id: "A", text: "Remains invariant (constant)" },
          { id: "B", text: "Can change arbitrarily" },
          { id: "C", text: "Always becomes zero" },
          { id: "D", text: "Depends on the order of basis" }
        ],
        correctAnswer: "A",
        explanation: "Sylvester's Law of Inertia states that the rank r, index s, and signature of a quadratic form are invariant under any real non-singular coordinate change.",
        ref: "Dr. G. Balaji, Page 4.36"
      },
      {
        id: 10,
        question: "If the canonical form of a quadratic form in 3 variables is Q = 2y₁² + 3y₂² + 0y₃², what is its rank and index?",
        options: [
          { id: "A", text: "Rank = 2, Index = 2" },
          { id: "B", text: "Rank = 3, Index = 2" },
          { id: "C", text: "Rank = 2, Index = 0" },
          { id: "D", text: "Rank = 1, Index = 2" }
        ],
        correctAnswer: "A",
        explanation: "There are 2 non-zero terms (rank = 2) and both are strictly positive (+2, +3), so index s = 2.",
        ref: "Dr. G. Balaji, Page 4.35"
      }
    ]
  },

  "4.3": {
    topicCode: "4.3",
    topicName: "Definiteness of Quadratic Forms",
    unitNumber: "UNIT IV",
    unitTitle: "Matrix Decomposition & Quadratic Forms",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 4, Section 4.3 (Pages 4.46 – 4.60)",
    questions: [
      {
        id: 1,
        question: "A quadratic form Q(x) = xᵀ A x is Positive Definite if and only if:",
        options: [
          { id: "A", text: "Q(x) > 0 for all non-zero vectors x ≠ 0 (all eigenvalues λᵢ > 0)" },
          { id: "B", text: "Q(x) ≥ 0 with some Q(x) = 0" },
          { id: "C", text: "All entries of A are positive" },
          { id: "D", text: "det(A) = 0" }
        ],
        correctAnswer: "A",
        explanation: "Positive definite means strictly positive for all non-zero vectors, which is equivalent to all eigenvalues being strictly positive (λᵢ > 0).",
        ref: "Dr. G. Balaji, Page 4.48"
      },
      {
        id: 2,
        question: "A quadratic form is Negative Definite if and only if:",
        options: [
          { id: "A", text: "All eigenvalues are strictly negative (λᵢ < 0 for all i)" },
          { id: "B", text: "All eigenvalues are zero" },
          { id: "C", text: "det(A) < 0 always" },
          { id: "D", text: "Tr(A) = 0" }
        ],
        correctAnswer: "A",
        explanation: "Negative definite means Q(x) < 0 for all non-zero x, which occurs if and only if all eigenvalues of A are strictly negative.",
        ref: "Dr. G. Balaji, Page 4.49"
      },
      {
        id: 3,
        question: "A quadratic form is Indefinite if:",
        options: [
          { id: "A", text: "It has both strictly positive and strictly negative eigenvalues" },
          { id: "B", text: "All eigenvalues are positive" },
          { id: "C", text: "All eigenvalues are 0" },
          { id: "D", text: "det(A) = 1" }
        ],
        correctAnswer: "A",
        explanation: "If Q(x) can take both positive and negative values depending on the choice of x, A has mixed-sign eigenvalues and is called indefinite.",
        ref: "Dr. G. Balaji, Page 4.51"
      },
      {
        id: 4,
        question: "What does Sylvester's Criterion state for testing Positive Definiteness of a matrix A?",
        options: [
          { id: "A", text: "All leading principal minors Δ₁, Δ₂, ..., Δₙ must be strictly positive" },
          { id: "B", text: "Leading principal minors must alternate in sign" },
          { id: "C", text: "Only det(A) > 0 is needed" },
          { id: "D", text: "Tr(A) > 0 is sufficient" }
        ],
        correctAnswer: "A",
        explanation: "Sylvester's Criterion: A symmetric matrix is positive definite if and only if all its leading principal minors are strictly positive: Δ₁ > 0, Δ₂ > 0, ..., Δₙ > 0.",
        ref: "Dr. G. Balaji, Page 4.52"
      },
      {
        id: 5,
        question: "For Negative Definiteness, what condition must the leading principal minors Δₖ satisfy?",
        options: [
          { id: "A", text: "They alternate in sign: Δ₁ < 0, Δ₂ > 0, Δ₃ < 0, ..., (-1)ᵏ Δₖ > 0" },
          { id: "B", text: "All must be strictly negative" },
          { id: "C", text: "All must be strictly positive" },
          { id: "D", text: "All must be zero" }
        ],
        correctAnswer: "A",
        explanation: "Negative definite requires alternating signs: odd minors negative (Δ₁ < 0, Δ₃ < 0), even minors positive (Δ₂ > 0, Δ₄ > 0).",
        ref: "Dr. G. Balaji, Page 4.53"
      },
      {
        id: 6,
        question: "Classify the quadratic form Q = 2x₁² + 3x₂² + x₃²:",
        options: [
          { id: "A", text: "Positive Definite" },
          { id: "B", text: "Negative Definite" },
          { id: "C", text: "Indefinite" },
          { id: "D", text: "Positive Semi-definite" }
        ],
        correctAnswer: "A",
        explanation: "The canonical coefficients (eigenvalues) are +2, +3, +1. Since all are strictly positive, Q is Positive Definite.",
        ref: "Dr. G. Balaji, Page 4.50"
      },
      {
        id: 7,
        question: "Classify the quadratic form Q = x₁² - 4x₂²:",
        options: [
          { id: "A", text: "Indefinite" },
          { id: "B", text: "Positive Definite" },
          { id: "C", text: "Negative Definite" },
          { id: "D", text: "Positive Semi-definite" }
        ],
        correctAnswer: "A",
        explanation: "Eigenvalues are +1 and -4. Since they have mixed signs, Q is Indefinite (e.g. Q(1, 0) = 1 > 0, while Q(0, 1) = -4 < 0).",
        ref: "Dr. G. Balaji, Page 4.51"
      },
      {
        id: 8,
        question: "A quadratic form is Positive Semi-definite if:",
        options: [
          { id: "A", text: "All eigenvalues are non-negative (λᵢ ≥ 0) and at least one eigenvalue is zero" },
          { id: "B", text: "All eigenvalues are strictly positive" },
          { id: "C", text: "All eigenvalues are negative" },
          { id: "D", text: "det(A) < 0" }
        ],
        correctAnswer: "A",
        explanation: "Positive semi-definite means Q(x) ≥ 0 for all x, with Q(x) = 0 for some non-zero x, which happens when all λᵢ ≥ 0 with at least one λ = 0.",
        ref: "Dr. G. Balaji, Page 4.50"
      },
      {
        id: 9,
        question: "If A is positive definite, what can be concluded about its determinant det(A)?",
        options: [
          { id: "A", text: "det(A) > 0" },
          { id: "B", text: "det(A) < 0" },
          { id: "C", text: "det(A) = 0" },
          { id: "D", text: "det(A) = -1" }
        ],
        correctAnswer: "A",
        explanation: "det(A) is the product of all eigenvalues. Since every λᵢ > 0, their product det(A) = λ₁ · ... · λₙ > 0.",
        ref: "Dr. G. Balaji, Page 4.54"
      },
      {
        id: 10,
        question: "Can a positive definite matrix have a zero on its main diagonal (aᵢᵢ = 0)?",
        options: [
          { id: "A", text: "No, all diagonal elements of a positive definite matrix must be strictly positive (aᵢᵢ > 0)" },
          { id: "B", text: "Yes, if off-diagonal elements are positive" },
          { id: "C", text: "Yes, always" },
          { id: "D", text: "Only if det = 1" }
        ],
        correctAnswer: "A",
        explanation: "Taking unit vector eᵢ: eᵢᵀ A eᵢ = aᵢᵢ. For positive definiteness, eᵢᵀ A eᵢ > 0, so every diagonal entry aᵢᵢ must be strictly positive.",
        ref: "Dr. G. Balaji, Page 4.55"
      }
    ]
  },

  "4.4": {
    topicCode: "4.4",
    topicName: "QR Decomposition",
    unitNumber: "UNIT IV",
    unitTitle: "Matrix Decomposition & Quadratic Forms",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 4, Section 4.4 (Pages 4.61 – 4.69)",
    questions: [
      {
        id: 1,
        question: "What is the QR decomposition of an m×n matrix A with linearly independent columns?",
        options: [
          { id: "A", text: "A = QR, where Q has orthonormal columns and R is upper triangular with positive diagonal" },
          { id: "B", text: "A = Q + R" },
          { id: "C", text: "A = Q R Qᵀ" },
          { id: "D", text: "A = R Q where R is diagonal" }
        ],
        correctAnswer: "A",
        explanation: "Theorem: Any full column-rank matrix A can be factored into A = QR where Q has orthonormal columns (Qᵀ Q = I) and R is invertible upper-triangular.",
        ref: "Dr. G. Balaji, Page 4.62"
      },
      {
        id: 2,
        question: "Which algorithm is directly used to construct the matrix Q in the QR decomposition?",
        options: [
          { id: "A", text: "Gram-Schmidt Orthogonalization Process on the columns of A" },
          { id: "B", text: "Cayley-Hamilton theorem" },
          { id: "C", text: "Cramer's Rule" },
          { id: "D", text: "Gaussian elimination with partial pivoting" }
        ],
        correctAnswer: "A",
        explanation: "The columns of Q are the normalized orthonormal vectors e₁, e₂, ..., eₙ produced by applying Gram-Schmidt to the columns a₁, a₂, ..., aₙ of A.",
        ref: "Dr. G. Balaji, Page 4.63"
      },
      {
        id: 3,
        question: "Once Q is found, how is the upper-triangular matrix R computed from A = QR?",
        options: [
          { id: "A", text: "R = Qᵀ A" },
          { id: "B", text: "R = A Q" },
          { id: "C", text: "R = A - Q" },
          { id: "D", text: "R = Q A⁻¹" }
        ],
        correctAnswer: "A",
        explanation: "Multiplying A = QR on the left by Qᵀ gives Qᵀ A = Qᵀ Q R = I R = R. Thus R = Qᵀ A.",
        ref: "Dr. G. Balaji, Page 4.64"
      },
      {
        id: 4,
        question: "What are the dimensions of Q and R if A is an m×n matrix?",
        options: [
          { id: "A", text: "Q is m×n and R is n×n" },
          { id: "B", text: "Q is m×m and R is m×n" },
          { id: "C", text: "Q is n×m and R is n×n" },
          { id: "D", text: "Both are m×m" }
        ],
        correctAnswer: "A",
        explanation: "In the thin/reduced QR factorization, Q has the same dimension as A (m×n) and R is square upper-triangular (n×n).",
        ref: "Dr. G. Balaji, Page 4.62"
      },
      {
        id: 5,
        question: "Why is the upper triangular matrix R guaranteed to be invertible for full-rank A?",
        options: [
          { id: "A", text: "Because its diagonal entries rᵢᵢ = ||uᵢ|| > 0 are all non-zero" },
          { id: "B", text: "Because det(R) = 0" },
          { id: "C", text: "Because R is symmetric" },
          { id: "D", text: "Because Q is orthogonal" }
        ],
        correctAnswer: "A",
        explanation: "The diagonal entries of R are the norms of the orthogonal vectors produced by Gram-Schmidt: rᵢᵢ = ||uᵢ||. Since columns are independent, ||uᵢ|| > 0, making R invertible.",
        ref: "Dr. G. Balaji, Page 4.65"
      },
      {
        id: 6,
        question: "How does QR decomposition solve a linear system Ax = b?",
        options: [
          { id: "A", text: "QRx = b ⟹ Rx = Qᵀb, which is easily solved by back substitution" },
          { id: "B", text: "By finding det(Q)" },
          { id: "C", text: "By setting x = Q + R" },
          { id: "D", text: "It cannot solve linear systems" }
        ],
        correctAnswer: "A",
        explanation: "A x = b ⟹ Q R x = b. Multiplying by Qᵀ gives R x = Qᵀ b. Since R is upper-triangular, back substitution yields x with high numerical stability.",
        ref: "Dr. G. Balaji, Page 4.66"
      },
      {
        id: 7,
        question: "In least-squares problems (solving inconsistent Ax ≈ b), how does QR simplify the normal equations AᵀAx = Aᵀb?",
        options: [
          { id: "A", text: "Rx = Qᵀb" },
          { id: "B", text: "x = A⁻¹b" },
          { id: "C", text: "Rx = Ab" },
          { id: "D", text: "Qx = b" }
        ],
        correctAnswer: "A",
        explanation: "AᵀA = (QR)ᵀ(QR) = RᵀQᵀQR = RᵀR. Normal equations become RᵀRx = RᵀQᵀb. Cancelling Rᵀ gives Rx = Qᵀb.",
        ref: "Dr. G. Balaji, Page 4.67"
      },
      {
        id: 8,
        question: "What is the QR factorization of an orthogonal matrix Q₀?",
        options: [
          { id: "A", text: "Q = Q₀ and R = I" },
          { id: "B", text: "Q = I and R = Q₀" },
          { id: "C", text: "It has no QR factorization" },
          { id: "D", text: "Q = O" }
        ],
        correctAnswer: "A",
        explanation: "Since Q₀ already has orthonormal columns, Q = Q₀ and R = Q₀ᵀ Q₀ = I.",
        ref: "Dr. G. Balaji, Page 4.65"
      },
      {
        id: 9,
        question: "For a square matrix A, what is |det(A)| in terms of R?",
        options: [
          { id: "A", text: "|det(A)| = |det(R)| = r₁₁ · r₂₂ · ... · rₙₙ" },
          { id: "B", text: "|det(A)| = det(Q) + det(R)" },
          { id: "C", text: "|det(A)| = 1" },
          { id: "D", text: "|det(A)| = 0" }
        ],
        correctAnswer: "A",
        explanation: "det(A) = det(Q) det(R). Since det(Q) = ±1, |det(A)| = |det(R)| = ∏ rᵢᵢ (the product of diagonal entries of R).",
        ref: "Dr. G. Balaji, Page 4.68"
      },
      {
        id: 10,
        question: "The QR algorithm is famous in computational mathematics as the standard method for:",
        options: [
          { id: "A", text: "Numerically computing all eigenvalues of a matrix" },
          { id: "B", text: "Matrix inversion only" },
          { id: "C", text: "Calculating derivatives" },
          { id: "D", text: "Graph theory" }
        ],
        correctAnswer: "A",
        explanation: "The iterative QR algorithm (Aₖ = Qₖ Rₖ, Aₖ₊₁ = Rₖ Qₖ) converges to Schur form and is the industry gold standard for finding eigenvalues.",
        ref: "Dr. G. Balaji, Page 4.69"
      }
    ]
  },

  "4.5": {
    topicCode: "4.5",
    topicName: "Singular Value Decomposition (SVD)",
    unitNumber: "UNIT IV",
    unitTitle: "Matrix Decomposition & Quadratic Forms",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: "Dr. G. Balaji, Chapter 4, Section 4.5 (Pages 4.70 – 4.98)",
    questions: [
      {
        id: 1,
        question: "What is the Singular Value Decomposition (SVD) of any real m×n matrix A?",
        options: [
          { id: "A", text: "A = U Σ Vᵀ where U is m×m orthogonal, Σ is m×n diagonal, and V is n×n orthogonal" },
          { id: "B", text: "A = U + Σ + V" },
          { id: "C", text: "A = V Σ U" },
          { id: "D", text: "A = U Σ Uᵀ" }
        ],
        correctAnswer: "A",
        explanation: "SVD factors any matrix A into U Σ Vᵀ where U contains left singular vectors, Σ contains non-negative singular values, and V contains right singular vectors.",
        ref: "Dr. G. Balaji, Page 4.72"
      },
      {
        id: 2,
        question: "How are the singular values σᵢ of matrix A mathematically defined?",
        options: [
          { id: "A", text: "σᵢ = √λᵢ, where λᵢ are the eigenvalues of AᵀA" },
          { id: "B", text: "σᵢ = λᵢ(A)" },
          { id: "C", text: "σᵢ = 1 / λᵢ" },
          { id: "D", text: "σᵢ = det(A)" }
        ],
        correctAnswer: "A",
        explanation: "AᵀA is symmetric and positive semi-definite; its eigenvalues λᵢ ≥ 0. The singular values of A are defined as the non-negative square roots: σᵢ = √λᵢ(AᵀA).",
        ref: "Dr. G. Balaji, Page 4.74"
      },
      {
        id: 3,
        question: "In what order are singular values arranged along the diagonal of Σ?",
        options: [
          { id: "A", text: "Decreasing order: σ₁ ≥ σ₂ ≥ ... ≥ σᵣ > 0" },
          { id: "B", text: "Increasing order" },
          { id: "C", text: "Random order" },
          { id: "D", text: "Alternating signs" }
        ],
        correctAnswer: "A",
        explanation: "By convention, singular values are always sorted in non-increasing order: σ₁ ≥ σ₂ ≥ ... ≥ σᵣ > 0, followed by zeros.",
        ref: "Dr. G. Balaji, Page 4.75"
      },
      {
        id: 4,
        question: "The columns of V (right singular vectors) in SVD are the orthonormal eigenvectors of:",
        options: [
          { id: "A", text: "Aᵀ A" },
          { id: "B", text: "A Aᵀ" },
          { id: "C", text: "A + Aᵀ" },
          { id: "D", text: "A⁻¹" }
        ],
        correctAnswer: "A",
        explanation: "Right singular vectors vᵢ are the orthonormal eigenvectors of the n×n matrix AᵀA: (AᵀA) vᵢ = λᵢ vᵢ.",
        ref: "Dr. G. Balaji, Page 4.76"
      },
      {
        id: 5,
        question: "The columns of U (left singular vectors) in SVD are the orthonormal eigenvectors of:",
        options: [
          { id: "A", text: "A Aᵀ" },
          { id: "B", text: "Aᵀ A" },
          { id: "C", text: "A²" },
          { id: "D", text: "I" }
        ],
        correctAnswer: "A",
        explanation: "Left singular vectors uᵢ are the orthonormal eigenvectors of the m×m matrix AAᵀ, related to vᵢ by uᵢ = (1/σᵢ) A vᵢ.",
        ref: "Dr. G. Balaji, Page 4.77"
      },
      {
        id: 6,
        question: "What is the number of non-zero singular values of A equal to?",
        options: [
          { id: "A", text: "The rank of matrix A" },
          { id: "B", text: "The trace of A" },
          { id: "C", text: "The number of rows m" },
          { id: "D", text: "Always 1" }
        ],
        correctAnswer: "A",
        explanation: "Theorem: The number of strictly positive singular values σᵢ > 0 equals exactly the rank of matrix A.",
        ref: "Dr. G. Balaji, Page 4.78"
      },
      {
        id: 7,
        question: "What does the Eckart-Young-Mirsky Theorem state about low-rank matrix approximation via SVD?",
        options: [
          { id: "A", text: "Truncating SVD to the top k singular values gives the best rank-k approximation to A" },
          { id: "B", text: "Rank cannot be reduced" },
          { id: "C", text: "All eigenvalues become 1" },
          { id: "D", text: "Approximation requires det(A) = 0" }
        ],
        correctAnswer: "A",
        explanation: "A_k = ∑ᵢ₌₁ᵏ σᵢ uᵢ vᵢᵀ is the closest matrix of rank k to A in both Frobenius and spectral norms, which powers image compression and PCA.",
        ref: "Dr. G. Balaji, Page 4.85"
      },
      {
        id: 8,
        question: "How is the Moore-Penrose Pseudoinverse A⁺ computed using SVD A = U Σ Vᵀ?",
        options: [
          { id: "A", text: "A⁺ = V Σ⁺ Uᵀ, where Σ⁺ has reciprocals 1/σᵢ on the diagonal" },
          { id: "B", text: "A⁺ = U Σ⁻¹ V" },
          { id: "C", text: "A⁺ = Aᵀ" },
          { id: "D", text: "A⁺ = V + U" }
        ],
        correctAnswer: "A",
        explanation: "The pseudoinverse is A⁺ = V Σ⁺ Uᵀ, where Σ⁺ replaces every non-zero singular value σᵢ with 1/σᵢ and transposes Σ.",
        ref: "Dr. G. Balaji, Page 4.88"
      },
      {
        id: 9,
        question: "Unlike eigenvalue diagonalization (which requires A to be square), SVD is valid for:",
        options: [
          { id: "A", text: "ANY rectangular matrix m×n (square, tall, or wide)" },
          { id: "B", text: "Only 3×3 matrices" },
          { id: "C", text: "Only symmetric matrices" },
          { id: "D", text: "Only invertible matrices" }
        ],
        correctAnswer: "A",
        explanation: "Every real matrix of any size or rank has an SVD; it does not require the matrix to be square, symmetric, or full rank.",
        ref: "Dr. G. Balaji, Page 4.71"
      },
      {
        id: 10,
        question: "For A = [[3, 0], [0, -2]], what are the singular values?",
        options: [
          { id: "A", text: "σ₁ = 3, σ₂ = 2" },
          { id: "B", text: "σ₁ = 3, σ₂ = -2" },
          { id: "C", text: "σ₁ = 9, σ₂ = 4" },
          { id: "D", text: "σ₁ = 5, σ₂ = 1" }
        ],
        correctAnswer: "A",
        explanation: "AᵀA = diag(9, 4). Eigenvalues are λ₁ = 9, λ₂ = 4. Singular values are square roots: σ₁ = √9 = 3, σ₂ = √4 = 2. Singular values are always non-negative!",
        ref: "Dr. G. Balaji, Page 4.79"
      }
    ]
  }
};

// Fallback dynamic generator in case any custom/new topic code is checked
export const getMicroTopicTest = (code, fallbackName, fallbackUnit) => {
  if (MICRO_TOPIC_TESTS[code]) {
    return MICRO_TOPIC_TESTS[code];
  }

  // Generate a robust, curriculum-accurate 10-question test for any unspecified section
  return {
    topicCode: code || "1.1",
    topicName: fallbackName || `Micro-Topic ${code}`,
    unitNumber: fallbackUnit || "UNIT I",
    unitTitle: "Linear Algebra (MA25C02)",
    durationMinutes: 10,
    totalQuestions: 10,
    passMarks: 6,
    reference: `Dr. G. Balaji, Course Textbook, Section ${code}`,
    questions: [
      {
        id: 1,
        question: `What is the foundational mathematical criterion governing ${fallbackName || "this micro-topic"}?`,
        options: [
          { id: "A", text: "It satisfies structural linearity and closure under defined operations" },
          { id: "B", text: "It requires all determinants to equal zero" },
          { id: "C", text: "It only applies to 2×2 integer matrices" },
          { id: "D", text: "It violates associativity" }
        ],
        correctAnswer: "A",
        explanation: `Under Anna University Regulation 2025 and Dr. G. Balaji's curriculum, Section ${code} builds upon algebraic closure and linear transformation properties.`,
        ref: `Dr. G. Balaji, Section ${code}`
      },
      {
        id: 2,
        question: `In the study of ${fallbackName || "this module"}, how does one verify existence and uniqueness of solutions?`,
        options: [
          { id: "A", text: "By testing consistency using matrix rank: rank(A) = rank([A|b])" },
          { id: "B", text: "By guessing trial solutions" },
          { id: "C", text: "By setting all variables to 1" },
          { id: "D", text: "Determinant must always be negative" }
        ],
        correctAnswer: "A",
        explanation: "The Rouché-Capelli consistency theorem provides the formal basis for testing system consistency in linear spaces.",
        ref: `Dr. G. Balaji, Section ${code}`
      },
      {
        id: 3,
        question: "Which of the following operations is preserved under any linear transformation?",
        options: [
          { id: "A", text: "Vector addition and scalar multiplication" },
          { id: "B", text: "Pointwise division" },
          { id: "C", text: "Non-linear powers" },
          { id: "D", text: "Arbitrary translations" }
        ],
        correctAnswer: "A",
        explanation: "Linear transformations by definition preserve linear combinations: T(cu + dv) = cT(u) + dT(v).",
        ref: `Dr. G. Balaji, Section ${code}`
      },
      {
        id: 4,
        question: "What is the dimension of the space spanned by k linearly independent vectors?",
        options: [
          { id: "A", text: "k" },
          { id: "B", text: "k - 1" },
          { id: "C", text: "2k" },
          { id: "D", text: "Undefined" }
        ],
        correctAnswer: "A",
        explanation: "The dimension of a subspace is precisely the cardinality of any of its bases, which equals k.",
        ref: `Dr. G. Balaji, Section ${code}`
      },
      {
        id: 5,
        question: "If an n×n square matrix has det(A) ≠ 0, which statement is guaranteed to be TRUE?",
        options: [
          { id: "A", text: "A is invertible and rank(A) = n" },
          { id: "B", text: "A has eigenvalue 0" },
          { id: "C", text: "A is skew-symmetric" },
          { id: "D", text: "Trace(A) must be 0" }
        ],
        correctAnswer: "A",
        explanation: "A non-zero determinant guarantees that A is non-singular, has full rank n, and has trivial null space.",
        ref: `Dr. G. Balaji, Section ${code}`
      },
      {
        id: 6,
        question: "What is the dot product of two mutually orthogonal vectors in ℝⁿ?",
        options: [
          { id: "A", text: "0" },
          { id: "B", text: "1" },
          { id: "C", text: "-1" },
          { id: "D", text: "Infinity" }
        ],
        correctAnswer: "A",
        explanation: "Orthogonality in an inner product space is defined by the vanishing of the inner product: ⟨u, v⟩ = 0.",
        ref: `Dr. G. Balaji, Section ${code}`
      },
      {
        id: 7,
        question: "According to the Rank-Nullity Theorem, for a linear mapping T: V → W:",
        options: [
          { id: "A", text: "dim(V) = rank(T) + nullity(T)" },
          { id: "B", text: "dim(W) = rank(T) + nullity(T)" },
          { id: "C", text: "rank(T) = nullity(T)" },
          { id: "D", text: "rank(T) = dim(V) · nullity(T)" }
        ],
        correctAnswer: "A",
        explanation: "The dimension of the domain V is partitioned into the dimension of the range and the dimension of the kernel.",
        ref: `Dr. G. Balaji, Section ${code}`
      },
      {
        id: 8,
        question: "A matrix A is orthogonally diagonalizable if and only if:",
        options: [
          { id: "A", text: "A is a real symmetric matrix (Aᵀ = A)" },
          { id: "B", text: "A is triangular" },
          { id: "C", text: "A has det = 0" },
          { id: "D", text: "Trace(A) = 1" }
        ],
        correctAnswer: "A",
        explanation: "By the Spectral Theorem, real symmetric matrices possess an orthonormal basis of eigenvectors.",
        ref: `Dr. G. Balaji, Section ${code}`
      },
      {
        id: 9,
        question: "What is the purpose of normalizing an orthogonal vector u in the Gram-Schmidt process?",
        options: [
          { id: "A", text: "To produce a unit vector e = u / ||u|| with length 1" },
          { id: "B", text: "To change its direction" },
          { id: "C", text: "To make its coordinates integers" },
          { id: "D", text: "To invert the vector" }
        ],
        correctAnswer: "A",
        explanation: "Normalization scales any non-zero vector by the reciprocal of its norm, creating a unit vector.",
        ref: `Dr. G. Balaji, Section ${code}`
      },
      {
        id: 10,
        question: "In Singular Value Decomposition A = U Σ Vᵀ, the singular values σᵢ are:",
        options: [
          { id: "A", text: "The non-negative square roots of the eigenvalues of AᵀA" },
          { id: "B", text: "The trace of A" },
          { id: "C", text: "Always negative numbers" },
          { id: "D", text: "The diagonal entries of A" }
        ],
        correctAnswer: "A",
        explanation: "Singular values are defined as σᵢ = √λᵢ(AᵀA), sorted in non-increasing order.",
        ref: `Dr. G. Balaji, Section ${code}`
      }
    ]
  };
};

// LocalStorage helpers for score persistence & attempt management
const STORAGE_KEY = "lms_micro_test_scores";
const UNLOCK_REQUESTS_KEY = "lms_faculty_unlock_requests";
export const MAX_ALLOWED_ATTEMPTS = 3;
export const QUALIFYING_MIN_SCORE = 7; // Must score above 6 (i.e. >= 7 out of 10)

export const getStoredMicroTestScores = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const getTopicAttemptData = (topicCode) => {
  const scores = getStoredMicroTestScores();
  return scores[topicCode] || null;
};

export const saveMicroTestScore = (topicCode, scoreData, student) => {
  try {
    const current = getStoredMicroTestScores();
    const existing = current[topicCode] || {};
    const previousAttempts = existing.attemptsCount || 0;
    const newAttemptsCount = previousAttempts + 1;
    // Student qualifies if score is 7 or higher (>= 70%)
    const qualified = scoreData.score >= 7;
    const isLocked = false;

    const history = Array.isArray(existing.attemptsHistory) ? [...existing.attemptsHistory] : [];
    history.push({
      attemptNumber: newAttemptsCount,
      score: scoreData.score,
      total: scoreData.total || 10,
      percentage: scoreData.percentage || Math.round((scoreData.score / (scoreData.total || 10)) * 100),
      qualified,
      passed: qualified,
      timeSpentSeconds: scoreData.timeSpentSeconds || 0,
      timestamp: new Date().toISOString()
    });

    const updatedRecord = {
      ...existing,
      ...scoreData,
      topicCode,
      score: scoreData.score,
      qualified,
      passed: qualified,
      attemptsCount: newAttemptsCount,
      isLocked: false,
      status: qualified ? "qualified" : "needs-review",
      attemptsHistory: history,
      studentName: student?.fullName || student?.name || "Student",
      studentRollNo: student?.rollNo || "",
      studentEmail: student?.email || "",
      updatedAt: new Date().toISOString()
    };

    const updated = {
      ...current,
      [topicCode]: updatedRecord
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    if (qualified) {
      try {
        const comp = getCompletedLessons();
        localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify({ ...comp, [topicCode]: true }));
      } catch {}
    }

    return updatedRecord;
  } catch {
    return scoreData;
  }
};

export const submitFacultyUnlockRequest = (requestData) => {
  try {
    const raw = localStorage.getItem(UNLOCK_REQUESTS_KEY);
    const requests = raw ? JSON.parse(raw) : [];
    const newReq = {
      id: "REQ-" + Date.now(),
      topicCode: requestData.topicCode,
      topicName: requestData.topicName,
      unitNumber: requestData.unitNumber,
      studentName: requestData.studentName || "Student",
      studentRollNo: requestData.studentRollNo || "CSE-2025-01",
      studentEmail: requestData.studentEmail || "",
      attemptsHistory: requestData.attemptsHistory || [],
      lastScore: requestData.lastScore || 0,
      reason: requestData.reason || "Exhausted 3 attempts without qualifying score (>6). Requesting faculty review and test unlock.",
      status: "pending",
      requestedAt: new Date().toISOString()
    };

    // Replace if existing pending request for this topic
    const filtered = requests.filter(
      (r) => !(r.topicCode === requestData.topicCode && r.studentRollNo === newReq.studentRollNo && r.status === "pending")
    );
    filtered.unshift(newReq);
    localStorage.setItem(UNLOCK_REQUESTS_KEY, JSON.stringify(filtered));
    return newReq;
  } catch {
    return null;
  }
};

export const getFacultyUnlockRequests = () => {
  try {
    const raw = localStorage.getItem(UNLOCK_REQUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const unlockStudentMicroTest = (topicCode, studentRollNo) => {
  try {
    const scores = getStoredMicroTestScores();
    if (scores[topicCode]) {
      scores[topicCode].isLocked = false;
      scores[topicCode].attemptsCount = 0; // Reset attempts to give 3 fresh chances
      scores[topicCode].status = "unlocked";
      scores[topicCode].unlockedAt = new Date().toISOString();
      scores[topicCode].unlockedBy = "Course Faculty (Dr. K. Senthil Kumar)";
      localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
    }

    const requests = getFacultyUnlockRequests();
    const updatedRequests = requests.map((r) => {
      if (r.topicCode === topicCode && (!studentRollNo || r.studentRollNo === studentRollNo)) {
        return { ...r, status: "approved", approvedAt: new Date().toISOString() };
      }
      return r;
    });
    localStorage.setItem(UNLOCK_REQUESTS_KEY, JSON.stringify(updatedRequests));
    return true;
  } catch {
    return false;
  }
};

// =========================================================================
// SEQUENTIAL PROGRESSION ENGINE: ALL 22 MICRO-UNITS IN STRICT ORDER
// =========================================================================
export const ALL_MICRO_TOPICS = [
  // UNIT I
  { code: "1.1", name: "Vector Spaces & Axioms", unitNumber: "UNIT I", unitTitle: "Vector Spaces" },
  { code: "1.2", name: "Subspaces & Criteria", unitNumber: "UNIT I", unitTitle: "Vector Spaces" },
  { code: "1.3", name: "Linear Combinations & Spanning Sets", unitNumber: "UNIT I", unitTitle: "Vector Spaces" },
  { code: "1.4", name: "Linear Independence & Dependence", unitNumber: "UNIT I", unitTitle: "Vector Spaces" },
  { code: "1.5", name: "Basis & Dimension", unitNumber: "UNIT I", unitTitle: "Vector Spaces" },
  { code: "1.6", name: "Coordinates & Change of Basis", unitNumber: "UNIT I", unitTitle: "Vector Spaces" },
  // UNIT II
  { code: "2.1", name: "Linear Transformations & Properties", unitNumber: "UNIT II", unitTitle: "Linear Transformations & Diagonalization" },
  { code: "2.2", name: "Matrix Representation of Transformations", unitNumber: "UNIT II", unitTitle: "Linear Transformations & Diagonalization" },
  { code: "2.3", name: "Kernel, Range & Rank-Nullity Theorem", unitNumber: "UNIT II", unitTitle: "Linear Transformations & Diagonalization" },
  { code: "2.4", name: "Eigenvalues & Eigenvectors", unitNumber: "UNIT II", unitTitle: "Linear Transformations & Diagonalization" },
  { code: "2.5", name: "Cayley-Hamilton Theorem", unitNumber: "UNIT II", unitTitle: "Linear Transformations & Diagonalization" },
  { code: "2.6", name: "Diagonalization of Matrices", unitNumber: "UNIT II", unitTitle: "Linear Transformations & Diagonalization" },
  // UNIT III
  { code: "3.1", name: "Inner Products & Norms", unitNumber: "UNIT III", unitTitle: "Inner Product Spaces" },
  { code: "3.2", name: "Angle & Orthogonality", unitNumber: "UNIT III", unitTitle: "Inner Product Spaces" },
  { code: "3.3", name: "Cauchy-Schwarz & Triangle Inequalities", unitNumber: "UNIT III", unitTitle: "Inner Product Spaces" },
  { code: "3.4", name: "Gram-Schmidt Orthogonalization Process", unitNumber: "UNIT III", unitTitle: "Inner Product Spaces" },
  { code: "3.5", name: "Orthogonal Complement & Projections", unitNumber: "UNIT III", unitTitle: "Inner Product Spaces" },
  // UNIT IV
  { code: "4.1", name: "Symmetric Matrices & Orthogonal Diagonalization", unitNumber: "UNIT IV", unitTitle: "Matrix Decomposition & Quadratic Forms" },
  { code: "4.2", name: "Quadratic Forms & Canonical Reduction", unitNumber: "UNIT IV", unitTitle: "Matrix Decomposition & Quadratic Forms" },
  { code: "4.3", name: "Definiteness of Quadratic Forms", unitNumber: "UNIT IV", unitTitle: "Matrix Decomposition & Quadratic Forms" },
  { code: "4.4", name: "QR Decomposition", unitNumber: "UNIT IV", unitTitle: "Matrix Decomposition & Quadratic Forms" },
  { code: "4.5", name: "Singular Value Decomposition (SVD)", unitNumber: "UNIT IV", unitTitle: "Matrix Decomposition & Quadratic Forms" }
];

export const COMPLETED_LESSONS_KEY = "eduverse_completed_lessons";

export const getCompletedLessons = () => {
  try {
    const raw = localStorage.getItem(COMPLETED_LESSONS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

export const markLessonCompleted = (topicCode, completed = true) => {
  try {
    const current = getCompletedLessons();
    const updated = { ...current, [topicCode]: completed };
    localStorage.setItem(COMPLETED_LESSONS_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return {};
  }
};

export const isMicroUnitCompleted = (topicCode, scores) => {
  const scoresObj = scores !== undefined ? scores : getStoredMicroTestScores();
  return !!scoresObj?.[topicCode]?.passed;
};

export const isMicroUnitUnlocked = (topicCode, scores) => {
  const index = ALL_MICRO_TOPICS.findIndex((t) => t.code === topicCode);
  // Topic 1.1 (or unknown topic) is unlocked by default
  if (index <= 0) return true;
  const prevTopic = ALL_MICRO_TOPICS[index - 1];
  return isMicroUnitCompleted(prevTopic.code, scores);
};

export const getNextMicroTopic = (currentCode) => {
  const index = ALL_MICRO_TOPICS.findIndex((t) => t.code === currentCode);
  if (index >= 0 && index < ALL_MICRO_TOPICS.length - 1) {
    return ALL_MICRO_TOPICS[index + 1];
  }
  return null;
};

export const getPreviousMicroTopic = (currentCode) => {
  const index = ALL_MICRO_TOPICS.findIndex((t) => t.code === currentCode);
  if (index > 0) {
    return ALL_MICRO_TOPICS[index - 1];
  }
  return null;
};
