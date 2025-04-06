import { useCookiesDataMutation } from "../../services";
import { getCookie, setCookie } from "../../services/Utils";

const useCookiesAPI = () => {
  const [cookiesData] = useCookiesDataMutation();

  const syncGuidWithApi = async (functionalStatus) => {
    try {
      const existingSettings = getCookie("cookie_consent");
      const existingGuid = existingSettings?.guid || null;
      const response = await cookiesData({
        functional: functionalStatus,
        guid: existingGuid,
      });
      if (existingGuid !== response.data.guid) {
        setCookie("cookie_consent", { functional: functionalStatus, guid: response.data.guid }, 365);
      }
      window.location.reload();
    } catch (error) {
      console.error("Error syncing GUID with API:", error);
    }
  };

  return syncGuidWithApi;
};

export default useCookiesAPI;
