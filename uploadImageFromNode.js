import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadator = async () => {
  try {
    const data = await cloudinary.uploader.upload(
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
      { public_id: 'olympic_flag' },
    );
    console.log(data.url); // Access the URL of the uploaded asset
  } catch (err) {
    console.error(err);
  }
};

async function run() {
  const result = await cloudinary.uploader.upload(
    'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
  );
  console.log(result);
}
export default run;

export { uploadator };
