'use client';

import { useState } from 'react';

type Props = {
  videoId: number | undefined;
  userProfileId: number;
};

export default function Comments(props: Props) {
  const [commentInput, setCommentInput] = useState('');

  async function createComment() {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        videoId: props.videoId,
        userProfileId: props.userProfileId,
        commentUser: commentInput,
      }),
    });
    const data = await response.json();
    console.log('commentsresponse', data);
  }

  return (
    <div className="ml-8">
      <form
        className="flex flex-col mt-8"
        onSubmit={async (e) => {
          e.preventDefault();
          await createComment();
          setCommentInput('');
        }}
      >
        <div className=" shadow-inner bg-slate-50 rounded h-96 w-96 break-words">
          {commentInput}
        </div>
        <div className="flex mt-8 w-96">
          <div className="mr-auto ">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              leave your comment
            </label>
            <div className="mt-2">
              <input
                value={commentInput}
                onChange={(e) => setCommentInput(e.currentTarget.value)}
                required
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className=" ml-4 mt-auto flex items-center justify-start gap-x-6">
            <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
