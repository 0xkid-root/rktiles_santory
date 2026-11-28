/** Backend `/api/v1/categories` category record. */
export type ApiCategory = {
  _id?: string
  name: string
  slug: string
  description?: string
  image?: string
  displayOrder?: number
  isActive?: boolean
  isVisible?: boolean
  createdBy?: string
  updatedBy?: string
  createdAt?: string
  updatedAt?: string
  __v?: number
  productCount?: number
}

/** Backend list response envelope. */
export type ApiCategoriesResponse = { success: boolean; message: string; data: ApiCategory[] }
