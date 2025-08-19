export class LoyaltyService {
    private balances = new Map<string, number>()
    getBalance = (id: string) => this.balances.get(id) ?? 0
    earn(id: string, points: number) {
      if (!Number.isInteger(points) || points <= 0) throw new Error('Points must be a positive integer.')
      const b = this.getBalance(id) + points
      this.balances.set(id, b)
      return b
    }
    redeem(id: string, points: number) {
      if (!Number.isInteger(points) || points <= 0) throw new Error('Points must be a positive integer.')
      const b = this.getBalance(id)
      if (points > b) return { success: false as const, balance: b, warning: false as const }
      const nb = b - points
      this.balances.set(id, nb)
      return { success: true as const, balance: nb, warning: nb < 10 }
    }
  }
  