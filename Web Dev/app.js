import React, { useReducer } from 'react';
import 'App.css';

const initialState = {
  number: 0,
  history: [],
  redoStack: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        number: Math.min(state.number + 1, 150),
        history: [...state.history, state.number],
        redoStack: []
      };
    case 'DECREMENT':
      return {
        ...state,
        number: Math.max(state.number - 1, 0),
        history: [...state.history, state.number],
        redoStack: []
      };
    case 'UNDO':
      if (state.history.length === 0) return state;
      const previousNumber = state.history[state.history.length - 1];
      return {
        ...state,
        number: previousNumber,
        history: state.history.slice(0, -1),
        redoStack: [...state.redoStack, state.number]
      };
    case 'REDO':
      if (state.redoStack.length === 0) return state;
      const nextNumber = state.redoStack[state.redoStack.length - 1];
      return {
        ...state,
        number: nextNumber,
        redoStack: state.redoStack.slice(0, -1),
        history: [...state.history, state.number]
      };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <h1>Progress Bar App</h1>
      <div className="button-container">
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-1</button>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+1</button>
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${(state.number / 150) * 100}%` }}
        ></div>
      </div>
      <div className="undo-redo-container">
        <button onClick={() => dispatch({ type: 'UNDO' })}>Undo</button>
        <button onClick={() => dispatch({ type: 'REDO' })}>Redo</button>
      </div>
    </div>
  );
};

export default App;
