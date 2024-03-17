import { Sql } from 'postgres';

export type User = {
  id: number;
  userName: string;
};

export type UserWithProfilePictureUrl = User & { profilePicture: string };

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_name VARCHAR(80) NOT NULL UNIQUE,
        password_hash VARCHAR(80) NOT NULL
      );
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users`;
}
