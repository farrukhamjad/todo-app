import { useParams } from 'react-router-dom';
import { UpdateTodo, UpdateTask } from './index';

const UpdateItem = () => {
  const { category, id } = useParams();

  const isTodoCategory = category === 'Todo';

  return (
    <>
      {isTodoCategory ? (
        <UpdateTodo id={id} />
      ) : (
        <UpdateTask id={id} />
      )}
    </>
  );
};

export default UpdateItem;
