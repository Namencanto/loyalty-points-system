import { validateSync, ValidationError } from 'class-validator'

export const flattenValidation = (errs: ValidationError[]) => {
  const out: string[] = []
  const stack = [...errs]
  while (stack.length) {
    const e = stack.shift()!
    if (e.constraints) out.push(...Object.values(e.constraints))
    if (e.children?.length) stack.push(...e.children)
  }
  return out
}

export const validateDto = <T extends object>(dto: T) => flattenValidation(validateSync(dto))
