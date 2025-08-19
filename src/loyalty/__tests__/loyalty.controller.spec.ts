import { describe, expect, it } from 'vitest'
import { LoyaltyController } from '../loyalty.controller'
import { LoyaltyService } from '../loyalty.service'

describe('LoyaltyController', () => {
  it('earn -> success', () => {
    const s = new LoyaltyService()
    const c = new LoyaltyController(s)
    const r = c.handle({ op: 'earn', customerId: 'u1', points: 5 })
    expect(r).toEqual({ type: 'earn', customerId: 'u1', delta: 5, balance: 5 })
  })

  it('redeem -> insufficient points -> error response with balance', () => {
    const s = new LoyaltyService()
    const c = new LoyaltyController(s)
    const r = c.handle({ op: 'redeem', customerId: 'u1', points: 3 })
    expect(r).toEqual({
      type: 'error',
      message: 'Insufficient points for u1.',
      customerId: 'u1',
      balance: 0
    })
  })

  it('earn -> service throws -> error response', () => {
    const s = new LoyaltyService()
    s.earn = () => { throw new Error('boom') }
    const c = new LoyaltyController(s)
    const r = c.handle({ op: 'earn', customerId: 'u1', points: 1 })
    expect(r).toEqual({ type: 'error', message: 'boom' })
  })

  it('redeem -> success with warning', () => {
    const s = new LoyaltyService()
    s.earn('u1', 12)
    const c = new LoyaltyController(s)
    const r = c.handle({ op: 'redeem', customerId: 'u1', points: 5 })
    expect(r).toEqual({ type: 'redeem', customerId: 'u1', delta: 5, balance: 7, warning: true })
  })
})
