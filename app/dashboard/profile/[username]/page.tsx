import { notFound } from 'next/navigation';
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
  // this function allows me to get the id that I need for the profile component throught his id
  const userId = await getUserIdByUserName(userNameWithoutURIelements);
  console.log('user', userId);

  // handel error when the profile does not match------------------>>>>>>>>
  if (userId === undefined) {
    return notFound();
  }

  return (
    <div>
      <h2>{userNameWithoutURIelements} Profile</h2>
      <Profile userId={userId.id} />
    </div>
  );
}
