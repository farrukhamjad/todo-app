import { useSelector } from 'react-redux';

const Done = () => {
  const todos = useSelector((state) => state.todos.todos);

  const completedTasks = todos.filter(todo => todo.completed);

  return (
    <div className="w-full mt-10">
      <h1 className="text-3xl font-bold text-center mb-5">Main Page</h1>
      {todos.length === 0 ? (
        <div className="text-center mt-10 text-2xl">
          No Todo/Task Yet! Add Todo/Task by clicking on Create New.
        </div>
      ) : (
        completedTasks.length === 0 ? (
          <div className="text-center mt-10 text-2xl">
            Complete a Todo/Task to see it here.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedTasks.map(todo => (
              <div key={todo.id} className={`flex flex-col justify-between bg-white p-5 rounded-xl border-2 hover:shadow-xl hover:-translate-y-1 transition-all ${todo.completed ? 'border-gray-200' : 'border-gray-200'}`}>
                <div>
                  <p className={`inline-block float-end mb-2 ml-2 py-0.5 px-2 ${todo.category === 'Task' ? 'bg-green-300' : 'bg-red-300'}`}>
                    {todo.category}
                  </p>
                  <h2 className="text-xl font-bold mb-4">{todo.title}</h2>
                  <p>{todo.description}</p>
                  <ul className="list-disc ml-4">
                    {todo.todos && todo.todos.map((item) => (
                      <li key={item.id} className="text-sm">{item.text}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Done;
