'use client';

import React, { useState } from 'react';
import ReactPlayer from 'react-player';

type Props = {
  setVideoUrlInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function UploadVideo(props: Props) {
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);

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
      props.setVideoUrlInput(data.uploadedVideo);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitFile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) return;

    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      await uploadVideoPlayer(reader.result);
      setLoading(false);
    };
    reader.onerror = () => {
      console.error('error!');
    };
  };

  return (
    <>
      <form onSubmit={handleSubmitFile} className="mb-4">
        <label className="rounded-md mt-6 bg-slate-200 px-2.5 py-1.5 text-sm font-semibold text-violet-900 hover:bg-violet-900 hover:text-slate-200">
          Select Video
          <input
            type="file"
            name="video"
            className="absolute hidden"
            onChange={handleFileInputChange}
            value={fileInputState}
            disabled={loading}
          />
        </label>
        <button
          disabled={loading}
          className="rounded-md mt-6 bg-slate-200 px-2.5 py-1.5 text-sm font-semibold text-violet-900 hover:bg-violet-900 hover:text-slate-200 sm:ml-2"
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      <div>
        {selectedFile && (
          <div>
            <ReactPlayer
              width={300}
              url={URL.createObjectURL(selectedFile)}
              controls
            />
          </div>
        )}
      </div>
    </>
  );
}
