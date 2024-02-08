'use client';

import Link from 'next/link';
import { Video } from '../../migrations/00003-createTableVideos';

type Props = {
  videos: Video[];
};

const Videos = ({ videos }: Props) => {
  const videoUrl = 'https://res.cloudinary.com/dqiq3eutn/video/upload/';

  return (
    <div className="flex flex-wrap mt-8 justify-center">
      {videos.map((video) => (
        <div className="mr-2 ml-2 w-60 mb-4" key={`div-video${video.videoUrl}`}>
          <video
            className="rounded-lg mb-1 h-[26.5rem]"
            id="doc-player"
            controls
            muted
          >
            <source src={`${videoUrl}${video.videoUrl}`} type="video/mp4" />
            <track srcLang="en" label="English" default />
          </video>
          <Link href={`/dashboard/${video.id}`}>
            <div>{video.title}</div>
            <div className="text-xs">
              Posted on: {video.timestamp.toDateString()}
            </div>
          </Link>
          <div>
            {video.tags.map((tag: any) => (
              <div
                key={`div-${tag}`}
                className="inline-block mb-1 bg-slate-200 break-words text-[#00503C] text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border-[#00503C]"
              >
                # {tag}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Videos;
