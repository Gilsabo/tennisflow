import { getUsers } from '../../../database/users';

export default async function Players() {
  const users = await getUsers();
  console.log(users);

  return (
    <div>
      <div>Players</div>
      <div>
        {users.map((user) => {
          return (
            <div key={`div-players-${user.lastName}`}>
              <div>{user.userName}</div>
              <div> {user.age}</div>
              <div> {user.dominantHand}</div>
              <img
                src={`../images/${user.profilePictureUrl}.jpeg`}
                alt={`${user.firstName}${user.lastName}`}
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
