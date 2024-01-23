import React, { useRef } from 'react';

export function SubmitBar({
  handleQuestionAsked,
}: {
  handleQuestionAsked: (formData: FormData) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleQuestionAskedInternal = (formData: FormData) => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    handleQuestionAsked(formData);
  };

  return (
    <form action={handleQuestionAskedInternal} className="mb-4 mx-4">
      <div className="flex">
        <input
          type="text"
          name="question"
          className="flex-grow rounded-l p-2 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
          ref={inputRef}
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
