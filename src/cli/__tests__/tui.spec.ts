import { describe, expect, it, vi } from 'vitest';

vi.mock('blessed', () => {
  const makeNode = (name: string) => {
    const handlers = new Map<string, Function[]>()
    return {
      name,
      on: vi.fn((evt: string, cb: Function) => {
        const arr = handlers.get(evt) ?? []
        arr.push(cb)
        handlers.set(evt, arr)
      }),
      key: vi.fn(),
      add: vi.fn(),
      focus: vi.fn(),
      getValue: vi.fn(() => ''),
      setValue: vi.fn(),
      handlers
    }
  }

  const makeRadioButton = () => {
    const node = makeNode('radiobutton') as unknown as {
      on: (e: string, cb: Function) => void
      check: () => void
      uncheck: () => void
      checked: boolean
    }
    let checked = false
    Object.assign(node, {
      check: vi.fn(() => { checked = true }),
      uncheck: vi.fn(() => { checked = false }),
      get checked() { return checked },
      set checked(v: boolean) { checked = v }
    })
    return node
  }

  const screen = vi.fn(() => ({ key: vi.fn(), render: vi.fn(), title: '' }))

  const api = {
    screen,
    box: vi.fn(() => makeNode('box')),
    form: vi.fn(() => makeNode('form')),
    text: vi.fn(() => makeNode('text')),
    textbox: vi.fn(() => makeNode('textbox')),
    button: vi.fn(() => makeNode('button')),
    log: vi.fn(() => makeNode('log')),
    radioset: vi.fn(() => makeNode('radioset')),
    radiobutton: vi.fn(() => makeRadioButton())
  }

  return { default: api }
})

describe('tui module smoke', () => {
  it('imports without crashing', async () => {
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as unknown as (code?: string | number | null | undefined) => never)
    await import('../tui')
    expect(exitSpy).not.toHaveBeenCalled()
    exitSpy.mockRestore()
  })
})
