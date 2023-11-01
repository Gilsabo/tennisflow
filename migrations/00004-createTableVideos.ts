import { Sql } from 'postgres';

export type Video = {
  id: number;
  videoUrl: string;
  title: string;
  description: string;
  tags: string[] | undefined;
  location: string | undefined;
  timestamp: Date;
  userProfileId: number;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE videos(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    video_url varchar(250) NOT NULL UNIQUE,
    title varchar(100) NOT NULL,
    description varchar(250) NOT NULL,
    tags JSONB,
    location varchar(30),
    timestamp TIMESTAMPTZ NOT NULL,
    user_profile_id integer NOT NULL REFERENCES user_profiles (id) ON DELETE CASCADE
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE videos
  `;
}
