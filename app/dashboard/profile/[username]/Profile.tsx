'use client';
import { useState } from 'react';
import UploadProfileImage from './UploadProfileImage';

type Props = {
  userId: number;
  userName: string;
};

export default function Profile({ userId, userName }: Props) {
  const [firstNameInput, setFirstNameInput] = useState('');
  const [lastNameInput, setLastNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [ageInput, setAgeInput] = useState<number>();
  const [yearsExperienceInput, setYearsExperienceInput] = useState<number>();
  const [dominantHandInput, setDominantHandInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [profilePictureUrlInput, setProfilePictureUrlInput] = useState('');

  function handleDominandHand(event: React.ChangeEvent<HTMLInputElement>) {
    // Updating the state with the selected radio button's value
    setDominantHandInput(event.target.id);
  }

  const request = {
    firstName: firstNameInput,
    lastName: lastNameInput,
    email: emailInput,
    age: ageInput,
    yearsExperience: yearsExperienceInput,
    dominantHand: dominantHandInput,
    description: descriptionInput,
    profilePictureUrl: profilePictureUrlInput,
    userId: userId,
  };

  console.log('rquesteeed', request);
  console.log('eventssss,', dominantHandInput);
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
    <div>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await createUserProfile();
        }}
      >
        <div className="border-b mt-8 border-gray-900/10 pb-12 ">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Create your profile, <span className="capitalize">{userName}</span>
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-2">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2">
              <input
                value={firstNameInput}
                onChange={(e) => setFirstNameInput(e.currentTarget.value)}
                required
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="last-name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2">
              <input
                value={lastNameInput}
                onChange={(e) => setLastNameInput(e.currentTarget.value)}
                required
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={emailInput}
                onChange={(e) => setEmailInput(e.currentTarget.value)}
                type="email"
                required
                id="email"
                name="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2 sm:col-start-1">
            <label
              htmlFor="age"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Age
            </label>
            <div className="mt-2">
              <input
                value={ageInput}
                onChange={(e) => setAgeInput(Number(e.currentTarget.value))}
                type="number"
                required
                name="age"
                id="age"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="years of experience"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Yesars of experience
            </label>
            <div className="mt-2">
              <input
                value={yearsExperienceInput}
                onChange={(e) =>
                  setYearsExperienceInput(Number(e.currentTarget.value))
                }
                type="number"
                required
                name="Yesars of experience"
                id="Yesars of experience"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12 col-span-4">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Dominant hand
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Chose your skillfull hand/s
            </p>

            <div className="mt-2 space-y-10 col-span-4">
              <fieldset>
                <div className="mt-2 space-y-6 flex items-start">
                  <div className="flex items-center gap-x-3 mr-2 mt-6">
                    <input
                      id="right-handed"
                      name="dominant-hand"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={dominantHandInput === 'right-handed'}
                      onChange={handleDominandHand}
                    />
                    <label
                      htmlFor="right-handed"
                      className=" text-sm font-medium leading-6 text-gray-900"
                    >
                      Right-handed
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3 mr-2 mt-0">
                    <input
                      id="left-handed"
                      name="dominant-hand"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={dominantHandInput === 'left-handed'}
                      onChange={handleDominandHand}
                    />
                    <label
                      htmlFor="left-handed"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Left-handed
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3 mr-2 ">
                    <input
                      // value="left-handex"
                      id="ambidextrous"
                      name="dominant-hand"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      checked={dominantHandInput === 'ambidextrous'}
                      onChange={handleDominandHand}
                    />
                    <label
                      htmlFor="ambidextrous"
                      className="block text-sm font-medium leading-6 text-gray-900"
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
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  maxLength={250}
                  value={descriptionInput}
                  onChange={(e) => setDescriptionInput(e.currentTarget.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about your tennis journey.
              </p>
            </div>
          </div>
        </div>
        {/* <label>
          First name
          <input
            value={firstNameInput}
            onChange={(e) => setFirstNameInput(e.currentTarget.value)}
            required
          />
        </label> */}
        {/* <label>
          Last name
          <input
            value={lastNameInput}
            onChange={(e) => setLastNameInput(e.currentTarget.value)}
            required
          />
        </label> */}
        {/* <label>
          E-mail
          <input
            value={emailInput}
            onChange={(e) => setEmailInput(e.currentTarget.value)}
            type="email"
            required
          />
        </label> */}
        {/* <label>
          Age
          <input
            value={ageInput}
            onChange={(e) => setAgeInput(Number(e.currentTarget.value))}
            type="number"
            required
          />
        </label> */}
        {/* <label>
          Years of experience
          <input
            value={yearsExperienceInput}
            onChange={(e) =>
              setYearsExperienceInput(Number(e.currentTarget.value))
            }
            type="number"
            required
          />
        </label> */}
        {/* <label>
          Dominant hand
          <input
            value={dominantHandInput}
            onChange={(e) => setDominantHandInput(e.currentTarget.value)}
            required
          />
        </label> */}
        {/* <textarea
          rows={25}
          cols={50}
          maxLength={250}
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.currentTarget.value)}
          required
        />
        <button>Confirm</button> */}

        <div className="mt-6 flex items-center justify-start gap-x-6">
          <button className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save
          </button>
        </div>
      </form>
      <UploadProfileImage
        setProfilePictureUrlInput={setProfilePictureUrlInput}
      />
    </div>
  );
}
