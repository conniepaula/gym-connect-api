export class MaxDistanceError extends Error {
  constructor() {
    super('Cannot check in to gym that is too far away.')
  }
}
