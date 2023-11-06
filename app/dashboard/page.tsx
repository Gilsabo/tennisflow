import { getVideos } from '../../database/videos';
import Videos from './Videos';

export default async function Dashboard() {
  const videos = await getVideos();
  return <Videos videos={videos} />;
}
