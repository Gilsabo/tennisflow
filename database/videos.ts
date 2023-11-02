import { cache } from 'react';
import { Video } from '../migrations/00004-createTableVideos';
import { sql } from './connect';

export const createUserVideo = cache(
  async (
    videoUrl: string,
    title: string,
    description: string,
    tags: string[] | undefined,
    location: string,
    userProfileId: number,
  ) => {
    const [videos] = await sql<Video[]>`
    INSERT INTO videos
    (video_url, title, description, tags, location, timestamp, user_profile_id)
    VALUES
    (${videoUrl},${title},${description},${
      tags || null
    },${location},CURRENT_TIMESTAMP, ${userProfileId}
    )
    RETURNING *`;
    return videos;
  },
);
