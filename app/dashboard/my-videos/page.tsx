import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { getUserProfileByUserId } from '../../../database/profiles';
import { getUserBySessionToken } from '../../../database/users';
import { getUserVideosByUserProfileId } from '../../../database/videos';
import DeleteVideoButton from './DeleteVideoButton';

export const metadata = {
  title: 'My videos',
};

export default async function Myvideos() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  // if there is no one logged in or the user logs out, redirect it to login page
  if (!user) redirect(`/login?returnTo=/dashboard/`);

  // Since we need the userProfild of the loggedin person, we need to take userProfile value of the logged in person
  const userLoggedinWithProfile = await getUserProfileByUserId(Number(user.id));
  if (!userLoggedinWithProfile) {
    redirect(`/login?returnTo=/dashboard/`);
  }
  //
  const userWithProfileVideos = await getUserVideosByUserProfileId(
    userLoggedinWithProfile.id,
  );

  return (
    <div className="pt-20 flex flex-col items-center mb-10">
      <div className="mb-8">My videos</div>
      <Link
        href="/dashboard/upload"
        className=" bg-slate-200 rounded-lg  text-teal-800 border border-solid py-2 px-4 animate-bounce"
      >
        Upload your video
      </Link>
      {userWithProfileVideos.length === 0 ? (
        <div className="pt-4">No videos uploaded yet</div>
      ) : (
        <div className="flex flex-wrap mt-8 justify-center">
          {userWithProfileVideos.map((userWithProfileVideo) => (
            <React.Fragment
              key={`div-userWithProfileVideo${userWithProfileVideo.videoUrl}`}
            >
              <div
                className="mr-2 ml-2 w-60 mb-4"
                key={`div-video${userWithProfileVideo.videoUrl}`}
              >
                <video
                  className="rounded-lg mb-1"
                  id="doc-player"
                  controls
                  muted
                >
                  <source
                    src={`https://res.cloudinary.com/dqiq3eutn/video/upload/${userWithProfileVideo.videoUrl}`}
                    type="video/mp4"
                  />
                  <track srcLang="en" label="English" default />
                </video>
                <Link href={`/dashboard/${userWithProfileVideo.id}`}>
                  <div className="text-xs">
                    Posted on: {userWithProfileVideo.timestamp.toDateString()}
                  </div>
                </Link>
              </div>
              <DeleteVideoButton
                videoUrl={userWithProfileVideo.videoUrl}
                videoId={userWithProfileVideo.id}
              />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
