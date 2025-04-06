import { topEmailProviders } from "../constant";


export const getHeaderDataFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem("userHeaderData");

    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error parsing userHeaderData from localStorage", error);
    return null;
  }
};

export const getAuthDataFromLocalStorage = () => {
  try {
    const storedData = localStorage.getItem("userAuthToken");

    if (storedData) {
      return JSON.parse(storedData);
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error parsing userHeaderData from localStorage", error);
    return null;
  }
};

export const getUserDataFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("userData"));
};

export const valuesByComma = (...values) => {
  const filteredValues = values.filter((value) => value?.trim() !== "");
  return filteredValues.join(", ");
};

export let getStatusColors = (invoiceStatus) => {
  let boxBackgroundColor = "";
  let textColor = "";

  switch (invoiceStatus) {
    case "paid":
      boxBackgroundColor = "#46962b";
      textColor = "#fff";
      break;
    case "unpaid":
    case "draft":
      boxBackgroundColor = "#ffc400";
      textColor = "#000";
      break;
    case "due":
      boxBackgroundColor = "#990000";
      textColor = "#fff";
      break;
    case "sent":
      boxBackgroundColor = "#2676a5";
      textColor = "#fff";
      break;
    default:
      boxBackgroundColor = "#e2e2e2";
      textColor = "#000";
      break;
  }

  return { boxBackgroundColor, textColor };
};

export const getEmailBusinessName = (email, companyName) => {
  const domain = email?.split("@")[1];
  if (topEmailProviders?.includes(domain)) {
    return companyName.charAt(0).toUpperCase() + companyName.slice(1);
  } else {
    const businessName = domain?.split(".")[0];
    return businessName.charAt(0).toUpperCase() + businessName.slice(1);
  }
};

export const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${JSON.stringify(value)}; expires=${expires}; path=/`;
};

export const getCookie = (name) => {
  const cookieString = document.cookie;
  const cookies = cookieString.split(";").map(cookie => cookie.trim());
  const foundCookie = cookies.find(cookie => cookie.startsWith(`${name}=`));
  if (foundCookie) {
    const cookieValue = foundCookie.split("=")[1];
    return JSON.parse(cookieValue);
  }
  return null;
};
