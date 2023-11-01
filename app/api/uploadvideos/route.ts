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

type ResponsDataBodyFormData =
  | {
      formDATA: string;
    }
  | Error;

const uploadVideoSchema = z.object({
  data: z.string(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ResponsDataBodyFormData>> {
  const body = await request.json();

  const parsedBody = uploadVideoSchema.safeParse(body);
  // const fileStr = body.data;
  console.log(
    'bodyrrr',
    body,
    'typeof',
    typeof parsedBody,
    'parsedbody',
    parsedBody,
  );

  if (!parsedBody.success) {
    return NextResponse.json(
      {
        error: 'Invalid video format.',
      },
      { status: 400 },
    );
  }
  const fileStr: string = parsedBody.data.data;

  const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: 'gm0xdnab',
    resource_type: 'video',
  });

  console.log('upploaded', uploadedResponse.public_id);

  if (!uploadedResponse.public_id) {
    return NextResponse.json(
      {
        error: 'Error uploading the image',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    formDATA: uploadedResponse.public_id,
  });
}
