import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo } from '../store/todoSlice';

const UpdateTodo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const todo = useSelector((state) =>
    state.todos.todos.find((todo) => todo.id === id)
  );

  const [todoTitle, setTodoTitle] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodoItem, setNewTodoItem] = useState('');

  useEffect(() => {
    if (todo) {
      setTodoTitle(todo.title);
      setTodos(todo.todos || []);
    }
  }, [todo]);

  const handleSave = () => {
    const updatedTodo = { ...todo, title: todoTitle, todos };
    dispatch(updateTodo(updatedTodo));
    navigate('/');
  };

  const handleAddTodoItem = () => {
    if (newTodoItem.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodoItem, isEditable: false }]);
      setNewTodoItem('');
    }
  };

  const handleDeleteTodoItem = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleEditTodoItem = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditable: !todo.isEditable } : todo
    ));
  };

  const handleSaveTodoItem = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText, isEditable: false } : todo
    ));
  };

  const handleEditSaveToggle = (id, text) => {
    if (todos.find(todo => todo.id === id).isEditable) {
      handleSaveTodoItem(id, text);
    } else {
      handleToggleEditTodoItem(id);
    }
  };

  return (
    <div className="w-full mt-10">
      <h1 className="text-3xl font-bold text-center mb-5">Update Todo</h1>
      <div>
        <label htmlFor="todo_title" className="mb-2 inline-block">
          Title:
        </label>
        <input
          type="text"
          name="todo_title"
          className="border p-2 rounded mb-2 w-full"
          placeholder="Todo Title"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <label htmlFor="todo_item" className="my-2 inline-block">
          Todo Item:
        </label>
        <div className="flex items-center gap-5">
          <div className="flex-grow">
          <input
            type="text"
            name="todo_item"
            className="border p-2 rounded mb-2 w-full"
            placeholder="Add Todo Item"
            value={newTodoItem}
            onChange={(e) => setNewTodoItem(e.target.value)}
          />
          </div>
          <button
            onClick={handleAddTodoItem}
            className="bg-green-500 text-white px-4 py-2 rounded mb-2 cursor-pointer inline-flex"
          >
            Add Item
          </button>
        </div>
        <ul className="list-disc mt-4">
          {todos.map((todo) => (
            <li key={todo.id} className={`flex justify-between items-center mb-2 gap-3 border p-2 rounded-md ${todo.isEditable ? 'border-blue-500' : 'border-transparent bg-blue-100'}`}>
              <div className="flex-grow">
                {todo.isEditable ? (
                  <input
                    type="text"
                    value={todo.text}
                    onChange={(e) => setTodos(todos.map(t => t.id === todo.id ? { ...t, text: e.target.value } : t))}
                    className="border-0 p-0 rounded w-full focus:border-0 focus:outline-0"
                  />
                ) : (
                  <span>{todo.text}</span>
                )}
              </div>
              <button
                onClick={() => handleEditSaveToggle(todo.id, todo.text)}
                className={`px-2 py-1 rounded cursor-pointer ${todo.isEditable ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
              >
                {todo.isEditable ? 'Save' : 'Edit'}
              </button>
              <button
                onClick={() => handleDeleteTodoItem(todo.id)}
                className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-all mt-5"
      >
        Save Changes
      </button>
    </div>
  );
};

export default UpdateTodo;
