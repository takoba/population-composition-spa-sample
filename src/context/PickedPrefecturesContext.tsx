import React, { createContext, JSX, PropsWithChildren, useReducer } from 'react'
import { Prefecture } from '~/types'

type State = {
  picked: Set<Prefecture>
}
type Action = {
  type: 'add' | 'delete'
  target: Prefecture
}

const initialState = {
  picked: new Set<Prefecture>([])
}
const reducer = (state: State, action: Action): State => {
  const newState = { picked: new Set(state.picked)}
  // console.log(
  //   'cloned:', newState,
  //   ', state === state:', state === state,
  //   ', state === newState:', state === newState,
  //   ', state.picked === newState:', state.picked === newState.picked,
  // )
  switch (action.type) {
    case 'add':
      // state.picked.add(action.target);
      newState.picked.add(action.target);
      break;
    case 'delete':
      // state.picked.delete(action.target);
      newState.picked.delete(action.target);
      break;
  }
  // console.log(
  //   'after:', newState,
  //   ', state === state:', state === state,
  //   ', state === newState:', state === newState,
  //   ', state.picked === newState:', state.picked === newState.picked,
  // )
  return newState
}

type ContextValue = {
  state: State
  dispatch: React.Dispatch<Action>
}
const PickedPrefecturesContext = createContext<ContextValue>(
  { state: { picked: new Set<Prefecture>([])} } as ContextValue
)

const Provider: React.FC<PropsWithChildren> =
  ({ children }): JSX.Element => {
    const [ state, dispatch ] = useReducer(reducer, initialState)

    return (
      <PickedPrefecturesContext.Provider value={{ state, dispatch }}>
        {children}
      </PickedPrefecturesContext.Provider>
    )
  }

export default PickedPrefecturesContext
export {
  Provider,
}
