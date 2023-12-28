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

    router.push(
      getSafeReturnToPath(props.returnTo) ||
        `/dashboard/profile/${data.user.userName}`,
    );
    // solves problems with refreshing. RevalidatePath()
    router.refresh();
  }

  return (
    <main className="m-auto bg-slate-200 pt-40 h-screen">
      <div className="mx-8 sm:mx-16 md:mx-32 lg:mx-80 xl:mx-64 xl:px-60 min-w-min">
        <div className="flex text-lg font-semibold text-[#00503C] mb-4">
          <Image
            className="mr-3 w-8 h-8 ml-7 bg-[#00503C] text-[#00503C] rounded-full "
            src={tennisFlowLogo}
            alt="tennisflow logo"
          />
          <div>Sign in to your account</div>
        </div>
        <form
          className="mx-8"
          onSubmit={async (event) => await handleRegister(event)}
        >
          <div>
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-[#00503C]"
              >
                User name
              </label>
              <div className="mt-2">
                <input
                  onChange={(event) => setUserName(event.currentTarget.value)}
                  name="user-name"
                  id="user-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-[#00503C] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300  sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="first-name"
              className="block mt-4 text-sm font-medium text-[#00503C]"
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
                className="block w-full rounded-md border-0 py-1.5 text-[#00503C] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 hover:text-slate-200 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm"
              />
            </div>

            <button className="mt-8 w-full rounded-md hover:bg-[#00503C] border border-solid border-[#00503C] px-3 py-2 text-sm font-semibold text-[#00503C] shadow-sm bg-slate-200 hover:text-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300">
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
    </main>
  );
}
