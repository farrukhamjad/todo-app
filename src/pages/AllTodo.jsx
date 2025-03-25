import { useDispatch, useSelector } from 'react-redux';
import { toggleComplete, deleteTodo, updateTodo } from '../store/todoSlice';
import { Link } from 'react-router-dom';

const AllTodo = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleComplete(id));
  };

  const handleCheckboxChange = (todoId, itemId) => {
    const todo = todos.find((todo) => todo.id === todoId);
    if (todo) {
      const updatedTodos = todo.todos.map((item) => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      );
      const allChecked = updatedTodos.every((item) => item.checked);
      const updatedTodo = { 
        ...todo, 
        todos: updatedTodos,
        completed: allChecked
      };
      dispatch(updateTodo(updatedTodo));
    }
  };
  

  return (
    <div className="w-full mt-10">
      <h1 className="text-3xl font-bold text-center mb-5">All Todo</h1>
      {todos.length === 0 ? (
        <div className="text-center mt-10 text-2xl">
          No Todo Yet! Add Todo by clicking on Create New.
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {todos.map((todo) => (
            <div key={todo.id} className={`flex flex-col justify-between bg-white p-5 rounded-xl border-2 hover:shadow-xl hover:-translate-y-1 transition-all ${todo.completed ? 'border-green-500' : 'border-gray-200'} `}>
              <div>
                <p className={`inline-block float-end mb-2 ml-2 py-0.5 px-2 ${todo.category === 'Task' ? 'bg-green-300' : 'bg-red-300'}`}>
                  {todo.category}
                </p>
                <h2 className="text-xl font-bold mb-4">{todo.title}</h2>
                <p>{todo.description}</p>
                <ul className="list-disc ml-0">
                  {todo.todos && todo.todos.map((item) => (
                    <li key={item.id} className="text-md flex items-center list-none pl-0">
                      <input 
                        type="checkbox"
                        checked={item.checked || false}
                        onChange={() => handleCheckboxChange(todo.id, item.id)}
                        className='mr-3'
                      />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-3 flex justify-between flex-wrap gap-3">
                {todo.category === 'Task' && (
                  <button
                    onClick={() => handleToggleComplete(todo.id)}
                    className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded"
                  >
                    {todo.completed ? 'Completed' : 'Complete'}
                  </button>
                )}

                <Link
                  to={`/${todo.category}/${todo.id}`}
                  className={`bg-blue-500 text-white px-4 py-2 rounded ${todo.completed ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  aria-disabled={todo.completed}
                  onClick={(e) => {
                    if (todo.completed) {
                      e.preventDefault()
                    }
                  }}
                >
                  Update
                </Link>
                
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllTodo;
