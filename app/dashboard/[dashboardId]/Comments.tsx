'use client';

import { useState } from 'react';

export default function Comments() {
  const [commentInput, setCommentInput] = useState('');
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
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
