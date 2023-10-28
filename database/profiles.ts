import { cache } from 'react';
import { UserProfile } from '../migrations/00002-createTableUserProfiles';
import { sql } from './connect';

export const getUserProfiles = cache(async () => {
  // return userProfiles;
  const userProfiles = await sql<UserProfile[]>`
    SELECT * FROM user_profiles
  `;
  return userProfiles;
});
