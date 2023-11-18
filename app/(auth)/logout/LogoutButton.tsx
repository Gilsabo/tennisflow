import React from 'react';
import { logout } from './actions';

export default function LogoutButton() {
  return (
    <form>
      <button
        className=" bg-slate-200 rounded-lg  text-[#00503C] border border-solid py-2 px-4 hover:bg-[#00503C] hover:text-slate-200"
        formAction={logout}
      >
        Logout{' '}
      </button>
    </form>
  );
}
