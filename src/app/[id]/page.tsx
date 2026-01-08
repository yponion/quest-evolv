"use client";

import { use } from "react";
import { useGetCustomerDetail } from "@/hooks/useGetCustomerDetail";
import { isAxiosError } from "axios";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default function Page(props: Props) {
  const params = use(props.params);
  const customerId = params.id;

  const { customerDetailData, isLoading, error } = useGetCustomerDetail(customerId);
  const data = customerDetailData?.data;

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
  return <div>{data?.company}</div>;
}
