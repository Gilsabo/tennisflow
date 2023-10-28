'use client';
import { useState } from 'react';

export default function UploadProfileImage() {
  const [imageSelected, setImageSelected] = useState<File>();
  const uploadImage = () => {
    if (!imageSelected) {
      console.error('No image selected');
      return;
    }
    const formData = new FormData();
    formData.append('file', imageSelected);
    formData.append('upload_preset', 'gm0xdnab');
    fetch('https://api.cloudinary.com/v1_1/dqiq3eutn/image/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log(response);
        return response.json(); // Assuming the response is in JSON format
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <label>
        Insert profile image
        <input
          type="file"
          onChange={(e) => {
            if (!e.target.files) return;
            setImageSelected(e.target.files[0]);
          }}
        />
      </label>
      <button type="button" onClick={uploadImage}>
        Upload image
      </button>
    </>
  );
}
