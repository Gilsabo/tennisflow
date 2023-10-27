import styles from './dashBoard.module.css';
import Video from './video';

export default function Dashboard() {
  return (
    <div className={styles.videoContainer}>
      <div className={styles.video}>
        <Video />
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
  );
}
