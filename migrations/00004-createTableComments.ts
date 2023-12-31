import { Sql } from 'postgres';

export type Comment = {
  id: number;
  video_id: number;
  userProfileId: number;
  comment: string;
};

export type CommentsVideo = {
  commentUser: string;
  title: string;
  videoId: number;
  tags: string[] | undefined;
  profilePictureUrl: string | null;
  firstName: string;
  lastName: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      comments (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        video_id INTEGER NOT NULL REFERENCES videos,
        user_profile_id INTEGER NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE,
        comment_user VARCHAR(250) NOT NULL,
        TIMESTAMP TIMESTAMPTZ NOT NULL
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE comments `;
}
