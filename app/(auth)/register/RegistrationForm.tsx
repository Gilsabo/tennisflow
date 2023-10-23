'use client';
import { useState } from 'react';

export default function RegistrationForm() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        userName: userName,
        password: password,
      }),
    });
    const data = response.json();
    console.log('check:', data);
  }
  return (
    <>
      <div>RegistrationForm</div>
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
        <button>Register</button>
      </form>
    </>
  );
}
