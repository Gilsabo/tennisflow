'use client';
import { UserProfile } from '../../../../migrations/00002-createTableUserProfiles';

type Props = {
  profilePlayer: UserProfile;
};

export default function EditProfile(props: Props) {
  return (
    <div>
      <div key={`div-profile-${props.profilePlayer.id}`}>
        <div>Name: {props.profilePlayer.firstName}</div>
        <div>Last Name: {props.profilePlayer.lastName}</div>
        <div>Email: {props.profilePlayer.email}</div>
        <div>Age: {props.profilePlayer.age}</div>
        <div>Years of experience: {props.profilePlayer.yearsExperience}</div>
        <div>Dominant hand: {props.profilePlayer.dominantHand}</div>
        <div>About me: {props.profilePlayer.description}</div>
      </div>
    </div>
  );
}
