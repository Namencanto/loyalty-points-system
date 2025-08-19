import { LoyaltyService } from './loyalty.service'
import { LoyaltyController } from './loyalty.controller'

export const createLoyaltyModule = () => {
  const service = new LoyaltyService()
  const controller = new LoyaltyController(service)
  return { service, controller }
}
