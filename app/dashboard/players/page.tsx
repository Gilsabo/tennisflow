import Link from 'next/link';
import { getUserProfiles } from '../../../database/profiles';

export default async function Players() {
  const userProfiles = await getUserProfiles();
  const imageURL = 'https://res.cloudinary.com/dqiq3eutn/image/upload/';

  return (
    <div>
      <div>Players</div>
      <div>
        {userProfiles.map((userProfile) => {
          return (
            <div key={`div-players-${userProfile.id}`}>
              <Link href={`/dashboard/players/${userProfile.id}`}>
                <div>{userProfile.firstName}</div>
                <div> {userProfile.age}</div>
                <div> {userProfile.dominantHand}</div>
                <img
                  src={`${imageURL}${userProfile.profilePictureUrl}`}
                  alt={`${userProfile.firstName}${userProfile.lastName}`}
                  width={100}
                  height={100}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
