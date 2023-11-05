'use client';
import { useState } from 'react';
import { UserProfile } from '../../../../migrations/00002-createTableUserProfiles';

type Props = {
  profilePlayer: UserProfile;
};

export default function EditProfile(props: Props) {
  const [onEditId, setOnEditId] = useState(0);
  const [onEditFirstNameInput, setOnEditFirstNameInput] = useState('');
  const [onEditLastNameInput, setOnEditLastNameInput] = useState('');
  const [onEditEmailInput, setOnEditEmailInput] = useState('');
  const [onEditAgeInput, setOnEditAgeInput] = useState<number>();
  const [onEditYearsExperienceInput, setOnEditYearsExperienceInput] =
    useState<number>();
  const [onEditDominantHandInput, setOnEditDominantHandInput] = useState('');
  const [onEditDescriptionInput, setOnEditDescriptionInput] = useState('');
  const [onEditProfilePictureUrlInput, setOnEditProfilePictureUrlInput] =
    useState('');

  async function updateProfileByUserId(id: number) {
    const response = await fetch(`/api/userprofiles/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        firstName: onEditFirstNameInput,
        lastName: onEditLastNameInput,
        email: onEditEmailInput,
        age: onEditAgeInput,
        yearsExperience: onEditYearsExperienceInput,
        dominantHand: onEditDominantHandInput,
        description: onEditDescriptionInput,
        profilePictureUrl: onEditProfilePictureUrlInput,
      }),
    });

    const data = await response.json();

    // setAnimalList(
    //   animalList.map((animal) => {
    //     if (animal.id === data.animal.id) {
    // //       return data.animal;
    // //     }
    // //     return animal;
    //   }),
    // );
  }
  return (
    <div>
      <label>
        Name:
        <input
          value={
            props.profilePlayer.id !== onEditId
              ? props.profilePlayer.firstName
              : onEditFirstNameInput
          }
          onChange={(event) =>
            setOnEditFirstNameInput(event.currentTarget.value)
          }
          disabled={props.profilePlayer.id !== onEditId}
        />
      </label>

      <label>
        Last name:
        <input
          value={
            props.profilePlayer.id !== onEditId
              ? props.profilePlayer.lastName
              : onEditLastNameInput
          }
          onChange={(event) =>
            setOnEditLastNameInput(event.currentTarget.value)
          }
          disabled={props.profilePlayer.id !== onEditId}
        />
      </label>

      <label>
        Email:
        <input
          value={
            props.profilePlayer.id !== onEditId
              ? props.profilePlayer.email
              : onEditEmailInput
          }
          onChange={(event) => setOnEditEmailInput(event.currentTarget.value)}
          disabled={props.profilePlayer.id !== onEditId}
        />
      </label>

      <label>
        Age:
        <input
          value={
            props.profilePlayer.id !== onEditId
              ? props.profilePlayer.age
              : onEditAgeInput
          }
          onChange={(event) =>
            setOnEditAgeInput(Number(event.currentTarget.value))
          }
          disabled={props.profilePlayer.id !== onEditId}
        />
      </label>

      <label>
        Years of experience:
        <input
          value={
            props.profilePlayer.id !== onEditId
              ? props.profilePlayer.yearsExperience
              : onEditYearsExperienceInput
          }
          onChange={(event) =>
            setOnEditYearsExperienceInput(Number(event.currentTarget.value))
          }
          disabled={props.profilePlayer.id !== onEditId}
        />
      </label>

      <label>
        Dominant hand:
        <input
          value={
            props.profilePlayer.id !== onEditId
              ? props.profilePlayer.dominantHand
              : onEditDominantHandInput
          }
          onChange={(event) =>
            setOnEditDominantHandInput(event.currentTarget.value)
          }
          disabled={props.profilePlayer.id !== onEditId}
        />
      </label>

      <textarea
        rows={25}
        cols={50}
        maxLength={250}
        value={
          props.profilePlayer.id !== onEditId
            ? props.profilePlayer.description
            : onEditDescriptionInput
        }
        onChange={(event) =>
          setOnEditDescriptionInput(event.currentTarget.value)
        }
        disabled={props.profilePlayer.id !== onEditId}
      />
      {onEditId === props.profilePlayer.id ? (
        <button
          onClick={async () => {
            // await updateProfileByUserId(props.profilePlayer.id);
            setOnEditId(0);
          }}
        >
          save
        </button>
      ) : (
        <button
          onClick={() => {
            setOnEditFirstNameInput(props.profilePlayer.firstName);
            setOnEditLastNameInput(props.profilePlayer.lastName);
            setOnEditEmailInput(props.profilePlayer.email);
            setOnEditAgeInput(Number(props.profilePlayer.age));
            setOnEditAgeInput(Number(props.profilePlayer.yearsExperience));
            setOnEditDominantHandInput(props.profilePlayer.dominantHand);
            setOnEditDescriptionInput(props.profilePlayer.description);
            setOnEditId(props.profilePlayer.id);
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
}
