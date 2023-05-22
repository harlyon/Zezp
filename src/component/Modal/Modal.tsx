import React from "react";
import Modal from "react-modal";
import { UserModalProps } from "../../types/types";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const UserModal: React.FC<UserModalProps> = ({
  user,
  isOpen,
  closeModal,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="wrapper">
        <div className="profile">
          <img
            src={user.profile_image}
            className="thumbnail"
          />
          <h3 className="name">{user.display_name}</h3>
          <p className="title"><strong>Reputation:</strong> {user.reputation}</p>
          <p className="title"><strong>Location:</strong> {user.location}</p>
          <p className="title">
           <strong>View Profile:</strong> <a target="_blank" href={user.link}>Link</a>
          </p>
          <button
            onClick={closeModal}
            type="button"
            className="btn"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
