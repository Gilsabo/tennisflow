import Link from 'next/link';
import { getUserProfiles } from '../../../database/profiles';

export default async function Players() {
  const userProfiles = await getUserProfiles();
  const imageURL = 'https://res.cloudinary.com/dqiq3eutn/image/upload/';

  return (
    <div className="flex-col justify-center">
      <div>Players</div>
      <div>
        {userProfiles.map((userProfile) => {
          return (
            <div key={`div-players-${userProfile.id}`}>
              <Link
                className="flex"
                href={`/dashboard/players/${userProfile.id}`}
              >
                <img
                  className="rounded-full h-24"
                  src={`${imageURL}${userProfile.profilePictureUrl}`}
                  alt={`${userProfile.firstName}${userProfile.lastName}`}
                  width={100}
                />

                <div>
                  <div>{userProfile.firstName}</div>
                  <div> {userProfile.age}</div>
                  <div> {userProfile.dominantHand}</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
