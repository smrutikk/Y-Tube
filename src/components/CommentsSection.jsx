import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiSend, FiX } from 'react-icons/fi';

const CommentsSection = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState('');

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem('vidfow-comments') || '{}');
    setComments(savedComments[videoId] || []);
  }, [videoId]);

  const saveComments = (updatedComments) => {
    const savedComments = JSON.parse(localStorage.getItem('vidfow-comments') || '{}');
    savedComments[videoId] = updatedComments;
    localStorage.setItem('vidfow-comments', JSON.stringify(savedComments));
    setComments(updatedComments);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: Date.now(),
      text: newComment,
      author: 'You',
      timestamp: new Date().toISOString(),
      isEdited: false
    };
    
    saveComments([comment, ...comments]);
    setNewComment('');
  };

  const handleEditComment = (commentId) => {
    const comment = comments.find(c => c.id === commentId);
    if (comment) {
      setEditingCommentId(commentId);
      setEditCommentText(comment.text);
    }
  };

  const handleUpdateComment = () => {
    if (!editCommentText.trim()) return;
    
    const updatedComments = comments.map(comment => 
      comment.id === editingCommentId 
        ? { ...comment, text: editCommentText, isEdited: true } 
        : comment
    );
    
    saveComments(updatedComments);
    setEditingCommentId(null);
    setEditCommentText('');
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    saveComments(updatedComments);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
        Comments ({comments.length})
      </h3>
      
      {/* Add Comment */}
      <div className="flex items-start mb-8 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
        <div className="flex-shrink-0 mr-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-400 to-red-500 flex items-center justify-center text-white">
            <span className="text-lg">👤</span>
          </div>
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
            rows="2"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim()}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center"
            >
              <FiSend className="mr-2" />
              Post
            </button>
          </div>
        </div>
      </div>
      
      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          comments.map(comment => (
            <motion.div 
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors shadow-sm"
            >
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white">
                  <span className="text-lg">👤</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-1">
                  <span className="font-medium mr-2 text-gray-800 dark:text-gray-200">{comment.author}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(comment.timestamp)}
                    {comment.isEdited && ' • Edited'}
                  </span>
                </div>
                
                {editingCommentId === comment.id ? (
                  <div className="mb-2">
                    <textarea
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-transparent"
                      rows="2"
                    />
                    <div className="flex space-x-2 mt-2">
                      <button
                        onClick={handleUpdateComment}
                        className="px-3 py-1 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm flex items-center"
                      >
                        <FiSend className="mr-1" size={14} />
                        Update
                      </button>
                      <button
                        onClick={() => setEditingCommentId(null)}
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 text-sm flex items-center"
                      >
                        <FiX className="mr-1" size={14} />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {comment.text}
                  </p>
                )}
              </div>
              
              {comment.author === 'You' && editingCommentId !== comment.id && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditComment(comment.id)}
                    className="p-2 text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <FiEdit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;