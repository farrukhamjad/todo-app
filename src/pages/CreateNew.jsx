import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTodo } from '../store/todoSlice';
import { useDispatch } from 'react-redux';

const CreateNew = () => {
  const [formType, setFormType] = useState('task');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [todoTitle, setTodoTitle] = useState('');
  const [todoItem, setTodoItem] = useState('');
  const [todos, setTodos] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      description: taskDescription,
      category: 'Task',
      todos: [],
    };
    dispatch(addTodo(newTask));
    navigate('/');
  };

  const handleAddTodo = () => {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      category: 'Todo',
      todos,
    };
    dispatch(addTodo(newTodo));
    navigate('/');
  };

  const handleAddTodoItem = () => {
    if (todoItem.trim()) {
      setTodos([...todos, { id: Date.now(), text: todoItem, isEditable: false }]);
      setTodoItem('');
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
      <h1 className="text-3xl font-bold text-center mb-5">Create New</h1>

      <div className="flex lg:flex-row flex-col gap-5 lg:gap-10">
        <div className="w-full lg:w-7/9 lg:order-first order-last">
          <h2 className="text-2xl font-semibold mb-4">
            {formType === 'task' ? 'Add Task Form' : 'Add Todo Form'}
          </h2>

          {formType === 'task' && (
            <div>
              <label htmlFor="task_title" className="mb-2 inline-block">
                Title:
              </label>
              <input
                type="text"
                name="task_title"
                placeholder="Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
              />
              <label htmlFor="task_description" className="my-2 inline-block">
                Description:
              </label>
              <textarea
                placeholder="Description"
                name="task_description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                className="border p-2 rounded mb-2 w-full h-50"
              />
              <button
                onClick={handleAddTask}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-all mt-5"
              >
                Submit Task
              </button>
            </div>
          )}

          {formType === 'todo' && (
            <div>
              <label htmlFor="todo_title" className="mb-2 inline-block">
                Title:
              </label>
              <input
                type="text"
                name="todo_title"
                placeholder="Todo Title"
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
                className="border p-2 rounded mb-2 w-full"
              />
              <label htmlFor="todo_item" className="my-2 inline-block">
                Todo Item:
              </label>
              <div className="flex items-center gap-5">
                <div className="flex-grow">
                  <input
                    type="text"
                    name="todo_item"
                    placeholder="Add Todo Item"
                    value={todoItem}
                    onChange={(e) => setTodoItem(e.target.value)}
                    className="border p-2 rounded mb-2 w-full"
                  />
                </div>
                <button
                  onClick={handleAddTodoItem}
                  className="bg-green-500 text-white px-4 py-2 rounded mb-2 cursor-pointer inline-flex"
                >
                  Add Todo
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
              <button
                onClick={handleAddTodo}
                className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-all mt-5"
              >
                Submit Todo
              </button>
            </div>
          )}
        </div>

        <div className="w-full lg:w-2/9 lg:order-last order-first">
          <h2 className="text-2xl font-semibold mb-4">Select Form</h2>
          <select
            onChange={(e) => setFormType(e.target.value)}
            className="border p-2 rounded mb-4 w-full"
            value={formType}
          >
            <option value="task">Add Task Form</option>
            <option value="todo">Add Todo Form</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CreateNew;
