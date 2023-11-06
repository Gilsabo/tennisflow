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
    <div>
      <div>
        <div>{singleVideo[0]?.title}</div>

        <video
          id="doc-player"
          controls
          muted
          // autoPlay
          className="cld-video-player cld-fluidcontrols"
          width={350}
          height={500}
        >
          <source
            src={`${imageURL}${singleVideo[0]?.videoUrl}`}
            type="video/mp4"
          />
          <track src="/captions.vtt" srcLang="en" label="English" default />
          Your browser does not support the video tag.
        </video>
        <div>{userProfile.firstName}</div>
        <div>{userProfile.lastName}</div>
      </div>
      <Comments
        videoId={singleVideo[0]?.id}
        userProfileId={userLoggedinWithProfile.id}
      />
    </div>
  );
}
