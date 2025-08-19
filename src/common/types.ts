export type EarnResponse = { type: 'earn'; customerId: string; delta: number; balance: number }
export type RedeemResponse = { type: 'redeem'; customerId: string; delta: number; balance: number; warning: boolean }
export type ErrorResponse = { type: 'error'; message: string; customerId?: string; balance?: number }
export type ResponseDTO = EarnResponse | RedeemResponse | ErrorResponse
