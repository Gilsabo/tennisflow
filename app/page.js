import styles from './page.module.css';

export default function Home() {
  return (
    <main>
      <header className={styles.header}>
        <div className={styles.logoSection}>
          <div>tennisoverflow - </div>
          <span>- logo </span>
        </div>
        <nav>
          <ul className={styles.navigation}>
            <li>
              <a href="/#">Home</a>
            </li>
            <li>
              <a href="/#">Get started</a>
            </li>
            <li>
              <a href="/#">Videos</a>
            </li>
            <li>
              <a href="/#">Community</a>
            </li>
            <li>
              <a href="/#">Partners</a>
            </li>
            <li>
              <a href="/#">About us</a>
            </li>
          </ul>
        </nav>
        <div>
          <button>Sign up</button>
          <button>Log in</button>
        </div>
      </header>
    </main>
  );
}
