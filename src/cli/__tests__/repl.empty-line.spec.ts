import { describe, expect, it, vi } from 'vitest'
import type { LoyaltyController } from '../../loyalty/loyalty.controller'

vi.mock('readline', () => {
  const handlers: Record<string, (line?: string) => void> = {}
  const prompt = vi.fn()
  const iface = { prompt, on: (e: string, cb: (line?: string) => void) => { handlers[e] = cb }, close: vi.fn() }
  return { createInterface: () => iface, __handlers: handlers, __iface: iface }
})

vi.mock('../processor', () => ({ processTokens: vi.fn() }))

import { startRepl } from '../repl'

describe('repl empty line', () => {
  it('prompts again on empty input', async () => {
    const ctrl = {} as LoyaltyController
    startRepl(ctrl)
    const rl = await import('readline') as unknown as { __handlers: Record<string, (line?: string) => void>, __iface: { prompt: () => void } }
    rl.__iface.prompt = vi.fn()
    rl.__handlers['line']?.('   ')
    expect(rl.__iface.prompt).toHaveBeenCalled()
  })
})
