import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { TodoProvider } from './components/storage/TodoStorageContext';
import TodoTemplate from './components/TodoTemplate';
import TodoHead from './components/TodoHead';
import TodoList from './components/TodoList';
import TodoCreate from './components/TodoCreate';

// css 굳이 추가해서 처리할 필요는 없다.
const GlobalStyle = createGlobalStyle`
  body {
    background : #e9ecef;
  }
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate/>
      </TodoTemplate>
    </TodoProvider>
  );
}

export default App;
