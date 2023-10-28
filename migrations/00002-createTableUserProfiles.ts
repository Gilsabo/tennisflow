import { Sql } from 'postgres';

export type UserProfile = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  yearsExperience: number;
  dominantHand: string;
  description: string;
  profilePictureUrl: string | null;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE user_profiles(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    email varchar(30) NOT NULL UNIQUE,
    age integer NOT NULL,
    years_experience integer NOT NULL,
    dominant_hand varchar(30) NOT NULL,
    description varchar(250) NOT NULL,
    profile_picture_url varchar(250),
    user_id integer NOT NULL REFERENCES users (id) ON DELETE CASCADE
  )

  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users
`;
}
