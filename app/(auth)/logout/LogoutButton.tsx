import React from 'react';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <form>
      <button
        className=" bg-slate-200 rounded-lg  text-[#00503C] py-2 px-4 transition ease-in-out delay-75 hover:-translate-y-1 hover:scale-110 duration-75 hover:text-violet-900"
        formAction={logout}
      >
        Logout{' '}
      </button>
    </form>
  );
}
