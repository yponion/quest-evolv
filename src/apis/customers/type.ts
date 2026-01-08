import { ApiResponse, ApiListResponse } from "../type"

type CustomerData = {
  customer_id: string,
  name: string,
  email: string,
  phone: string,
  company: string,
  created_at: string,
}

export type GetCustomersResponse = ApiListResponse<CustomerData>;

type CustomerDetail = CustomerData & {
  details: {
    detail_id: string
    customer_id: string,
    address: string,
    industry: string,
    annual_revenue: string,
    employee_count: number,
    last_contact_date: string,
    notes: string
  }
};

export type GetCustomerDetailResponse = ApiResponse<CustomerDetail>;