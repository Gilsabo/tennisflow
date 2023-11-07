'use client';
import { UserCircleIcon } from '@heroicons/react/24/solid';
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
    console.log('sent it');
    e.preventDefault();
    console.log('Input field is empty!');
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
      <h1 className="block text-sm mt-8 font-medium leading-6 text-gray-900">
        Upload an Image
      </h1>

      <form onSubmit={handleSubmitFile}>
        {previewSource ? (
          <img
            className="h-20 w-20 rounded-full"
            src={previewSource}
            alt="chosen"
          />
        ) : (
          <UserCircleIcon
            className="h-20 w-20 text-gray-300"
            aria-hidden="true"
          />
        )}

        <label className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Select File
          <input
            type="file"
            name="image"
            className="absolute hidden"
            onChange={handleFileInputChange}
            value={fileInputState}
          />
        </label>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
