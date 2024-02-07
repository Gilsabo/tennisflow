import { cache } from 'react';
import { UserProfile } from '../migrations/00002-createTableUserProfiles';
import { sql } from './connect';

export const getUserProfiles = cache(async () => {
  // return userProfiles;
  const userProfiles: UserProfile[] = await sql<UserProfile[]>`
    SELECT
      *
    FROM
      user_profiles
  `;
  return userProfiles;
});

export const getUserProfileById = cache(async (id: number) => {
  // Postgres always returns an array
  const [userProfile] = await sql<UserProfile[]>`
    SELECT
      *
    FROM
      user_profiles
    WHERE
      id = ${id}
  `;
  return userProfile;
});

// id: number;
// firstName: string;
// lastName: string;
// email: string;
// age: number;
// yearsExperience: number;
// dominantHand: string;
// description: string;
// profilePictureUrl: string | null;

export const createUserProfile = cache(
  async (
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    yearsExperience: number,
    dominantHand: string,
    description: string,
    profilePictureUrl: string | null,
    userId: number,
  ) => {
    const [userProfile] = await sql<UserProfile[]>`
      INSERT INTO
        user_profiles (
          first_name,
          last_name,
          email,
          age,
          years_experience,
          dominant_hand,
          description,
          profile_picture_url,
          user_id
        )
      VALUES
        (
          ${firstName},
          ${lastName},
          ${email},
          ${age},
          ${yearsExperience},
          ${dominantHand},
          ${description},
          ${profilePictureUrl || null},
          ${userId}
        ) RETURNING *
    `;
    return userProfile;
  },
);

export const getUserProfileByUserId = cache(async (userId: number) => {
  // Postgres always returns an array
  const [userProfile] = await sql<UserProfile[]>`
    SELECT
      *
    FROM
      user_profiles
    WHERE
      user_id = ${userId}
  `;
  return userProfile;
});

export const updateProfileByUserProfileId = cache(
  async (
    userProfileId: number,
    firstName: string,
    lastName: string,
    email: string,
    age: number,
    yearsExperience: number,
    dominantHand: string,
    description: string,
    profilePictureUrl?: string,
  ) => {
    const [userProfile] = await sql<UserProfile[]>`
      UPDATE user_profiles
      SET
        first_name = ${firstName},
        last_name = ${lastName},
        email = ${email},
        age = ${age},
        years_experience = ${yearsExperience},
        dominant_hand = ${dominantHand},
        description = ${description},
        profile_picture_url = ${profilePictureUrl || null}
      WHERE
        id = ${userProfileId} RETURNING *
    `;
    return userProfile;
  },
);
