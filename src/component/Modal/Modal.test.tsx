import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "react-modal";
import UserModal from "./Modal";

const user = {
  user_id: 1,
  display_name: "John Doe",
  reputation: 1000,
  profile_image: "https://example.com/profile.jpg",
  location: "New York",
  link: "https://example.com/profile",
};

// Set the app element before rendering the modal
Modal.setAppElement(document.createElement("div"));

describe("UserModal", () => {
  test("renders user information", () => {
    render(<UserModal user={user} isOpen={true} closeModal={jest.fn()} />);

    const nameElement = screen.getByText(user.display_name);
    const reputationElement = screen.getByText(user.reputation);
    const locationElement = screen.getByText(user.location);
    const profileLinkElement = screen.getByText("View Profile:");
    const closeButton = screen.getByRole("button", { name: "Close" });

    expect(nameElement).toBeInTheDocument();
    expect(reputationElement).toBeInTheDocument();
    expect(locationElement).toBeInTheDocument();
    expect(profileLinkElement).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
  });

  test("calls closeModal when Close button is clicked", () => {
    const closeModalMock = jest.fn();
    render(<UserModal user={user} isOpen={true} closeModal={closeModalMock} />);

    const closeButton = screen.getByRole("button", { name: "Close" });
    fireEvent.click(closeButton);

    expect(closeModalMock).toHaveBeenCalled();
  });
});

