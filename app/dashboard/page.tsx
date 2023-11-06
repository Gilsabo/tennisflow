import { getVideos } from '../../database/videos';
import Vidoes from './Videos';

export default async function Dashboard() {
  const videos = await getVideos();
  console.log('videossss', videos);
  return <Vidoes videos={videos} />;
}
