import { Sql } from 'postgres';

export type User = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: number;
  profilePictureUrl: string | null;
  yearsExperience: number;
  dominantHand: string;
  description: string;
};

export async function up(sql: Sql) {
  await sql`
  CREATE TABLE users(
    id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_name varchar(30) NOT NULL,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    email varchar(30) NOT NULL UNIQUE,
    password varchar(30) NOT NULL,
    age integer NOT NULL,
    profile_picture_url varchar(250),
    years_experience integer NOT NULL,
    dominant_hand varchar(30) NOT NULL,
    description varchar(250) NOT NULL
  )
  `;
}

export async function down(sql: Sql) {
  await sql`
  DROP TABLE users
`;
}
