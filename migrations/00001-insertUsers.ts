import { Sql } from 'postgres';

//     user_name varchar(30) NOT NULL,
//     first_name varchar(30) NOT NULL,
//     last_name varchar(30) NOT NULL,
//     email varchar(30) NOT NULL UNIQUE,
//     password varchar(30) NOT NULL,
//     age integer NOT NULL,
//     profile_picture_url varchar(250),
//     years_experience integer NOT NULL,
//     dominant_hand varchar(30) NOT NULL,
//     description varchar(250) NOT NULL

const users = [
  {
    id: 1,
    userName: 'Rogi',
    firstName: 'Roger',
    lastName: 'Federer',
    email: 'rogerthegoat@gmail.com',
    password: 'ilovetennis',
    age: 41,
    profilePictureUrl: 'RogerFederer',
    yearsExperience: 38,
    dominantHand: 'right-handed',
    description: 'I am crazy about tennis. I would like to improve my backhand',
  },
  {
    id: 2,
    userName: 'Torero',
    firstName: 'Rafael',
    lastName: 'Nadal Parera',
    email: 'vamosrafa@gmail.com',
    password: 'ilovetennis',
    age: 37,
    profilePictureUrl: 'RafaelNadal',
    yearsExperience: 34,
    dominantHand: 'left-handed',
    description:
      'I am fed up of tennis but my uncle forces me to play. I want to improve my serve',
  },
  {
    id: 3,
    userName: 'Nole',
    firstName: 'Novak',
    lastName: 'Djokovic',
    email: 'idemo@gmail.com',
    password: 'ilovetennis',
    age: 36,
    profilePictureUrl: 'NovakDjokovic',
    yearsExperience: 35,
    dominantHand: 'right-handed',
    description: 'I want to be loved by every fun. How can I do it?',
  },
  {
    id: 4,
    userName: 'Gil',
    firstName: 'Gil',
    lastName: 'Sala',
    email: 'gilato@gmail.com',
    password: 'ilovetennis',
    age: 34,
    profilePictureUrl: 'GilSala',
    yearsExperience: 35,
    dominantHand: 'right-handed',
    description: 'I want to quit. help me!',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
  INSERT INTO users
  (user_name, first_name, last_name, email, password, age,profile_picture_url, years_experience, dominant_hand, description)
  VALUES
  (${user.userName},${user.firstName},${user.lastName},${user.email},${user.password},${user.age},${user.profilePictureUrl},${user.yearsExperience},${user.dominantHand},${user.description})

  `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
  DELETE FROM users WHERE id = ${user.id}
  `;
  }
}
