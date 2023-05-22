import React, { useState } from "react";
import { User, UserListProps } from "../../types/types";
import UserModal from "../Modal/Modal";

export const UserList: React.FC<UserListProps> = ({ users, error }) => {
  const [userStatus, setUserStatus] = useState<{
    [userId: number]: { followed: boolean; blocked: boolean };
  }>({});

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const handleFollow = (userId: number) => {
    setUserStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: {
        ...prevStatus[userId],
        followed: !prevStatus[userId]?.followed || false,
      },
    }));
  };

  const handleBlock = (userId: number) => {
    setUserStatus((prevStatus) => ({
      ...prevStatus,
      [userId]: {
        ...prevStatus[userId],
        blocked: !prevStatus[userId]?.blocked || false,
      },
    }));
  };

  const openModal = (user: User) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsOpen(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div className="container">
      <h1 className="text-center mb-5 mt-5">Stack Overflow Users</h1>
      <div className="row">
        {users.map((user) => {
          const isBlocked = userStatus[user.user_id]?.blocked || false;
          const isFollowed = userStatus[user.user_id]?.followed || false;

          return (
            <div className="col-xl-4 col-lg-4 col-12" key={user.user_id}>
              <div className={"wrapper mb-4"}>
                <div className="profile">
                  <img
                    src={user.profile_image}
                    className={`thumbnail img-fluid ${isBlocked && "blocked"}`}
                    onClick={() => openModal(user)}
                  />

                  {isFollowed && (
                    <div className="check">
                      <i className="fas fa-check"></i>
                    </div>
                  )}
                  <h3 data-testid="user-name" className="name">{user.display_name}</h3>
                  <p data-testid="user-reputation" className="title">Reputation: {user.reputation}</p>
                  <button
                  data-testid="follow"
                    type="button"
                    className={`btn ${isFollowed ? "following" : ""}`}
                    onClick={() => handleFollow(user.user_id)}
                  >
                    {isFollowed ? "UnFollow" : "Follow"}
                  </button>
                  <br />
                  <button
                  data-testid="block"
                    onClick={() => handleBlock(user.user_id)}
                    type="button"
                    className="btn block"
                  >
                    {isBlocked ? "Un-Block" : "Block User"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedUser && (
        <UserModal
          user={selectedUser}
          isOpen={modalIsOpen}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
