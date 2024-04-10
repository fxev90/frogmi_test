import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateComment, useGetFeature } from '../api';
import FeatureInfo from '../components/FeatureInfo';
import Comment from '@/components/Comments';

const CommentPage = () => {
  const { featureId } = useParams();
  const { data: feature, isLoading: isLoadingFeature, error: errorFeature, refetch}= useGetFeature(featureId);

  const { mutate: createComment, isLoading, error } = useCreateComment(refetch);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const comments = feature?.included || [];
  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = event.target.elements.body.value;
    createComment({ featureId, body });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Comments for Feature {featureId}</h1>
      {isLoadingFeature ? (
        <div>Loading feature...</div>
      ) : errorFeature ? (
        <div className="text-red-500">Error: {errorFeature.message}</div>
      ) : (
        <FeatureInfo feature={feature.data} />
      )}
      {/* Comment form */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="body" className="block font-medium text-gray-700">
              Comment
            </label>
            <textarea
              id="body"
              name="body"
              rows={4}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your comment here..."
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-4 text-red-500">Error: {error.message}</div>
        )}
      </div>

      {/* Comments section */}
      <div className="bg-white shadow-md rounded-md p-6">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
        >
          <h2 className="text-lg font-medium">Comments</h2>
          <svg
            className={`w-6 h-6 transition-transform ${
              isCommentsOpen ? 'transform rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        {isCommentsOpen && (
            <div className="mt-4">
            {isLoadingFeature ? (
              <div>Loading comments...</div>
            ) : errorFeature ? (
              <div className="text-red-500">Error: {errorFeature.message}</div>
            ) : (
              comments.map((comment) => <Comment key={comment.id} comment={comment} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentPage;