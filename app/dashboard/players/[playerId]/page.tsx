import { notFound } from 'next/navigation';
import { getUserProfileById } from '../../../../database/profiles';

type Props = {
  params: {
    playerId: string;
  };
};

export default async function PlayerPage(props: Props) {
  const singlePlayer = await getUserProfileById(Number(props.params.playerId));

  if (!singlePlayer) {
    return notFound();
  }
  return (
    <>
      <div>PlayerPage</div>
      <div>{singlePlayer.firstName}</div>
      <div>{singlePlayer.lastName}</div>
      <div>{singlePlayer.age}</div>
      <div>{singlePlayer.yearsExperience}</div>
      <div>{singlePlayer.dominantHand}</div>
      <div>{singlePlayer.description}</div>
      <img
        src={`./../../images/${singlePlayer.profilePictureUrl}.jpeg`}
        alt={`${singlePlayer.firstName}${singlePlayer.lastName}`}
        width={100}
        height={100}
      />
    </>
  );
}
