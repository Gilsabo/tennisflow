import { notFound } from 'next/navigation';
import { getUserProfileByUserId } from '../../../../database/profiles';
import { getUserIdByUserName } from '../../../../database/users';
import Profile from './Profile';

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  console.log('params', params.username);
  // removes URICODE in case user typed user name with spaces OR OTHER CHARACTERS
  const userNameWithoutURIelements = decodeURIComponent(
    params.username.replace(/\+/g, ' '),
  );
  // takes the id by passing the name. this is needed to create the profile. We need the id from users table and pass it as foreing
  // in user_profiles table so that we have the foreign kew
  const userId = await getUserIdByUserName(userNameWithoutURIelements);

  console.log('user', userId);

  // handel error when the profile does not match------------------>>>>>>>>
  if (userId === undefined) {
    return notFound();
  }

  const profilePlayer = await getUserProfileByUserId(userId.id);
  console.log('profilePlayerrrr', profilePlayer);

  return (
    <div>
      {profilePlayer ? (
        <div key={`div-profile-${profilePlayer.id}`}>
          <div>{profilePlayer.firstName}</div>
          <div>{profilePlayer.lastName}</div>
          <div>{profilePlayer.email}</div>
          <div>{profilePlayer.age}</div>
          <div>{profilePlayer.yearsExperience}</div>
          <div>{profilePlayer.dominantHand}</div>
          <div>{profilePlayer.description}</div>
        </div>
      ) : (
        <>
          <h2>{userNameWithoutURIelements} Profile</h2>
          <Profile userId={userId.id} />
        </>
      )}
    </div>
  );
}
