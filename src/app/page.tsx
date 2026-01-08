"use client";

import { useGetCustomers } from "@/hooks/useGetCustomers";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { parseISO, format } from "date-fns";

export default function Home() {
  const { customersData, isLoading, error } = useGetCustomers();
  const router = useRouter();

  return (
    <main>
      <Table>
        <TableCaption>각 행을 클릭하여 고객의 상세정보를 확인할 수 있습니다.</TableCaption>
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
            <TableRow key={customer_id} className="cursor-pointer" onClick={() => router.push(`/${customer_id}`)}>
              <TableCell>{customer_id}</TableCell>
              <TableCell>{name}</TableCell>
              <TableCell>{email}</TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell>{company}</TableCell>
              <TableCell>{format(parseISO(created_at), "yyyy-MM-dd HH:mm")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
