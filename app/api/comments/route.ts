import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createComent } from '../../../database/comments';
import { Comment } from '../../../migrations/00005-createTableComments';
import { Error } from '../userprofiles/route';

type CreateCommentResponseBoyd =
  | {
      commentUser: Comment;
    }
  | Error;

const commentUserSchema = z.object({
  videoId: z.number(),
  userProfileId: z.number(),
  commentUser: z.string(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateCommentResponseBoyd>> {
  const body = await request.json();

  const result = commentUserSchema.safeParse(body);

  console.log('resuuult', result);

  if (!result.success) {
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }

  const commentUser = await createComent(
    result.data.videoId,
    result.data.userProfileId,
    result.data.commentUser,
  );

  if (!commentUser) {
    return NextResponse.json(
      {
        error: 'Error creating the new comment',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    commentUser: commentUser,
  });
}
