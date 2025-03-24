import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  todos: JSON.parse(localStorage.getItem('todos')) || [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        title: action.payload.title,
        description: action.payload.description || '',
        category: action.payload.category || '',
        todos: action.payload.todos || [],
      };
      state.todos.push(todo);

      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    toggleComplete: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(state.todos));
    },
    updateTodo: (state, action) => {
      const { id, title, description, todos } = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if (todoIndex !== -1) {
        state.todos[todoIndex] = {
          ...state.todos[todoIndex],
          title,
          description,
          todos,
        };
        localStorage.setItem('todos', JSON.stringify(state.todos));
      }
    },
  },
});

export const { addTodo, removeTodo, toggleComplete, deleteTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
