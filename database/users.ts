import 'server-only';
import { cache } from 'react';
import { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
};

export type Id = {
  id: number;
};
export const getUsers = cache(async () => {
  // return users;
  const users = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
  `;
  return users;
});

export const deleteUser = cache(async (userName: string) => {
  const [deletedUser] = await sql<User[]>`
    DELETE FROM users
    WHERE
      user_name = ${userName.toLowerCase()} RETURNING id,
      user_name;
  `;

  return deletedUser;
});

export const createUser = cache(
  async (userName: string, passwordHash: string) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          user_name,
          password_hash
        )
      VALUES
        (
          ${userName.toLowerCase()},
          ${passwordHash}
        ) RETURNING id,
        user_name
    `;
    return user;
  },
);

export const getUserByUsername = cache(async (userName: string) => {
  const [user] = await sql<User[]>`
    SELECT
      id,
      user_name
    FROM
      users
    WHERE
      user_name = ${userName.toLowerCase()}
  `;
  return user;
});

export const getUserWithPasswordHashByUsername = cache(
  async (userName: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        *
      FROM
        users
      WHERE
        user_Name = ${userName.toLowerCase()}
    `;
    return user;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<User[]>`
    SELECT
      users.id,
      users.user_name
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
  `;
  return user;
});
// takes the id by passing the name. this is needed to create the profile. We need the id from users table and pass it as foreing
// in user_profiles table so that we have the foreign kew
export const getUserIdByUserName = cache(async (userName: string) => {
  const [id] = await sql<Id[]>`
    SELECT
      id
    FROM
      users
    WHERE
      user_name = ${userName}
  `;
  return id;
});
