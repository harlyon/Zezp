import { useEffect, useState } from 'react';
import { User } from '../types/types';

export const useFetchData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if user data is available in local storage
        const cachedData = localStorage.getItem('userData');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setUsers(parsedData);
        } else {
          const response = await fetch('http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow');
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const data = await response.json();
          const fetchedUsers = data.items.map((item: any) => ({
            user_id: item.user_id,
            display_name: item.display_name,
            reputation: item.reputation,
            profile_image: item.profile_image,
            location: item.location,
            link: item.link
          }));
          setUsers(fetchedUsers);
          // Cache the user data in local storage
          localStorage.setItem('userData', JSON.stringify(fetchedUsers));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  return { users, error };
};
