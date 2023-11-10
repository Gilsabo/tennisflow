import Link from 'next/link';
import { getUserProfiles } from '../../../database/profiles';

export default async function Players() {
  const userProfiles = await getUserProfiles();
  const imageURL = 'https://res.cloudinary.com/dqiq3eutn/image/upload/';

  return (
    <div className="flex-col justify-center mt-10">
      <div className="flex flex-wrap justify-center">
        {userProfiles.map((userProfile) => {
          return (
            <div
              className="w-80 shadow-xl rounded-lg m-4 px-2 py-6"
              key={`div-players-${userProfile.id}`}
            >
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

                <div className="ml-4">
                  <div className="mb-8 text-slate-800">
                    {userProfile.firstName}
                  </div>
                  <div className="text-xs  text-orange-800">
                    {userProfile.age}
                  </div>
                  {userProfile.dominantHand === 'right-handed' ? (
                    <div className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 mt-1.5 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                      {userProfile.dominantHand}
                    </div>
                  ) : userProfile.dominantHand === 'left-handed' ? (
                    <div className="bg-yellow-100 text-yellow-800 text-xs font-medium mt-1.5  mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">
                      {userProfile.dominantHand}
                    </div>
                  ) : (
                    <div className="bg-pink-100 text-pink-800 text-xs font-medium mt-1.5 mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">
                      {userProfile.dominantHand}
                    </div>
                  )}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
