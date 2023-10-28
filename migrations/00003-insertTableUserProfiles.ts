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

const userProfiles = [
  {
    userId: 11,
    firstName: 'Roger',
    lastName: 'Federer',
    email: 'rogerthegoat@gmail.com',
    age: 41,
    yearsExperience: 38,
    dominantHand: 'right-handed',
    description: 'I am crazy about tennis. I would like to improve my backhand',
    profilePictureUrl: 'RogerFederer',
  },
  {
    userId: 13,
    firstName: 'Rafael',
    lastName: 'Nadal Parera',
    email: 'vamosrafa@gmail.com',
    age: 37,
    yearsExperience: 34,
    dominantHand: 'left-handed',
    description:
      'I am fed up of tennis but my uncle forces me to play. I want to improve my serve',
    profilePictureUrl: 'RafaelNadal',
  },
  {
    userId: 12,
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
    userId: 14,
    firstName: 'Gil',
    lastName: 'Sala',
    email: 'gilato@gmail.com',
    age: 34,
    yearsExperience: 35,
    dominantHand: 'right-handed',
    description: 'I want to quit. help me!',
    profilePictureUrl: 'GilSala',
  },
];

export async function up(sql: Sql) {
  for (const userProfile of userProfiles) {
    await sql`
  INSERT INTO user_profiles
  (first_name, last_name, email, age, years_experience, dominant_hand, description, profile_picture_url, user_id)
  VALUES
  (${userProfile.firstName},${userProfile.lastName},${userProfile.email},${userProfile.age},${userProfile.yearsExperience},${userProfile.dominantHand},${userProfile.description},${userProfile.profilePictureUrl}, ${userProfile.userId})

  `;
  }
}

export async function down(sql: Sql) {
  for (const userProfile of userProfiles) {
    await sql`
  DELETE FROM user_profiles WHERE id = ${userProfile.userId}
  `;
  }
}
