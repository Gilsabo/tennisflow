import Link from 'next/link';
import { getAllCommentsFromEachVideo } from '../../../database/comments';

export const metadata = {
  title: 'Most commented',
};

export default async function MostCommented() {
  const videosWithCommentsFromSql = await getAllCommentsFromEachVideo();

  const comments = videosWithCommentsFromSql;
  const imageURL = 'https://res.cloudinary.com/dqiq3eutn/image/upload/';

  // Create an empty object to store videos
  const videos: Record<number, any> = {};

  // Iterate through the comments array
  comments.forEach((comment) => {
    const {
      videoId,
      title,
      tags,
      commentUser,
      firstName,
      lastName,
      profilePictureUrl,
    } = comment;

    // Check if the video already exists in the 'videos' object
    if (videos[videoId]) {
      // If it exists, add the comment to the existing video
      videos[videoId].comments.push({
        commentUser,
      });
    } else {
      // If it doesn't exist, create a new entry for the video
      videos[videoId] = {
        videoId,
        title,
        tags,
        firstName,
        lastName,
        comments: [
          {
            commentUser,
          },
        ],
        profilePictureUrl,
      };
    }
  });

  // Convert the 'videos' object values to an array
  const videosWithComments = Object.values(videos);
  console.log('transformeddd', videosWithComments);

  return (
    <div className="pt-20 flex flex-col items-center mb-10">
      <div className="mb-8">Most commented</div>
      <div className="flex flex-wrap justify-center px-6">
        {videosWithComments
          .slice() // Create a shallow copy to avoid mutating the original array
          .sort((a, b) => b.comments.length - a.comments.length) // Sort by comment length in descending order
          .map((videoWithComment, index) => {
            return (
              <div
                key={`div-name${videoWithComment}`}
                className="flex mr-4 mb-4 p-3 rounded-lg bg-slate-50 relative"
              >
                <Link href={`/dashboard/${videoWithComment.videoId}`}>
                  <div className="flex-shrink-0 ">
                    <img
                      className="rounded-full h-8 mb-2 "
                      src={`${imageURL}${videoWithComment.profilePictureUrl}`}
                      alt={videoWithComment.firstName}
                      width={30}
                      height={32}
                    />
                  </div>
                  <div className="absolute text-[#00503C] top-4 right-[3.5rem] text-xl">
                    {index + 1}.
                  </div>
                  <div className="flex-shrink-1 ">
                    <div className="text-sm mb-1 ">
                      {videoWithComment.title}
                    </div>
                    <div className="text-xs text-[#00503C]">
                      Posted by : {videoWithComment.firstName}
                      {videoWithComment.lastName}
                    </div>
                    <div className="text-xs text-[#00503C]">
                      {videoWithComment.comments.length} comments
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}
