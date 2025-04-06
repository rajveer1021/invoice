import * as yup from "yup";

export const validationForLogin = yup.object({
  email: yup
    .string()
    .email("Please provide a valid email address to proceed.")
    .required("Please provide your email address to proceed."),
  password: yup
    .string()
    .required("For enhanced security, please provide a password."),
});

export const ValidationforRegistrationPage = yup.object({
  first_name: yup.string().required("Please provide your first name."),
  last_name: yup.string().required("Please provide your last name."),
  email: yup
    .string()
    .email(
      "The email address provided is not in a valid format. Please enter a valid email address."
    )
    .required("Please provide your Email."),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Please ensure the entered passwords match"
    )
    .required("Confirm password is required"),
});

export const ValidationforEmail = yup.object({
  email: yup
    .string()
    .email(
      "The email address provided is not in a valid format. Please enter a valid email address."
    )
    .required("Please provide your Email."),
});
export const ValidationforOTPpage = yup.object({
  otp_code: yup
    .string()
    .matches(/^[0-9]+$/, "Please enter a valid OTP Code number.")
    .max(6, "Please enter a valid OTP Code number.")
    .required("Please enter a valid OTP Code number."),
});
export const ValidationforUpdatePassword = yup.object({
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  password_confirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Please ensure the entered passwords match"
    )
    .required("Confirm password is required"),
});

export const ValidationforChangePassword = yup.object({
  current_password: yup.string().required("Current Password is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .required("New Password is required"),
  password_confirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Please ensure the entered passwords match"
    )
    .required("Confirm New Password is required"),
});

export const ValidationforBusinessInfo = yup.object({
  company_name: yup.string().required("Company name is required"),
  company_email_address: yup
    .string()
    .email("Enter a valid email address")
    .required("Company email is required"),
  country: yup.string().required("Country is required"),
});

export const ValidationforUserAccount = yup.object({
  first_name: yup.string().required("Please provide your first name."),
  last_name: yup.string().required("Please provide your last name."),
  email: yup
    .string()
    .email(
      "The email address provided is not in a valid format. Please enter a valid email address."
    )
    .required("Please provide your Email."),
  company_name: yup.string().required("Company name is required"),
  company_email_address: yup
    .string()
    .email("Enter a valid email address")
    .required("Company email is required"),
  country: yup.string().required("Country is required"),
});

export const ValidationforAddclient = yup.object({
  company_name: yup
    .string()
    .required("Please provide your Compnay name to proceed."),
});

export const ValidationforFeedback = yup.object({
  first_name: yup.string().required("Please provide your first name."),
  last_name: yup.string().required("Please provide your last name."),
  email: yup
    .string()
    .email(
      "The email address provided is not in a valid format. Please enter a valid email address."
    )
    .required("Please provide your Email."),
  description: yup.string().required("Please provide your comments."),
  job_title: yup.string().required("Please provide your Job title"),
});

export const validationForDeleteAccount = yup.object({
  confirm_password: yup
    .string()
    .required("For enhanced security, please provide a password."),
});
