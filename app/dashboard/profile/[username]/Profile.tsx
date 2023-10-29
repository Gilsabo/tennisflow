'use client';

import { useState } from 'react';
// import { getUserProfileIdByUsername } from '../../../../database/profiles';
import styles from './Profile.module.css';

// import UploadProfileImage from './UploadProfileImage';
type Props = {
  userId: number;
};

export default function Profile({ userId }: Props) {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [ageInput, setAgeInput] = useState<number>();
  const [yearsExperienceInput, setYearsExperienceInput] = useState<number>();
  const [dominantHandInput, setDominantHandInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [profilePictureUrlInput, setProfilePictureUrlInput] = useState('');

  // const userId = await getUserProfileIdByUsername(params.username);

  // console.log(userId);

  const requestBody = {
    firstName: firstNameInput,
    lastName: lastNameInput,
    email: emailInput,
    age: ageInput,
    yearsExperience: yearsExperienceInput,
    dominantHand: dominantHandInput,
    description: descriptionInput,
    profilePictureUrl: profilePictureUrlInput.toString(), // Convert File to string URL if needed
    userId: userId,
  };

  console.log('Request Body:', requestBody); // Log the request body

  async function createUserProfile() {
    const response = await fetch('/api/userprofiles', {
      method: 'POST',
      body: JSON.stringify({
        firstName: firstNameInput,
        lastName: lastNameInput,
        email: emailInput,
        age: ageInput,
        yearsExperience: yearsExperienceInput,
        dominantHand: dominantHandInput,
        description: descriptionInput,
        profilePictureUrl: profilePictureUrlInput,
        userId: userId,
      }),
    });
    const data = await response.json();
    console.log('adata', data);
  }

  return (
    <div className={styles.mainContainer}>
      <div>Profile</div>
      <form
        className={styles.form}
        onSubmit={async (event) => {
          event.preventDefault();
          await createUserProfile();
        }}
      >
        <label>
          First name
          <input
            value={firstNameInput}
            onChange={(e) => setFirstNameInput(e.currentTarget.value)}
            required
          />
        </label>
        <label>
          Last name
          <input
            value={lastNameInput}
            onChange={(e) => setLastNameInput(e.currentTarget.value)}
            required
          />
        </label>
        <label>
          E-mail
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.currentTarget.value)}
            required
          />
        </label>
        <label>
          Age
          <input
            value={ageInput}
            onChange={(e) => setAgeInput(Number(e.currentTarget.value))}
            required
          />
        </label>
        <label>
          Years of experience
          <input
            value={yearsExperienceInput}
            onChange={(e) =>
              setYearsExperienceInput(Number(e.currentTarget.value))
            }
            required
          />
        </label>
        <label>
          Dominant hand
          <input
            value={dominantHandInput}
            onChange={(e) => setDominantHandInput(e.currentTarget.value)}
            required
          />
        </label>

        <textarea
          rows={25}
          cols={50}
          maxLength={250}
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.currentTarget.value)}
          required
        />

        {/* <UploadProfileImage
          profilePictureUrlInput={profilePictureUrlInput}
          setProfilePictureUrlInput={setProfilePictureUrlInput}
        /> */}
        <label>
          Insert profile image
          <input
            type="file"
            onChange={(event) => {
              if (!event.target.files) return;
              setProfilePictureUrlInput('');
            }}
          />
        </label>

        <button>Confirm</button>
      </form>
    </div>
  );
}
