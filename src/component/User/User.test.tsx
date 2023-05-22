import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserList } from "./User";

const mockUsers = [
  {
    user_id: 1,
    display_name: "John Doe",
    reputation: 1000,
    profile_image: "https://example.com/profile1.jpg",
  },
  {
    user_id: 2,
    display_name: "Jane Smith",
    reputation: 2000,
    profile_image: "https://example.com/profile2.jpg",
  },
];

describe("UserList", () => {
  test("renders users with correct information", () => {
    render(<UserList users={mockUsers} error={''} />);

    const nameElements = screen.getAllByTestId("user-name");
    const reputationElements = screen.getAllByTestId("user-reputation");
    const followButtons = screen.getAllByTestId("follow");
    const blockButtons = screen.getAllByTestId("block");

    expect(nameElements.length).toBe(mockUsers.length);
    expect(reputationElements.length).toBe(mockUsers.length);
    expect(followButtons.length).toBe(mockUsers.length);
    expect(blockButtons.length).toBe(mockUsers.length);

    mockUsers.forEach((user, index) => {
      const nameElement = nameElements[index];
      const reputationElement = reputationElements[index];
      const followButton = followButtons[index];
      const blockButton = blockButtons[index];

      expect(nameElement).toHaveTextContent(user.display_name);
      expect(reputationElement).toHaveTextContent(`Reputation: ${user.reputation}`);
      expect(followButton).toBeInTheDocument();
      expect(blockButton).toBeInTheDocument();
    });
  });

  test("calls handleFollow and handleBlock when clicked", () => {

    render(
      <UserList users={mockUsers} error={''}  />
    );
    const followButtons = screen.getAllByTestId("follow");
    const blockButtons = screen.getAllByTestId("block");
    followButtons.forEach((button, index) => {
      fireEvent.click(button);
    }
    );
    blockButtons.forEach((button, index) => {
      fireEvent.click(button);
    }
    );
  });

  test("renders error message when there is an error", () => {
    const errorMessage = "Failed to fetch user data. Please try again later.";
    render(<UserList users={[]} error={errorMessage} />);

    const errorElement = screen.getByText(`Error: ${errorMessage}`);
    expect(errorElement).toBeInTheDocument();
  });

  test("renders 'No users found' message when there are no users", () => {
    render(<UserList users={[]} error={''} />);

    const noUsersElement = screen.getByText("No users found.");
    expect(noUsersElement).toBeInTheDocument();
  });
});
