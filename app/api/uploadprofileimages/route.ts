import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { NextRequest, NextResponse } from 'next/server';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// import { z } from 'zod';

type Error = {
  error: string;
};

type ResponsDataBodyFormData =
  | {
      formDATA: string;
    }
  | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ResponsDataBodyFormData>> {
  const body = await request.json();
  const fileStr = body.data;
  console.log('body', body);
  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: 'gm0xdnab',
  });

  console.log('upploaded', uploadedResponse.public_id);

  return NextResponse.json({
    formDATA: uploadedResponse.public_id,
  });
}
