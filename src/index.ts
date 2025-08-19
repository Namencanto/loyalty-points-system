import 'reflect-metadata'
import { processTokens } from './cli/processor'
import { LoyaltyService } from './loyalty/loyalty.service'
import { LoyaltyController } from './loyalty/loyalty.controller'
import { startRepl } from './cli/repl'

const service = new LoyaltyService()
const controller = new LoyaltyController(service)
const args = process.argv.slice(2)
if (args.length === 0) startRepl(controller)
else processTokens(controller, args)
