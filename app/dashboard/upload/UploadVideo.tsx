'use client';

import React, { useState } from 'react';
import ReactPlayer from 'react-player';

type Props = {
  setVideoUrlInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function UploadVideo(props: Props) {
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
    setFileInputState(e.target.value);
  };

  const uploadVideoPlayer = async (
    base64EncodedVideo: string | ArrayBuffer | null,
  ) => {
    try {
      const response = await fetch('/api/uploadvideos', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedVideo }),
        headers: { 'Content-Type': 'application/json' },
      });
      setFileInputState('');

      const data = await response.json();
      props.setVideoUrlInput(data.formDATA);

      console.log('dame la public id!', data, typeof data.formDATA);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      await uploadVideoPlayer(reader.result);
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
    };
  };

  return (
    <div>
      <h1 className="title">Upload a video</h1>

      <form onSubmit={handleSubmitFile} className="form">
        <input
          id="fileInput"
          type="file"
          name="video"
          onChange={handleFileInputChange}
          value={fileInputState}
        />
        <button>Submit</button>
      </form>
      {selectedFile && (
        <div>
          <ReactPlayer url={URL.createObjectURL(selectedFile)} controls />
        </div>
      )}
    </div>
  );
}
