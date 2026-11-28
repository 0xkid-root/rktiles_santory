import type { DealerSignupValues } from "@/types/dealer.types";

/** Field key, including dotted address keys like `address.street`. */
export type DealerSignupField =
  | keyof Omit<DealerSignupValues, "address">
  | `address.${keyof DealerSignupValues["address"]}`;

export type DealerSignupErrors = Partial<Record<DealerSignupField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DIGITS_PATTERN = /^\d+$/;

export const emptyDealerSignupValues: DealerSignupValues = {
  ownerName: "",
  businessName: "",
  email: "",
  password: "",
  confirmPassword: "",
  mobile: "",
  alternateMobile: "",
  gstNumber: "",
  businessType: "",
  address: { street: "", city: "", state: "", pincode: "", country: "India" },
};

/**
 * Client-side validation for the dealer signup form (Phase 1, no API).
 * Mirrors backend rules: businessName >= 2, ownerName >= 2, valid email, password >= 6, mobile >= 10,
 * plus UI-only confirm-password match. Optional fields are validated only when provided.
 */
export function validateDealerSignup(values: DealerSignupValues): DealerSignupErrors {
  const errors: DealerSignupErrors = {};

  if (values.ownerName.trim().length < 2) errors.ownerName = "Owner name must be at least 2 characters.";
  if (values.businessName.trim().length < 2) errors.businessName = "Business name must be at least 2 characters.";
  if (!values.email.trim()) errors.email = "Email address is required.";
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = "Enter a valid email address.";
  if (values.password.length < 6) errors.password = "Password must be at least 6 characters.";
  if (values.confirmPassword !== values.password) errors.confirmPassword = "Passwords do not match.";
  if (values.mobile.trim().length < 10) errors.mobile = "Enter a valid mobile number (minimum 10 digits).";
  else if (!DIGITS_PATTERN.test(values.mobile.trim())) errors.mobile = "Mobile number must contain digits only.";

  if (values.alternateMobile.trim() && !DIGITS_PATTERN.test(values.alternateMobile.trim())) {
    errors.alternateMobile = "Alternate mobile number must contain digits only.";
  }

  const address = values.address;
  if (!address.street.trim()) errors["address.street"] = "Street is required.";
  if (!address.city.trim()) errors["address.city"] = "City is required.";
  if (!address.state.trim()) errors["address.state"] = "State is required.";
  if (!address.pincode.trim()) errors["address.pincode"] = "PIN code is required.";
  else if (!DIGITS_PATTERN.test(address.pincode.trim())) errors["address.pincode"] = "PIN code must contain digits only.";
  if (!address.country.trim()) errors["address.country"] = "Country is required.";

  return errors;
}
