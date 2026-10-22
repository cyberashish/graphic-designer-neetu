"use server"

export type EmailCaptureState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function captureEmail(
  _prev: EmailCaptureState,
  formData: FormData
): Promise<EmailCaptureState> {
  const email = String(formData.get("email") ?? "").trim()
  const source = String(formData.get("source") ?? "unknown")

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "That email doesn't look quite right." }
  }

  // TODO: deliver the lead, e.g. via Resend, a CRM webhook or a newsletter API.
  console.info(`[email-capture] ${source}: ${email}`)

  return {
    status: "success",
    message: source === "newsletter" ? "You're on the list!" : "Thanks! I'll be in touch within 24 hours.",
  }
}
