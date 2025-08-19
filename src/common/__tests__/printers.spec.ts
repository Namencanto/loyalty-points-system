import { describe, expect, it, vi } from 'vitest'
import { printers } from '../../cli/printers'
import type { ResponseDTO } from '../../common/types'

describe('printers', () => {
  it('prints redeem with warning', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const r: ResponseDTO = { type: 'redeem', customerId: 'u1', delta: 5, balance: 7, warning: true }
    printers.redeem(r)
    expect(spy).toHaveBeenCalledWith('Redeemed 5 points for u1. Balance: 7 points.')
    expect(spy).toHaveBeenCalledWith('Warning: Customer u1 has a low balance: 7 points.')
    spy.mockRestore()
  })

  it('prints error with balance when present', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const r: ResponseDTO = { type: 'error', message: 'X', customerId: 'u1', balance: 3 }
    printers.error(r)
    expect(spy).toHaveBeenCalledWith('Error: X Balance remains: 3 points.')
    spy.mockRestore()
  })
})
