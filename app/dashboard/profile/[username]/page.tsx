import Profile from './Profile';

type Props = {
  params: { username: string };
};

export default function UserProfilePage({ params }: Props) {
  // removes URICODE in case user typed user name with spaces OR OTHER CHARACTERS
  const removeSpacesFromUri = decodeURIComponent(
    params.username.replace(/\+/g, ' '),
  );
  console.log('params', removeSpacesFromUri);
  return (
    <div>
      <h2>{removeSpacesFromUri} Profile</h2>
      <Profile params={params} />
    </div>
  );
}
