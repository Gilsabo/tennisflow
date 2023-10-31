import { notFound } from 'next/navigation';
import { getUserIdByUserName } from '../../../../database/users';
import Profile from './Profile';

type Props = {
  params: { username: string };
};

export default async function UserProfilePage({ params }: Props) {
  // removes URICODE in case user typed user name with spaces OR OTHER CHARACTERS

  console.log('params', params.username);
  const removeSpacesFromUri = decodeURIComponent(
    params.username.replace(/\+/g, ' '),
  );
  const userId = await getUserIdByUserName(removeSpacesFromUri);
  console.log('user', userId);

  if (userId === undefined) {
    return notFound();
  }

  // handel error------------------>>>>>>>>

  return (
    <div>
      <h2>{removeSpacesFromUri} Profile</h2>
      <Profile userId={userId.id} />
    </div>
  );
}
