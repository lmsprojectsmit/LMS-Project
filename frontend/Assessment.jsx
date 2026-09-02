import { useState, useEffect } from "react";
import "./Assessment.css";

// 30 Questions (1 mark each, Total: 30 marks)
// Divided across 4 core domains (Unit I - Unit IV)
export const ASSESSMENT_QUESTIONS = [
  // -------------------------------------------------------------
  // Domain 1: Matrix Algebra & Properties (Q1 - Q5)
  // -------------------------------------------------------------
  {
    id: 1,
    domain: "Matrix Algebra",
    domainCode: "unit1",
    question: "If A is any square matrix of order n, which of the following expressions is always guaranteed to be a symmetric matrix?",
    options: [
      { id: "A", text: "A - Aᵀ" },
      { id: "B", text: "A + Aᵀ" },
      { id: "C", text: "A² - A" },
      { id: "D", text: "A A⁻¹" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "A matrix M is symmetric if Mᵀ = M. Taking the transpose of (A + Aᵀ): (A + Aᵀ)ᵀ = Aᵀ + (Aᵀ)ᵀ = Aᵀ + A = A + Aᵀ. Since its transpose is identically equal to itself, A + Aᵀ is always symmetric.",
    whyFalse: {
      A: "A - Aᵀ is skew-symmetric, not symmetric, because (A - Aᵀ)ᵀ = Aᵀ - A = -(A - Aᵀ).",
      C: "A² - A is not symmetric in general unless A itself is already symmetric and commutes.",
      D: "A A⁻¹ equals the identity matrix I. While I is symmetric, this only exists when A is invertible; A + Aᵀ is valid for ANY square matrix."
    }
  },
  {
    id: 2,
    domain: "Matrix Algebra",
    domainCode: "unit1",
    question: "If A is an m × n matrix and B is an n × p matrix, what is the order (dimension) of the product matrix (AB)ᵀ?",
    options: [
      { id: "A", text: "m × p" },
      { id: "B", text: "p × m" },
      { id: "C", text: "n × n" },
      { id: "D", text: "p × n" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "The product AB has m rows and p columns (dimension m × p). When taking the transpose (AB)ᵀ, the rows and columns are swapped, so (AB)ᵀ has dimension p × m (also equal to Bᵀ Aᵀ where Bᵀ is p × n and Aᵀ is n × m).",
    whyFalse: {
      A: "m × p is the dimension of AB before transposition, not (AB)ᵀ.",
      C: "n × n is the inner matching dimension required for matrix multiplication, not the outer dimension of the result.",
      D: "p × n is the dimension of Bᵀ alone, not the product (AB)ᵀ."
    }
  },
  {
    id: 3,
    domain: "Matrix Algebra",
    domainCode: "unit1",
    question: "The trace of an n × n square matrix A, denoted as Tr(A), is defined as:",
    options: [
      { id: "A", text: "The product of its main diagonal elements" },
      { id: "B", text: "The sum of all elements in the first row" },
      { id: "C", text: "The sum of its principal diagonal elements: ∑ aᵢᵢ" },
      { id: "D", text: "The determinant of the matrix" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "By mathematical definition, the trace of a square matrix is the algebraic sum of the entries on its main (principal) diagonal: Tr(A) = a₁₁ + a₂₂ + ... + aₙₙ = ∑ aᵢᵢ.",
    whyFalse: {
      A: "The product of main diagonal elements gives the determinant only for triangular matrices, not the trace.",
      B: "The sum of elements in a single row is just a row sum, not the trace.",
      D: "The determinant involves permutations and products of entries, whereas the trace is simply the linear sum of diagonal entries."
    }
  },
  {
    id: 4,
    domain: "Matrix Algebra",
    domainCode: "unit1",
    question: "If A is a real skew-symmetric matrix (Aᵀ = -A), what can always be concluded about its principal diagonal elements?",
    options: [
      { id: "A", text: "All diagonal elements must be strictly 0" },
      { id: "B", text: "All diagonal elements must be equal to 1" },
      { id: "C", text: "All diagonal elements must be strictly negative" },
      { id: "D", text: "They can be any arbitrary non-zero real numbers" }
    ],
    correctAnswer: "A",
    marks: 1,
    explanation: "For a skew-symmetric matrix, by definition aᵢⱼ = -aⱼᵢ for all i, j. For the principal diagonal elements where i = j, this condition becomes aᵢᵢ = -aᵢᵢ ⟹ 2aᵢᵢ = 0 ⟹ aᵢᵢ = 0. Therefore, all diagonal elements of any skew-symmetric matrix must be zero.",
    whyFalse: {
      B: "If diagonal elements were 1, then aᵢᵢ = -aᵢᵢ would imply 1 = -1, which is a mathematical contradiction.",
      C: "Negative numbers cannot satisfy aᵢᵢ = -aᵢᵢ since only 0 equals its own negative.",
      D: "Arbitrary non-zero numbers violate the skew-symmetry condition along the diagonal."
    }
  },
  {
    id: 5,
    domain: "Matrix Algebra",
    domainCode: "unit1",
    question: "If A and B are invertible square matrices of the same order, what does the reversal law state for (AB)⁻¹?",
    options: [
      { id: "A", text: "(AB)⁻¹ = A⁻¹ B⁻¹" },
      { id: "B", text: "(AB)⁻¹ = B⁻¹ A⁻¹" },
      { id: "C", text: "(AB)⁻¹ = (BA)⁻¹" },
      { id: "D", text: "(AB)⁻¹ = A B⁻¹" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Because matrix multiplication is non-commutative in general, the reversal law applies: (AB)(B⁻¹ A⁻¹) = A(B B⁻¹)A⁻¹ = A(I)A⁻¹ = A A⁻¹ = I. Hence the inverse of AB is B⁻¹ A⁻¹ in reversed order.",
    whyFalse: {
      A: "Writing A⁻¹ B⁻¹ is false because (AB)(A⁻¹ B⁻¹) ≠ I unless A and B commute, which is generally not true for matrices.",
      C: "(BA)⁻¹ is equal to A⁻¹ B⁻¹, not (AB)⁻¹.",
      D: "A B⁻¹ does not invert A and yields an invalid product when multiplied by AB."
    }
  },

  // -------------------------------------------------------------
  // Domain 2: Determinants & Invertibility (Q6 - Q10)
  // -------------------------------------------------------------
  {
    id: 6,
    domain: "Determinants & Inverses",
    domainCode: "unit2",
    question: "If A is an n × n square matrix and k is any scalar, what is the determinant of kA?",
    options: [
      { id: "A", text: "k · det(A)" },
      { id: "B", text: "kⁿ · det(A)" },
      { id: "C", text: "nᵏ · det(A)" },
      { id: "D", text: "(1/k) · det(A)" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "In an n × n matrix, multiplying the matrix by scalar k multiplies every entry in every row by k. Since factoring a constant out of a single row scales the determinant by k, doing this across all n rows scales the determinant by k · k · ... · k = kⁿ. Thus, det(kA) = kⁿ · det(A).",
    whyFalse: {
      A: "k · det(A) only applies if a SINGLE row or column is multiplied by k, not the entire n × n matrix.",
      C: "nᵏ has base and exponent swapped; the scalar k is raised to matrix order n, not n to k.",
      D: "(1/k) · det(A) would divide the determinant, which is the opposite of multiplying by scalar k."
    }
  },
  {
    id: 7,
    domain: "Determinants & Inverses",
    domainCode: "unit2",
    question: "A square matrix A is invertible (non-singular) if and only if:",
    options: [
      { id: "A", text: "det(A) = 0" },
      { id: "B", text: "det(A) ≠ 0" },
      { id: "C", text: "Trace(A) ≠ 0" },
      { id: "D", text: "A is a symmetric matrix" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "The formula for the inverse matrix is A⁻¹ = (1 / det(A)) · adj(A). Division by det(A) is mathematically defined if and only if det(A) ≠ 0. Therefore, non-zero determinant is the necessary and sufficient condition for invertibility.",
    whyFalse: {
      A: "If det(A) = 0, the matrix is called singular and has NO inverse because division by zero is undefined.",
      C: "The trace can be zero for invertible matrices (for example, [[1, 0], [0, -1]] has trace = 0 and det = -1 ≠ 0, so it is invertible).",
      D: "Many non-symmetric matrices are invertible, and many symmetric matrices (such as the zero matrix) are not invertible."
    }
  },
  {
    id: 8,
    domain: "Determinants & Inverses",
    domainCode: "unit2",
    question: "Evaluate the determinant of the 2 × 2 matrix A = [[3, 4], [2, 5]]:",
    options: [
      { id: "A", text: "7" },
      { id: "B", text: "23" },
      { id: "C", text: "-7" },
      { id: "D", text: "15" }
    ],
    correctAnswer: "A",
    marks: 1,
    explanation: "For any 2 × 2 matrix [[a, b], [c, d]], the determinant is given by (a·d - b·c). Here: det(A) = (3)(5) - (4)(2) = 15 - 8 = 7.",
    whyFalse: {
      B: "23 is obtained if you mistakenly add the products (15 + 8) instead of subtracting them (ad - bc).",
      C: "-7 is obtained if you reverse the subtraction order (8 - 15), which is incorrect.",
      D: "15 is only the product of the main diagonal (3 × 5) without subtracting the off-diagonal product (4 × 2)."
    }
  },
  {
    id: 9,
    domain: "Determinants & Inverses",
    domainCode: "unit2",
    question: "If any two identical rows (or columns) exist in a square matrix A, what is det(A)?",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "-1" },
      { id: "C", text: "0" },
      { id: "D", text: "Equal to the sum of the elements in that row" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "Swapping two rows of a matrix reverses the sign of the determinant: det(A') = -det(A). But if the two rows are identical, swapping them leaves the matrix unchanged: det(A) = -det(A) ⟹ 2·det(A) = 0 ⟹ det(A) = 0. Also, identical rows mean the rows are linearly dependent.",
    whyFalse: {
      A: "Determinant cannot be 1 when rows are linearly dependent; dependent rows collapse the volume to zero.",
      B: "-1 is false; linear dependence always produces a zero determinant.",
      D: "Row sum is irrelevant to whether determinant collapses to zero."
    }
  },
  {
    id: 10,
    domain: "Determinants & Inverses",
    domainCode: "unit2",
    question: "For an invertible matrix A with det(A) = 4, what is the determinant of its inverse A⁻¹?",
    options: [
      { id: "A", text: "-4" },
      { id: "B", text: "0.25 (1/4)" },
      { id: "C", text: "16" },
      { id: "D", text: "1" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "By the determinant product rule, det(A · A⁻¹) = det(A) · det(A⁻¹). Since A · A⁻¹ = I and det(I) = 1, we have 4 · det(A⁻¹) = 1 ⟹ det(A⁻¹) = 1/4 = 0.25.",
    whyFalse: {
      A: "-4 is the negative of the determinant, not its multiplicative reciprocal.",
      C: "16 is 4 squared, whereas the rule requires 1/4.",
      D: "1 is the determinant of the identity matrix I, not of A⁻¹."
    }
  },

  // -------------------------------------------------------------
  // Domain 3: Systems of Linear Equations & Rank (Q11 - Q15)
  // -------------------------------------------------------------
  {
    id: 11,
    domain: "Linear Systems & Rank",
    domainCode: "unit3",
    question: "By the Rouché–Capelli theorem, a non-homogeneous system AX = B is consistent if and only if:",
    options: [
      { id: "A", text: "Rank(A) > Rank([A|B])" },
      { id: "B", text: "Rank(A) = Rank([A|B])" },
      { id: "C", text: "Rank(A) = 0" },
      { id: "D", text: "det(A) = 0" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "The Rouché–Capelli theorem is the fundamental criterion for solvability: a linear system has one or more solutions (is consistent) if and only if the coefficient matrix A and the augmented matrix [A|B] have the exact same rank: Rank(A) = Rank([A|B]).",
    whyFalse: {
      A: "Rank(A) can never be greater than Rank([A|B]) because adding column B cannot decrease the dimension of the column space.",
      C: "Rank(A) = 0 only holds for the zero matrix and has no bearing on general consistency.",
      D: "det(A) = 0 is not required for consistency; in fact, for square systems, det(A) ≠ 0 guarantees a unique consistent solution."
    }
  },
  {
    id: 12,
    domain: "Linear Systems & Rank",
    domainCode: "unit3",
    question: "If a consistent system of m equations in n unknowns has Rank(A) = r, with r < n, then the system has:",
    options: [
      { id: "A", text: "A unique solution" },
      { id: "B", text: "No solution" },
      { id: "C", text: "Infinitely many solutions with (n - r) free variables" },
      { id: "D", text: "Exactly (n - r) solutions" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "When a system is consistent and its rank r is strictly less than the number of variables n, exactly (n - r) variables can be assigned arbitrary real values (free parameters), yielding infinitely many solutions parameterized by (n - r) free variables.",
    whyFalse: {
      A: "A unique solution requires rank r to equal the number of unknowns n (r = n).",
      B: "The question specifically specifies that the system is CONSISTENT, so it cannot have no solution.",
      D: "Linear systems over real numbers never have a finite count of solutions greater than 1; they have either 0, 1, or infinitely many solutions."
    }
  },
  {
    id: 13,
    domain: "Linear Systems & Rank",
    domainCode: "unit3",
    question: "What is the maximum possible rank of a real matrix of size 3 × 5?",
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "3" },
      { id: "C", text: "8" },
      { id: "D", text: "15" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "For any m × n matrix, the row rank equals the column rank, and rank cannot exceed the number of rows or columns: Rank(A) ≤ min(m, n). For a 3 × 5 matrix, min(3, 5) = 3. Thus the maximum rank is 3.",
    whyFalse: {
      A: "5 is impossible because the matrix only has 3 rows, so at most 3 rows can be linearly independent.",
      C: "8 is the sum of rows and columns (3 + 5), which is mathematically unrelated to rank.",
      D: "15 is the total number of entries (3 × 5), not the rank."
    }
  },
  {
    id: 14,
    domain: "Linear Systems & Rank",
    domainCode: "unit3",
    question: "According to the fundamental Rank-Nullity Theorem for an n-dimensional vector space V (T: V → W):",
    options: [
      { id: "A", text: "Rank(T) - Nullity(T) = n" },
      { id: "B", text: "Rank(T) · Nullity(T) = n" },
      { id: "C", text: "Rank(T) + Nullity(T) = n = dim(Domain)" },
      { id: "D", text: "Rank(T) + Nullity(T) = dim(Codomain W)" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "The Rank-Nullity Theorem states that the dimension of the domain V equals the dimension of the image/range (Rank) plus the dimension of the kernel/null-space (Nullity): dim(V) = Rank(T) + Nullity(T) = n.",
    whyFalse: {
      A: "The relation is additive (sum), not subtractive (difference).",
      B: "Rank and Nullity sum to n, they do not multiply to n.",
      D: "The theorem relates to the dimension of the DOMAIN space V, not the codomain W."
    }
  },
  {
    id: 15,
    domain: "Linear Systems & Rank",
    domainCode: "unit3",
    question: "A homogeneous system of linear equations AX = 0:",
    options: [
      { id: "A", text: "Is always inconsistent" },
      { id: "B", text: "Always has at least the trivial solution X = 0" },
      { id: "C", text: "Never possesses non-trivial solutions" },
      { id: "D", text: "Can only have solutions if det(A) ≠ 0" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Substituting the zero vector X = [0, 0, ..., 0]ᵀ into AX gives A · 0 = 0. Therefore, X = 0 is ALWAYS a valid solution (called the trivial solution). Hence, homogeneous systems are NEVER inconsistent.",
    whyFalse: {
      A: "A homogeneous system is NEVER inconsistent because X = 0 is always a solution.",
      C: "If Rank(A) < n, the system has infinitely many non-trivial solutions in addition to the trivial solution.",
      D: "Even if det(A) = 0, solutions still exist (in fact, infinitely many non-trivial solutions exist when det(A) = 0)."
    }
  },

  // -------------------------------------------------------------
  // Domain 4: Vector Spaces, Eigenvalues & Eigenvectors (Q16 - Q20)
  // -------------------------------------------------------------
  {
    id: 16,
    domain: "Eigenvalues & Vector Spaces",
    domainCode: "unit4",
    question: "The sum of all eigenvalues (λ₁ + λ₂ + ... + λₙ) of an n × n square matrix A is always equal to:",
    options: [
      { id: "A", text: "det(A)" },
      { id: "B", text: "Trace(A)" },
      { id: "C", text: "Rank(A)" },
      { id: "D", text: "Nullity(A)" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "By Vieta's formulas applied to the characteristic polynomial det(A - λI) = (-1)ⁿ(λⁿ - Tr(A)λⁿ⁻¹ + ... + (-1)ⁿ det(A)), the sum of roots equals the coefficient of λⁿ⁻¹, which is the trace: ∑ λᵢ = Tr(A) = ∑ aᵢᵢ.",
    whyFalse: {
      A: "det(A) is the PRODUCT of all eigenvalues (λ₁ · λ₂ · ... · λₙ), not their sum.",
      C: "Rank(A) represents the number of non-zero eigenvalues (for diagonalizable matrices), not their algebraic sum.",
      D: "Nullity(A) is the geometric multiplicity of eigenvalue 0, not the sum of all eigenvalues."
    }
  },
  {
    id: 17,
    domain: "Eigenvalues & Vector Spaces",
    domainCode: "unit4",
    question: "The product of all eigenvalues (λ₁ · λ₂ · ... · λₙ) of a square matrix A is equal to:",
    options: [
      { id: "A", text: "Trace(A)" },
      { id: "B", text: "det(A)" },
      { id: "C", text: "Rank(A)" },
      { id: "D", text: "Zero" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Evaluating the characteristic equation det(A - λI) at λ = 0 gives det(A - 0·I) = det(A). Since the polynomial can be factored as (λ₁ - λ)(λ₂ - λ)...(λₙ - λ), setting λ = 0 yields λ₁ · λ₂ · ... · λₙ = det(A).",
    whyFalse: {
      A: "Trace(A) is the SUM of the eigenvalues, not the product.",
      C: "Rank(A) is the dimension of the column space, not the eigenvalue product.",
      D: "The product is zero only if at least one eigenvalue is 0 (i.e. if A is singular); for non-singular matrices it is non-zero."
    }
  },
  {
    id: 18,
    domain: "Eigenvalues & Vector Spaces",
    domainCode: "unit4",
    question: "If λ is a non-zero eigenvalue of an invertible matrix A with eigenvector v, what is the eigenvalue of A⁻¹ corresponding to v?",
    options: [
      { id: "A", text: "-λ" },
      { id: "B", text: "λ²" },
      { id: "C", text: "1 / λ" },
      { id: "D", text: "1 - λ" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "From definition, Av = λv. Multiplying both sides on the left by A⁻¹ yields: A⁻¹(Av) = A⁻¹(λv) ⟹ (A⁻¹A)v = λ(A⁻¹v) ⟹ v = λ(A⁻¹v). Dividing by scalar λ (since λ ≠ 0): A⁻¹v = (1/λ)v. Thus, 1/λ is the corresponding eigenvalue of A⁻¹.",
    whyFalse: {
      A: "-λ is the eigenvalue of -A, not A⁻¹.",
      B: "λ² is the eigenvalue of A² (matrix squared), not the inverse.",
      D: "1 - λ is the eigenvalue of (I - A), not A⁻¹."
    }
  },
  {
    id: 19,
    domain: "Eigenvalues & Vector Spaces",
    domainCode: "unit4",
    question: "A set of vectors {v₁, v₂, ..., vₖ} in vector space V is defined as linearly dependent if:",
    options: [
      { id: "A", text: "c₁v₁ + c₂v₂ + ... + cₖvₖ = 0 only when every cᵢ = 0" },
      { id: "B", text: "There exist scalars cᵢ not all zero such that c₁v₁ + ... + cₖvₖ = 0" },
      { id: "C", text: "All vectors have identical magnitude" },
      { id: "D", text: "The dot product between any two vectors is strictly zero" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "By standard definition in linear algebra, a set of vectors is linearly dependent if there exists a non-trivial linear combination that equals the zero vector—meaning at least one scalar cᵢ ≠ 0 satisfies c₁v₁ + c₂v₂ + ... + cₖvₖ = 0.",
    whyFalse: {
      A: "Option A is the exact definition of Linear INDEPENDENCE, which is the direct opposite of linear dependence.",
      C: "Vector magnitudes have no relation to whether vectors can be formed as linear combinations of each other.",
      D: "Having zero dot product means vectors are orthogonal, which actually implies linear independence (if non-zero), not dependence."
    }
  },
  {
    id: 20,
    domain: "Eigenvalues & Vector Spaces",
    domainCode: "unit4",
    question: "The characteristic equation of a 2 × 2 matrix A is λ² - 5λ + 6 = 0. What are its eigenvalues?",
    options: [
      { id: "A", text: "λ = 1 and λ = 6" },
      { id: "B", text: "λ = 2 and λ = 3" },
      { id: "C", text: "λ = -2 and λ = -3" },
      { id: "D", text: "λ = 5 and λ = 6" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "To find eigenvalues, solve the characteristic equation: λ² - 5λ + 6 = 0. Factoring the quadratic: (λ - 2)(λ - 3) = 0 ⟹ λ = 2 or λ = 3. Check: Sum = 2 + 3 = 5 (equals Tr(A)), Product = 2 × 3 = 6 (equals det(A)).",
    whyFalse: {
      A: "For λ = 1 and 6: (λ - 1)(λ - 6) = λ² - 7λ + 6 = 0, which has middle term -7λ, not -5λ.",
      C: "For λ = -2 and -3: (λ + 2)(λ + 3) = λ² + 5λ + 6 = 0, which has middle term +5λ, not -5λ.",
      D: "5 and 6 are just the coefficients from the equation, not the roots."
    }
  },
  {
    id: 21,
    domain: "Vector Spaces & Subspaces",
    domainCode: "unit1",
    question: "In the real vector space ℝ³, what is the dimension of the subspace W = {(x, y, z) ∈ ℝ³ | x + 2y - 3z = 0}?",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "2" },
      { id: "C", text: "3" },
      { id: "D", text: "0" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "The subspace W is defined by a single linear homogeneous constraint in ℝ³ (which has dim(ℝ³) = 3). A single non-trivial constraint restricts one degree of freedom, leaving 3 - 1 = 2 independent parameters (e.g., x = -2y + 3z, with y and z free). Thus, dim(W) = 2.",
    whyFalse: {
      A: "Dimension 1 corresponds to a line through the origin, defined by two independent linear equations, not one.",
      C: "Dimension 3 is the entire space ℝ³; having a non-trivial constraint restricts the dimension to strictly less than 3.",
      D: "Dimension 0 is only the trivial zero subspace {0}, whereas W contains infinitely many vectors."
    }
  },
  {
    id: 22,
    domain: "Vector Spaces & Subspaces",
    domainCode: "unit1",
    question: "Which of the following subsets of ℝ² forms a valid vector subspace under standard addition and scalar multiplication?",
    options: [
      { id: "A", text: "S₁ = {(x, y) | x + y = 1}" },
      { id: "B", text: "S₂ = {(x, y) | xy ≥ 0}" },
      { id: "C", text: "S₃ = {(x, y) | 2x - 5y = 0}" },
      { id: "D", text: "S₄ = {(x, y) | x² + y² ≤ 1}" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "A subset W of a vector space is a subspace if it contains the zero vector and is closed under vector addition and scalar multiplication. 2x - 5y = 0 passes through (0, 0), and any linear combination of solutions satisfies 2(αx₁ + βx₂) - 5(αy₁ + βy₂) = α(2x₁ - 5y₁) + β(2x₂ - 5y₂) = 0.",
    whyFalse: {
      A: "S₁ does not contain the zero vector (0, 0) because 0 + 0 = 0 ≠ 1.",
      B: "S₂ is not closed under addition: (1, 2) ∈ S₂ and (-2, -1) ∈ S₂, but (1, 2) + (-2, -1) = (-1, 1) where (-1)(1) = -1 < 0.",
      D: "S₄ is not closed under scalar multiplication; multiplying (1, 0) by scalar c = 2 gives (2, 0), and 2² + 0² = 4 > 1."
    }
  },
  {
    id: 23,
    domain: "Vector Spaces & Subspaces",
    domainCode: "unit1",
    question: "Consider the three vectors v₁ = (1, 0, 1), v₂ = (1, 1, 0), and v₃ = (0, 1, -1) in ℝ³. These vectors are:",
    options: [
      { id: "A", text: "Linearly independent because no vector is the zero vector" },
      { id: "B", text: "Linearly dependent because v₁ - v₂ + v₃ = (0, 0, 0)" },
      { id: "C", text: "An orthonormal basis for ℝ³" },
      { id: "D", text: "Mutually orthogonal" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Testing linear dependence: v₁ - v₂ = (1 - 1, 0 - 1, 1 - 0) = (0, -1, 1) = -v₃. Therefore, v₁ - v₂ + v₃ = (0, 0, 0). Since a non-trivial linear combination with non-zero coefficients (1, -1, 1) equals the zero vector, the vectors are linearly dependent.",
    whyFalse: {
      A: "Non-zero vectors can easily be linearly dependent if one is a linear combination of the others.",
      C: "Linearly dependent vectors cannot form a basis for ℝ³ because a basis requires linear independence.",
      D: "The dot product v₁ · v₂ = 1(1) + 0(1) + 1(0) = 1 ≠ 0, so they are not mutually orthogonal."
    }
  },
  {
    id: 24,
    domain: "Determinants & Invertibility",
    domainCode: "unit2",
    question: "If A is a 3 × 3 matrix with det(A) = 5, what is the determinant of its adjugate matrix, det(adj(A))?",
    options: [
      { id: "A", text: "5" },
      { id: "B", text: "15" },
      { id: "C", text: "25" },
      { id: "D", text: "125" }
    ],
    correctAnswer: "C",
    marks: 1,
    explanation: "For any n × n matrix A, the fundamental identity states A · adj(A) = det(A) · Iₙ. Taking determinants of both sides gives det(A) · det(adj(A)) = (det(A))ⁿ, which implies det(adj(A)) = (det(A))ⁿ⁻¹. Here n = 3 and det(A) = 5, so det(adj(A)) = 5³⁻¹ = 5² = 25.",
    whyFalse: {
      A: "5 is det(A), not det(adj(A)).",
      B: "15 is 3 × det(A), confusing scalar multiplication with matrix power law.",
      D: "125 is (det(A))³ = (det(A))ⁿ, which equals det(det(A) · I), not det(adj(A))."
    }
  },
  {
    id: 25,
    domain: "Determinants & Invertibility",
    domainCode: "unit2",
    question: "If Q is a real orthogonal matrix (satisfying Qᵀ Q = I), what are the only possible real values for det(Q)?",
    options: [
      { id: "A", text: "0 and 1" },
      { id: "B", text: "+1 and -1" },
      { id: "C", text: "Any non-negative real number" },
      { id: "D", text: "Strictly +1 only" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Since Qᵀ Q = I, taking determinants gives det(Qᵀ Q) = det(Qᵀ) · det(Q) = (det(Q))² = det(I) = 1. Therefore, (det(Q))² = 1, which implies det(Q) = ±1. (Matrices with det = +1 represent pure rotations, while det = -1 represent reflections).",
    whyFalse: {
      A: "An orthogonal matrix is always invertible, so det(Q) cannot be 0.",
      C: "det(Q) is strictly constrained to ±1, not arbitrary non-negative numbers.",
      D: "det(Q) can also be -1 (e.g., reflection matrices like [[1, 0], [0, -1]] have det = -1)."
    }
  },
  {
    id: 26,
    domain: "Linear Systems & Transformations",
    domainCode: "unit3",
    question: "A linear transformation T: ℝ⁴ → ℝ³ has a 2-dimensional kernel (null space). What is the dimension of the range (image) of T?",
    options: [
      { id: "A", text: "1" },
      { id: "B", text: "2" },
      { id: "C", text: "3" },
      { id: "D", text: "4" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "By the Rank-Nullity Theorem: dim(Domain) = Rank(T) + Nullity(T). Here dim(Domain) = dim(ℝ⁴) = 4, and Nullity(T) = dim(ker(T)) = 2. Therefore, Rank(T) = dim(range(T)) = 4 - 2 = 2.",
    whyFalse: {
      A: "Rank(T) = 4 - 2 = 2, not 1.",
      C: "Rank would be 3 only if nullity were 1 (4 - 1 = 3).",
      D: "The codomain is ℝ³, so the range dimension cannot exceed 3, and certainly cannot be 4."
    }
  },
  {
    id: 27,
    domain: "Linear Systems & Transformations",
    domainCode: "unit3",
    question: "In Cramer's Rule for solving a square non-homogeneous system AX = B, the method fails (is inapplicable) when:",
    options: [
      { id: "A", text: "B is the zero vector" },
      { id: "B", text: "det(A) = 0" },
      { id: "C", text: "All elements of A are integers" },
      { id: "D", text: "Trace(A) = 0" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "Cramer's Rule calculates each unknown as xᵢ = det(Aᵢ) / det(A). If det(A) = 0, division by zero occurs, making Cramer's Rule inapplicable (the system is either inconsistent or possesses infinitely many solutions).",
    whyFalse: {
      A: "When B = 0 and det(A) ≠ 0, Cramer's Rule works perfectly and yields the unique trivial solution xᵢ = 0.",
      C: "Integer matrices are completely valid and commonly solved with Cramer's Rule.",
      D: "Trace(A) = 0 has no bearing on invertibility or Cramer's Rule (e.g., [[0, 1], [1, 0]] has trace 0 but det = -1 ≠ 0)."
    }
  },
  {
    id: 28,
    domain: "Eigenvalues & Orthogonality",
    domainCode: "unit4",
    question: "According to the Cayley-Hamilton Theorem, every square matrix A satisfies:",
    options: [
      { id: "A", text: "Its own characteristic equation: det(A - λI) = 0 with λ replaced by A" },
      { id: "B", text: "A² = I for all square matrices" },
      { id: "C", text: "Trace(A) = det(A)" },
      { id: "D", text: "Aᵀ = A⁻¹" }
    ],
    correctAnswer: "A",
    marks: 1,
    explanation: "The Cayley-Hamilton Theorem states that every square matrix satisfies its own characteristic polynomial. That is, if p(λ) = det(A - λI) = λⁿ + cₙ₋₁λⁿ⁻¹ + ... + c₀ = 0, then p(A) = Aⁿ + cₙ₋₁Aⁿ⁻¹ + ... + c₀I = 0 (the zero matrix). This is used to compute high matrix powers and matrix inverses.",
    whyFalse: {
      B: "A² = I is only true for involutory matrices, not all matrices.",
      C: "Trace(A) = det(A) is not a general identity.",
      D: "Aᵀ = A⁻¹ defines orthogonal matrices, not a universal property of square matrices."
    }
  },
  {
    id: 29,
    domain: "Eigenvalues & Orthogonality",
    domainCode: "unit4",
    question: "In an inner product space, two vectors u and v are orthogonal if and only if:",
    options: [
      { id: "A", text: "⟨u, v⟩ = 1" },
      { id: "B", text: "⟨u, v⟩ = 0" },
      { id: "C", text: "‖u‖ = ‖v‖" },
      { id: "D", text: "u + v = 0" }
    ],
    correctAnswer: "B",
    marks: 1,
    explanation: "By definition in any real or complex inner product space, two vectors u and v are orthogonal (perpendicular) if and only if their inner product vanishes, i.e., ⟨u, v⟩ = 0.",
    whyFalse: {
      A: "⟨u, v⟩ = 1 occurs when two unit vectors are parallel and identical, not orthogonal.",
      C: "‖u‖ = ‖v‖ means the vectors have equal norm (length), which does not imply orthogonality.",
      D: "u + v = 0 means u = -v (anti-parallel vectors, angle π), which is opposite of orthogonality."
    }
  },
  {
    id: 30,
    domain: "Eigenvalues & Orthogonality",
    domainCode: "unit4",
    question: "A real symmetric matrix A is positive definite if and only if:",
    options: [
      { id: "A", text: "All of its eigenvalues are strictly positive (λᵢ > 0 for all i)" },
      { id: "B", text: "All of its entries are positive numbers" },
      { id: "C", text: "det(A) = 0" },
      { id: "D", text: "Trace(A) < 0" }
    ],
    correctAnswer: "A",
    marks: 1,
    explanation: "A real symmetric matrix A is positive definite if xᵀ A x > 0 for all non-zero vectors x ∈ ℝⁿ. By spectral decomposition, this condition is equivalent to all eigenvalues of A being strictly positive (λᵢ > 0). Equivalently, by Sylvester's criterion, all leading principal minors must be strictly positive.",
    whyFalse: {
      B: "Having positive entries does not guarantee positive definiteness (e.g., [[1, 2], [2, 1]] has all positive entries but eigenvalues 3 and -1, so it is indefinite).",
      C: "If det(A) = 0, at least one eigenvalue is 0, making the matrix positive semi-definite or singular, not positive definite.",
      D: "Trace(A) is the sum of eigenvalues; if all eigenvalues are strictly positive, Trace(A) must be positive, never negative."
    }
  }
];

// =============================================================
// THREE STUDENT ACADEMIC CATEGORIES & ASSIGNED LESSONS
// =============================================================
export const STUDENT_CATEGORIES = {
  category1: {
    id: "category1",
    name: "Foundational Track",
    title: "Category 1: Foundational Track (Remediation & Core Basics)",
    tag: "Category 1 (0 – 14 Marks)",
    minMarks: 0,
    maxMarks: 14,
    badgeClass: "badge-cat-1",
    themeColor: "#b45309",
    icon: "🥉",
    level: "Beginner / Remedial Support",
    scoreRangeLabel: "0 – 14 Marks (< 50%)",
    summary: "Diagnostic results identify foundational conceptual gaps in matrix multiplication, 2×2/3×3 determinants, and elementary row operations.",
    targetOutcome: "Rebuild core computational confidence through guided video proofs, formula sheets, and remedial row-reduction drills.",
    lessons: [
      {
        id: "L1.1",
        code: "LA-F101",
        unit: "Unit I: Matrix Algebra",
        title: "Matrix Basics, Properties & Arithmetic Operations",
        duration: "40 mins",
        problems: "8 Guided Exercises",
        difficulty: "Beginner",
        objectives: "Master row-column dimensions, conditions for valid matrix multiplication, and transpose symmetry properties.",
        keyFormula: "(AB)_{ij} = \\sum_{k=1}^n a_{ik} b_{kj} \\quad \\text{and} \\quad (AB)^T = B^T A^T",
        notes: "Matrix multiplication AB is valid only when the number of columns in A matches the number of rows in B. In general, matrix multiplication is NOT commutative (AB ≠ BA). Symmetric matrices satisfy Aᵀ = A, whereas skew-symmetric matrices satisfy Aᵀ = -A with all diagonal entries strictly equal to 0.",
        practiceProblem: "If matrix A has size 2×3 and B has size 3×4, what is the order of (AB)ᵀ? Does A + B exist? (Solution: (AB)ᵀ has dimension 4×2; A + B is undefined because dimensions 2×3 and 3×4 do not match)."
      },
      {
        id: "L1.2",
        code: "LA-F102",
        unit: "Unit II: Determinants",
        title: "Determinant Computation & Invertibility Fundamentals",
        duration: "50 mins",
        problems: "10 Step-by-Step Drills",
        difficulty: "Beginner",
        objectives: "Compute 2×2 and 3×3 determinants via cofactor expansion and understand why det(A) = 0 prevents matrix inversion.",
        keyFormula: "\\det\\begin{pmatrix}a & b \\\\ c & d\\end{pmatrix} = ad - bc \\quad \\text{and} \\quad A^{-1} = \\frac{1}{\\det(A)}\\text{adj}(A)",
        notes: "If det(A) = 0, the matrix is singular and has no inverse because division by zero is undefined. Multiplying an n×n matrix by scalar k scales the determinant by kⁿ. If any two rows are identical, det(A) = 0.",
        practiceProblem: "Calculate det(A) for A = [[3, 4], [2, 5]], and verify if A is invertible. (Solution: det(A) = 15 - 8 = 7 ≠ 0, so A is invertible and det(A⁻¹) = 1/7 = 0.25)."
      },
      {
        id: "L1.3",
        code: "LA-F103",
        unit: "Unit I: Echelon Forms",
        title: "Elementary Row Operations & Row Echelon Form (REF)",
        duration: "60 mins",
        problems: "12 Worked Problems",
        difficulty: "Beginner / Intermediate",
        objectives: "Perform row switching, scaling, and addition without arithmetic errors to reduce augmented matrices to row echelon form.",
        keyFormula: "R_i \\leftrightarrow R_j, \\quad R_i \\leftarrow k R_i, \\quad R_i \\leftarrow R_i + k R_j",
        notes: "Row echelon form requires all non-zero rows to be placed above all-zero rows, and the leading coefficient (pivot) of each row must be strictly to the right of the row above it.",
        practiceProblem: "Reduce the matrix [[1, 2, 3], [2, 5, 8], [3, 8, 14]] to row echelon form and determine its rank. (Solution: Rank is 2 because row 3 is a linear combination of rows 1 and 2)."
      },
      {
        id: "L1.4",
        code: "LA-F104",
        unit: "Unit III: Linear Equations",
        title: "Introduction to Linear Systems & Consistency Checks",
        duration: "45 mins",
        problems: "6 Application Problems",
        difficulty: "Beginner",
        objectives: "Set up the augmented matrix [A|B] and identify consistent systems versus inconsistent systems.",
        keyFormula: "\\text{Consistent if } \\text{Rank}(A) = \\text{Rank}([A|B])",
        notes: "If Gaussian reduction produces an impossible row like [0 0 0 | c] with c ≠ 0, the system is inconsistent and has no solution. Homogeneous systems AX = 0 are always consistent (trivial solution X = 0).",
        practiceProblem: "State whether 2x + 3y = 5 and 4x + 6y = 12 has a solution. (Solution: Inconsistent because Rank(A) = 1 while Rank([A|B]) = 2)."
      }
    ]
  },
  category2: {
    id: "category2",
    name: "Core Engineering Track",
    title: "Category 2: Core Engineering Track (Standard University Level)",
    tag: "Category 2 (15 – 22 Marks)",
    minMarks: 15,
    maxMarks: 22,
    badgeClass: "badge-cat-2",
    themeColor: "#4338ca",
    icon: "🥈",
    level: "Intermediate / Standard University Pace",
    scoreRangeLabel: "15 – 22 Marks (50% – 75%)",
    summary: "Solid grasp of foundational matrix arithmetic. Focus is on mastering university exam problem sets, Rank-Nullity theorems, and characteristic equations.",
    targetOutcome: "Master the standard MA25C02 syllabus to secure top university grades (A / A+) through structured problem-solving drills and theorem applications.",
    lessons: [
      {
        id: "L2.1",
        code: "LA-C201",
        unit: "Unit III: Rank & Linear Systems",
        title: "Rank-Nullity Theorem & Parametric Solutions",
        duration: "55 mins",
        problems: "10 Exam Problems",
        difficulty: "Intermediate",
        objectives: "Apply the Rank-Nullity theorem to linear transformations and write general parametric solutions for systems with infinite solutions.",
        keyFormula: "\\text{Rank}(T) + \\text{Nullity}(T) = \\dim(V) = n, \\quad \\text{Free Variables} = n - r",
        notes: "When Rank(A) = r < n in a consistent system of n unknowns, there are (n - r) linearly independent free parameters. Nullity represents the dimension of the solution space of the homogeneous system AX = 0.",
        practiceProblem: "A linear transformation T: R⁵ -> R³ has Rank(T) = 3. What is the dimension of the null space (Nullity)? (Solution: Nullity = 5 - 3 = 2)."
      },
      {
        id: "L2.2",
        code: "LA-C202",
        unit: "Unit IV: Eigenvalues",
        title: "Characteristic Polynomials & Eigenvector Computation",
        duration: "65 mins",
        problems: "12 University Problems",
        difficulty: "Intermediate",
        objectives: "Solve det(A - λI) = 0 for 2×2 and 3×3 matrices, compute non-trivial eigenvectors, and verify roots using trace and determinant.",
        keyFormula: "\\det(A - \\lambda I) = 0, \\quad \\sum \\lambda_i = \\text{Tr}(A), \\quad \\prod \\lambda_i = \\det(A)",
        notes: "Always double-check eigenvalues using the two essential invariants: their sum must equal Trace(A), and their product must equal det(A). If λ is an eigenvalue of A, then 1/λ is an eigenvalue of A⁻¹.",
        practiceProblem: "Find the eigenvalues of A = [[4, 1], [2, 3]]. Verify using trace and determinant. (Solution: λ = 5 and λ = 2. Trace = 7, Det = 10)."
      },
      {
        id: "L2.3",
        code: "LA-C203",
        unit: "Unit IV: Cayley-Hamilton",
        title: "Cayley-Hamilton Theorem & High-Power Inverses",
        duration: "50 mins",
        problems: "8 Exam Proofs",
        difficulty: "Intermediate",
        objectives: "Verify that every square matrix satisfies its own characteristic equation and compute A⁻¹ and A⁴ using polynomial identities.",
        keyFormula: "A^n + c_{n-1} A^{n-1} + \\dots + c_0 I = 0 \\implies A^{-1} = -\\frac{1}{c_0}(A^{n-1} + \\dots + c_1 I)",
        notes: "Cayley-Hamilton allows finding inverse matrices without calculating adjugates and determinants of large sizes. It also enables expressing high powers Aᵏ as linear combinations of lower powers.",
        practiceProblem: "If the characteristic equation of A is A² - 5A + 6I = 0, express A⁻¹ and A³ in terms of A and I. (Solution: A⁻¹ = (5I - A)/6; A³ = 19A - 30I)."
      },
      {
        id: "L2.4",
        code: "LA-C204",
        unit: "Unit III: Vector Spaces",
        title: "Vector Spaces, Linear Independence & Basis Finding",
        duration: "50 mins",
        problems: "8 Vector Sets",
        difficulty: "Intermediate",
        objectives: "Test sets of vectors for linear independence and construct bases for column spaces and null spaces.",
        keyFormula: "c_1 v_1 + c_2 v_2 + \\dots + c_k v_k = 0 \\iff c_1 = c_2 = \\dots = c_k = 0",
        notes: "A set of vectors is a basis if it is both linearly independent and spans the vector space. The number of vectors in any basis is the unique dimension of that space.",
        practiceProblem: "Determine whether v1 = (1, 2, 3), v2 = (2, 4, 6), v3 = (0, 1, 1) are linearly independent. (Solution: Dependent, because v2 = 2 · v1)."
      }
    ]
  },
  category3: {
    id: "category3",
    name: "Advanced Scholars Track",
    title: "Category 3: Advanced Scholars Track (Honors & Applications)",
    tag: "Category 3 (23 – 30 Marks)",
    minMarks: 23,
    maxMarks: 30,
    badgeClass: "badge-cat-3",
    themeColor: "#059669",
    icon: "🥇",
    level: "Advanced / Honors & Research",
    scoreRangeLabel: "23 – 30 Marks (> 75%)",
    summary: "Exceptional analytical proficiency and theoretical mastery. Assigned lessons emphasize rigorous proof techniques, diagonalization, SVD, and real-world engineering systems.",
    targetOutcome: "Prepare for engineering research, graduate-level machine learning linear algebra, and top academic honors (O Grade).",
    lessons: [
      {
        id: "L3.1",
        code: "LA-A301",
        unit: "Unit IV: Diagonalization",
        title: "Matrix Diagonalization & Orthogonal Similarity",
        duration: "60 mins",
        problems: "8 Advanced Proofs",
        difficulty: "Advanced",
        objectives: "Determine if a matrix is diagonalizable (algebraic = geometric multiplicity) and construct modal matrix P such that P⁻¹ A P = D.",
        keyFormula: "A = P D P^{-1} \\implies A^k = P D^k P^{-1}, \\quad \\text{where } D = \\text{diag}(\\lambda_1, \\dots, \\lambda_n)",
        notes: "Symmetric real matrices are always orthogonally diagonalizable with real eigenvalues and orthogonal eigenvectors. Diagonalization dramatically simplifies evaluating dynamic systems and discrete differential equations.",
        practiceProblem: "Orthogonally diagonalize the symmetric matrix A = [[3, 1], [1, 3]]. Construct the orthogonal matrix P. (Solution: D = diag(4, 2), P = [[1/√2, -1/√2], [1/√2, 1/√2]])."
      },
      {
        id: "L3.2",
        code: "LA-A302",
        unit: "Unit V: Inner Product Spaces",
        title: "Gram-Schmidt Orthogonalization & Projections",
        duration: "65 mins",
        problems: "8 Vector Computations",
        difficulty: "Advanced",
        objectives: "Transform an arbitrary vector basis into an orthonormal basis using the Gram-Schmidt process and compute orthogonal projection operators.",
        keyFormula: "u_k = v_k - \\sum_{j=1}^{k-1} \\frac{\\langle v_k, u_j \\rangle}{\\langle u_j, u_j \\rangle} u_j, \\quad e_k = \\frac{u_k}{\\|u_k\\|}",
        notes: "Orthonormal bases eliminate cross-terms in vector projections and facilitate QR decomposition (A = QR), which forms the basis for modern computer algorithms computing eigenvalues.",
        practiceProblem: "Apply Gram-Schmidt to convert v1 = (1, 1, 0) and v2 = (1, 2, 0) into an orthonormal set in R³. (Solution: e1 = (1/√2, 1/√2, 0), e2 = (-1/√2, 1/√2, 0))."
      },
      {
        id: "L3.3",
        code: "LA-A303",
        unit: "Unit V: SVD & Applications",
        title: "Singular Value Decomposition (SVD) & Data Compression",
        duration: "75 mins",
        problems: "6 Case Studies",
        difficulty: "Advanced",
        objectives: "Decompose rectangular matrices into A = U Σ Vᵀ and understand low-rank approximations used in PCA and machine learning.",
        keyFormula: "A = U \\Sigma V^T = \\sum_{i=1}^r \\sigma_i u_i v_i^T, \\quad \\sigma_i = \\sqrt{\\lambda_i(A^T A)}",
        notes: "SVD works for ANY matrix (even non-square and singular). Singular values are the square roots of the eigenvalues of Aᵀ A. The Moore-Penrose pseudo-inverse A⁺ = V Σ⁺ Uᵀ provides optimal least-squares solutions.",
        practiceProblem: "Compute the non-zero singular values of A = [[3, 0], [0, -4]]. (Solution: Singular values are | -4 | = 4 and 3)."
      },
      {
        id: "L3.4",
        code: "LA-A304",
        unit: "Unit IV: Quadratic Forms",
        title: "Quadratic Forms, Canonical Reductions & Definiteness",
        duration: "60 mins",
        problems: "10 Analytical Tasks",
        difficulty: "Advanced",
        objectives: "Represent quadratic forms as Xᵀ A X, apply orthogonal transformations to find canonical forms, and classify definiteness via eigenvalues.",
        keyFormula: "Q(X) = X^T A X = \\lambda_1 y_1^2 + \\lambda_2 y_2^2 + \\dots + \\lambda_n y_n^2",
        notes: "A quadratic form is positive definite if all eigenvalues are strictly positive (>0); positive semi-definite if all eigenvalues ≥ 0; and indefinite if eigenvalues have mixed signs.",
        practiceProblem: "Classify the quadratic form Q(x1, x2) = 2x1² + 2x1 x2 + 2x2². (Solution: Symmetric matrix is [[2, 1], [1, 2]]. Eigenvalues are 3 and 1 > 0, so it is strictly Positive Definite)."
      }
    ]
  }
};

function Assessment({ onNavigate, studentInfo }) {
  // Test state
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: "A" | "B" | ... }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [questionId]: boolean }
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes countdown (1500 seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Solutions review filter: "all" | "false" | "correct"
  const [solutionFilter, setSolutionFilter] = useState("all");

  // Track exploration tab state
  const [activeCategoryTab, setActiveCategoryTab] = useState(null);

  // Lesson notes modal state
  const [activeLessonModal, setActiveLessonModal] = useState(null);

  // Timer countdown
  useEffect(() => {
    if (!isTimerRunning || isSubmitted) return;
    if (timeLeft <= 0) {
      handleAutoSubmit();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isTimerRunning, isSubmitted]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelectOption = (optionId) => {
    if (isSubmitted) return;
    const currentQ = ASSESSMENT_QUESTIONS[currentQIndex];
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId,
    }));
  };

  const handleToggleFlag = () => {
    const currentQ = ASSESSMENT_QUESTIONS[currentQIndex];
    setFlaggedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id],
    }));
  };

  const handleClearAnswer = () => {
    const currentQ = ASSESSMENT_QUESTIONS[currentQIndex];
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
  };

  const handleAutoSubmit = () => {
    setShowSubmitModal(false);
    setIsSubmitted(true);
    setIsTimerRunning(false);
  };

  const handleFinalSubmit = () => {
    setShowSubmitModal(false);
    setIsSubmitted(true);
    setIsTimerRunning(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setTimeLeft(25 * 60);
    setCurrentQIndex(0);
    setIsSubmitted(false);
    setSolutionFilter("all");
    setActiveCategoryTab(null);
    setActiveLessonModal(null);
    setIsTimerRunning(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Compute Analytics
  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  let score = 0;
  const domainBreakdown = {
    unit1: { name: "Matrix Algebra & Vector Spaces", correct: 0, total: 0 },
    unit2: { name: "Determinants & Invertibility", correct: 0, total: 0 },
    unit3: { name: "Linear Systems & Transformations", correct: 0, total: 0 },
    unit4: { name: "Eigenvalues & Orthogonality", correct: 0, total: 0 },
  };

  ASSESSMENT_QUESTIONS.forEach((q) => {
    if (domainBreakdown[q.domainCode]) {
      domainBreakdown[q.domainCode].total = (domainBreakdown[q.domainCode].total || 0) + 1;
    }
  });

  ASSESSMENT_QUESTIONS.forEach((q) => {
    const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
    if (isCorrect) {
      score += 1;
      if (domainBreakdown[q.domainCode]) {
        domainBreakdown[q.domainCode].correct += 1;
      }
    }
  });

  const incorrectCount = totalQuestions - score;
  const percentage = Math.round((score / totalQuestions) * 100);

  // Group Student into 1 of 3 Categories based on score (30 total marks)
  const assignedCategoryId =
    score <= 14 ? "category1" : score <= 22 ? "category2" : "category3";
  const assignedCategory = STUDENT_CATEGORIES[assignedCategoryId];

  // Active viewed category tab defaults to assigned category
  const currentViewedCategoryId = activeCategoryTab || assignedCategoryId;
  const currentViewedCategory = STUDENT_CATEGORIES[currentViewedCategoryId];

  const currentQ = ASSESSMENT_QUESTIONS[currentQIndex];

  // Filter solutions list
  const filteredSolutions = ASSESSMENT_QUESTIONS.filter((q) => {
    const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
    if (solutionFilter === "false") return !isCorrect;
    if (solutionFilter === "correct") return isCorrect;
    return true; // "all"
  });

  return (
    <div className="assessment-page">
      {/* Decorative math chalk background */}
      <div className="assessment-math-bg" aria-hidden="true">
        <span className="floating-math m1">A x = b</span>
        <span className="floating-math m2">det(A - λI) = 0</span>
        <span className="floating-math m3">dim(V) = rank(T) + nullity(T)</span>
        <span className="floating-math m4">λ₁ + λ₂ = Tr(A)</span>
        <span className="floating-math m5">(AB)⁻¹ = B⁻¹ A⁻¹</span>
      </div>

      {/* Top Header Bar */}
      <header className="assessment-header">
        <div className="assessment-brand" onClick={() => onNavigate && onNavigate("home")}>
          <span className="brand-icon">📐</span>
          <div>
            <h1 className="brand-title">EduVerse LMS • Diagnostic Assessment</h1>
            <p className="brand-subtitle">Linear Algebra (MA25C02) • Student Capability Profiler</p>
          </div>
        </div>

        <div className="header-meta">
          {studentInfo && studentInfo.fullName && (
            <div className="student-badge">
              <span className="student-avatar">👤</span>
              <span className="student-name">{studentInfo.fullName}</span>
              {studentInfo.rollNo && <span className="student-roll">({studentInfo.rollNo})</span>}
            </div>
          )}

          {!isSubmitted && (
            <div className={`timer-box ${timeLeft < 300 ? "timer-warning" : ""}`}>
              <span className="timer-icon">⏱️</span>
              <span className="timer-clock">{formatTime(timeLeft)}</span>
            </div>
          )}

          <div className="header-actions">
            <button
              type="button"
              className="exit-btn"
              onClick={() => {
                if (isSubmitted || window.confirm("Are you sure you want to leave the assessment? Your progress will be reset.")) {
                  onNavigate && onNavigate("home");
                }
              }}
            >
              Exit to Home
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================= */}
      {/* VIEW A: RESULT & CAPABILITY ANALYSIS SCREEN               */}
      {/* ========================================================= */}
      {isSubmitted ? (
        <main className="assessment-result-container">
          <div className="result-hero-card">
            {/* Supertag */}
            <div className="result-badge-cluster">
              <span className="result-supertag">ASSESSMENT COMPLETED • CAPABILITY REPORT</span>
            </div>

            <h2 className="result-heading">
              Student Capability Profiling & Assigned Curriculum
            </h2>
            <p className="result-subheading">
              Course: <strong>Linear Algebra (MA25C02)</strong> • Evaluated on {totalQuestions} Questions (1 Mark Each) • 25 Minutes Duration
            </p>

            {/* Score Showcase Grid */}
            <div className="score-showcase-grid">
              <div className="score-card primary-score">
                <span className="card-lbl">Overall Score</span>
                <div className="big-score">
                  <span className="score-num">{score}</span>
                  <span className="score-total">/ {totalQuestions}</span>
                </div>
                <div className="score-percentage-bar">
                  <div
                    className="score-fill"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="score-pct-text">{percentage}% Total Marks</span>
              </div>

              <div className="score-card">
                <span className="card-lbl">Correct Answers</span>
                <span className="stat-value stat-green">✅ {score}</span>
                <span className="stat-sub">{score} marks earned</span>
              </div>

              <div className="score-card">
                <span className="card-lbl">False / Incorrect Answers</span>
                <span className="stat-value stat-red">❌ {incorrectCount}</span>
                <span className="stat-sub">{unansweredCount} skipped, {answeredCount - score} wrong</span>
              </div>

              <div className="score-card">
                <span className="card-lbl">Assigned Academic Track</span>
                <span className="stat-value" style={{ color: assignedCategory.themeColor }}>
                  {assignedCategory.icon} {assignedCategory.name}
                </span>
                <span className="stat-sub">{assignedCategory.level}</span>
              </div>
            </div>

            {/* ========================================================= */}
            {/* 3 STUDENT CATEGORIES & DYNAMIC LESSON ASSIGNMENT HUB      */}
            {/* ========================================================= */}
            <section className="category-assignment-hub">
              {/* Category Track Switcher Tabs */}
              <div className="category-track-tabs">
                {Object.values(STUDENT_CATEGORIES).map((cat) => {
                  const isAssigned = cat.id === assignedCategoryId;
                  const isViewing = cat.id === currentViewedCategoryId;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      className={`cat-tab-btn ${cat.badgeClass} ${isViewing ? "active-tab" : ""}`}
                      onClick={() => setActiveCategoryTab(cat.id)}
                    >
                      <span className="cat-tab-icon">{cat.icon}</span>
                      <div className="cat-tab-info">
                        <span className="cat-tab-title">{cat.name}</span>
                        <span className="cat-tab-range">{cat.scoreRangeLabel}</span>
                      </div>
                      {isAssigned && (
                        <span className="cat-assigned-marker">
                          🎯 YOUR TRACK
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active Category Information Card */}
              <div className={`active-category-card ${currentViewedCategory.badgeClass}`}>
                <div className="acc-header">
                  <div className="acc-title-cluster">
                    <span className="acc-icon">{currentViewedCategory.icon}</span>
                    <div>
                      <h4 className="acc-name">{currentViewedCategory.title}</h4>
                      <p className="acc-summary">{currentViewedCategory.summary}</p>
                    </div>
                  </div>
                  {currentViewedCategory.id === assignedCategoryId ? (
                    <span className="acc-status-tag assigned">
                      ✓ Assigned to You Based on Your Score
                    </span>
                  ) : (
                    <span className="acc-status-tag view-only">
                      Previewing Other Track
                    </span>
                  )}
                </div>

                <div className="acc-target-box">
                  <strong>Target Academic Objective: </strong>
                  <span>{currentViewedCategory.targetOutcome}</span>
                </div>

                {/* Assigned Lessons Grid */}
                <div className="assigned-lessons-grid">
                  {currentViewedCategory.lessons.map((lesson, lIdx) => (
                    <div key={lesson.id} className="lesson-card">
                      <div className="lesson-card-top">
                        <span className="lesson-unit-badge">{lesson.unit}</span>
                        <span className="lesson-code-pill">{lesson.code}</span>
                        <span className="lesson-diff-pill">{lesson.difficulty}</span>
                      </div>

                      <h4 className="lesson-title">
                        {lIdx + 1}. {lesson.title}
                      </h4>

                      <p className="lesson-objectives">
                        {lesson.objectives}
                      </p>

                      <div className="lesson-meta-row">
                        <span className="l-meta">⏱️ {lesson.duration}</span>
                        <span className="l-meta">📝 {lesson.problems}</span>
                      </div>

                      <button
                        type="button"
                        className="btn-open-lesson"
                        onClick={() => setActiveLessonModal(lesson)}
                      >
                        <span>📖 Open Lesson Notes & Exercises</span>
                        <span className="l-arrow">➔</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Competency Breakdown across the 4 units */}
            <div className="competency-section">
              <h3 className="section-title">
                📊 Detailed Performance by Mathematical Domain
              </h3>
              <div className="competency-grid">
                {Object.entries(domainBreakdown).map(([code, item]) => {
                  const unitPct = Math.round((item.correct / item.total) * 100);
                  return (
                    <div key={code} className="competency-card">
                      <div className="comp-header">
                        <span className="comp-name">{item.name}</span>
                        <span className="comp-marks">
                          <strong>{item.correct}</strong> / {item.total} marks ({unitPct}%)
                        </span>
                      </div>
                      <div className="comp-bar">
                        <div
                          className={`comp-fill ${unitPct >= 80 ? "fill-high" : unitPct >= 60 ? "fill-med" : "fill-low"}`}
                          style={{ width: `${unitPct}%` }}
                        ></div>
                      </div>
                      <span className="comp-status">
                        {unitPct >= 80
                          ? "✓ Strong Foundation"
                          : unitPct >= 60
                          ? "⚡ Moderate Familiarity"
                          : "⚠️ High Priority for Revision"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="result-actions-toolbar">
              <button
                type="button"
                className="btn-print-report"
                onClick={() => window.print()}
              >
                🖨️ Print / Save Diagnostic Report
              </button>

              <button
                type="button"
                className="btn-proceed-home"
                style={{
                  background: "linear-gradient(135deg, #4f46e5, #4338ca)",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(79, 70, 229, 0.35)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => {
                  const studentPayload = {
                    ...(studentInfo || {}),
                    fullName: studentInfo?.fullName || "Enrolled Student",
                    email: studentInfo?.email || "student@institution.edu",
                    role: "student",
                    score,
                    maxScore: totalQuestions,
                    category: assignedCategoryId,
                    categoryLabel: assignedCategory.title,
                    categoryBadge: assignedCategory.badgeClass,
                    hasTakenAssessment: true,
                    domainScores: domainBreakdown,
                    scrollTo: "linear-algebra",
                  };
                  if (onNavigate) onNavigate("home", studentPayload);
                }}
              >
                <span>🏠 Go to Home Page</span>
                <span>➔</span>
              </button>

              <button
                type="button"
                className="btn-proceed-syllabus"
                style={{
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#ffffff",
                  border: "none",
                  padding: "12px 22px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  fontSize: "14px",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
                onClick={() => {
                  const studentPayload = {
                    ...(studentInfo || {}),
                    fullName: studentInfo?.fullName || "Enrolled Student",
                    email: studentInfo?.email || "student@institution.edu",
                    role: "student",
                    score,
                    maxScore: totalQuestions,
                    category: assignedCategoryId,
                    categoryLabel: assignedCategory.title,
                    categoryBadge: assignedCategory.badgeClass,
                    hasTakenAssessment: true,
                    domainScores: domainBreakdown,
                  };
                  if (onNavigate) onNavigate("syllabus", studentPayload);
                }}
              >
                <span>📖 Go to Unit-Wise Syllabus</span>
                <span>➔</span>
              </button>

              <button
                type="button"
                className="btn-proceed-login"
                onClick={() => {
                  const studentPayload = {
                    ...(studentInfo || {}),
                    role: "student",
                    score,
                    maxScore: totalQuestions,
                    category: assignedCategoryId,
                    categoryLabel: assignedCategory.title,
                    categoryBadge: assignedCategory.badgeClass,
                    hasTakenAssessment: true,
                    domainScores: domainBreakdown,
                  };
                  if (onNavigate) onNavigate("login", studentPayload);
                }}
              >
                Proceed to Student Portal Login →
              </button>
            </div>

            {/* ========================================================= */}
            {/* DETAILED ANSWER KEY & EXPLANATIONS FOR ALL QUESTIONS      */}
            {/* ALWAYS VISIBLE DIRECTLY AFTER SUBMITTING                  */}
            {/* ========================================================= */}
            <div className="solutions-review-section">
              <div className="solutions-header-cluster">
                <div>
                  <h3 className="review-title">
                    📝 Detailed Answers & Mathematical Explanations (Questions 1 - {totalQuestions})
                  </h3>
                  <p className="review-subtitle">
                    Examine each question below. If an answer was <strong>FALSE</strong>, review the exact mathematical reason and why your choice was incorrect.
                  </p>
                </div>

                {/* Filter Tabs */}
                <div className="solution-filter-tabs" role="tablist">
                  <button
                    type="button"
                    className={`filter-tab-btn ${solutionFilter === "all" ? "active" : ""}`}
                    onClick={() => setSolutionFilter("all")}
                  >
                    All Questions ({totalQuestions})
                  </button>
                  <button
                    type="button"
                    className={`filter-tab-btn tab-false ${solutionFilter === "false" ? "active" : ""}`}
                    onClick={() => setSolutionFilter("false")}
                  >
                    ❌ False / Incorrect Only ({incorrectCount})
                  </button>
                  <button
                    type="button"
                    className={`filter-tab-btn tab-correct ${solutionFilter === "correct" ? "active" : ""}`}
                    onClick={() => setSolutionFilter("correct")}
                  >
                    ✅ Correct Only ({score})
                  </button>
                </div>
              </div>

              {/* Question list */}
              <div className="solutions-list">
                {filteredSolutions.map((q) => {
                  const studentAns = selectedAnswers[q.id];
                  const isCorrect = studentAns === q.correctAnswer;
                  const isSkipped = !studentAns;
                  const questionIndex = ASSESSMENT_QUESTIONS.findIndex((item) => item.id === q.id);

                  return (
                    <div
                      key={q.id}
                      className={`solution-card ${isCorrect ? "sol-correct" : isSkipped ? "sol-skipped" : "sol-wrong"}`}
                    >
                      {/* Top Bar */}
                      <div className="sol-card-top">
                        <span className="sol-qnum">
                          Question {questionIndex + 1} • {q.domain} • 1 Mark
                        </span>
                        <span className={`sol-status-pill ${isCorrect ? "pill-correct" : isSkipped ? "pill-skipped" : "pill-wrong"}`}>
                          {isCorrect ? "✅ TRUE / Correct (+1 Mark)" : isSkipped ? "○ FALSE: Skipped / Unanswered (0 Marks)" : "❌ FALSE: Incorrect (0 Marks)"}
                        </span>
                      </div>

                      {/* Question Text */}
                      <p className="sol-qtext">{q.question}</p>

                      {/* Options Grid */}
                      <div className="sol-options-grid">
                        {q.options.map((opt) => {
                          const isSelected = studentAns === opt.id;
                          const isTheCorrectOne = q.correctAnswer === opt.id;

                          let optClass = "sol-option";
                          if (isTheCorrectOne) optClass += " opt-correct";
                          if (isSelected && !isTheCorrectOne) optClass += " opt-wrong-selected";

                          return (
                            <div key={opt.id} className={optClass}>
                              <span className="opt-key">{opt.id}</span>
                              <span className="opt-body">{opt.text}</span>
                              {isTheCorrectOne && (
                                <span className="opt-tag tag-correct">
                                  ✓ Correct Answer
                                </span>
                              )}
                              {isSelected && !isTheCorrectOne && (
                                <span className="opt-tag tag-wrong">
                                  ✗ Your Choice (FALSE)
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* FALSE REASON CALLOUT IF INCORRECT */}
                      {!isCorrect && (
                        <div className="false-reason-callout">
                          <div className="false-reason-header">
                            <span className="false-badge-icon">❌</span>
                            <span className="false-badge-title">
                              {isSkipped
                                ? "Why this was marked FALSE (Skipped with No Answer):"
                                : `Why Your Selection (${studentAns}) is FALSE:`}
                            </span>
                          </div>
                          
                          <p className="false-reason-text">
                            {isSkipped
                              ? "You did not select an option for this question. The correct choice is Option " + q.correctAnswer + "."
                              : (q.whyFalse && q.whyFalse[studentAns])
                              ? q.whyFalse[studentAns]
                              : `Option ${studentAns} is mathematically incorrect. Option ${q.correctAnswer} is the only valid answer.`}
                          </p>
                        </div>
                      )}

                      {/* DETAILED MATHEMATICAL PROOF & REASON */}
                      <div className="sol-explanation-box">
                        <div className="explanation-title-row">
                          <span className="exp-icon">💡</span>
                          <strong>Mathematical Principle & Reason for Correct Answer ({q.correctAnswer}):</strong>
                        </div>
                        <p className="exp-body-text">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })}

                {filteredSolutions.length === 0 && (
                  <div className="empty-solutions-notice">
                    <p>No questions match the selected filter.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      ) : (
        /* ========================================================= */
        /* VIEW B: ACTIVE ASSESSMENT TEST WORKSPACE                  */
        /* ========================================================= */
        <main className="assessment-workspace">
          {/* Main Question Card Area */}
          <section className="question-workspace-area">
            <div className="q-meta-strip">
              <div className="q-domain-tag">
                <span className="domain-label">Section:</span>
                <span className="domain-val">{currentQ.domain}</span>
              </div>
              <div className="q-marks-tag">
                <span>1 Mark</span>
              </div>
            </div>

            <div className="question-card">
              <div className="q-card-header">
                <span className="q-index-pill">Question {currentQIndex + 1} of {totalQuestions}</span>
                <button
                  type="button"
                  className={`flag-btn ${flaggedQuestions[currentQ.id] ? "flagged" : ""}`}
                  onClick={handleToggleFlag}
                  title="Mark for review"
                >
                  {flaggedQuestions[currentQ.id] ? "🚩 Marked for Review" : "🏳️ Mark for Review"}
                </button>
              </div>

              <h2 className="q-title-text">{currentQ.question}</h2>

              {/* Options List */}
              <div className="q-options-container" role="radiogroup">
                {currentQ.options.map((option) => {
                  const isSelected = selectedAnswers[currentQ.id] === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`q-option-row ${isSelected ? "selected" : ""}`}
                      onClick={() => handleSelectOption(option.id)}
                    >
                      <span className="q-opt-marker">{option.id}</span>
                      <span className="q-opt-text">{option.text}</span>
                      <span className="q-opt-radio">
                        <input
                          type="radio"
                          name={`q-${currentQ.id}`}
                          checked={isSelected}
                          onChange={() => handleSelectOption(option.id)}
                        />
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Bottom Question Controls */}
              <div className="q-card-footer">
                <div className="footer-left">
                  {selectedAnswers[currentQ.id] && (
                    <button
                      type="button"
                      className="clear-selection-btn"
                      onClick={handleClearAnswer}
                    >
                      Clear Selection
                    </button>
                  )}
                </div>

                <div className="footer-nav-btns">
                  <button
                    type="button"
                    className="nav-arrow-btn"
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                  >
                    ← Previous
                  </button>

                  {currentQIndex < totalQuestions - 1 ? (
                    <button
                      type="button"
                      className="nav-arrow-btn primary"
                      onClick={() => setCurrentQIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                    >
                      Next Question →
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="nav-submit-prompt-btn"
                      onClick={() => setShowSubmitModal(true)}
                    >
                      Submit Assessment ➔
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar Question Palette */}
          <aside className="question-palette-sidebar">
            <div className="palette-card">
              <h3 className="palette-title">Question Palette ({totalQuestions} Qs)</h3>

              {/* Legend */}
              <div className="palette-legend">
                <div className="legend-item">
                  <span className="legend-dot dot-answered"></span>
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot dot-flagged"></span>
                  <span>Flagged ({flaggedCount})</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot dot-unanswered"></span>
                  <span>Unanswered ({unansweredCount})</span>
                </div>
              </div>

              {/* Numbers Grid (1 - 20) */}
              <div className="numbers-grid" role="navigation" aria-label="Question Navigation">
                {ASSESSMENT_QUESTIONS.map((q, idx) => {
                  const isCurrent = currentQIndex === idx;
                  const isAns = !!selectedAnswers[q.id];
                  const isFlag = !!flaggedQuestions[q.id];

                  let btnClass = "q-num-btn";
                  if (isAns) btnClass += " answered";
                  if (isFlag) btnClass += " flagged";
                  if (isCurrent) btnClass += " current";

                  return (
                    <button
                      key={q.id}
                      type="button"
                      className={btnClass}
                      onClick={() => setCurrentQIndex(idx)}
                      title={`Go to Question ${idx + 1}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Quick Summary */}
              <div className="palette-progress-summary">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {answeredCount} of {totalQuestions} answered ({Math.round((answeredCount / totalQuestions) * 100)}%)
                </span>
              </div>

              <div className="sidebar-submit-container">
                <button
                  type="button"
                  className="sidebar-submit-btn"
                  onClick={() => setShowSubmitModal(true)}
                >
                  Submit & View Explanations
                </button>
              </div>
            </div>
          </aside>
        </main>
      )}

      {/* Confirmation Submission Modal */}
      {showSubmitModal && (
        <div
          className="assessment-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowSubmitModal(false);
          }}
        >
          <div className="assessment-confirm-modal">
            <div className="modal-icon-badge">📝</div>
            <h3>Ready to Submit Assessment?</h3>
            <p>
              You have answered <strong>{answeredCount}</strong> out of <strong>{totalQuestions}</strong> questions.
            </p>

            {unansweredCount > 0 && (
              <div className="modal-warning-box">
                ⚠️ You have <strong>{unansweredCount}</strong> unanswered questions. Each correct question awards 1 mark (Total: {totalQuestions} marks).
              </div>
            )}

            <p style={{ fontSize: "13px", color: "#4338ca", fontWeight: "600", marginBottom: "20px" }}>
              💡 Upon submission, you will be grouped into 1 of 3 academic tracks and assigned customized lessons based on your marks.
            </p>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn-cancel"
                onClick={() => setShowSubmitModal(false)}
              >
                Review Answers
              </button>
              <button
                type="button"
                className="modal-btn-confirm"
                onClick={handleFinalSubmit}
              >
                Yes, Submit Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* INTERACTIVE LESSON READER MODAL                           */}
      {/* ========================================================= */}
      {activeLessonModal && (
        <div
          className="assessment-modal-backdrop"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveLessonModal(null);
          }}
        >
          <div className="lesson-study-reader-modal">
            <div className="reader-header">
              <div>
                <span className="reader-unit-pill">{activeLessonModal.unit} • {activeLessonModal.code}</span>
                <h3 className="reader-title">{activeLessonModal.title}</h3>
                <span className="reader-meta">⏱️ {activeLessonModal.duration} • 📝 {activeLessonModal.problems} • {activeLessonModal.difficulty}</span>
              </div>
              <button
                type="button"
                className="reader-close-btn"
                onClick={() => setActiveLessonModal(null)}
                aria-label="Close lesson reader"
              >
                ✕
              </button>
            </div>

            <div className="reader-body">
              <div className="reader-block">
                <h4 className="reader-sec-title">🎯 Core Learning Objectives</h4>
                <p>{activeLessonModal.objectives}</p>
              </div>

              <div className="reader-block">
                <h4 className="reader-sec-title">📖 Comprehensive Study Notes & Principles</h4>
                <p className="reader-notes-text">{activeLessonModal.notes}</p>
              </div>

              <div className="reader-block practice-highlight">
                <h4 className="reader-sec-title">✏️ Recommended University Practice Drill</h4>
                <p className="reader-practice-text">{activeLessonModal.practiceProblem}</p>
              </div>
            </div>

            <div className="reader-footer">
              <button
                type="button"
                className="btn-mark-ready"
                style={{ background: "linear-gradient(135deg, #4f46e5, #4338ca)", color: "#ffffff", border: "none" }}
                onClick={() => {
                  setActiveLessonModal(null);
                  if (onNavigate) {
                    onNavigate("lesson", {
                      code: activeLessonModal.code,
                      name: activeLessonModal.title,
                      unitNumber: activeLessonModal.unit ? activeLessonModal.unit.split(":")[0] : "UNIT",
                      unitTitle: activeLessonModal.unit || "Linear Algebra",
                      desc: activeLessonModal.notes,
                      student: { ...(studentInfo || {}), role: "student" },
                    });
                  }
                }}
              >
                ▶️ Open Interactive Video & Notes
              </button>
              <button
                type="button"
                className="btn-mark-ready"
                onClick={() => {
                  alert(`Lesson "${activeLessonModal.title}" recorded as In-Progress in your EduVerse LMS Profile.`);
                  setActiveLessonModal(null);
                }}
              >
                ✓ Mark as Read
              </button>
              <button
                type="button"
                className="btn-close-reader"
                onClick={() => setActiveLessonModal(null)}
              >
                Close Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assessment;
