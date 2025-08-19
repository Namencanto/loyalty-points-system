import { describe, expect, it, vi } from 'vitest';
import { HELP_TEXT } from '../../common/constants';
import { ResponseDTO } from '../../common/types';
import type { LoyaltyController } from '../../loyalty/loyalty.controller';
import { processTokens } from '../processor';

describe('processTokens', () => {
    it('help prints HELP_TEXT and continues', () => {
      const log = vi.spyOn(console, 'log').mockImplementation(() => {})
  
      const ctrl: Pick<LoyaltyController, 'handle'> = {
        handle: vi.fn((): ResponseDTO => ({
          type: 'earn',
          customerId: 'u1',
          delta: 5,
          balance: 5
        }))
      }
  
      processTokens(ctrl as LoyaltyController, ['help', 'earn', 'u1', '5'])
  
      expect(log).toHaveBeenCalledWith(HELP_TEXT)
      expect(ctrl.handle).toHaveBeenCalled()
      log.mockRestore()
    })
  })