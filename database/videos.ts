import { cache } from 'react';
import {
  Video,
  VideoWithComments,
} from '../migrations/00003-createTableVideos';
import { sql } from './connect';

export const createUserVideo = cache(
  async (
    videoUrl: string,
    title: string,
    description: string,
    tags: any,
    location: string,
    userProfileId: number,
  ) => {
    const [videos] = await sql<Video[]>`
      INSERT INTO
        videos (
          video_url,
          title,
          description,
          tags,
          location,
          TIMESTAMP,
          user_profile_id
        )
      VALUES
        (
          ${videoUrl},
          ${title},
          ${description},
          ${sql.json(tags)},
          ${location},
          CURRENT_TIMESTAMP,
          ${userProfileId}
        ) RETURNING *
    `;
    return videos;
  },
);

export const getVideos = cache(async () => {
  const videos = await sql<Video[]>`
    SELECT
      *
    FROM
      videos
  `;
  return videos;
});

export const getVideoByIdVideo = cache(async (idVideo: number) => {
  const videos = await sql<Video[]>`
    SELECT
      *
    FROM
      videos
    WHERE
      id = ${idVideo}
  `;
  return videos;
});

export const getVideoWithcomments = cache(async (videoId: number) => {
  const videoWithComment = await sql<VideoWithComments[]>`
    SELECT
      comments.id,
      comments.comment_user,
      comments.timestamp,
      user_profiles.first_name,
      user_profiles.last_name,
      user_profiles.profile_picture_url
    FROM
      comments
      INNER JOIN videos ON videos.id = comments.video_id
      INNER JOIN user_profiles ON user_profiles.id = comments.user_profile_id
    WHERE
      videos.id = ${videoId}
  `;
  return videoWithComment;
});

export const getUserVideosByUserProfileId = cache(
  async (userProfileId: number) => {
    const videos = await sql<Video[]>`
      SELECT
        *
      FROM
        videos
      WHERE
        user_profile_id = ${userProfileId}
    `;
    return videos;
  },
);
