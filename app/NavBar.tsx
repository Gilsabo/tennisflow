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
            <Link
              href="/#home"
              className="relative inline-block text-white before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-500 before:ease-in-out hover:before:w-full hover:before:left-0"
            >
              Home
            </Link>
          </li>
          <li className="ml-8 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-75">
            <Link
              href="/dashboard"
              className="relative inline-block text-white before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-500 before:ease-in-out hover:before:w-full hover:before:left-0"
            >
              Dashboard
            </Link>
          </li>
          <li className="ml-8 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-75">
            <a
              href="#community"
              className="relative inline-block text-white before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-500 before:ease-in-out hover:before:w-full hover:before:left-0"
            >
              Community
            </a>
          </li>
          <li className="ml-8 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-75">
            <a
              href="#partners"
              className="relative inline-block text-white before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-500 before:ease-in-out hover:before:w-full hover:before:left-0"
            >
              Partners
            </a>
          </li>
          <li className="ml-8 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-75">
            <a
              href="#aboutus"
              className="relative inline-block text-white before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-500 before:ease-in-out hover:before:w-full hover:before:left-0"
            >
              About us
            </a>
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
              <a
                href="/#home"
                className="relative inline-block text-white before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-500 before:ease-in-out hover:before:w-full hover:before:left-0"
              >
                Home
              </a>
            </li>
            <li className="ml-8 hover:text-[#00503C] hover:bg-slate-200 rounded pl-1">
              <Link
                href="/dashboard"
                className="relative inline-block text-white before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-500 before:ease-in-out hover:before:w-full hover:before:left-0"
              >
                Dashboard
              </Link>
            </li>
            <li className="ml-8 hover:text-[#00503C] hover:bg-slate-200 rounded pl-1">
              <a
                href="/#community"
                className="relative inline-block text-white before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-500 before:ease-in-out hover:before:w-full hover:before:left-0"
              >
                Community
              </a>
            </li>
            <li className="ml-8 hover:text-[#00503C] hover:bg-slate-200 rounded pl-1">
              <a
                href="/#partners"
                className="relative inline-block text-white before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-500 before:ease-in-out hover:before:w-full hover:before:left-0"
              >
                Partners
              </a>
            </li>
            <li className="ml-8 hover:text-[#00503C] hover:bg-slate-200 rounded pl-1">
              <a
                href="/#aboutus"
                className="relative inline-block text-white before:absolute before:bottom-0 before:left-1/2 before:h-0.5 before:w-0 before:bg-white before:transition-all before:duration-500 before:ease-in-out hover:before:w-full hover:before:left-0"
              >
                About us
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
