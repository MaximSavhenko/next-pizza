export interface LiqPayRequest {
  action: string
  amount: number
  currency: string
  description: string
  order_id: number
  version: number
  sandbox: number
  public_key: string
  result_url?: string
  signature?: string
  server_url?: string
}
