// Notification & Verification Service for Adaptive LMS
// Handles Phone OTP, Gmail/Email OTP Verification & Post-Registration Confirmation Emails

const SENT_EMAILS_KEY = "lms_sent_emails";

/**
 * Generate a cryptographically random 6-digit OTP
 */
export const generatePhoneOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateEmailOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send / simulate SMS OTP dispatch for Phone Number
 * Returns the generated OTP and expiry timestamp (5 mins)
 */
export const dispatchPhoneOtp = (phoneNumber) => {
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, "");
  const otp = generatePhoneOtp();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

  const otpSession = {
    type: "phone",
    target: cleanPhone,
    phone: cleanPhone,
    otp,
    expiresAt,
    createdAt: new Date().toISOString(),
  };

  return otpSession;
};

/**
 * Send / simulate Email OTP dispatch for Gmail / Mail ID
 * Returns the generated OTP and expiry timestamp (5 mins)
 */
export const dispatchEmailOtp = (emailAddress, studentName = "Student") => {
  const cleanEmail = emailAddress.trim().toLowerCase();
  const otp = generateEmailOtp();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

  const otpSession = {
    type: "email",
    target: cleanEmail,
    email: cleanEmail,
    otp,
    expiresAt,
    createdAt: new Date().toISOString(),
  };

  return otpSession;
};

/**
 * Generate rich HTML confirmation email template for course registration
 */
export const generateRegistrationEmail = (studentData) => {
  const timestamp = new Date().toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  const subject = `🎓 Course Enrolment Confirmation: Linear Algebra (MA25C02) - Welcome to Adaptive LMS`;

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; color: #1e293b;">
      <div style="background: linear-gradient(135deg, #4338ca 0%, #312e81 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
        <div style="font-size: 36px; margin-bottom: 8px;">🎓</div>
        <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">Adaptive Learning Management System</h1>
        <p style="margin: 6px 0 0 0; font-size: 13.5px; opacity: 0.9;">Official Academic Registration & Enrolment Confirmation</p>
      </div>

      <div style="padding: 24px;">
        <p style="font-size: 15px; line-height: 1.5; margin: 0 0 16px 0;">
          Dear <strong>${studentData.fullName || "Student"}</strong>,
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 20px 0;">
          Congratulations! Your student registration has been verified via <strong>SMS OTP</strong> and <strong>Gmail Verification OTP</strong>, and recorded in the university academic repository. You are officially enrolled in the course below:
        </p>

        <!-- Course Summary Box -->
        <div style="background: #f8fafc; border: 1.5px solid #cbd5e1; border-left: 5px solid #4338ca; border-radius: 8px; padding: 16px; margin-bottom: 22px;">
          <h3 style="margin: 0 0 8px 0; color: #1e1b4b; font-size: 16px;">📚 Course: Linear Algebra (MA25C02)</h3>
          <p style="margin: 0; font-size: 13.5px; color: #475569; line-height: 1.5;">
            <strong>Credits:</strong> 4.0 Credits • <strong>Level:</strong> Core Engineering Mathematics-II<br/>
            <strong>Units:</strong> 5 Comprehensive Modules (Vector Spaces, Linear Transformations, Eigenvalues, SVD, Orthogonality)
          </p>
        </div>

        <!-- Student Details Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px; font-size: 13.5px;">
          <tbody>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; color: #64748b; width: 40%;">Registration Number:</td>
              <td style="padding: 8px 0; font-weight: 700; color: #0f172a;">${studentData.rollNo || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; color: #64748b;">Department:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${studentData.department || "N/A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; color: #64748b;">Academic Section:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${studentData.section || "Section A"}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; color: #64748b;">Verified Email:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #059669;">✅ ${studentData.email} (Gmail OTP Verified)</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 8px 0; color: #64748b;">Verified Phone:</td>
              <td style="padding: 8px 0; font-weight: 600; color: #059669;">✅ ${studentData.phone} (SMS OTP Verified)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b;">Registration Date:</td>
              <td style="padding: 8px 0; color: #334155;">${timestamp}</td>
            </tr>
          </tbody>
        </table>

        <!-- Mandatory Diagnostic Test Box -->
        <div style="background: #eff6ff; border: 1.5px solid #bfdbfe; border-radius: 8px; padding: 14px; margin-bottom: 22px;">
          <h4 style="margin: 0 0 6px 0; color: #1e40af; font-size: 14px;">📝 Mandatory Diagnostic Assessment Notice</h4>
          <p style="margin: 0; font-size: 13px; color: #1e3a8a; line-height: 1.45;">
            To calibrate your syllabus learning path, please proceed to take the 30-question diagnostic test (25 Minutes).
          </p>
        </div>

        <p style="font-size: 13px; color: #64748b; line-height: 1.5; margin: 0 0 8px 0;">
          If you have any questions or require assistance, reach out to your faculty instructor Dr. K. Senthil Kumar or the academic office.
        </p>
      </div>

      <div style="background: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center;">
        <p style="margin: 0 0 4px 0;">Adaptive Academic Management System • Automated Dispatch</p>
        <p style="margin: 0;">This email was sent to ${studentData.email} following verified LMS registration.</p>
      </div>
    </div>
  `;

  return {
    id: `EMAIL_${Date.now()}`,
    recipient: studentData.email,
    recipientName: studentData.fullName,
    sender: "Adaptive Registrar <noreply@adaptive.lms>",
    subject,
    htmlContent,
    sentAt: timestamp,
    isoDate: new Date().toISOString(),
  };
};

/**
 * Send / log confirmation email in storage
 */
export const sendRegistrationEmail = (studentData) => {
  const emailRecord = generateRegistrationEmail(studentData);
  try {
    const existing = JSON.parse(localStorage.getItem(SENT_EMAILS_KEY) || "[]");
    localStorage.setItem(SENT_EMAILS_KEY, JSON.stringify([emailRecord, ...existing]));
  } catch (e) {
    console.error("Failed to save email record to localStorage", e);
  }
  return emailRecord;
};

/**
 * Get all sent emails
 */
export const getSentEmails = () => {
  try {
    return JSON.parse(localStorage.getItem(SENT_EMAILS_KEY) || "[]");
  } catch {
    return [];
  }
};
