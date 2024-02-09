import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { deleteVideo } from '../../../../database/videos';
import { Video } from '../../../../migrations/00003-createTableVideos';

export type Error = {
  error: string;
};

export type VideoResponseBodyDelete =
  | {
      video: Video;
    }
  | Error;

const userSchema = z.object({
  videoId: z.number(),
  videoUrl: z.string(),
});

export async function DELETE(
  request: NextRequest,
): Promise<NextResponse<VideoResponseBodyDelete>> {
  const body = await request.json();

  const result = userSchema.safeParse(body);

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
