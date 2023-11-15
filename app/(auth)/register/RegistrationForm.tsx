'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RegisterResponseBodyPost } from '../../api/(auth)/register/route';

export default function RegistrationForm() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        userName,
        password,
      }),
    });
    const data: RegisterResponseBodyPost = await response.json();
    console.log('data', data);

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }

    router.push(`/dashboard/profile/${data.user.userName}`);
    // solves problems with refreshing. RevalidatePath()
    router.refresh();
  }

  return (
    <div className="m-auto bg-slate-200 pt-40 h-screen">
      <form
        className="border  bg-teal-800 rounded-lg  w-96 h-96 m-auto"
        onSubmit={async (event) => await handleRegister(event)}
      >
        <div className="m-auto">
          <div className="w-80 mt-10 mb-4 sm:col-span-3">
            <label
              htmlFor="first-name"
              className=" ml-8 block text-sm font-medium leading-6 text-slate-200"
            >
              User name
            </label>
            <div className="mt-2">
              <input
                onChange={(event) => setUserName(event.currentTarget.value)}
                name="user-name"
                id="user-name"
                autoComplete="given-name"
                className=" ml-8 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className=" w-80 sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm ml-8 font-medium leading-6 text-slate-200"
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
              className="block w-full ml-8 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <button className="mt-8 w-60 m-16 rounded-md bg-slate-200 px-3 py-2 text-sm font-semibold text-teal-800 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Register
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
  );
}
