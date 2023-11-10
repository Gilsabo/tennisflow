import Link from 'next/link';
import React from 'react';

export default function Myvidos() {
  return (
    <div className="pt-20 flex flex-col items-center mb-10">
      <div className="mb-8">My videos</div>
      <Link
        href="/dashboard/upload"
        className=" bg-slate-200 rounded-lg  text-teal-800 border border-solid py-2 px-4"
      >
        Upload your video
      </Link>
    </div>
  );
}
