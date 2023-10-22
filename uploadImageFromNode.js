'use server';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadator = () => {
  try {
    const data = cloudinary.uploader.upload(
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
      { public_id: 'olympic_flag' },
    );
    console.log(data.url); // -->Access the URL of the uploaded asset
  } catch (err) {
    console.error(err);
  }
};

uploadator();

export default uploadator;

cloudinary.v2.uploader
  .upload(
    'https://res.cloudinary.com/demo/video/upload/v1689235939/video_upload_example.mp4',
    { resource_type: 'video', public_id: 'video_upload_example' },
  )
  .then((data) => {
    console.log(data.playback_url);
  })
  .catch((err) => {
    console.err(err);
  });
