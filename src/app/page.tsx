"use client";

import { useCustomers } from "@/apis/customers/query";

const data = [
  {
    customer_id: "C001",
    name: "김철수",
    email: "chulsoo.kim@example.com",
    phone: "010-1234-5678",
    company: "테크노벨",
    created_at: "2025-01-15T09:30:00Z",
  },
  {
    customer_id: "C002",
    name: "이영희",
    email: "younghee.lee@example.com",
    phone: "010-2345-6789",
    company: "이노베이션랩",
    created_at: "2025-02-20T14:20:00Z",
  },
  {
    customer_id: "C003",
    name: "박민준",
    email: "minjun.park@example.com",
    phone: "010-3456-7890",
    company: "스마트솔루션",
    created_at: "2025-03-10T11:15:00Z",
  },
  {
    customer_id: "C004",
    name: "정수진",
    email: "sujin.jung@example.com",
    phone: "010-4567-8901",
    company: "디지털플러스",
    created_at: "2025-04-05T16:45:00Z",
  },
  {
    customer_id: "C005",
    name: "최동욱",
    email: "dongwook.choi@example.com",
    phone: "010-5678-9012",
    company: "퓨처테크",
    created_at: "2025-05-18T10:00:00Z",
  },
  {
    customer_id: "C006",
    name: "강서연",
    email: "seoyeon.kang@example.com",
    phone: "010-6789-0123",
    company: "글로벌인사이트",
    created_at: "2025-06-22T13:30:00Z",
  },
  {
    customer_id: "C007",
    name: "윤재현",
    email: "jaehyun.yoon@example.com",
    phone: "010-7890-1234",
    company: "비즈니스허브",
    created_at: "2025-07-30T09:00:00Z",
  },
  {
    customer_id: "C008",
    name: "임하은",
    email: "haeun.lim@example.com",
    phone: "010-8901-2345",
    company: "넥스트젠",
    created_at: "2025-08-12T15:20:00Z",
  },
  {
    customer_id: "C009",
    name: "한지우",
    email: "jiwoo.han@example.com",
    phone: "010-9012-3456",
    company: "엔터프라이즈코리아",
    created_at: "2025-09-25T11:50:00Z",
  },
  {
    customer_id: "C010",
    name: "오승현",
    email: "seunghyun.oh@example.com",
    phone: "010-0123-4567",
    company: "클라우드웍스",
    created_at: "2025-10-08T14:10:00Z",
  },
];

export default function Home() {
  const { getCustomers } = useCustomers();

  return data.map(({ customer_id, name, email, phone, company, created_at }) => (
    <div key={customer_id} className="flex">
      <div>{customer_id}</div>
      <div>{name}</div>
      <div>{email}</div>
      <div>{phone}</div>
      <div>{company}</div>
      <div>{created_at}</div>
    </div>
  ));
}
