import { cookies } from 'next/headers';
import Link from 'next/link';
import { getUserBySessionToken } from '../database/users';
import LogoutButton from './(auth)/logout/LogoutButton';
import styles from './page.module.css';

export default async function Home() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <div>tennisoverflow - </div>
          <span>- logo </span>
        </div>
        <nav>
          <ul className={styles.navigation}>
            <li>
              <a href="/#home">Home</a>
            </li>
            <li>
              <a href="/#getstarted">Get started</a>
            </li>
            <li>
              <a href="/#videos">Videos</a>
            </li>
            <li>
              <a href="/#community">Community</a>
            </li>
            <li>
              <a href="/#partners">Partners</a>
            </li>
            <li>
              <a href="/#aboutus">About us</a>
            </li>
          </ul>
        </nav>
        <div>
          {user ? (
            <>
              <div>{user.userName}</div>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/register">Register</Link>
              <Link href="/login">Log in</Link>
            </>
          )}
        </div>
      </header>
      <main>
        <div className={styles.container} id="#home">
          <h1>Elevate Your Game with Tennis Enthusiasts Community!</h1>
          <h3>
            Upload your tennis strokes, get expert feedback, and level up your
            skills with our supportive community.
          </h3>
          <p>Get started</p>
        </div>
        <section className={styles.container}>
          <h1>Elevate Your Game with Tennis Enthusiasts Community!</h1>
          <h3>
            Upload your tennis strokes, get expert feedback, and level up your
            skills with our supportive community.
          </h3>
          <p>Get started</p>
        </section>
        <section className={styles.container}>
          <h1>Elevate Your Game with Tennis Enthusiasts Community!</h1>
          <h3>
            Upload your tennis strokes, get expert feedback, and level up your
            skills with our supportive community.
          </h3>
          <p>Get started</p>
        </section>
        <section className={styles.container} id="aboutus">
          <h1>Elevate Your Game with Tennis Enthusiasts Community!</h1>
          <h3>
            Upload your tennis strokes, get expert feedback, and level up your
            skills with our supportive community.
          </h3>
          <p>Get started</p>
        </section>
      </main>
    </>
  );
}