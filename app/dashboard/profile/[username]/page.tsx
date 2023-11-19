import { notFound } from 'next/navigation';
import { getUserProfileByUserId } from '../../../../database/profiles';
import { getUserIdByUserName } from '../../../../database/users';
import EditProfile from './EditProfile';
import Profile from './Profile';

export const metadata = {
  title: 'Profile',
};

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

  // handel error when the profile does not match------------------>>>>>>>>
  if (userId === undefined) {
    return notFound();
  }

  const profilePlayer = await getUserProfileByUserId(userId.id);

  return (
    <div>
      {profilePlayer ? (
        <EditProfile
          profilePlayer={profilePlayer}
          userName={userNameWithoutURIelements} // I pass the username to make dynamic api route
        />
      ) : (
        <Profile userId={userId.id} userName={userNameWithoutURIelements} />
      )}
    </div>
  );
}
