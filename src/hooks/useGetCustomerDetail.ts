import { useQuery } from '@tanstack/react-query';
import { customersApi } from '@/apis/customers';

export const useGetCustomerDetail = (customerId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['customersApi.getCustomerDetail', customerId],
    queryFn: () => customersApi.getCustomerDetail(customerId),
    staleTime: 5 * 60 * 1000
  });

  return {
    customerDetailData: data?.data,
    isLoading,
    error
  }
};
