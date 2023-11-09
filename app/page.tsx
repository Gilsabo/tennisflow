import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import tennisFlow from '../public/icon-192.png';
import tennisCourt from '../public/tennisCourt.jpg';
import LogoutButton from './(auth)/logout/LogoutButton';

export default async function Home() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <div>
      <div>
        <header className="flex bg-teal-800 text-slate-200 pb-4 justify-around content-end ">
          <div className="flex pl-2 items-center mt-auto">
            <Image
              src={tennisFlow}
              alt="tennisflow logo"
              width={90}
              height={90}
            />
            <div className="text-2xl mt-auto">Tennisflow </div>
          </div>
          <nav className="pt-4 mt-auto">
            <ul className="flex ">
              <li className="ml-8">
                <a href="/#home">Home</a>
              </li>
              <li className="ml-8">
                <a href="/#getstarted">Get started</a>
              </li>
              <li className="ml-8">
                <a href="/#videos">Videos</a>
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
          <div className="mt-auto">
            {user ? (
              <div className="flex">
                <div className="pt-4 ml-8">{user.userName}</div>
                <div className="mr-8 ml-8 mt-auto">
                  <LogoutButton />
                </div>
              </div>
            ) : (
              <div className="pt-4 mr-4 ">
                <Link
                  className="ml-8 rounded-lg border-slate-200 border border-solid py-2 px-4"
                  href="/login"
                >
                  Log in
                </Link>
                <Link
                  className="ml-6 rounded-lg  bg-slate-200 text-teal-800 border border-solid py-2 px-4"
                  href="/register"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>
      <section className="bg-teal-800 text-slate-200 flex px-40 pt-20 pb-8">
        <div className="w-2/4">
          <h1 className="text-6xl mb-6">
            Elevate Your Game with Tennis Enthusiasts Community!
          </h1>
          <h3 className="text-1xl mb-6">
            Upload your tennis strokes, get expert feedback, <br />
            and level up your skills with our supportive community.
          </h3>
          <Link
            className=" bg-slate-200 rounded-lg  text-teal-800 border border-solid py-2 px-4"
            href="/register"
          >
            Get started
          </Link>
        </div>
        <div className="w-2/4 h-60 m-auto ">
          <Image
            className=" w-11/12 h-96 ml-4 rounded-full"
            src={tennisCourt}
            alt="tennis court"
          />
        </div>
      </section>
    </div>
  );
}
