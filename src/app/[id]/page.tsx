"use client";

import { use } from "react";
import { useGetCustomerDetail } from "@/hooks/useGetCustomerDetail";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { handleApiError } from "@/lib/handleApiError";
import InfoCard from "@/components/InfoCard";
import { Spinner } from "@/components/ui/spinner";

type Props = { params: Promise<{ id: string }> };

export default function Page(props: Props) {
  const router = useRouter();
  const params = use(props.params);
  const id = params.id;

  const { customerDetailData, isLoading, error } = useGetCustomerDetail(id);
  const data = customerDetailData?.data;
  const details = data?.details;
  const company = data?.company ?? "-";
  const createdAt = data?.created_at ? format(parseISO(data.created_at), "yyyy년 MM월 dd일 HH시 mm분") : "-";
  const customerId = data?.customer_id ?? "-";
  const name = data?.name ?? "-";
  const email = data?.email ?? "-";
  const phone = data?.phone ?? "-";
  const industry = details?.industry ?? "-";
  const employeeCount = details?.employee_count ? details.employee_count.toLocaleString() + "명" : "-";
  const annualRevenue = details?.annual_revenue ? "₩" + Number(details.annual_revenue).toLocaleString() + "원" : "-";
  const address = details?.address ?? "-";
  const lastContactDate = details?.last_contact_date
    ? format(parseISO(details.last_contact_date), "yyyy년 MM월 dd일 HH시 mm분")
    : "-";
  const notes = details?.notes ?? "-";

  if (error) handleApiError(error);

  return (
    <main className="min-h-screen px-4 py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <InfoCard
            title="기본 정보"
            contents={[
              { key: "이름", value: name },
              { key: "ID", value: customerId },
              { key: "이메일", value: email },
              { key: "연락처", value: phone },
              { key: "가입일", value: createdAt },
            ]}
            isLoading={isLoading}
          />
          <InfoCard
            title="회사 정보"
            contents={[
              { key: "회사명", value: company },
              { key: "주소", value: address },
              { key: "산업군", value: industry },
              { key: "직원 수", value: employeeCount },
              { key: "연매출", value: annualRevenue },
            ]}
            isLoading={isLoading}
          />
        </div>
        <InfoCard
          title="비고"
          contents={[
            { key: "최근 연락일", value: lastContactDate },
            { key: "메모", value: notes },
          ]}
          isLoading={isLoading}
        />

        <div className="flex justify-end">
          <Button
            className="cursor-pointer min-w-20"
            disabled={isLoading}
            onClick={() => router.push(`/${id}/ai-analysis`, { scroll: false })}
          >
            {isLoading ? <Spinner /> : "AI 분석"}
          </Button>
        </div>
      </div>
    </main>
  );
}
