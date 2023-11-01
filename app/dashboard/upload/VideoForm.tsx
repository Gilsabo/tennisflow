'use client';
import React, { useState } from 'react';
import UploadVideo from './UploadVideo';
import styles from './UploadVideoForm.module.css';

export default function VideoForm() {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [locationInput, setLocationInput] = useState('');

  return (
    <div className={styles.mainContainer}>
      <form className={styles.form}>
        <label>
          Title
          <input
            value={titleInput}
            onChange={(e) => setTitleInput(e.currentTarget.value)}
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
          Location
          <input
            value={locationInput}
            onChange={(e) => setLocationInput(e.currentTarget.value)}
          />
        </label>
        <textarea
          rows={25}
          cols={50}
          maxLength={250}
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.currentTarget.value)}
          required
        />
        <button>Upload</button>
      </form>
      <UploadVideo />
    </div>
  );
}
