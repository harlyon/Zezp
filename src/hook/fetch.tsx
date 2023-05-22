import React, { useEffect, useState } from 'react';
import { User } from '../types/types';

export const useFetchData = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
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

        // API TIMES OUT AFTER S NUMBER OF REQUEST SO I DID THIS

        // Compare new data with cached data to check for updates
        const cachedData = localStorage.getItem('userData');
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          if (JSON.stringify(parsedData) !== JSON.stringify(fetchedUsers)) {
            // Data is updated, update the state and cache
            setUsers(fetchedUsers);
            localStorage.setItem('userData', JSON.stringify(fetchedUsers));
          } else {
            // No data updates, set the cached data as the initial state
            setUsers(parsedData);
          }
        } else if (fetchedUsers.length > 0) {
          // No cached data, set the fetched data and cache it
          setUsers(fetchedUsers);
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
