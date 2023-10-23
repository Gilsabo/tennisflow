import 'server-only';
import { cache } from 'react';
import { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

export const getUsers = cache(async () => {
  // return users;
  const users = await sql<User[]>`
    SELECT * FROM users
  `;
  return users;
});
