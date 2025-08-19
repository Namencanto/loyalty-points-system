import { IsIn, IsInt, IsString, Min, MinLength } from 'class-validator'
import { OPERATIONS, Operation } from '../../common/constants'

export class CommandDTO {
  @IsIn(OPERATIONS)
  op!: Operation
  @IsString()
  @MinLength(1)
  customerId!: string
  @IsInt()
  @Min(1)
  points!: number
  constructor(op: unknown, customerId: unknown, points: unknown) {
    this.op = String(op).toLowerCase() as Operation
    this.customerId = String(customerId ?? '')
    this.points = Number(points)
  }
}
