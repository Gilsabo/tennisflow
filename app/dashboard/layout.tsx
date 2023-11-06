import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getUserBySessionToken } from '../../database/users';

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
    <>
      <header className="flex items-center p-6 bg bg-slate-800 text-slate-50">
        <div className="flex mr-auto items-center ">
          <Image
            src="/images/tennisflow.png"
            alt="icon tennisflow"
            height={90}
            width={90}
          />
          <div className="text-3xl">Tennisflow</div>
        </div>
        <nav>
          <form action="/search" method="get">
            <label>
              Search:
              <input name="search" placeholder="Enter your search..." />
            </label>
            <button type="button">Search</button>
          </form>
        </nav>
        <Link href="/dashboard/upload">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </Link>
        <a href="/">notification</a>
        {user ? <div>{user.userName}</div> : ''}
        <LogoutButton />
        <Link href="/dashboard/admin">Admin</Link>
      </header>
      <main className="grid grid-cols-5 ">
        <div className="pl-6 h-screen">
          <ul className="pt-4">
            <li className="mt-8 flex">
              <Link className="flex" href="/dashboard">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <div>Dashboard</div>
              </Link>
            </li>
            <li className="mt-4">
              <Link href="/dashboard/history"> History</Link>
            </li>
            <li className="mt-4">
              {user ? (
                <Link
                  href={{ pathname: `/dashboard/profile/${user.userName}` }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <div>Profile</div>
                </Link>
              ) : (
                <Link
                  href={{ pathname: redirect(`/login?returnTo=/dashboard`) }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>

                  <div>Profile</div>
                </Link>
              )}
            </li>
            <li className="mt-4">
              <Link href="/dashboard/my-videos"> My videos</Link>
            </li>
            <li className="mt-4">
              <Link href="/dashboard/players"> Players</Link>
            </li>
            <li className="mt-4">
              <Link href="/dashboard/most-commented"> Most commented</Link>
            </li>
            <li className="mt-4">
              <Link href="/dashboard/most-viewed"> Most viewed</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-4">{props.children}</div>
      </main>
    </>
  );
}
