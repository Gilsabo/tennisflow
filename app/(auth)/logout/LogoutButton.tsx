import React from 'react';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <form>
      <button
        className=" bg-slate-200 rounded-lg  text-teal-800 border border-solid py-2 px-4"
        formAction={logout}
      >
        Logout{' '}
      </button>
    </form>
  );
}
