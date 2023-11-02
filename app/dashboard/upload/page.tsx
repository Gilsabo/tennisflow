import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { getUserProfileByUserId } from '../../../database/profiles';
import { getUserBySessionToken } from '../../../database/users';
import VideoForm from './VideoForm';

export default async function Upload() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  if (!sessionToken) return;
  // i get the user_id to get the acces to the user_profile_id with the function getUserProfileByUserId(user.id)
  const user = await getUserBySessionToken(sessionToken.value);

  if (!user) {
    // in the future, has to render: user not logged in
    notFound();
  }
  // I get the user_profile_id to pass it to the videos table
  const userProfileId = await getUserProfileByUserId(user.id);

  if (!userProfileId) return;

  return (
    <div>
      <div>UploadVideo</div>
      <VideoForm userProfileId={userProfileId.id} />
    </div>
  );
}
