import { describe, it, expect } from 'vitest'
import { createLoyaltyModule } from '../loyalty.module'

describe('loyalty.module', () => {
  it('creates service and controller', () => {
    const m = createLoyaltyModule()
    expect(m.service).toBeTruthy()
    expect(m.controller).toBeTruthy()
  })
})
