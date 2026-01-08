import httpClient from '../config';
import { GetCustomersResponse } from './type';

export const customersApi = {
    getCustomers: () => httpClient.get<GetCustomersResponse>('/customers')
}