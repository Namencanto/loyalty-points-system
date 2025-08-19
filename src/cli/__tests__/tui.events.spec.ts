import { describe, expect, it, vi } from 'vitest'

type HandlerMap = Map<string, Function[]>
type Emitter = {
  on: (evt: string, cb: Function) => void
  emit: (evt: string, ...args: unknown[]) => void
  add: () => void
  key: () => void
  focus: () => void
  getValue: () => string
  setValue: () => void
}

const node = (): Emitter => {
  const handlers: HandlerMap = new Map()
  return {
    on: vi.fn((evt: string, cb: Function) => {
      const arr = handlers.get(evt) ?? []
      arr.push(cb)
      handlers.set(evt, arr)
    }),
    emit: (evt: string, ...args: unknown[]) => {
      ;(handlers.get(evt) ?? []).forEach(h => h(...args))
    },
    add: vi.fn(),
    key: vi.fn(),
    focus: vi.fn(),
    getValue: vi.fn(() => 'u1'),
    setValue: vi.fn(),
  }
}

vi.mock('blessed', () => {
  const screen = vi.fn(() => ({ key: vi.fn(), render: vi.fn(), title: '' }))
  const _log = node()
  const _submit = node()
  const _exit = node()
  const _id = node()
  const _pts: Emitter = { ...node(), getValue: vi.fn(() => '5') }

  const api = {
    screen,
    box: vi.fn(() => node()),
    form: vi.fn(() => node()),
    text: vi.fn(() => node()),
    textbox: vi.fn(() => _id),
    button: vi.fn((opts?: { content?: string }) =>
      opts?.content?.includes(' Exit ') ? _exit : _submit
    ),
    log: vi.fn(() => _log),
    radioset: vi.fn(() => node()),
    radiobutton: vi.fn(() => ({ ...node(), check: vi.fn(), checked: true })),
    __refs: { _log, _submit, _exit, _id, _pts }
  }

  const firstTextbox = api.textbox
  let textboxCount = 0
  const firstTextboxCallable = firstTextbox as unknown as (...args: unknown[]) => unknown
  api.textbox = vi.fn((...args: unknown[]) => {
    return textboxCount++ === 0 ? firstTextboxCallable(...args) : _pts
  })

  return { default: api }
})

describe('tui events', () => {
  it('fires submit and exit handlers without crashing', async () => {
    const fakeExit = ((_: string | number | null | undefined) => {
      return undefined as never
    }) as unknown as (code?: string | number | null | undefined) => never

    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(fakeExit)

    const { default: blessed } = (await import('blessed')) as unknown as {
      default: {
        __refs: {
          _submit: Emitter
          _exit: Emitter
        }
      }
    }

    await import('../tui')

    blessed.__refs._submit.emit('press')
    blessed.__refs._exit.emit('press')

    expect(exitSpy).toHaveBeenCalled()
    exitSpy.mockRestore()
  })
})
