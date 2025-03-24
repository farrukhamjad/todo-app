import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateTodo } from '../store/todoSlice';

const UpdateTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const task = useSelector((state) =>
    state.todos.todos.find((todo) => todo.id === id)
  );

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  useEffect(() => {
    if (task) {
      setTaskTitle(task.title);
      setTaskDescription(task.description || '');
    }
  }, [task]);

  const handleSave = () => {
    const updatedTask = { ...task, title: taskTitle, description: taskDescription };
    dispatch(updateTodo(updatedTask));
    navigate('/');
  };

  return (
    <div className="w-full mt-10">
      <h1 className="text-3xl font-bold text-center mb-5">Update Task</h1>
      <div>
        <label htmlFor="task_title" className="mb-2 inline-block">
          Title:
        </label>
        <input
          type="text"
          name="task_title"
          className="border p-2 rounded mb-2 w-full"
          placeholder="Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <label htmlFor="task_description" className="my-2 inline-block">
          Description:
        </label>
        <textarea
          className="border p-2 rounded mb-2 w-full h-50"
          placeholder="Task Description"
          name="task_description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-all mt-5"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
