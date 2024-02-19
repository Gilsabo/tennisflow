import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { deleteVideo } from '../../../../database/videos';
import { Video } from '../../../../migrations/00003-createTableVideos';

export type Error = {
  error: string;
};

export type DeleteVideoResponseBody =
  | {
      video: Video;
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
    video: deletedVideo,
  });
}
