import { topEmailProviders } from "../constant";
import {PLAN_TYPES} from '../constant/index';


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

// Utils
export const mapSubscriptionData = (data) => {
  if (data?.status !== 'success' || !data?.data?.subscription) return null;

  const subData = data.data.subscription;
  const currentPeriodEnd = new Date(subData.current_period_end);
  const now = new Date();
  const expiresInDays = Math.ceil((currentPeriodEnd - now) / (1000 * 60 * 60 * 24));

  return {
    subscriptionId: subData.id,
    planId: subData.razorpay_subscription,
    name: subData.plan_name,
    planType: PLAN_TYPES[subData.plan_name] || 'unknown',
    status: subData.status.charAt(0).toUpperCase() + subData.status.slice(1),
    billingCycle: subData.interval,
    price: parseFloat(subData.price) || 0,
    renewalDate: new Date(subData.next_cycle_at).toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    }),
    paymentMethod: {
      type: subData.card_brand,
      lastFour: subData.card_last_digit,
    },
    nextBillingAmount:
      subData.interval === 'month'
        ? parseFloat(subData.price) || 0
        : (parseFloat(subData.price) || 0) * 12,
    expiresInDays: expiresInDays > 0 ? expiresInDays : 0,
  };
};

export const mapUsageData = (data, subscriptionRenewalDate) => ({
  invoices: {
    used: data?.created_invoices ?? 0,
    total: data?.total_invoices ?? 0,
  },
  clients: {
    used: data?.created_clients ?? 0,
    total: data?.total_clients ?? 0,
  },
  nextRenewal: subscriptionRenewalDate,
});

export const getErrorMessage = (error) =>
  error?.data?.message || 'Failed to load data. Please try again.';