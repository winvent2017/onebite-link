"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Toast } from "./toast";

function toKoreanErrorMessage(message: string) {
  if (message.includes("Invalid login credentials")) {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }
  if (message.includes("Email not confirmed")) {
    return "이메일 인증이 완료되지 않았습니다.";
  }
  if (message.includes("rate limit")) {
    return "잠시 후 다시 시도해 주세요.";
  }
  return "로그인에 실패했습니다. 다시 시도해 주세요.";
}

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const isFormValid = email.trim() !== "" && password !== "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setToastMessage(toKoreanErrorMessage(error.message));
      setIsSubmitting(false);
      return;
    }

    router.push("/");
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl bg-[var(--card)] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      >
        <div className="mb-2 flex items-center justify-center gap-1.5">
          <span className="text-2xl">🔖</span>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text)]">
            한입<span className="text-[var(--accent)]">링크</span>
          </h1>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
            이메일
          </label>
          <input
            id="email"
            type="email"
            required
            disabled={isSubmitting}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="example@email.com"
            className="rounded-xl bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--placeholder)] focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)] disabled:opacity-60"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-[var(--text)]">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            required
            disabled={isSubmitting}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="비밀번호를 입력하세요"
            className="rounded-xl bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--placeholder)] focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)] disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`mt-2 rounded-xl px-4 py-3 text-sm font-bold transition active:scale-[0.98] ${
            isFormValid && !isSubmitting
              ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
              : "cursor-not-allowed bg-[var(--disabled-bg)] text-[var(--disabled-text)] active:scale-100"
          }`}
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>

        <p className="text-center text-sm text-[var(--text-sub)]">
          아직 계정이 없으신가요?{" "}
          <Link href="/signup" className="font-semibold text-[var(--accent)] hover:underline">
            회원가입
          </Link>
        </p>
      </form>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </>
  );
}
