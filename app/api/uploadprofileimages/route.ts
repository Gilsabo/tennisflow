import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

type Error = {
  error: string;
};

type UploadImageProfileResponseBody =
  | {
      uploadedProfileImage: string;
    }
  | Error;

const uploadProfileImageSchema = z.object({
  data: z.string(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UploadImageProfileResponseBody>> {
  const body = await request.json();
  const parsedBody = uploadProfileImageSchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: 'Invalid image format.',
      },
      { status: 400 },
    );
  }
  const fileStr: string = parsedBody.data.data;

  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: 'gm0xdnab',
  });

  if (!uploadedResponse.public_id) {
    return NextResponse.json(
      {
        error: 'Error uploading the image .',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    uploadedProfileImage: uploadedResponse.public_id,
  });
}
