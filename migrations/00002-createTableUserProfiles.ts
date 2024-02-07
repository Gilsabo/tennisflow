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
  profilePictureUrl: string | undefined;
  userId: number;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      user_profiles (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        email VARCHAR(30) NOT NULL UNIQUE,
        age INTEGER NOT NULL,
        years_experience INTEGER NOT NULL,
        dominant_hand VARCHAR(30) NOT NULL,
        description VARCHAR(250) NOT NULL,
        profile_picture_url VARCHAR(250),
        user_id INTEGER NOT NULL REFERENCES users (id) ON DELETE CASCADE
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
