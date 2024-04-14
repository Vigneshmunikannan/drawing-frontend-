import React from 'react';

const MessageComponent = ({ type, message }) => {
  const colorClass = type === 'success' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700';
  return (
    <div className={`fixed top-0 right-0 mt-4 mr-4 p-2 font-bold rounded-md z-50 ${colorClass}`}>
      {message}
    </div>
  );
};

export default MessageComponent;
