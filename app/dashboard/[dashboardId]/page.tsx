import { getUserProfileById } from '../../../database/profiles';
// import { notFound } from 'next/navigation';
// import { getUserProfileById } from '../../../database/profiles';
import { getVideoByIdVideo } from '../../../database/videos';

type Props = {
  params: {
    dashboardId: string;
  };
};

export default async function DashboardVideoId(props: Props) {
  const imageURL = 'https://res.cloudinary.com/dqiq3eutn/video/upload/';
  // const singleVideo = await getUserProfileById(
  //   Number(props.params.dashboardId),
  // );

  const singleVideos = await getVideoByIdVideo(
    Number(props.params.dashboardId),
  );

  const userProfile = await getUserProfileById(
    Number(singleVideos[0]?.userProfileId),
  );
  console.log('userProfile', userProfile);
  return (
    <>
      <div>{singleVideos[0]?.title}</div>

      <video
        id="doc-player"
        controls
        muted
        autoPlay
        className="cld-video-player cld-fluidcontrols"
        width={350}
        height={500}
      >
        <source
          src={`${imageURL}${singleVideos[0]?.videoUrl}`}
          type="video/mp4"
        />
        <track
          kind="captions"
          src="/captions.vtt"
          srcLang="en"
          label="English"
          default
        />
        Your browser does not support the video tag.
      </video>
      <div>{userProfile?.firstName}</div>
      <div>{userProfile?.lastName}</div>
    </>
  );
}
