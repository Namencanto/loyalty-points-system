import blessed from 'blessed'
import 'reflect-metadata'
import { ResponseDTO } from '../common/types'
import { CommandDTO } from '../loyalty/dto/command.dto'
import { createLoyaltyModule } from '../loyalty/loyalty.module'
import { validateDto } from '../utils/validation'

const { controller } = createLoyaltyModule()

const theme = {
  bg: 'black',
  fg: 'white',
  focusBg: 'blue',
  focusFg: 'white',
  border: 'cyan'
}

const screen = blessed.screen({ smartCSR: true, title: 'Loyalty Points' })
screen.key(['C-c', 'q', 'escape'], () => process.exit(0))

const root = blessed.box({
  parent: screen,
  width: '100%',
  height: '100%',
  keys: true,
  mouse: true,
  border: { type: 'line' },
  label: ' Loyalty ',
  style: { bg: theme.bg, fg: theme.fg, border: { fg: theme.border } }
})

const form = blessed.form({
  parent: root,
  left: 1,
  top: 1,
  width: '98%',
  height: 10,
  keys: true,
  mouse: true,
  style: { bg: theme.bg, fg: theme.fg }
})

blessed.text({ parent: form, content: 'Operation', left: 1, top: 0, style: { bg: theme.bg, fg: theme.fg } })
const ops = blessed.radioset({ parent: form, left: 1, top: 1, width: 20, height: 4, keys: true, mouse: true, style: { bg: theme.bg, fg: theme.fg } })
const rbEarn = blessed.radiobutton({ parent: ops, content: 'earn', left: 0, top: 0, mouse: true, style: { bg: theme.bg, fg: theme.fg, focus: { bg: theme.focusBg, fg: theme.focusFg } } })
const rbRedeem = blessed.radiobutton({ parent: ops, content: 'redeem', left: 0, top: 1, mouse: true, style: { bg: theme.bg, fg: theme.fg, focus: { bg: theme.focusBg, fg: theme.focusFg } } })
rbEarn.check()

blessed.text({ parent: form, content: 'Customer ID', left: 24, top: 0, style: { bg: theme.bg, fg: theme.fg } })
const idInput = blessed.textbox({
  parent: form,
  name: 'customerId',
  left: 24,
  top: 1,
  width: 30,
  height: 1,
  inputOnFocus: true,
  mouse: true,
  keys: true,
  border: { type: 'line' },
  style: { bg: theme.bg, fg: theme.fg, border: { fg: theme.border }, focus: { bg: theme.focusBg, fg: theme.focusFg, border: { fg: theme.border } } }
})

blessed.text({ parent: form, content: 'Points', left: 56, top: 0, style: { bg: theme.bg, fg: theme.fg } })
const ptsInput = blessed.textbox({
  parent: form,
  name: 'points',
  left: 56,
  top: 1,
  width: 12,
  height: 1,
  inputOnFocus: true,
  mouse: true,
  keys: true,
  border: { type: 'line' },
  style: { bg: theme.bg, fg: theme.fg, border: { fg: theme.border }, focus: { bg: theme.focusBg, fg: theme.focusFg, border: { fg: theme.border } } }
})

const submit = blessed.button({
  parent: form,
  content: ' Submit ',
  left: 70,
  top: 3,
  shrink: true,
  mouse: true,
  keys: true,
  padding: { left: 1, right: 1 },
  border: { type: 'line' },
  style: { bg: theme.bg, fg: theme.fg, border: { fg: theme.border }, focus: { inverse: true }, hover: { inverse: true } }
})

const exitBtn = blessed.button({
  parent: form,
  content: ' Exit ',
  left: 82,
  top: 3,
  shrink: true,
  mouse: true,
  keys: true,
  padding: { left: 1, right: 1 },
  border: { type: 'line' },
  style: { bg: theme.bg, fg: theme.fg, border: { fg: theme.border }, focus: { inverse: true }, hover: { inverse: true } }
})

const log = blessed.log({
  parent: root,
  left: 1,
  top: 12,
  width: '98%',
  height: '75%-2',
  border: { type: 'line' },
  label: ' Output ',
  scrollable: true,
  mouse: true,
  keys: true,
  alwaysScroll: true,
  scrollbar: { ch: ' ' },
  style: { bg: theme.bg, fg: theme.fg, border: { fg: theme.border } }
})

const lines = (r: ResponseDTO): string[] => {
  if (r.type === 'earn') return [`Earned ${r.delta} points for ${r.customerId}. Balance: ${r.balance} points.`]
  if (r.type === 'redeem') return r.warning
    ? [`Redeemed ${r.delta} points for ${r.customerId}. Balance: ${r.balance} points.`, `Warning: Customer ${r.customerId} has a low balance: ${r.balance} points.`]
    : [`Redeemed ${r.delta} points for ${r.customerId}. Balance: ${r.balance} points.`]
  return r.customerId && typeof r.balance === 'number'
    ? [`Error: ${r.message} Balance remains: ${r.balance} points.`]
    : [`Error: ${r.message}`]
}

const submitAction = () => {
  const op = rbEarn.checked ? 'earn' : 'redeem'
  const id = idInput.getValue()
  const pts = ptsInput.getValue()
  const dto = new CommandDTO(op, id, pts)
  const errs = validateDto(dto)
  if (errs.length) {
    errs.forEach(e => log.add(e))
    screen.render()
    return
  }
  const res = controller.handle(dto)
  lines(res).forEach(l => log.add(l))
  screen.render()
}

submit.on('press', submitAction)
exitBtn.on('press', () => process.exit(0))
idInput.on('submit', () => ptsInput.focus())
ptsInput.on('submit', submitAction)

screen.render()
idInput.focus()
