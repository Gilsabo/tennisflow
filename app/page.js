import styles from './page.module.css';

export default function Home() {
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
          <button>Sign up</button>
          <button>Log in</button>
        </div>
      </header>
      <main>
        <hero className={styles.container} id="#home">
          <h1>Elevate Your Game with Tennis Enthusiasts Community!</h1>
          <h3>
            Upload your tennis strokes, get expert feedback, and level up your
            skills with our supportive community.
          </h3>
          <p>Get started</p>
        </hero>
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
