'use client';
import React, { useState } from 'react';

export default function VideoForm() {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  return (
    <form>
      <label>
        Title
        <input
          value={titleInput}
          onChange={(e) => setTitleInput(e.currentTarget.value)}
          required
        />
      </label>
      <label>
        What do you want to improve?
        <input
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.currentTarget.value)}
          required
        />
      </label>
      <label>
        Strokes to focus on
        <input
          value={tagsInput}
          onChange={(e) => setTagsInput(e.currentTarget.value)}
        />
      </label>
      <label>
        Strokes to focus on
        <input
          value={locationInput}
          onChange={(e) => setLocationInput(e.currentTarget.value)}
        />
      </label>
    </form>
  );
}
