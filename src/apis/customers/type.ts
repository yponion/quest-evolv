interface CustomerData {
  customer_id: string,
  name: string,
  email: string,
  phone: string,
  company: string,
  created_at: string,
}

export interface GetCustomersResponse {
  success: boolean,
  count: number,
  data: CustomerData[]
}