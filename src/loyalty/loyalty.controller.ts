import { Operation } from '../common/constants'
import { ResponseDTO } from '../common/types'
import { CommandDTO } from './dto/command.dto'
import { LoyaltyService } from './loyalty.service'

export class LoyaltyController {
  constructor(private readonly service: LoyaltyService) {}
  handle(dto: CommandDTO): ResponseDTO {
    const map: Record<Operation, () => ResponseDTO> = {
      earn: (): ResponseDTO => {
        try {
          const balance = this.service.earn(dto.customerId, dto.points)
          return { type: 'earn', customerId: dto.customerId, delta: dto.points, balance }
        } catch (e: any) {
          return { type: 'error', message: e.message }
        }
      },
      redeem: (): ResponseDTO => {
        try {
          const r = this.service.redeem(dto.customerId, dto.points)
          return r.success
            ? { type: 'redeem', customerId: dto.customerId, delta: dto.points, balance: r.balance, warning: r.warning }
            : { type: 'error', message: `Insufficient points for ${dto.customerId}.`, customerId: dto.customerId, balance: r.balance }
        } catch (e: any) {
          return { type: 'error', message: e.message }
        }
      }
    }
    return map[dto.op]()
  }
}
