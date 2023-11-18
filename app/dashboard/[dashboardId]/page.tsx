import { cookies } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import {
  getUserProfileById,
  getUserProfileByUserId,
} from '../../../database/profiles';
import { getUserBySessionToken } from '../../../database/users';
import {
  getVideoByIdVideo,
  getVideoWithcomments,
} from '../../../database/videos';
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
    redirect(`/dashboard/profile/${user.userName}`);
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

  const videoWithcomments = await getVideoWithcomments(
    Number(props.params.dashboardId),
  );

  return (
    <div className="flex justify-center">
      <div className="ml-8 mt-8 w-60">
        <video id="doc-player" controls muted className="rounded-2xl ">
          <source
            src={`${imageURL}${singleVideo[0]?.videoUrl}`}
            type="video/mp4"
          />
          <track srcLang="en" label="English" default />
        </video>
        <div className="w-74">
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
                  className="inline-block mb-1 bg-slate-200 break-words text-[#00503C] text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border-[#00503C]"
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
        videoWithcomments={videoWithcomments}
      />
    </div>
  );
}
