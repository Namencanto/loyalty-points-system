import { describe, expect, it, vi } from 'vitest'
import type { LoyaltyController } from '../../loyalty/loyalty.controller'
import { processTokens } from '../processor'

describe('processTokens exit/quit', () => {
  it('calls process.exit on exit', () => {
    const ctrl = { handle: vi.fn() } as unknown as LoyaltyController
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(
      ((code?: string | number | null | undefined) => {
        return undefined as never
      })
    )
    processTokens(ctrl, ['exit'])
    expect(exitSpy).toHaveBeenCalledWith(0)
    exitSpy.mockRestore()
  })

  it('calls process.exit on quit', () => {
    const ctrl = { handle: vi.fn() } as unknown as LoyaltyController
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(
      ((code?: string | number | null | undefined) => {
        return undefined as never
      })
    )
    processTokens(ctrl, ['quit'])
    expect(exitSpy).toHaveBeenCalledWith(0)
    exitSpy.mockRestore()
  })
})
