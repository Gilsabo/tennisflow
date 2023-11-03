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
    <div>
      <h1>Player</h1>
      <div>Name: {singlePlayer.firstName}</div>
      <div>Last Name: {singlePlayer.lastName}</div>
      <div>Age: {singlePlayer.age}</div>
      <div>Yesars of experience: {singlePlayer.yearsExperience}</div>
      <div>Dominant hand: {singlePlayer.dominantHand}</div>
      <div>About me: {singlePlayer.description}</div>
      <img
        src={`${imageURL}${singlePlayer.profilePictureUrl}`}
        alt={`${singlePlayer.firstName}${singlePlayer.lastName}`}
        width={100}
        height={100}
      />
    </div>
  );
}
