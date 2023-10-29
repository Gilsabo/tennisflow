import { getUserIdByUserName } from '../../../../database/users';
import Profile from './Profile';

type Props = {
  params: { username: string; id: number };
};

export default async function UserProfilePage({ params }: Props) {
  // removes URICODE in case user typed user name with spaces OR OTHER CHARACTERS
  const removeSpacesFromUri = decodeURIComponent(
    params.username.replace(/\+/g, ' '),
  );

  const userId = await getUserIdByUserName(params.username);

  console.log('user', userId);

  return (
    <div>
      <h2>{removeSpacesFromUri} Profile</h2>
      <Profile params={params} />
    </div>
  );
}
