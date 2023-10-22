import Link from 'next/link';
import styles from './dashBoard.module.css';

export default function Layout({ children }) {
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
        <button>log out</button>
      </header>
      <main className={styles.mainContainer}>
        <sidebar>
          <ul>
            <li>
              <Link href="/dashboard"> Main</Link>
            </li>
            <li>
              <Link href="/dashboard/history"> History</Link>
            </li>
            <li>
              <Link href="/dashboard/profile"> Profile</Link>
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
