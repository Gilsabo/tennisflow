import { notFound } from 'next/navigation';
import { getUserProfileById } from '../../../../database/profiles';

type Props = {
  params: {
    playerId: string;
  };
};

export default async function PlayerPage(props: Props) {
  const imageURL = 'https://res.cloudinary.com/dqiq3eutn/image/upload/';
  const singlePlayer = await getUserProfileById(Number(props.params.playerId));

  if (!singlePlayer) {
    return notFound();
  }
  return (
    <div className="mt-24">
      <main className="flex w-2/4 shadow-2xl  m-auto border rounded-3xl">
        <img
          src={`${imageURL}${singlePlayer.profilePictureUrl}`}
          alt={`${singlePlayer.firstName}${singlePlayer.lastName}`}
          width={200}
          height={100}
        />
        <div className="p-8">
          <div className="text-xl mb-8">"{singlePlayer.description}"</div>
          <div className="flex flex-col">
            <div className="text-sm">Name: {singlePlayer.firstName}</div>
            <div className="text-sm">Last Name: {singlePlayer.lastName}</div>
            <div className="text-sm">Age: {singlePlayer.age}</div>
            <div className="text-sm">
              Years of experience: {singlePlayer.yearsExperience}
            </div>
            <div className="text-sm">
              Dominant hand: {singlePlayer.dominantHand}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
