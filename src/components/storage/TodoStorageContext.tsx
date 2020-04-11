import React, {
  useReducer,
  createContext,
  useRef,
  useContext,
  Dispatch,
} from 'react';

type State = {
  id: number;
  text: string;
  done: boolean;
};

const initialTodos = [
  {
    id: 1,
    text: 'JIRA 이슈확인하기',
    done: false,
  },
];

type Action =
  | { type: 'CREATE'; todo: State }
  | { type: 'TOGGLE'; id: number }
  | { type: 'REMOVE'; id: number };

function todoReducer(state: Array<State>, action: Action): Array<State> {
  switch (action.type) {
  case 'CREATE':
    return state.concat(action.todo);
  case 'TOGGLE':
    return state.map((todo) =>
      todo.id === action.id ? { ...todo, done: !todo.done } : todo
    );
  case 'REMOVE':
    return state.filter((todo) => todo.id !== action.id);
  default:
    return state;
  }
}

const TodoStateContext = createContext<Array<State> | null>(null);
const TodoDispatchContext = createContext<Dispatch<Action> | null>(null);
const TodoNextIdContext = createContext<React.MutableRefObject<number> | null>(
  null
);

type TodoProviderProps = {
  children: React.ReactNode;
};

export function TodoProvider({ children }: TodoProviderProps) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext<Array<State> | null>(TodoStateContext);
  if (!context) {
    throw new Error('connot find todoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext<Dispatch<Action> | null>(TodoDispatchContext);
  if (!context) {
    throw new Error('connot find todoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext<React.MutableRefObject<number> | null>(
    TodoNextIdContext
  );
  if (!context) {
    throw new Error('connot find todoProvider');
  }
  return context;
}
