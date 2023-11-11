import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import tennisFlowLogo from '../public/images/tennisFlowLogo.svg';
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
        <header className="flex px-36 bg-teal-800 text-slate-200 pt-12 pb-4 justify-between content-end ">
          <div className="flex mt-auto">
            <Image
              className="mr-3 w-8 h-8 ml-4"
              src={tennisFlowLogo}
              alt="tennisflow logo"
            />
            <div className="text-2xl mt-auto ">Tennisflow </div>
          </div>
          <nav className="pt-4 mt-auto">
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
          <div className="mt-auto">
            {user ? (
              <div className="flex">
                <div className="pt-4 ml-8">logged in as {user.userName}</div>
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
        <div className="w-2/4 ">
          <h1 className="text-6xl mb-6 ">
            Elevate Your Game with Tennis Enthusiasts Community!
          </h1>
          <h3 className="text-xl mb-6 ">
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
        <div className="w-2/4 h-80 m-auto ">
          <div>
            <Image
              className="rounded-2xl"
              src={tennisCourt}
              alt="tennis court"
            />
          </div>
        </div>
      </section>
      <section className="px-40 pt-28 pb-28">
        <div className="flex flex-col items-center text-teal-800">
          <h1 className="text-6xl text-center mb-10">
            Ace Your Game, Connect, <br /> Progress Together
          </h1>
          <h3 className="text-xl text-center mb-14">
            Discover a Community Where Passion Meets Progress <br /> Perfect for
            Beginners and Pros Alike
          </h3>
          <div className="flex text-center ">
            <div className="mr-14 shadow-md rounded-lg px-6">
              <h3 className="font-semibold">Roger </h3>
              <h3 className="mb-2 font-semibold">Rüttelracketli</h3>
              <h1 className="mb-6">54</h1>
              <p className="italic mb-6">
                "I can't express how much Tennisflow has elevated my game. The
                supportive community helped me refine my serve technique,
                turning me into a more confident player"
              </p>
            </div>
            <div className="mx-14 mt-20 shadow-md rounded-lg px-6">
              <h3 className="font-semibold">Maria </h3>
              <h3 className="mb-2 font-semibold">Smashapova</h3>
              <h1 className="mb-6">36</h1>
              <p className="italic mb-6">
                "I stumbled upon Tennisflow as a beginner, and it transformed my
                game. The insightful tips from the community have refined my
                backhand, adding finesse to my shots"
              </p>
            </div>
            <div className="ml-10 mt-40 shadow-md rounded-lg px-6">
              <h3 className="font-semibold">Martinka</h3>
              <h3 className="mb-2 font-semibold">Noodlevolleylova</h3>
              <h1 className="mb-6">27</h1>
              <p className="italic mb-6">
                "My professional career took a turn for the better with
                Tennisflow. The strategic discussions and collaborative spirit
                of the community have significantly increased my match wins"
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
