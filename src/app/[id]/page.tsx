"use client";

import { use } from "react";
import { useGetCustomerDetail } from "@/hooks/useGetCustomerDetail";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { handleApiError } from "@/lib/handleApiError";

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

  // todo: isLoading 에 관련하여 "-" 유지할 것인지에 대한 고민
  // todo: 아래 디자인 리팩토링 -> 중복 컴포넌트화
  if (error) handleApiError(error);

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="rounded-2xl border p-6 shadow-sm">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium">회사</p>
              <h1 className="text-2xl font-semibold tracking-tight">{company}</h1>
              <p className="mt-1 text-sm">고객 ID: {customerId}</p>
            </div>
            <div className="rounded-xl px-4 py-2 text-sm bg-gray-100 dark:bg-zinc-900">{createdAt}</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-6 shadow-sm">
            <h2 className="text-base font-semibold">기본 정보</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between border-b pb-2">
                <span>이름</span>
                <span className="font-medium">{name}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>이메일</span>
                <span className="font-medium">{email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>연락처</span>
                <span className="font-medium">{phone}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-6 shadow-sm">
            <h2 className="text-base font-semibold">회사 상세</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between border-b pb-2">
                <span>산업군</span>
                <span className="font-medium">{industry}</span>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span>직원 수</span>
                <span className="font-medium">{employeeCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>연매출</span>
                <span className="font-medium">{annualRevenue}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border p-6 shadow-sm">
          <h2 className="text-base font-semibold">연락 및 비고</h2>
          <div className="mt-4 grid gap-4 text-sm md:grid-cols-2">
            <div className="rounded-xl p-4 border">
              <p>주소</p>
              <p className="mt-1 font-medium">{address}</p>
            </div>
            <div className="rounded-xl p-4 border">
              <p>최근 연락일</p>
              <p className="mt-1 font-medium">{lastContactDate}</p>
            </div>
          </div>
          <div className="mt-4 rounded-xl border p-4 text-sm">
            <p>메모</p>
            <p className="mt-1 whitespace-pre-wrap font-medium">{notes}</p>
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
