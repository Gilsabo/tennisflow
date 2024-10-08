'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { VideoWithComment } from '../../../migrations/00003-createTableVideos';

type Props = {
  videoId: number | undefined;
  userProfileId: number;
  videoWithcomments: VideoWithComment[];
};

export default function Comments(props: Props) {
  const [commentInput, setCommentInput] = useState('');

  const imageURL = 'https://res.cloudinary.com/dqiq3eutn/image/upload/';

  const router = useRouter();

  async function createComment() {
    const response = await fetch(`/api/comments`, {
      method: 'POST',
      body: JSON.stringify({
        videoId: props.videoId,
        userProfileId: props.userProfileId,
        commentUser: commentInput,
      }),
    });
    const data = await response.json();
    console.log('commentsresponse', data);
  }

  return (
    <div className="ml-8">
      <form
        className="flex flex-col mt-8"
        onSubmit={async (e) => {
          e.preventDefault();
          await createComment();
          setCommentInput('');
        }}
      >
        <div className="overflow-auto scrollbar scrollbar-track-slate-200 scrollbar-thumb-rounded-xl scrollbar-thumb-[#00503C] bg-slate-50 rounded h-96 w-96 break-words">
          {props.videoWithcomments.map((videoWithComment) => {
            return (
              <div
                key={`div-comment-user-${videoWithComment.firstName}`}
                className="flex p-3 shadow-inner rounded-lg m-3"
              >
                <div className="flex-shrink-0 mr-4 ">
                  <img
                    className="rounded-full h-8 "
                    src={`${imageURL}${videoWithComment.profilePictureUrl}`}
                    alt="profile pictre player"
                    width={30}
                    height={32}
                  />
                </div>
                <div className="flex-shrink-1 ">
                  <div className="text-sm mb-2 ">
                    {videoWithComment.commentUser}
                  </div>
                  <div className="text-xs text-[#00503C]">
                    {videoWithComment.firstName} {videoWithComment.lastName}
                  </div>
                  <div className="text-xs text-[#00503C]">
                    {videoWithComment.timestamp.toDateString()}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex mt-8 w-96">
          <div className="mr-auto ">
            <label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-900"
            >
              leave your comment
            </label>
            <div className="mt-2">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.currentTarget.value)}
                required
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-900 sm:text-sm"
              />
            </div>
          </div>
          <div className=" ml-4 mt-auto flex items-center justify-start gap-x-6">
            <button
              onClick={() => {
                router.refresh();
              }}
              className="rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-violet-900 shadow-sm hover:bg-violet-900 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
