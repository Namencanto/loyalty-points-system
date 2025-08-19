import { HELP_TEXT } from '../common/constants'
import { ResponseDTO } from '../common/types'
import { CommandDTO } from '../loyalty/dto/command.dto'
import { LoyaltyController } from '../loyalty/loyalty.controller'
import { validateDto } from '../utils/validation'
import { printers } from './printers'

const callPrinter = <T extends ResponseDTO['type']>(
  r: Extract<ResponseDTO, { type: T }>
): void => {
  printers[r.type](r)
}

export const processTokens = (controller: LoyaltyController, tokens: string[]): void => {
  while (tokens.length > 0) {
    const [head, ...rest] = tokens
    const t = head?.toLowerCase()
    if (!t) break

    switch (t) {
      case 'help':
        console.log(HELP_TEXT)
        tokens = rest 
        break

      case 'exit':
      case 'quit':
        process.exit(0)

      default: {
        if (rest.length < 2) {
          console.log(
            'Error: incomplete command, expected 3 tokens (op, customerId, points)'
          )
          return
        }

        const [arg1, arg2, ...next] = rest
        const dto = new CommandDTO(head, arg1, arg2)
        const errs = validateDto(dto)

        if (errs.length) {
          console.log(`Error: ${errs.join('; ')}`)
        } else {
          const res = controller.handle(dto)
          callPrinter(res)
        }

        tokens = next
        break
      }
    }
  }
}
