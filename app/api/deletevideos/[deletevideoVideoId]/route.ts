import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { deleteVideo } from '../../../../database/videos';
import { Video } from '../../../../migrations/00003-createTableVideos';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export type Error = {
  error: string;
};

export type DeleteVideoResponseBody =
  | {
      deletedVideo: Video;
    }
  | Error;

const videoUserSchema = z.object({
  videoId: z.number(),
  videoUrl: z.string(),
});

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<DeleteVideoResponseBody>> {
  const body = await request.json();

  const result = videoUserSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error

    return NextResponse.json(
      {
        error: 'video does not exist',
      },
      { status: 400 },
    );
  }

  cloudinary.api
    .delete_resources([`${result.data.videoUrl}`], {
      type: 'upload',
      resource_type: 'video',
    })
    .then(console.log);

  const deletedVideo = await deleteVideo(result.data.videoId);

  if (!deletedVideo) {
    return NextResponse.json(
      {
        error: 'Error deleting Video',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    deletedVideo: deletedVideo,
  });
}
