import { describe, expect, it } from 'vitest'
import { LoyaltyService } from '../loyalty.service'

describe('LoyaltyService', () => {
  it('earn accumulates balance', () => {
    const s = new LoyaltyService()
    expect(s.getBalance('u1')).toBe(0)
    s.earn('u1', 5)
    expect(s.getBalance('u1')).toBe(5)
    s.earn('u1', 7)
    expect(s.getBalance('u1')).toBe(12)
  })

  it('redeem returns warning when balance < 10', () => {
    const s = new LoyaltyService()
    s.earn('u1', 12)
    const r = s.redeem('u1', 5)
    expect(r).toEqual({ success: true, balance: 7, warning: true })
  })
})
