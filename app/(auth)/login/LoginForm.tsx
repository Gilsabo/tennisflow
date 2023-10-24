'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';

export default function LoginFrom() {
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

    router.push(`/dashboard/profile/${data.user.userName}`);
  }

  return (
    <>
      <div>Login</div>
      <form onSubmit={async (event) => await handleRegister(event)}>
        <label>
          User name
          <input onChange={(event) => setUserName(event.currentTarget.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </label>
        <button>Log in</button>
        {errors.map((error) => (
          <div className="error" key={`error-${error.message}`}>
            Error: {error.message}
          </div>
        ))}
      </form>
    </>
  );
}
