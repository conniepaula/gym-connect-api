export class MaxElapsedTimeError extends Error {
  constructor() {
    super('Maximum elapsed time for action has been exceeded.')
  }
}
