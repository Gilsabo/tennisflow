import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import {
  getUserProfileById,
  getUserProfileByUserId,
} from '../../../database/profiles';
import { getUserBySessionToken } from '../../../database/users';
import { getVideoByIdVideo } from '../../../database/videos';
import Comments from './Comments';

type Props = {
  params: {
    dashboardId: string;
  };
};

export default async function DashboardVideoId(props: Props) {
  const imageURL = 'https://res.cloudinary.com/dqiq3eutn/video/upload/';
  console.log('params', props.params);

  // get user name by session token in order to get the userProfileId of the person who is logged in and comments the video
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  // if there is no one logged in or the user logs out, redirect it to login page
  if (!user) redirect(`/login?returnTo=/dashboard/${props.params.dashboardId}`);

  // Since we need the userProfild of the loggedin person, we need to take userProfile value of the logged in person
  const userLoggedinWithProfile = await getUserProfileByUserId(Number(user.id));
  if (!userLoggedinWithProfile) {
    redirect(`/login?returnTo=/dashboard/`);
  }

  // we take the table of the posted video to take the userProfileId and to render info of the video
  const singleVideo = await getVideoByIdVideo(Number(props.params.dashboardId));
  // we take the userProfileId to get info from the userProfile and render it on the page
  const userProfile = await getUserProfileById(
    Number(singleVideo[0]?.userProfileId),
  );

  if (!userProfile) {
    notFound();
  }

  return (
    <div className="flex justify-center">
      <div className="ml-8 mt-4">
        <video
          id="doc-player"
          controls
          muted
          className="w-96 h-96 rounded-2xl "
        >
          <source
            src={`${imageURL}${singleVideo[0]?.videoUrl}`}
            type="video/mp4"
          />
          <track srcLang="en" label="English" default />
        </video>
        <div className="w-96">
          <div>{singleVideo[0]?.title}</div>
          <div className="text-xs mt-4 mb-2">
            {userProfile.firstName} {userProfile.lastName}
          </div>
          <div className="text-sm mb-2 italic">
            " {singleVideo[0]?.description} "
          </div>
          <div>
            {singleVideo[0]?.tags?.map((tag) => {
              return (
                <div
                  className="inline-block bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400"
                  key={`div-tags-${tag}`}
                >
                  # {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Comments
        videoId={singleVideo[0]?.id}
        userProfileId={userLoggedinWithProfile.id}
      />
    </div>
  );
}
