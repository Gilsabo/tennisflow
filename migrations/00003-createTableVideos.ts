import { Sql } from 'postgres';

export type Video = {
  id: number;
  videoUrl: string;
  title: string;
  description: string;
  tags: string[] | null;
  location: string | null;
  timestamp: Date;
  userProfileId: number;
};

export type VideoWithComment = {
  id: number;
  commentUser: string;
  timestamp: Date;
  firstName: string;
  lastName: string;
  profilePictureUrl: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      videos (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        video_url VARCHAR(250) NOT NULL UNIQUE,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(250) NOT NULL,
        tags VARCHAR(255)[],
        location VARCHAR(30),
        TIMESTAMP TIMESTAMPTZ NOT NULL,
        user_profile_id INTEGER NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE videos `;
}
