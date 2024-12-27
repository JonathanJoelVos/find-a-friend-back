export class StateAlreadyExistsError extends Error {
  constructor() {
    super('State already exists.')
  }
}
