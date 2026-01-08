import { useQuery } from '@tanstack/react-query';
import { customersApi } from '@/apis/customers/api';

export const useGetCustomers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['customersApi.getCustomers'],
    queryFn: () => customersApi.getCustomers(),
    staleTime: 5 * 60 * 1000
  });

  return {
    customersData: data?.data,
    isLoading,
    error
  }
};
