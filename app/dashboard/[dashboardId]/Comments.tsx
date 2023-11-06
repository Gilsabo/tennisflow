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
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createComment();
          setCommentInput('');
        }}
      >
        <label>
          Leave your comment
          <input
            value={commentInput}
            onChange={(e) => setCommentInput(e.currentTarget.value)}
          />
        </label>
        <button>Send</button>
      </form>
      <div>{commentInput}</div>
    </div>
  );
}
