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
    <>
      <form onSubmit={handleSubmitFile}>
        <label className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Select File
          <input
            type="file"
            name="video"
            className="absolute hidden"
            onChange={handleFileInputChange}
            value={fileInputState}
          />
        </label>
        <button className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Upload
        </button>
      </form>
      <div>
        {selectedFile && (
          <div className="rounded-lg">
            <ReactPlayer url={URL.createObjectURL(selectedFile)} controls />
          </div>
        )}
      </div>
    </>
  );
}
