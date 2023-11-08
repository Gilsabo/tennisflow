'use client';

import Link from 'next/link';
// import { CldVideoPlayer } from 'next-cloudinary';
import { Video } from '../../migrations/00004-createTableVideos';

type Props = {
  videos: Video[];
};

const Videos = ({ videos }: Props) => {
  console.log();
  return (
    <div className="flex flex-wrap mt-8 justify-center">
      {videos.map((video) => (
        <div key={`div-video${video.videoUrl}`}>
          <video
            className="rounded-lg"
            id="doc-player"
            controls
            muted
            // autoPlay

            width={200}
            height={400}
          >
            <source
              src={`https://res.cloudinary.com/dqiq3eutn/video/upload/${video.videoUrl}`}
              type="video/mp4"
            />
            <track srcLang="en" label="English" default />
            Your browser does not support the video tag.
          </video>
          <Link href={`/dashboard/${video.id}`}>
            <div>Posted on: {video.timestamp.toDateString()}</div>
          </Link>
        </div>
      ))}
      {/* <CldVideoPlayer
        id="sea-turtle"
        width="500"
        height="500"
        src="https://res.cloudinary.com/dqiq3eutn/video/upload/m6svjspu8t2wz68selw5.mp4"
      /> */}
    </div>
  );
};

export default Videos;
