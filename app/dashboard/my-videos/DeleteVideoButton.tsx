'use client';
import { useRouter } from 'next/navigation';

export default function DeleteVideoButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        const confirmed = window.confirm(
          'Are you sure you want to delete your profile? This action cannot be undone.',
        );

        if (confirmed) {
          alert('The video was succesfully deleted');
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
