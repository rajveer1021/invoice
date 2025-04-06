import { useNavigate } from "react-router-dom";

function useGoBack() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return goBack;
}

export default useGoBack;
