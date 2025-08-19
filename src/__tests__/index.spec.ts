import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../cli/repl', () => ({ startRepl: vi.fn() }))
vi.mock('../cli/processor', () => ({ processTokens: vi.fn() }))

describe('index.ts entry', () => {
  const realArgv = process.argv
  const realExit = process.exit

  beforeEach(() => {
    vi.resetModules()
  })

  it('starts REPL when no args', async () => {
    const { startRepl } = await import('../cli/repl')
    process.argv = [...realArgv.slice(0, 2)]
    await import('../index')
    expect(startRepl).toHaveBeenCalledTimes(1)
  })

  it('calls processTokens when args present', async () => {
    const { processTokens } = await import('../cli/processor')
    process.argv = [...realArgv.slice(0, 2), 'earn', 'u1', '5']
    await import('../index')
    expect(processTokens).toHaveBeenCalledWith(expect.anything(), ['earn', 'u1', '5'])
  })

  afterAll(() => {
    process.argv = realArgv
    process.exit = realExit
  })
})
