import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getUserBySessionToken } from '../../database/users';
import dashboardLogo from '../../public/dashboardLogo.png';
import historyLogo from '../../public/historyLogo.png';
import MostCommented from '../../public/mostCommented.png';
import mostViewdLogo from '../../public/mostViewdLogo.png';
import playersLogo from '../../public/playersLogo.png';
import userProfileLogo from '../../public/userProfileLogo.png';
import videosLogo from '../../public/videosLogo.png';

type Props = {
  children: ReactNode;
};

export default async function Layout(props: Props) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  // // User has to be an admin
  // // Get user from the database that meets the admin requirements

  return (
    <main className="grid grid-cols-5 h-screen">
      <div className="shadow-2xl bg-slate-50 h-full">
        <Link
          href="/"
          className=" bg-[#00503C] flex items-center pl-6 pt-8 shadow"
        >
          <Image
            src="/images/tennisFlowLogo.svg"
            alt="icon tennisflow"
            height={25}
            width={25}
            className="text-xl ml-2 my-4"
          />
          <div className="text-xl font-semibold pl-2 py-4 text-slate-200 hidden md:block">
            Tennisflow
          </div>
        </Link>
        <ul className="pt-4 pl-6">
          <li className="mt-8 flex text-sm group transition-all duration-300 ease-in-out text-gray-900">
            <Link className="flex" href="/dashboard">
              <Image
                width={20}
                height={10}
                src={dashboardLogo}
                alt="dashboard Logo"
              />
              <div className="ml-2 bg-left-bottom bg-gradient-to-r from-[#00503C]  to-[#00503C]  bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hidden md:block">
                Dashboard
              </div>
            </Link>
          </li>
          <li className="mt-4 text-sm group transition-all duration-300 ease-in-out text-gray-900">
            <Link className="flex" href="/dashboard/history">
              <Image
                width={20}
                height={10}
                src={historyLogo}
                alt="dashboard Logo"
              />
              <div className="ml-2 bg-left-bottom bg-gradient-to-r from-[#00503C]  to-[#00503C]  bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hidden md:block">
                History
              </div>
            </Link>
          </li>
          <li className="mt-4 text-sm group transition-all duration-300 ease-in-out text-gray-900">
            {user ? (
              <Link
                className="flex"
                href={{ pathname: `/dashboard/profile/${user.userName}` }}
              >
                <Image
                  width={20}
                  height={10}
                  src={userProfileLogo}
                  alt="dashboard Logo"
                />

                <div className="ml-2 bg-left-bottom bg-gradient-to-r from-[#00503C]  to-[#00503C]  bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hidden md:block">
                  Profile
                </div>
              </Link>
            ) : (
              <Link
                className="flex"
                href={{ pathname: redirect(`/login?returnTo=/dashboard`) }}
              >
                <Image
                  width={20}
                  height={10}
                  src={userProfileLogo}
                  alt="dashboard Logo"
                />
                <div className="ml-2 bg-left-bottom bg-gradient-to-r from-[#00503C]  to-[#00503C]  bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hidden md:block">
                  Profile
                </div>
              </Link>
            )}
          </li>
          <li className="mt-4 text-sm group transition-all duration-300 ease-in-out text-gray-900">
            <Link className="flex " href="/dashboard/my-videos">
              <Image
                width={20}
                height={10}
                src={videosLogo}
                alt="dashboard Logo"
              />
              <div className="ml-2 bg-left-bottom bg-gradient-to-r from-[#00503C]  to-[#00503C]  bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hidden md:block">
                My videos
              </div>
            </Link>
          </li>
          <li className="mt-4 text-sm group transition-all duration-300 ease-in-out text-gray-900">
            <Link className="flex " href="/dashboard/players">
              <Image
                width={20}
                height={10}
                src={playersLogo}
                alt="dashboard Logo"
              />

              <div className="ml-2 bg-left-bottom bg-gradient-to-r from-[#00503C]  to-[#00503C]  bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hidden md:block">
                Players
              </div>
            </Link>
          </li>
          <li className="mt-4 text-sm group transition-all duration-300 ease-in-out text-gray-900">
            <Link className="flex " href="/dashboard/most-commented">
              <Image
                width={20}
                height={10}
                src={MostCommented}
                alt="dashboard Logo"
              />
              <div className="ml-2 bg-left-bottom bg-gradient-to-r from-[#00503C]  to-[#00503C]  bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hidden md:block">
                Most commented
              </div>
            </Link>
          </li>
          <li className="mt-4 text-sm group transition-all duration-300 ease-in-out text-gray-900 ">
            <Link className="flex " href="/dashboard/most-viewed">
              <Image
                width={20}
                height={10}
                src={mostViewdLogo}
                alt="dashboard Logo"
              />
              <div className="ml-2 bg-left-bottom bg-gradient-to-r from-[#00503C]  to-[#00503C]  bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out hidden md:block">
                Most viewed
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-span-4">
        <header className="pl-6 pt-11 text-slate-800 shadow-lg pr-8">
          <ul className="flex items-center justify-end pb-1.5">
            <li>
              <a href="/" className="mr-4 hover:text-[#00503C] ">
                Notifications
              </a>
            </li>
            <Link
              className="ml-4 mr-4 hover:text-[#00503C]"
              href="/dashboard/admin"
            >
              Admin
            </Link>
            {user ? (
              <div className="ml-4 mr-4">Logged in as {user.userName}</div>
            ) : (
              ''
            )}
            <LogoutButton />
          </ul>
        </header>
        {props.children}
      </div>
    </main>
  );
}
