import { getVideos } from '../../database/videos';
import styles from './dashBoard.module.css';
import Vidoes from './Videos';

export default async function Dashboard() {
  const videos = await getVideos();
  console.log('videossss', videos);
  return (
    <div className={styles.videoContainer}>
      <Vidoes videos={videos} />
    </div>
  );
}
