"use client";

import Link from "next/link";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm">
          <span className="text-2xl">!</span>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">Error</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">오류가 발생했습니다</h1>
          <p className="mt-3 text-sm text-slate-600">{error.message || "서버에서 오류가 발생했습니다."}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            className="cursor-pointer rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium shadow-sm transition hover:-translate-y-0.5"
            onClick={() => reset()}
          >
            다시 시도하기
          </button>
          <Link className="text-sm text-slate-500 underline-offset-4 hover:underline" href="/">
            홈으로 이동
          </Link>
        </div>
      </div>
    </main>
  );
}
