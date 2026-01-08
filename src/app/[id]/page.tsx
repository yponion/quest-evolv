"use client";

import { use } from "react";
import { useGetCustomerDetail } from "@/hooks/useGetCustomerDetail";
import { isAxiosError } from "axios";
import { notFound, useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";

type Props = { params: Promise<{ id: string }> };

export default function Page(props: Props) {
  const router = useRouter();
  const params = use(props.params);
  const id = params.id;

  const { customerDetailData, isLoading, error } = useGetCustomerDetail(id);
  const data = customerDetailData?.data;
  const details = data?.details;
  const company = data?.company ?? "-";
  const createdAt = data?.created_at ? format(parseISO(data.created_at), "yyyy-MM-dd HH:mm") : "-";
  const customerId = data?.customer_id ?? "-";
  const name = data?.name ?? "-";
  const email = data?.email ?? "-";
  const phone = data?.phone ?? "-";
  const industry = details?.industry ?? "-";
  const employeeCount = details?.employee_count ? details.employee_count.toLocaleString() + "명" : "-";
  const annualRevenue = details?.annual_revenue ? "₩" + Number(details.annual_revenue).toLocaleString() + "원" : "-";
  const address = details?.address ?? "-";
  const lastContactDate = details?.last_contact_date
    ? format(parseISO(details.last_contact_date), "yyyy-MM-dd HH:mm")
    : "-";
  const notes = details?.notes ?? "-";

  // todo: isLoading

  if (error) {
    if (isAxiosError(error)) {
      const status = error.response?.status;
      if (status === 404) {
        notFound();
      }
      if (status && status >= 500) {
        throw new Error("Server error");
      }
    }

    throw error;
  }
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">회사</p>
              <h1 className="text-2xl font-semibold tracking-tight">{company}</h1>
              <p className="mt-1 text-sm text-slate-500">고객 ID: {customerId}</p>
            </div>
            <div className="rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600">{createdAt}</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-700">기본 정보</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">이름</span>
                <span className="font-medium">{name}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">이메일</span>
                <span className="font-medium">{email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">연락처</span>
                <span className="font-medium">{phone}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-base font-semibold text-slate-700">회사 상세</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">산업군</span>
                <span className="font-medium">{industry}</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">직원 수</span>
                <span className="font-medium">{employeeCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">연매출</span>
                <span className="font-medium">{annualRevenue}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-semibold text-slate-700">연락 및 비고</h2>
          <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-slate-500">주소</p>
              <p className="mt-1 font-medium">{address}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-slate-500">최근 연락일</p>
              <p className="mt-1 font-medium">{lastContactDate}</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm">
            <p className="text-slate-500">메모</p>
            <p className="mt-1 whitespace-pre-wrap font-medium text-slate-700">{notes}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button className="cursor-pointer" onClick={() => router.push(`/${id}/ai-analysis`, { scroll: false })}>
            AI 분석
          </Button>
        </div>
      </div>
    </main>
  );
}
