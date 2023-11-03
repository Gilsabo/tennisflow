'use client';

// import { CldVideoPlayer } from 'next-cloudinary';

import { Video } from '../../migrations/00004-createTableVideos';

type Props = {
  videos: Video[];
};

const Videos = ({ videos }: Props) => {
  console.log();
  return (
    <div>
      {videos.map((video) => (
        <div key={`div-video${video.videoUrl}`}>
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
              src={`https://res.cloudinary.com/dqiq3eutn/video/upload/${video.videoUrl}`}
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
          <div>Posted: {video.timestamp.toLocaleString()}</div>
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
