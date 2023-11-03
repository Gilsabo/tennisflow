'use client';
import React, { useState } from 'react';
import UploadVideo from './UploadVideo';
import styles from './UploadVideoForm.module.css';

type Props = {
  userProfileId: number;
};

export default function VideoForm({ userProfileId }: Props) {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [tagsInput, setTagsInput] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');

  const request = {
    videoUrl: videoUrlInput,
    title: titleInput,
    description: descriptionInput,
    tags: tagsInput,
    location: locationInput,
    userProfileId: userProfileId,
  };
  console.log(request);

  async function createVideo() {
    const response = await fetch('/api/uservideos', {
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
    console.log('datavideo', data);
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
        {/* <label>
          Strokes to focus on
          <input
            value={tagsInput}
            onChange={(e) => setTagsInput(e.currentTarget.value)}
          />
        </label> */}
        <label>
          Pick all the strokes you want to improve:
          <select
            multiple={true}
            value={tagsInput}
            onChange={(e) => {
              const options = [...e.target.selectedOptions];
              const values = options.map((option) => option.value);
              setTagsInput(values);
            }}
          >
            <option value="forhand">Forhand</option>
            <option value="backhand">Backhand</option>
            <option value="volley">Volley</option>
            <option value="smash">Smash</option>
            <option value="serve">Serve</option>
            <option value="foot-work">foot-work</option>
          </select>
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
        <button>Submit</button>
      </form>
      <UploadVideo setVideoUrlInput={setVideoUrlInput} />
    </div>
  );
}