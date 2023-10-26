import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutButton from '../(auth)/logout/LogoutButton';
import { getUserBySessionToken } from '../../database/users';
import styles from './dashBoard.module.css';

export default async function Layout({ children }) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  //   console.log('Check Xpath: ', headersList.get('x-pathname'));

  // // User has to be an admin
  // // Get user from the database that meets the admin requirements

  // // 3. Either redirect or render the login form
  // if (!session) redirect(`/login?returnTo=${headersList.get('x-pathname')}`);

  return (
    <>
      <div>Dashboard</div>
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <div>tennisoverflow - </div>
          <span>- logo </span>
        </div>

        <nav>
          <form action="/search" method="get">
            <label>
              Search:
              <input name="search" placeholder="Enter your search..." />
            </label>
            <button type="button">Search</button>
          </form>
        </nav>
        <label>
          Upload:
          <input type="file" />
        </label>
        <a href="/">notification</a>
        {user ? <div>{user.userName}</div> : ''}
        <LogoutButton />
        <Link href="/dashboard/admin">Admin</Link>
      </header>
      <main className={styles.mainContainer}>
        <sidebar>
          <ul>
            <li>
              <Link href="/dashboard"> Home</Link>
            </li>
            <li>
              <Link href="/dashboard/history"> History</Link>
            </li>
            <li>
              <Link href={`/dashboard/profile/${user.userName}`}> Profile</Link>
            </li>
            <li>
              <Link href="/dashboard/my-videos"> My videos</Link>
            </li>
            <li>
              <Link href="/dashboard/players"> Players</Link>
            </li>

            <li>
              <Link href="/dashboard/most-commented"> Most commented</Link>
            </li>
            <li>
              <Link href="/dashboard/most-viewed"> Most viewed</Link>
            </li>
          </ul>
        </sidebar>
        {children}
      </main>
    </>
  );
}
