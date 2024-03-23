import React, { useRef, useState } from 'react';
import { LoadingDots } from './LoadingDots/LoadingDots';

export function SubmitBar({
  handleQuestionAsked,
}: {
  handleQuestionAsked: (formData: FormData) => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleQuestionAskedInternal = async (formData: FormData) => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    setLoading(true);
    await handleQuestionAsked(formData);
    setLoading(false);
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
          {loading ? <LoadingDots /> : 'Ask'}
        </button>
      </div>
    </form>
  );
}
