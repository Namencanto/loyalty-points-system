import { describe, expect, it } from 'vitest'
import { LoyaltyController } from '../loyalty.controller'
import { LoyaltyService } from '../loyalty.service'

describe('LoyaltyController redeem throws', () => {
  it('maps thrown error to {type:error}', () => {
    const s = new LoyaltyService()
    s.redeem = () => { throw new Error('redeem-fail') }
    const c = new LoyaltyController(s)
    const r = c.handle({ op: 'redeem', customerId: 'u1', points: 1 })
    expect(r).toEqual({ type: 'error', message: 'redeem-fail' })
  })
})
