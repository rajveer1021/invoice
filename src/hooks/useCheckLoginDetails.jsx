import { useEffect, useState } from 'react';
import { getHeaderDataFromLocalStorage, getUserDataFromLocalStorage } from '../services/Utils';
import { useNavigate } from 'react-router-dom';

const useCheckLoginDetails = () => {
  const [invalidScreen, setInvalidScreen] = useState(false);
  const navigate = useNavigate();

  const checkLoginDetails = () => {
    const userHeaderData = getHeaderDataFromLocalStorage();
    const userData = getUserDataFromLocalStorage();
    return userHeaderData && userData;
  };

  useEffect(() => {
    const isLoggedIn = checkLoginDetails();
    if (isLoggedIn) {
      setInvalidScreen(true);
      navigate("/");
    }
  }, [navigate]);

  return { invalidScreen };
};

export default useCheckLoginDetails;
