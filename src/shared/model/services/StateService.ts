export class StateService<T extends object | null> {
  #state: T;
  constructor(initialState: T) {
    this.#state = initialState;
  }

  public setState(state: T) {
    this.#state = state;
  }

  public getState() {
    return this.#state;
  }
}
