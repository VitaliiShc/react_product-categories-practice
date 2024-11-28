import cn from 'classnames';

export const UserFilter = props => {
  const { usersFromServer, setActiveUser, activeUser } = props;

  return (
    <>
      <a
        data-cy="FilterAllUsers"
        href="#/"
        onClick={() => {
          setActiveUser(null);
        }}
        className={cn({ 'is-active': activeUser === null })}
      >
        All
      </a>

      {usersFromServer.map(userFromServer => (
        <a
          data-cy="FilterUser"
          href={`#/${userFromServer.id}`}
          key={userFromServer.id}
          onClick={() => {
            setActiveUser(userFromServer.id);
          }}
          className={cn({
            'is-active': activeUser === userFromServer.id,
          })}
        >
          {userFromServer.name}
        </a>
      ))}
    </>
  );
};
