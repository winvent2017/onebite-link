"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
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
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="example@email.com"
          className="rounded-xl bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--placeholder)] focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)]"
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
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="비밀번호를 입력하세요"
          className="rounded-xl bg-[var(--background)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--placeholder)] focus:bg-[var(--card)] focus:shadow-[0_0_0_2px_var(--accent)]"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-bold text-white transition hover:bg-[var(--accent-hover)] active:scale-[0.98]"
      >
        로그인
      </button>

      <p className="text-center text-sm text-[var(--text-sub)]">
        아직 계정이 없으신가요?{" "}
        <Link href="/signup" className="font-semibold text-[var(--accent)] hover:underline">
          회원가입
        </Link>
      </p>
    </form>
  );
}
