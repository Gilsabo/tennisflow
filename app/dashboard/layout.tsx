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

  //   console.log('Check Xpath: ', headersList.get('x-pathname'));

  // // User has to be an admin
  // // Get user from the database that meets the admin requirements

  // // 3. Either redirect or render the login form
  // if (!session) redirect(`/login?returnTo=${headersList.get('x-pathname')}`);

  return (
    <main className="grid grid-cols-5 h-screen">
      <div className="  shadow-2xl bg-slate-50 h-full">
        <Link
          href="/"
          className=" bg-teal-800 flex items-center pl-6 pt-8  shadow"
        >
          <Image
            src="/images/tennisFlowLogo.svg"
            alt="icon tennisflow"
            height={25}
            width={25}
          />
          <div className="text-xl font-semibold pl-2 py-4 text-slate-200">
            Tennisflow
          </div>
        </Link>
        <ul className="pt-4 pl-6 ">
          <li className="mt-8 flex text-sm text-gray-900">
            <Link className="flex" href="/dashboard">
              <Image
                width={20}
                height={10}
                src={dashboardLogo}
                alt="dashboard Logo"
              />
              <div className="ml-2">Dashboard</div>
            </Link>
          </li>
          <li className="mt-4 text-sm text-gray-900">
            <Link className="flex" href="/dashboard/history">
              <Image
                width={20}
                height={10}
                src={historyLogo}
                alt="dashboard Logo"
              />
              <div className="ml-2">History</div>
            </Link>
          </li>
          <li className="mt-4 text-sm text-gray-900">
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

                <div className="ml-2">Profile</div>
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
                <div className="ml-2">Profile</div>
              </Link>
            )}
          </li>
          <li className="mt-4 text-sm text-gray-900">
            <Link className="flex " href="/dashboard/my-videos">
              <Image
                width={20}
                height={10}
                src={videosLogo}
                alt="dashboard Logo"
              />
              <div className="ml-2">My videos</div>
            </Link>
          </li>
          <li className="mt-4 text-sm text-gray-900">
            <Link className="flex " href="/dashboard/players">
              <Image
                width={20}
                height={10}
                src={playersLogo}
                alt="dashboard Logo"
              />

              <div className="ml-2">Players</div>
            </Link>
          </li>
          <li className="mt-4 text-sm text-gray-900">
            <Link className="flex " href="/dashboard/most-commented">
              <Image
                width={20}
                height={10}
                src={MostCommented}
                alt="dashboard Logo"
              />
              <div className="ml-2">Most commented</div>
            </Link>
          </li>
          <li className="mt-4 text-sm text-gray-900">
            <Link className="flex " href="/dashboard/most-viewed">
              <Image
                width={20}
                height={10}
                src={mostViewdLogo}
                alt="dashboard Logo"
              />
              <div className="ml-2">Most viewed</div>{' '}
            </Link>
          </li>
        </ul>
      </div>
      <div className="col-span-4">
        <header className="  pl-6 pt-11   text-slate-800 shadow-lg pr-8">
          <ul className="flex items-center justify-end pb-1.5">
            <li>
              <a href="/" className="mr-4">
                Notifications
              </a>
            </li>
            <Link className="ml-4 mr-4" href="/dashboard/admin">
              Admin
            </Link>
            {user ? (
              <div className="mr-4">Logged in as {user.userName}</div>
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
