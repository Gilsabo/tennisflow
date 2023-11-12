import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import tennisFlowLogo from '../public/images/tennisFlowLogo.svg';
import tennisLogoGreen from '../public/images/tennisLogoGreen.svg';
import community from '../public/instrucionsSection/community.svg';
import register from '../public/instrucionsSection/register.svg';
import smartPhone from '../public/instrucionsSection/smartphone.svg';
import upload from '../public/instrucionsSection/upload.svg';
import atp from '../public/logoPartners/atpLogo.jpg';
import australianOpen from '../public/logoPartners/australianOpenLogo.png';
import head from '../public/logoPartners/headLogo.jpg';
import itf from '../public/logoPartners/itfLogo.png';
import rolandGarros from '../public/logoPartners/rolandGarrosLogo.png';
import tennisEurope from '../public/logoPartners/tennisEuropeLogo.png';
import UsOpen from '../public/logoPartners/usOpenLogo.png';
import wilson from '../public/logoPartners/wilsonLogo.png';
import wimbledon from '../public/logoPartners/wimbledonLogo.png';
import wta from '../public/logoPartners/wtaLogo.png';
import email from '../public/logosSocialMedia/email.svg';
import facebook from '../public/logosSocialMedia/facebook.svg';
import instagram from '../public/logosSocialMedia/instagram.svg';
import x from '../public/logosSocialMedia/x.svg';
import martina from '../public/Martina.jpg';
import novak from '../public/Novak.jpg';
import roger from '../public/Roger.jpg';
import tennisCourt2 from '../public/tennisCourt2.jpg';
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
                  className="ml-6 rounded-lg bg-slate-200 text-teal-800 border border-solid py-2 px-4"
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
          <h3 className="text-xl mb-10 ">
            Upload your tennis strokes, get expert feedback, <br />
            and level up your skills with our supportive community.
          </h3>
          <Link
            className=" bg-slate-200 rounded-lg text-teal-800 border border-solid py-2 px-4 inline-block"
            href="/register"
          >
            Get started
          </Link>
        </div>
        <div className="w-2/4">
          <div className="flex flex-col items-end">
            <Image
              className="rounded-sm h-20 w-20"
              src={tennisCourt2}
              alt="tennis court"
            />
          </div>
        </div>
      </section>
      <section className="px-40 pt-28 pb-28">
        <div className="flex flex-col items-center text-violet-900">
          <h1 className="text-6xl text-center mb-10">
            Ace Your Game, Connect, <br /> Progress Together
          </h1>
          <h3 className="text-xl text-center mb-14">
            Discover a Community Where Passion Meets Progress <br /> Perfect for
            Beginners and Pros Alike
          </h3>
          <div className="flex text-center ">
            <div className="mr-14 shadow-md rounded-lg px-6">
              <div className="mb-4">
                <Image
                  className="rounded-2xl"
                  src={roger}
                  alt="Testimonial Roger"
                />
              </div>
              <h3 className="font-semibold">Roger </h3>
              <h3 className="mb-2 font-semibold">Rüttelracketli</h3>
              <h1 className="mb-6">36</h1>
              <p className="italic mb-6">
                "I can't express how much Tennisflow has elevated my game. The
                supportive community helped me refine my serve technique,
                turning me into a more confident player"
              </p>
            </div>
            <div className="mx-14 shadow-md rounded-lg px-6">
              <div className="mb-4">
                <Image
                  className="rounded-2xl"
                  src={novak}
                  alt="Testimonial Novak"
                />
              </div>
              <h3 className="font-semibold">Humbert </h3>
              <h3 className="mb-2 font-semibold">Hurckrash</h3>
              <h1 className="mb-6">40</h1>
              <p className="italic mb-6">
                "I stumbled upon Tennisflow as a beginner, and it transformed my
                game. The insightful tips from the community have refined my
                backhand, adding finesse to my shots"
              </p>
            </div>
            <div className="ml-10 shadow-md rounded-lg px-6">
              <div className="mb-4">
                <Image
                  className="rounded-2xl"
                  src={martina}
                  alt="Testimonial Martina"
                />
              </div>
              <h3 className="font-semibold">Martinka</h3>
              <h3 className="mb-2 font-semibold">Noodlevolleylova</h3>
              <h1 className="mb-6">56</h1>
              <p className="italic mb-6">
                "My professional career took a turn for the better with
                Tennisflow. The strategic discussions and collaborative spirit
                of the community have significantly increased my match wins"
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-teal-800 text-slate-200 flex px-40 pt-20 pb-8">
        <div className="w-2/4 ">
          <div className="flex">
            <div className="mr-8">
              <div className="mb-8">
                <Image
                  src={smartPhone}
                  alt="smartphone logo"
                  className="w-20 h-20 mb-2"
                />
                <span className="text-2xl">1. </span>Record your desired video
                in upright format
              </div>

              <div className="mb-8">
                <Image
                  src={register}
                  alt="register logo"
                  className="w-20 h-20 mb-2"
                />
                <span className="text-2xl">2. </span>Register into the platform
                and complete the profile
              </div>
            </div>
            <div>
              <div className="mb-8">
                <Image
                  src={upload}
                  alt="upload logo"
                  className="w-20 h-20 mb-2"
                />
                <span className="text-2xl">3. </span>Upload the video with the
                correspondings tags
              </div>

              <div className="mb-8">
                <Image
                  src={community}
                  alt="community logo"
                  className="w-20 h-20 mb-2"
                />
                <span className="text-2xl">4. </span>Engage with the community
                commenting others' content
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-6xl mb-6 ">
            Skip tutorial hell in 3 simple steps
          </h1>
          <h3 className="text-xl mb-10 ">
            No more binge-watching videos that don't meet <br />
            your specific needs. With our supportive community, <br />
            you'll receive tailored feedback that suits you best.
          </h3>
          <Link
            className=" bg-slate-200 rounded-lg  text-teal-800 border border-solid py-2 px-4"
            href="/register"
          >
            Upload
          </Link>
        </div>
      </section>
      <section className="px-40 pt-28 pb-28 ">
        <div className="text-6xl mb-14 flex flex-col items-center text-center text-violet-900">
          Our Partners
        </div>
        <div className="flex flex-wrap justify-center ">
          <Image
            src={australianOpen}
            alt="autralian open logo"
            className="w-36 mx-2"
          />
          <Image
            src={rolandGarros}
            alt="roland garros logo"
            className="w-36 h-36 mx-2"
          />
          <Image src={UsOpen} alt="us open logo" className="w-36 h-36 mx-2" />
          <Image src={wilson} alt="wilson logo" className="w-36 h-36 mx-2" />
          <Image src={head} alt="head logo" className="w-36" />
          <Image
            src={wimbledon}
            alt="wimbledon logo"
            className="w-36 h-36 mx-2"
          />
          <Image
            src={wta}
            alt="women tennis aassociation logo"
            className="w-36 h-36 mx-2"
          />
          <Image
            src={itf}
            alt="itf federation logo"
            className="w-36 h-36 mx-2"
          />
          <Image
            src={atp}
            alt="assotiation of tennis professinals logo"
            className="w-36 h-36 mx-2"
          />
          <Image
            src={tennisEurope}
            alt="tennis europe logo"
            className="w-36 h-36 mx-2"
          />
        </div>
      </section>
      <section>
        <div className="px-40 pt-28 pb-28 flex justify-between bg-slate-200 text-teal-800">
          <div className="flex mb-auto">
            <Image
              className="mr-3 w-8 h-8 ml-4 text-teal-800"
              src={tennisLogoGreen}
              alt="tennisflow logo"
            />
            <div className="text-2xl mt-auto ">Tennisflow </div>
          </div>
          <div>
            Company
            <div className="text-sm mt-1">About Us</div>
            <div className="text-sm mt-1">Careers</div>
            <div className="text-sm mt-1">Our History</div>
            <div className="text-sm mt-1">Terms and coditions</div>
          </div>
          <div>
            Helpful Resources
            <div className="text-sm mt-1">Knowledge Base</div>
            <div className="text-sm mt-1">Tutorials</div>
            <div className="text-sm mt-1">Feedback</div>
          </div>
          <div>
            Contact Us
            <div className="flex mt-2">
              <Image className="w-5 h-5 mx-1" src={email} alt="email logo" />
              <Image className="w-5 h-5 mx-1" src={x} alt="x logo" />
              <Image
                className="w-5 h-5 mx-1"
                src={instagram}
                alt="instagram logo"
              />
              <Image
                className="w-5 h-5 mx-1"
                src={facebook}
                alt="facebooklogo"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
