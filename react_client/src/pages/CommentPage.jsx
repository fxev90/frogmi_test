import { useParams } from 'react-router-dom';
import { useCreateComment } from '../api';

const CommentPage = () => {
  const { featureId } = useParams();
  const { mutate: createComment, isLoading, error } = useCreateComment();

  const handleSubmit = (event) => {
    event.preventDefault();
    const body = event.target.elements.body.value;
    createComment({ featureId, body });
  };

  return (
    <div>
      <h1>Comments for Feature {featureId}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Comment:
          <textarea name="body" />
        </label>
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default CommentPage;