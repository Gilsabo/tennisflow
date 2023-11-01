'use client';
import { useState } from 'react';

type Props = {
  setProfilePictureUrlInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function UploadProfileImage(props: Props) {
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState<any>('');
  const [selectedFile, setSelectedFile] = useState<File>();

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = e.target.files?.[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
    setFileInputState(e.target.value);
  };

  const uploadImage = async (
    base64EncodedImage: string | ArrayBuffer | null,
  ) => {
    try {
      const response = await fetch('/api/uploadprofileimages', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
      });
      setFileInputState('');
      setPreviewSource('');
      const data = await response.json();
      props.setProfilePictureUrlInput(data.formDATA);

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
      await uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
    };
  };
  return (
    <div>
      <h1 className="title">Upload an Image</h1>

      <form onSubmit={handleSubmitFile} className="form">
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
        />
        <button>Submit</button>
      </form>
      {previewSource && (
        <img
          src={previewSource}
          alt="chosen"
          style={{ height: '150px', width: '150px' }}
        />
      )}
    </div>
  );
}
