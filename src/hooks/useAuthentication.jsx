import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getHeaderDataFromLocalStorage,
  getUserDataFromLocalStorage,
} from "../services/Utils";

const useAuthentication = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginDetails = () => {
      const userHeaderData = getHeaderDataFromLocalStorage();
      const userData = getUserDataFromLocalStorage();
      if (!(userHeaderData && userData)) {
        navigate("/login");
      }
    };

    checkLoginDetails();
  }, [navigate]);

  return;
};

export default useAuthentication;
