export interface User {
  user_id: number;
  display_name: string;
  reputation: number;
  profile_image: string;
  is_employee?: boolean;
  location?: string;
  user_profile?: string;
  link?: string
}

export interface UserListProps {
  users: User[];
  error: string;
}

export interface UserModalProps {
  user: User;
  isOpen: boolean;
  closeModal: () => void;
}