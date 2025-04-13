export interface BaseResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface User {
  id: number;
  email: string;
  username: string;
  photoProfileUrl: string;
  createdAt: string;
}

export interface Category {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Pagination<T> {
  items: T[];
  meta: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    perPage: number;
  };
  links: {
    prev: string | null;
    next: string | null;
  };
}

export interface Campaign {
  id: number;
  headline: string;
  description: string;
  targetFunding: number;
  currentFunding: number;
  banner: string;
  dueTo: string;
  slug: string;
  category: Pick<Category, "name">;
  user: Pick<User, "username" | "photoProfileUrl" | "id">;
}

export interface PaymentResult {
  id: number;
  orderId: string;
  nominal: number;
  paymentStatus: string;
  redirectURL: string;
  messageText: string;
  userId: number;
  campaignId: number;
}

export interface Donation {
  id: number;
  message: string;
  nominal: number;
  createdAt: string;
  user: Pick<User, "username" | "photoProfileUrl">;
  campaign: Pick<Campaign, "headline" | "slug">;
}

export interface UserDonations {
  donationsCount: number;
  donations: Donation[];
}

interface NotificationCampaign extends Campaign {
  Donation: NotificationCampaignUser[];
}

interface NotificationCampaignUser {
  user: User;
}

export interface Notification {
  id: number;
  message: string;
  isAlreadyRead: boolean;
  createdAt: string;
  userId: number;
  campaignId: number;
  campaign: NotificationCampaign;
}

export interface UpdateNotification {
  id: number;
  message: string;
  isAlreadyRead: boolean;
  createdAt: string;
  userId: number;
  campaignId: number;
}

export interface SocketCampaignUpdated {
  campaignSlug: string;
  amount: number;
}

//! ZUSTAND STATE
export interface SortState {
  sort: "asc" | "desc";
  setSort: () => void;
}

export interface CategoryFilterState {
  category: Category | undefined;
  setCategory: (category: Category | undefined) => void;
}
