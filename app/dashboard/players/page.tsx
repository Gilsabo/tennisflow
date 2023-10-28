import { getUserProfiles } from '../../../database/profiles';

export default async function Players() {
  const userProfiles = await getUserProfiles();

  return (
    <div>
      <div>Players</div>
      <div>
        {userProfiles.map((userProfile) => {
          return (
            <div key={`div-players-${userProfile.id}`}>
              <div>{userProfile.firstName}</div>
              <div> {userProfile.age}</div>
              <div> {userProfile.dominantHand}</div>
              <img
                src={`../images/${userProfile.profilePictureUrl}.jpeg`}
                alt={`${userProfile.firstName}${userProfile.lastName}`}
                width={100}
                height={100}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
