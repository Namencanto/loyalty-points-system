import { ResponseDTO } from '../common/types'

type ByType<T, K extends T extends { type: infer U } ? U : never> = Extract<T, { type: K }>

export const printers: { [K in ResponseDTO['type']]: (d: ByType<ResponseDTO, K>) => void } = {
  earn: d => console.log(`Earned ${d.delta} points for ${d.customerId}. Balance: ${d.balance} points.`),
  redeem: d => {
    console.log(`Redeemed ${d.delta} points for ${d.customerId}. Balance: ${d.balance} points.`)
    if (d.warning) console.log(`Warning: Customer ${d.customerId} has a low balance: ${d.balance} points.`)
  },
  error: d => console.log(d.customerId && typeof d.balance === 'number' ? `Error: ${d.message} Balance remains: ${d.balance} points.` : `Error: ${d.message}`)
}
