import { memo } from 'react';

const Comment = memo(({ comment }) => {
    return (
      <div className="bg-white shadow-md rounded-md p-4 mb-4">
        <p>{comment.attributes.body}</p>
        <p className="text-gray-500 text-sm">
          {new Date(comment.attributes.created_at).toLocaleString()}
        </p>
      </div>
    );
  });

export default Comment
