import { describe, expect, it, vi } from 'vitest'
import type { LoyaltyController } from '../../loyalty/loyalty.controller'

vi.mock('readline', () => {
  const handlers: Record<string, (line?: string) => void> = {}
  const iface = {
    prompt: vi.fn(),
    on: (evt: string, cb: (line?: string) => void) => { handlers[evt] = cb },
    close: vi.fn(),
  }
  return {
    createInterface: () => iface,
    __handlers: handlers,
  }
})

vi.mock('../processor', () => ({
  processTokens: vi.fn(),
}))

import { processTokens } from '../processor'
import { startRepl } from '../repl'

describe('repl', () => {
  it('wires line handler and calls processTokens', async () => {
    const ctrl = {} as LoyaltyController

    startRepl(ctrl)

    const rlMod = await import('readline') as unknown as {
      __handlers: Record<string, (line?: string) => void>
    }
    rlMod.__handlers['line']?.('earn u1 5')

    expect(processTokens).toHaveBeenCalledWith(ctrl, ['earn', 'u1', '5'])
  })
})
