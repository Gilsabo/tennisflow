import { getVideos } from '../../database/videos';
import Vidoes from './Videos';

export default async function Dashboard() {
  const videos = await getVideos();
  return <Vidoes videos={videos} />;
}
