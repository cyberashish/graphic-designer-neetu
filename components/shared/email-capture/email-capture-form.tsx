"use client"

import { Check, Loader2, Mail, Send } from "lucide-react"
import { AnimatePresence, useAnimate } from "motion/react"
import * as m from "motion/react-m"
import { useActionState, useEffect, useId, useState } from "react"

import { cn } from "@/lib/utils"

import { captureEmail, type EmailCaptureState } from "./actions"

type EmailCaptureFormProps = {
  source: "contact" | "newsletter"
  cta: string
  placeholder?: string
  /** `light` for white sections, `dark` for ink panels. */
  tone?: "light" | "dark"
  size?: "md" | "lg"
  className?: string
}

const initialState: EmailCaptureState = { status: "idle" }

const swap = {
  initial: { opacity: 0, y: 10, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -10, filter: "blur(4px)" },
  transition: { duration: 0.25 },
}

export function EmailCaptureForm({
  source,
  cta,
  placeholder = "Enter email address",
  tone = "light",
  size = "lg",
  className,
}: EmailCaptureFormProps) {
  const [state, formAction, pending] = useActionState(captureEmail, initialState)
  const inputId = useId()
  const messageId = useId()
  const status = pending ? "pending" : state.status
  // Controlled so React does not clear a mistyped address after the action runs.
  const [email, setEmail] = useState("")
  const [fieldRef, animate] = useAnimate<HTMLDivElement>()

  useEffect(() => {
    // Shake on validation error so the feedback is felt, not just read.
    if (state.status === "error") animate(fieldRef.current, { x: [0, -8, 8, -5, 5, 0] }, { duration: 0.4 })
  }, [state, animate, fieldRef])

  return (
    <form action={formAction} noValidate className={cn("w-full", className)}>
      <input type="hidden" name="source" value={source} />
      <div
        ref={fieldRef}
        className={cn(
          "flex items-center gap-2 rounded-full border p-1.5 transition-[border-color,box-shadow] duration-300 focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15",
          tone === "light" ? "border-border bg-white shadow-sm" : "border-white/15 bg-white/5",
          state.status === "error" && "border-destructive"
        )}
      >
        <Mail
          aria-hidden
          className={cn("ml-3 size-5 shrink-0", tone === "light" ? "text-primary" : "text-white/50")}
        />
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          value={state.status === "success" ? "" : email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={placeholder}
          aria-invalid={state.status === "error"}
          aria-describedby={messageId}
          disabled={state.status === "success"}
          className={cn(
            "min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
            size === "lg" ? "h-11 text-base" : "h-9 text-sm",
            tone === "dark" && "text-white placeholder:text-white/40"
          )}
        />
        <button
          type="submit"
          disabled={pending || state.status === "success"}
          className={cn(
            "relative inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full bg-primary font-semibold text-white transition-[background-color,scale] duration-300 hover:bg-ink active:scale-95 disabled:cursor-default",
            state.status === "success" && "bg-emerald-500 hover:bg-emerald-500",
            size === "lg" ? "h-11 min-w-28 px-6" : "h-9 min-w-10 px-3"
          )}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span key={status} {...swap} className="inline-flex items-center gap-2">
              {status === "pending" ? (
                <Loader2 className="size-4 animate-spin" aria-label="Sending" />
              ) : status === "success" ? (
                <Check className="size-4" aria-label="Sent" />
              ) : size === "lg" ? (
                cta
              ) : (
                <Send className="size-4" aria-label={cta} />
              )}
            </m.span>
          </AnimatePresence>
        </button>
      </div>
      <p
        id={messageId}
        aria-live="polite"
        className={cn(
          "mt-2 min-h-5 px-4 text-sm",
          state.status === "error" ? "text-destructive" : tone === "dark" ? "text-white/70" : "text-muted-foreground"
        )}
      >
        {state.status === "idle" ? "" : state.message}
      </p>
    </form>
  )
}
