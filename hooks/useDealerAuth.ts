'use client'

import { useContext } from "react";
import { DealerAuthContext } from "@/context/DealerAuthContext";

/** Access the centralized Dealer authentication context. */
export function useDealerAuth() {
  const value = useContext(DealerAuthContext);
  if (!value) {
    throw new Error("useDealerAuth must be used within a DealerAuthProvider.");
  }
  return value;
}
