'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function NavBar() {
  const [isClick, setIsClick] = useState<boolean>(false);

  const toggleNavBar = (): void => {
    setIsClick(!isClick);
  };

  return (
    <>
      <nav className="pt-4 mt-auto hidden lg:block">
        <ul className="flex ">
          <li className="ml-8">
            <a href="/#home">Home</a>
          </li>
          <li className="ml-8">
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="ml-8">
            <a href="/#community">Community</a>
          </li>
          <li className="ml-8">
            <a href="/#partners">Partners</a>
          </li>
          <li className="ml-8">
            <a href="/#aboutus">About us</a>
          </li>
        </ul>
      </nav>
      <div className=" lg:hidden order-first">
        <button onClick={toggleNavBar}>
          {isClick ? (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>
      {isClick && (
        <nav className="order-first lg:hidden">
          <ul>
            <li className="ml-8 hover:text-[#00503C] hover:bg-slate-200 rounded pl-1">
              <a href="/#home">Home</a>
            </li>
            <li className="ml-8 hover:text-[#00503C] hover:bg-slate-200 rounded pl-1">
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li className="ml-8 hover:text-[#00503C] hover:bg-slate-200 rounded pl-1">
              <a href="/#community">Community</a>
            </li>
            <li className="ml-8 hover:text-[#00503C] hover:bg-slate-200 rounded pl-1">
              <a href="/#partners">Partners</a>
            </li>
            <li className="ml-8 hover:text-[#00503C] hover:bg-slate-200 rounded pl-1">
              <a href="/#aboutus">About us</a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
