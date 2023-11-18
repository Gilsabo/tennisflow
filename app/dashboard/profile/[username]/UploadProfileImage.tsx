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
  const [loading, setLoading] = useState<boolean>(false);

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

    setLoading(true);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = async () => {
      await uploadImage(reader.result);
      setLoading(false);
    };
    reader.onerror = () => {
      console.error('AHHHHHHHH!!');
      setLoading(false);
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

        <label className="rounded-md mt-2 bg-slate-200 px-2.5 py-1.5 text-sm font-semibold text-violet-900 hover:bg-violet-900 hover:text-slate-200 ml-2">
          Select File
          <input
            type="file"
            name="image"
            className="absolute hidden"
            onChange={handleFileInputChange}
            value={fileInputState}
            disabled={loading}
          />
        </label>
        <button
          className="rounded-md mt-2 bg-slate-200 px-2.5 py-1.5 text-sm font-semibold text-violet-900 hover:bg-violet-900 hover:text-slate-200 ml-2"
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}
