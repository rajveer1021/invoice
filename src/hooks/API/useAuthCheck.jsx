import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getHeaderDataFromLocalStorage,
  getUserDataFromLocalStorage,
} from "../../services/Utils";

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const userHeaderData = getHeaderDataFromLocalStorage();
    const userDataFromStorage = getUserDataFromLocalStorage();

    if (!(userHeaderData && userDataFromStorage)) {
      navigate("/login");
      setIsChecking(false);
      return;
    }

    setUserData(userDataFromStorage);
    setIsAuthenticated(true);
    setIsChecking(false);
  }, [navigate]);

  return { isAuthenticated, userData, isChecking };
};