import * as readline from 'readline'
import { tokenize } from '../utils/tokenize'
import { processTokens } from './processor'
import { LoyaltyController } from '../loyalty/loyalty.controller'
import { HELP_TEXT } from '../common/constants'

export const startRepl = (controller: LoyaltyController) => {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> ' })
  console.log(HELP_TEXT)
  rl.prompt()
  rl.on('line', line => {
    const t = tokenize(line.trim())
    if (!t.length) return rl.prompt()
    processTokens(controller, t)
    rl.prompt()
  })
  rl.on('close', () => {
    console.log('bye')
    process.exit(0)
  })
}
