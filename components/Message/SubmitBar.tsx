import React from 'react';

export function SubmitBar({
  handleQuestionAsked,
}: {
  handleQuestionAsked: (formData: FormData) => void;
}) {
  return (
    <form action={handleQuestionAsked} className="mb-4 mx-4">
      <div className="flex">
        <input
          type="text"
          name="question"
          className="flex-grow rounded-l p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
        />
        <button
          type="submit"
          className="px-8 rounded-r bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 uppercase border-blue-500 border-t border-b border-r"
        >
          Ask
        </button>
      </div>
    </form>
  );
}
