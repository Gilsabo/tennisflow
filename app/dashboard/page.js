import styles from './dashBoard.module.css';

export default function Dashboard() {
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
        <a href="/">upload</a>
        <a href="/">notification</a>
        <button>log out</button>
      </header>
      <main className={styles.mainContainer}>
        <sidebar>
          <ul>
            <li>
              <a href="/">Profile</a>
            </li>
            <li>
              <a href="/">My videos</a>
            </li>
            <li>
              <a href="/">History</a>
            </li>
          </ul>
        </sidebar>

        <div className={styles.videoContainer}>
          <div className={styles.video}>
            <div>video</div>
          </div>
          <div className={styles.video}>
            <div>video</div>
          </div>
          <div className={styles.video}>
            <div>video</div>
          </div>
          <div className={styles.video}>
            <div>video</div>
          </div>
          <div className={styles.video}>
            <div>video</div>
          </div>
          <div className={styles.video}>
            <div>video</div>
          </div>
          <div className={styles.video}>
            <div>video</div>
          </div>
          <div className={styles.video}>
            <div>video</div>
          </div>
          <div className={styles.video}>
            <div>video</div>
          </div>
        </div>
      </main>
    </>
  );
}
