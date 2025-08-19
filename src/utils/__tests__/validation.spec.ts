import { describe, it, expect } from 'vitest'
import { flattenValidation } from '../validation'
import type { ValidationError } from 'class-validator'

describe('flattenValidation', () => {
  it('flattens nested children', () => {
    const input: ValidationError[] = [
      {
        property: 'root',
        children: [
          {
            property: 'child',
            constraints: { min: 'too small', isInt: 'must be int' },
            children: []
          } as ValidationError
        ]
      } as ValidationError
    ]
    const out = flattenValidation(input)
    expect(out).toEqual(['too small', 'must be int'])
  })
})
