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
        <div className="mr-2 ml-2 w-60 mb-4" key={`div-video${video.videoUrl}`}>
          <video className="rounded-lg mb-1" id="doc-player" controls muted>
            <source
              src={`https://res.cloudinary.com/dqiq3eutn/video/upload/${video.videoUrl}`}
              type="video/mp4"
            />
            <track srcLang="en" label="English" default />
          </video>
          <Link href={`/dashboard/${video.id}`}>
            <div className="text-xs">
              Posted on: {video.timestamp.toDateString()}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Videos;
