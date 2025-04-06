import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserDataFromLocalStorage } from '../services/Utils';


function useCheckProfileCompletion() {
  const navigate = useNavigate()
  useEffect(() => {
    const storedData = getUserDataFromLocalStorage();

    if (storedData && !storedData.profile_completed) {
      navigate("/business-info");
    }
  }, [navigate]);
}

export default useCheckProfileCompletion;
