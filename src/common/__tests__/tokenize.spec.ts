import { describe, it, expect } from 'vitest'
import { tokenize } from '../../utils/tokenize'

describe('tokenize', () => {
  it('handles quotes and spaces', () => {
    expect(tokenize(`earn "abc def" '5'`)).toEqual(['earn', 'abc def', '5'])
  })
})
