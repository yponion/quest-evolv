import { useQuery } from '@tanstack/react-query';
import { customersApi } from '@/apis/customers/api';

export const useCustomers = () => {
  const getCustomers = useQuery({
    queryKey: ['customersApi.getCustomers'],
    queryFn: async () => {
      const { data } = await customersApi.getCustomers();
      return data.data;
    },
  });

  return {
    getCustomers
  }
};
