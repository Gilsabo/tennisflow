'use client';
import { useRouter } from 'next/navigation';

type Props = {
  videoUrl: string;
  videoId: number;
};
export default function DeleteVideoButton(props: Props) {
  const router = useRouter();

  async function deleteVideo(videoId: number) {
    const response = await fetch(`/api/deletevideos/${videoId}`, {
      method: 'DELETE',
      body: JSON.stringify({
        videoUrl: props.videoUrl,
        videoId: props.videoId,
      }),
    });
    const data = await response.json();
    console.log('deletevideos', data);
  }

  return (
    <button
      onClick={() => {
        const confirmed = window.confirm(
          'Are you sure you want to delete your profile? This action cannot be undone.',
        );

        if (confirmed) {
          alert('The video was succesfully deleted');
          deleteVideo(props.videoId);
          console.log(props.videoId, props.videoUrl);
        } else {
          console.log('Deletion canceled');
        }
      }}
      className="rounded-md bg-slate-200 hover:border-red-500 mb-8 px-3 py-2 text-sm font-semibold text-red-500 shadow-sm  hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-red-500"
    >
      delete
    </button>
  );
}
