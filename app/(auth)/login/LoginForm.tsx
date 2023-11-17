'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import tennisFlowLogo from '../../../public/images/tennisFlowLogo.svg';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

type Props = { returnTo?: string | string[] };

export default function LoginFrom(props: Props) {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        userName,
        password,
      }),
    });
    const data: LoginResponseBodyPost = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    // not secure way
    // if (props.returnTo) {
    //   router.push(props.returnTo);
    // }

    router.push(
      getSafeReturnToPath(props.returnTo) ||
        `/dashboard/profile/${data.user.userName}`,
    );
    // solves problems with refreshing. RevalidatePath()
    router.refresh();
  }

  return (
    <div className="m-auto bg-slate-200 pt-40 h-screen">
      <div>
        <div className=" flex text-lg font-semibold text-[#00503C]">
          <Image
            className="mr-3 w-8 h-8 ml-4 bg-[#00503C] text-[#00503C] rounded-full "
            src={tennisFlowLogo}
            alt="tennisflow logo"
          />
          <div>Sign in to your account</div>
        </div>
        <form
          className=" w-96 h-96 m-auto"
          onSubmit={async (event) => await handleRegister(event)}
        >
          <div className="m-auto">
            <div className="w-80 mt-10 mb-4 sm:col-span-3">
              <label
                htmlFor="first-name"
                className=" ml-8 block text-sm font-medium leading-6 text-[#00503C]"
              >
                User name
              </label>
              <div className="mt-2">
                <input
                  onChange={(event) => setUserName(event.currentTarget.value)}
                  name="user-name"
                  id="user-name"
                  autoComplete="given-name"
                  className=" ml-8 block w-full rounded-md border-0 py-1.5 text-[#00503C] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300  sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className=" w-80 sm:col-span-3">
            <label
              htmlFor="first-name"
              className="block text-sm ml-8 font-medium leading-6 text-[#00503C]"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="passowrd"
                id="passowrd"
                onChange={(event) => setPassword(event.currentTarget.value)}
                autoComplete="given-name"
                className="block w-full ml-8 rounded-md border-0 py-1.5 text-[#00503C] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:text-slate-200 focus:ring-2 focus:ring-inset focus:ring-gray-300  sm:text-sm sm:leading-6"
              />
            </div>

            <button className="mt-8 w-60 m-16 rounded-md hover:bg-[#00503C] border border-solid border-[#00503C] px-3 py-2 text-sm font-semibold text-[#00503C] shadow-sm bg-slate-200 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300 ">
              Log in
            </button>
          </div>
          {errors.map((error) => (
            <div
              className="p-4 rounded-xl w-80 m-auto text-center border-rose-600 text-rose-600 bg-slate-200"
              key={`error-${error.message}`}
            >
              Error: {error.message}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
