import { Sql } from 'postgres';

export type User = {
  id: number;
  userName: string;
  passwordHash: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_name varchar(80) NOT NULL UNIQUE,
      password_hash varchar(80) NOT NULL
  );
    `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users`;
}
