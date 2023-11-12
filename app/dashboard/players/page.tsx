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
                  <div className="text-xs  text-slate-800">
                    {userProfile.age}
                  </div>
                  {userProfile.dominantHand === 'right-handed' ? (
                    <div className="inline-block mb-1 bg-slate-200 break-words text-teal-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border-teal-800">
                      {userProfile.dominantHand}
                    </div>
                  ) : userProfile.dominantHand === 'left-handed' ? (
                    <div className="inline-block mb-1 bg-slate-200 break-words  text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border-teal-800">
                      {userProfile.dominantHand}
                    </div>
                  ) : (
                    <div className="inline-block mb-1 bg-slate-200 break-words text-slate-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded  border-teal-800">
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
