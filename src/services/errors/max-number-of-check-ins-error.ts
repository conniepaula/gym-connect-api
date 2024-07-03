export class MaxNumberOfCheckInsError extends Error {
  constructor() {
    super('Daily check-in limit reached.')
  }
}
