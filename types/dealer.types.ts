/**
 * Dealer domain types (frontend). Mirrors the backend `User`/dealer shape for future API integration.
 * No API calls or authentication are wired in this phase.
 */

export type DealerRole = 'dealer' | 'admin'
export type DealerApprovalStatus = 'pending' | 'approved' | 'rejected'
export type DealerAccountStatus = 'active' | 'suspended'
export type DealerVerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected'

export type DealerAddress = {
  street: string
  city: string
  state: string
  pincode: string
  country: string
}

export type Dealer = {
  _id?: string
  name?: string
  email?: string
  role?: DealerRole
  businessName?: string
  dealerId?: string
  ownerName?: string
  mobile?: string
  alternateMobile?: string
  gstNumber?: string
  businessType?: string
  address?: Partial<DealerAddress>
  approvalStatus?: DealerApprovalStatus
  accountStatus?: DealerAccountStatus
  verificationStatus?: DealerVerificationStatus
  verificationRemarks?: string
  isActive?: boolean
  lastLoginAt?: string
  createdAt?: string
  updatedAt?: string
}

/** Dealer account registration form values (frontend). Confirm-password is UI-only. */
export type DealerSignupValues = {
  ownerName: string
  businessName: string
  email: string
  password: string
  confirmPassword: string
  mobile: string
  alternateMobile: string
  gstNumber: string
  businessType: string
  address: DealerAddress
}

/** Dealer login form values (frontend). */
export type DealerLoginValues = {
  email: string
  password: string
}
