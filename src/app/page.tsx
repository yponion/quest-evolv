"use client";

import { useGetCustomers } from "@/hooks/useGetCustomers";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { parseISO, format } from "date-fns";
import Loading from "@/components/Loading";
import { handleApiError } from "@/lib/handleApiError";

export default function Home() {
  const { customersData, isLoading, error } = useGetCustomers();
  const router = useRouter();

  if (error) handleApiError(error);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium tracking-wide">CUSTOMERS</p>
            <h1 className="text-3xl font-semibold tracking-tight">고객 목록</h1>
            <p className="text-sm">각 행을 클릭하여 고객의 상세정보를 확인할 수 있습니다.</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <div className="rounded-full border px-4 py-2">총 {customersData?.count ?? 0}명</div>
          </div>
        </header>

        <section className="rounded-2xl border shadow-sm">
          <div className="overflow-x-auto">
            {isLoading ? (
              <Loading size="big" className="h-[409.5px]" />
            ) : (
              <Table>
                <TableCaption className="sr-only">고객 목록 테이블</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>아이디</TableHead>
                    <TableHead>이름</TableHead>
                    <TableHead>이메일</TableHead>
                    <TableHead>연락처</TableHead>
                    <TableHead>회사명</TableHead>
                    <TableCell>가입일</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customersData?.data.map(({ customer_id, name, email, phone, company, created_at }) => (
                    <TableRow
                      key={customer_id}
                      className="cursor-pointer transition-transform hover:-translate-y-0.5"
                      onClick={() => router.push(`/${customer_id}`)}
                    >
                      <TableCell className="font-medium">{customer_id}</TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{phone}</TableCell>
                      <TableCell>{company}</TableCell>
                      <TableCell>{format(parseISO(created_at), "yyyy-MM-dd HH:mm")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
