import { create, StateCreator, StoreApi, UseBoundStore } from 'zustand';

export interface StoreConfig<T> {
  name?: string;
  initialState: T;
  middleware?: Array<(config: StateCreator<T, [], [], T>) => StateCreator<T, [], [], T>>;
}

export function createStore<T extends Record<string, unknown>>(
  config: StoreConfig<T>
): UseBoundStore<StoreApi<T>> {
  const { initialState, middleware = [] } = config;

  let stateCreator: StateCreator<T, [], [], T> = () => initialState;

  middleware.forEach((middlewareFn) => {
    stateCreator = middlewareFn(stateCreator);
  });

  return create<T>(stateCreator);
}
