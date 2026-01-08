import httpClient from '../config';
import { GetCustomersResponse, GetCustomerDetailResponse } from './type';

export const customersApi = {
    /** 고객 리스트 조회 */
    getCustomers: () => httpClient.get<GetCustomersResponse>('/customers'),

    /** 고객 상세 정보 조회 */
    getCustomerDetail: (customerId: string) => httpClient.get<GetCustomerDetailResponse>(`/customers/${customerId}`)
}