'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import UploadVideo from './UploadVideo';

type Props = {
  userProfileId: number;
};

export default function VideoForm({ userProfileId }: Props) {
  const [titleInput, setTitleInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [tagsInput, setTagsInput] = useState<any[]>([]);
  const [locationInput, setLocationInput] = useState('');
  const [videoUrlInput, setVideoUrlInput] = useState('');

  const router = useRouter();

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxId = e.target.id;

    // If the checkbox is checked, add its id to the tagsInput state
    if (e.target.checked) {
      setTagsInput((prevTags) => [...prevTags, checkboxId]);
    } else {
      // If the checkbox is unchecked, remove its id from the tagsInput state
      setTagsInput((prevTags) => prevTags.filter((tag) => tag !== checkboxId));
    }
  };

  async function createVideo() {
    const response = await fetch('/api/uservideos', {
      method: 'POST',
      body: JSON.stringify({
        videoUrl: videoUrlInput,
        title: titleInput,
        description: descriptionInput,
        tags: tagsInput,
        location: locationInput,
        userProfileId: userProfileId,
      }),
    });
    const data = await response.json();
    console.log('datavideo', data);

    router.push(`/dashboard`);
    router.refresh();
  }

  return (
    <div className="border-b border-gray-900/10 pb-12 ml-16 sm:pl-20 ">
      <div className="pt-8">
        <h2 className="text-base font-semibold text-gray-900">
          Upload your video
        </h2>
        <p className="mt-1 text-sm text-gray-600 mb-4 sm:mb-0">
          Your are a little bit closer to get better. First upload the video and
          then complete all the fields.
        </p>
        <UploadVideo setVideoUrlInput={setVideoUrlInput} />
        <form
          className="flex flex-col mr-4"
          onSubmit={async (event) => {
            event.preventDefault();
            await createVideo();
          }}
        >
          <div className="sm:col-span-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium mt-10 text-gray-900"
            >
              Title of the video
            </label>
            <div className="mt-2">
              <input
                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-900 sm:text-sm w-full sm:w-1/2 "
                value={titleInput}
                onChange={(e) => setTitleInput(e.currentTarget.value)}
                required
              />
            </div>
          </div>
          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold text-gray-900">
                Pick all the strokes you want to improve
              </legend>
              <div className="mt-6 space-y-6 flex flex-wrap">
                <div className="relative flex gap-x-3 mt-6 mr-4">
                  <div className="flex h-6 items-center">
                    <input
                      id="forehand"
                      name="forehand"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-violet-900 focus:ring-violet-900"
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div className="text-sm ">
                    <label
                      htmlFor="forehand"
                      className="font-medium text-gray-900 "
                    >
                      Forehand
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3 mr-4">
                  <div className="flex h-6 items-center">
                    <input
                      id="backhand"
                      name="backhand"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-violet-900 focus:ring-violet-900"
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div className="text-sm">
                    <label
                      htmlFor="backhand"
                      className="font-medium text-gray-900"
                    >
                      Backhand
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3 mr-4">
                  <div className="flex h-6 items-center">
                    <input
                      id="volley"
                      name="volley"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 violet-900 text-violet-900 focus:ring-violet-900"
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div className="text-sm">
                    <label
                      htmlFor="volley"
                      className="font-medium text-gray-900"
                    >
                      Volley
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3 mr-4">
                  <div className="flex h-6 items-center">
                    <input
                      id="smash"
                      name="smash"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-violet-900 focus:ring-violet-900"
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div className="text-sm">
                    <label
                      htmlFor="smash"
                      className="font-medium text-gray-900"
                    >
                      Smash
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3 mr-4">
                  <div className="flex h-6 items-center">
                    <input
                      id="serve"
                      name="serve"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-violet-900 focus:ring-violet-900"
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div className="text-sm">
                    <label
                      htmlFor="serve"
                      className="font-medium text-gray-900"
                    >
                      Serve
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3 mr-4">
                  <div className="flex h-6 items-center">
                    <input
                      id="foot-work"
                      name="foot-work"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-violet-900 focus:ring-violet-900"
                      onChange={handleCheckboxChange}
                    />
                  </div>
                  <div className="text-sm">
                    <label
                      htmlFor="foot-work"
                      className="font-medium text-gray-900"
                    >
                      Foot-work
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="sm:col-span-3">
            <label
              htmlFor="title"
              className="block text-sm font-medium mt-10 text-gray-900"
            >
              Location
            </label>
            <div className="mt-2">
              <input
                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-900 sm:text-sm w-full sm:w-1/2"
                value={locationInput}
                onChange={(e) => setLocationInput(e.currentTarget.value)}
                required
              />
            </div>
          </div>

          <div className="col-span-full mt-8">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-900"
            >
              Describe what you want to improve
            </label>
            <p className="mt-3 text-sm text-gray-600">
              Explain what happens in the video.
            </p>
            <div className="mt-2">
              <textarea
                id="about"
                name="about"
                rows={3}
                maxLength={250}
                value={descriptionInput}
                onChange={(e) => setDescriptionInput(e.currentTarget.value)}
                required
                className="block w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-900 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-start gap-x-6">
            <button className="rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-violet-900 shadow-sm hover:bg-violet-900 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-900">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
