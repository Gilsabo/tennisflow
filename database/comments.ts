import { cache } from 'react';
import { Comment } from '../migrations/00005-createTableComments';
import { sql } from './connect';

export const createComent = cache(
  async (videoId: number, userProfileId: number, commentUser: string) => {
    const [comment] = await sql<Comment[]>`
      INSERT INTO
        users (
          video_id,
          user_profile_id,
          comment_user
        )
      VALUES
        (
          ${videoId},
          ${userProfileId},
          ${commentUser}
        ) RETURNING *
    `;
    return comment;
  },
);
