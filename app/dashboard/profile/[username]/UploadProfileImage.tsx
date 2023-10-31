'use client';
import { useState } from 'react';

export default function UploadProfileImage() {
  const [fileInputState, setFileInputState] = useState<any>('');
  const [previewSource, setPreviewSource] = useState<any>('');
  const [selectedFile, setSelectedFile] = useState<any>();

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const uploadImage = async (base64EncodedImage: any) => {
    try {
      const response = await fetch('/api/uploadprofileimages', {
        method: 'POST',
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { 'Content-Type': 'application/json' },
      });
      setFileInputState('');
      setPreviewSource('');
      const data = await response.json();
      console.log('dame la public id!', data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmitFile = (e: any) => {
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
          className="form-input"
        />
        <button className="btn">Submit</button>
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

// export default function UploadProfileImage() {
//   const [result, setResult] = useState('');

//   const handleImageUpload = (event: any) => {
//     event.preventDefault();
//     const file = event.currentTarget['fileInput'].files[0];

//     const formData = new FormData();
//     formData.append('file', file);
//     console.log('file', file, 'formData', formData);

//     fetch('/api/uploadprofileimages', {
//       method: 'POST',
//       body: formData,
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setResult(data);
//       })
//       .catch((error) => {
//         console.error('errorrrr', error);
//       });
//   };
//   return (
//     <div>
//       <form onSubmit={handleImageUpload}>
//         <input id="fileInput" type="file" />
//         <input type="submit" />
//       </form>
//       <br />
//       <br />
//       Result:
//       <br />
//       <pre>{JSON.stringify(result, null, 2)}</pre>
//     </div>
//   );
// }
