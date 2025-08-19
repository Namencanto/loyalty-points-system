export const OPERATIONS = ['earn', 'redeem'] as const
export type Operation = typeof OPERATIONS[number]
export const HELP_TEXT = ['Commands:', '  earn <customerId> <points>', '  redeem <customerId> <points>', '  help', '  exit'].join('\n')
