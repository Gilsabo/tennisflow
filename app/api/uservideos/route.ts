import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createUserVideo } from '../../../database/videos';
import { Video } from '../../../migrations/00004-createTableVideos';

type Error = {
  error: string;
};

type UserVideoResponseBodyPost =
  | {
      userVideo: Video;
    }
  | Error;

// export type Video = {
//   id: number;
//   videoUrl: string;
//   title: string;
//   description: string;
//   tags: string[] | undefined;
//   location: string | undefined;
//   timestamp: Date;
//   userProfileId: number;
// };

const userVideoSchema = z.object({
  videoUrl: z.string(),
  title: z.string(),
  description: z.string(),
  tags: z.array(z.string()).optional(),
  location: z.string(),
  userProfileId: z.number(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<UserVideoResponseBodyPost>> {
  const body = await request.json();

  const result = userVideoSchema.safeParse(body);

  if (!result.success) {
    // zod send you details about the error
    // console.log(result.error);
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }
  // Get the animals from the database
  const userVideo = await createUserVideo(
    result.data.videoUrl,
    result.data.title,
    result.data.description,
    result.data.tags,
    result.data.location,
    result.data.userProfileId,
  );

  if (!userVideo) {
    return NextResponse.json(
      {
        error: 'Error creating the new video',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    userVideo: userVideo,
  });
}
