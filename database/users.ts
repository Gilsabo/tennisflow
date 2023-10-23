import 'server-only';
import { cache } from 'react';
import { Users } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

export const getUsers = cache(async () => {
  // return users;
  const users = await sql<Users[]>`
    SELECT * FROM animals
  `;
  return users;
});
