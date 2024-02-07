'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { UserProfile } from '../../../../migrations/00002-createTableUserProfiles';

type Props = {
  profilePlayer: UserProfile;
  userName: string;
};

export default function EditProfile(props: Props) {
  const [onEditId, setOnEditId] = useState(0);
  const [onEditFirstNameInput, setOnEditFirstNameInput] = useState('');
  const [onEditLastNameInput, setOnEditLastNameInput] = useState('');
  const [onEditEmailInput, setOnEditEmailInput] = useState('');
  const [onEditAgeInput, setOnEditAgeInput] = useState<number>();
  const [onEditYearsExperienceInput, setOnEditYearsExperienceInput] =
    useState<number>();
  // const [dominantHandInput, setDominantHandInput] = useState('');
  const [onEditDominantHandInput, setOnEditDominantHandInput] = useState('');
  const [onEditDescriptionInput, setOnEditDescriptionInput] = useState('');
  const [onEditProfilePictureUrlInput, setOnEditProfilePictureUrlInput] =
    useState<string | null>('');

  const router = useRouter();

  function handleDominandHand(event: React.ChangeEvent<HTMLInputElement>) {
    // Updating the state with the selected radio button's value
    setOnEditDominantHandInput(event.target.id);
  }

  async function updateProfileByUserId(userName: string) {
    const response = await fetch(`/api/userprofiles/${userName}`, {
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
        userId: props.profilePlayer.id,
      }),
    });

    const data = await response.json();
    console.log('userprofileupdatedata', data);
  }

  async function deleteUser(userName: string) {
    const response = await fetch(`/api/deleteusers/${userName}`, {
      method: 'DELETE',
      body: JSON.stringify({
        id: props.profilePlayer.id,
        userName: props.userName,
      }),
    });

    const data = await response.json();
    console.log('deletedUserName', data);
  }

  return (
    <div className="sm:ml-16 pl-20">
      <div>
        <div className="border-b mt-8 border-gray-900/10 pb-12 ">
          <h2 className="text-base font-semibold text-gray-900">
            Edit your profile,
            <span className="capitalize"> {props.userName}</span>
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Modify your profile whenever you wish.
          </p>
        </div>
        <div className="mt-10 grid gap-x-6 gap-y-8 grid-cols-6">
          <div className="col-span-4 sm:col-span-2">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-900 sm:text-sm"
              />
            </div>
          </div>
          <div className="col-span-4 sm:col-span-2">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-900 sm:text-sm"
              />
            </div>
          </div>
          <div className="col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={
                  props.profilePlayer.id !== onEditId
                    ? props.profilePlayer.email
                    : onEditEmailInput
                }
                onChange={(event) =>
                  setOnEditEmailInput(event.currentTarget.value)
                }
                disabled={props.profilePlayer.id !== onEditId}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-900 sm:text-sm"
              />
            </div>
          </div>
          <div className="col-span-4 sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-900"
            >
              Age
            </label>
            <div className="mt-2">
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
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-900 sm:text-sm"
              />
            </div>
          </div>

          <div className="col-span-4 sm:col-span-2">
            <label
              htmlFor="Years of experience"
              className="block text-sm font-medium text-gray-900"
            >
              Years of experience
            </label>
            <div className="mt-2">
              <input
                value={
                  props.profilePlayer.id !== onEditId
                    ? props.profilePlayer.yearsExperience
                    : onEditYearsExperienceInput
                }
                onChange={(event) =>
                  setOnEditYearsExperienceInput(
                    Number(event.currentTarget.value),
                  )
                }
                disabled={props.profilePlayer.id !== onEditId}
                type="number"
                required
                name="Years of experience"
                id="Years of experience"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-900 sm:text-sm"
              />
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12 col-span-4">
            <h2 className="text-base font-semibold text-gray-900">
              Dominant hand
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Chose your skillfull hand/s
            </p>

            <div className="mt-2 space-y-10 col-span-4">
              <fieldset>
                <div className="mt-2 space-y-6 block sm:flex  items-start">
                  <div className="flex items-center gap-x-3 mr-2 mt-6">
                    <input
                      id="right-handed"
                      name="dominant-hand"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-violet-900 focus:ring-violet-900"
                      checked={onEditDominantHandInput === 'right-handed'}
                      onChange={handleDominandHand}
                      disabled={props.profilePlayer.id !== onEditId}
                    />
                    <label
                      htmlFor="right-handed"
                      className=" text-sm font-medium text-gray-900"
                    >
                      Right-handed
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3 mr-2 mt-0">
                    <input
                      id="left-handed"
                      name="dominant-hand"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-violet-900 focus:ring-violet-900"
                      checked={onEditDominantHandInput === 'left-handed'}
                      onChange={handleDominandHand}
                      disabled={props.profilePlayer.id !== onEditId}
                    />
                    <label
                      htmlFor="left-handed"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Left-handed
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3 mr-2 ">
                    <input
                      id="ambidextrous"
                      name="dominant-hand"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-violet-900 focus:ring-violet-900"
                      checked={onEditDominantHandInput === 'ambidextrous'}
                      onChange={handleDominandHand}
                      disabled={props.profilePlayer.id !== onEditId}
                    />
                    <label
                      htmlFor="ambidextrous"
                      className="block text-sm font-medium text-gray-900"
                    >
                      Ambidextrous
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="col-span-full mt-8">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
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
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-900 sm:text-sm"
                />
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Write a few sentences about your tennis journey.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-start gap-x-6">
          {onEditId === props.profilePlayer.id ? (
            <button
              className="rounded-md mb-8 bg-violet-900 px-3 py-2 text-sm font-semibold text-slate-200 shadow-sm hover:bg-slate-200 hover:text-violet-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900 "
              onClick={async () => {
                await updateProfileByUserId(props.userName);
                setOnEditId(0);
                router.refresh();
              }}
            >
              save
            </button>
          ) : (
            <React.Fragment>
              <button
                className="rounded-md  bg-slate-200 mb-8 px-3 py-2 text-sm font-semibold text-violet-900 shadow-sm hover:bg-violet-900 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900 "
                onClick={() => {
                  setOnEditFirstNameInput(props.profilePlayer.firstName);
                  setOnEditLastNameInput(props.profilePlayer.lastName);
                  setOnEditEmailInput(props.profilePlayer.email);
                  setOnEditAgeInput(Number(props.profilePlayer.age));
                  setOnEditYearsExperienceInput(
                    Number(props.profilePlayer.yearsExperience),
                  );
                  setOnEditDominantHandInput(props.profilePlayer.dominantHand);
                  setOnEditDescriptionInput(props.profilePlayer.description);
                  setOnEditId(props.profilePlayer.id);
                  setOnEditProfilePictureUrlInput(
                    props.profilePlayer.profilePictureUrl,
                  );
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  const confirmed = window.confirm(
                    'Are you sure you want to delete your profile? This action cannot be undone.',
                  );

                  if (confirmed) {
                    deleteUser(props.userName);
                    router.push('/');
                  } else {
                    // User chose not to delete, you can handle this case as needed
                    console.log('Deletion canceled');
                  }
                }}
                className="rounded-md bg-slate-200 hover:border-red-500 mb-8 px-3 py-2 text-sm font-semibold text-red-500 shadow-sm  hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-red-500"
              >
                delete
              </button>
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
