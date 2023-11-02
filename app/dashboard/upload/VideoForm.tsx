'use client';
import React, { useState } from 'react';
// import { Video } from '../../../migrations/00004-createTableVideos';
import UploadVideo from './UploadVideo';
import styles from './UploadVideoForm.module.css';

type Props = {
  userProfileId: number;
};

export default function VideoForm({ userProfileId }: Props) {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');

  async function createVideo() {
    const response = await fetch('/api/userprofiles', {
      method: 'POST',
      body: JSON.stringify({
        videoUrl: videoUrlInput,
        title: titleInput,
        description: descriptionInput,
        tags: tagsInput,
        location: locationInput,
        userProfileId: userProfileId,
      }),
    });
    const data = await response.json();
    console.log('adata', data);
  }

  return (
    <div className={styles.mainContainer}>
      <form
        className={styles.form}
        onSubmit={async (event) => {
          event.preventDefault();
          await createVideo();
        }}
      >
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
      <UploadVideo setVideoUrlInput={setVideoUrlInput} />
    </div>
  );
}
