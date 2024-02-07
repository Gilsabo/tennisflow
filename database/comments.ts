import { cache } from 'react';
import {
  Comment,
  CommentsVideo,
} from '../migrations/00004-createTableComments';
import { sql } from './connect';

export const createComent = cache(
  async (videoId: number, userProfileId: number, commentUser: string) => {
    const [comment] = await sql<Comment[]>`
      INSERT INTO
        comments (
          video_id,
          user_profile_id,
          comment_user,
          TIMESTAMP
        )
      VALUES
        (
          ${videoId},
          ${userProfileId},
          ${commentUser},
          CURRENT_TIMESTAMP
        ) RETURNING *
    `;
    return comment;
  },
);

export const getAllCommentsFromEachVideo = cache(async () => {
  const commentsFromVideo = await sql<CommentsVideo[]>`
    SELECT
      comments.comment_user AS comment_user,
      videos.title,
      videos.id AS video_id,
      videos.tags,
      user_profiles.profile_picture_url user_profiles.first_name,
      user_profiles.last_name,
    FROM
      comments
      INNER JOIN videos ON videos.id = comments.video_id
      INNER JOIN user_profiles ON user_profiles.id = videos.user_profile_id
  `;
  return commentsFromVideo;
});
