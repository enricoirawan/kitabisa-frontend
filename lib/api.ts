import {
  LOGIN,
  ME,
  GOOGLE_LOGIN,
  REGISTER,
  CREATE_CAMPAIGN,
  CATEGORIES,
  USER_CAMPAIGNS,
  CAMPAIGNS,
  NEWEST_CAMPAIGNS,
  CAMPAIGN_DETAIL,
  PAYMENT,
  DONATIONS,
  NEWEST_DONATIONS,
  USER_DONATIONS,
  NOTIFICATION,
  EDIT_PROFILE,
} from "@/common/contants";
import {
  BaseResponse,
  Campaign,
  Category,
  Donation,
  Notification,
  Pagination,
  PaymentResult,
  UpdateNotification,
  User,
  UserDonations,
} from "@/common/interfaces";

export async function userRegister(data: {
  username: string;
  email: string;
  password: string;
}) {
  const response = await fetch(REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  });

  const parseResponse = await response.json();

  if (!response.ok) {
    throw new Error(parseResponse.message);
  }

  return parseResponse;
}

export async function userLogin(email: string, password: string) {
  const response = await fetch(LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  const authCookie = response.headers.get("Set-Cookie");
  const parseResponse = await response.json();

  if (!response.ok) {
    throw new Error(parseResponse.message);
  }

  return {
    response: parseResponse,
    cookie: authCookie,
  };
}

export async function userGoogleLogin(idToken: string) {
  const response = await fetch(GOOGLE_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: idToken,
    }),
  });
  const authCookie = response.headers.get("Set-Cookie");
  const parseResponse = await response.json();

  if (!response.ok) {
    throw new Error(parseResponse.message);
  }

  return {
    response: parseResponse,
    cookie: authCookie,
  };
}

export async function getMe(cookie: string): Promise<BaseResponse<User>> {
  const response = await fetch(ME, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie,
    },
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function getMeAfterUpdateProfile(): Promise<BaseResponse<User>> {
  const response = await fetch(ME, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function getCategories(): Promise<BaseResponse<Category[]>> {
  const response = await fetch(CATEGORIES, {
    method: "GET",
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function createCampaign(formData: FormData) {
  const response = await fetch(CREATE_CAMPAIGN, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function getNewestCampaigns(): Promise<BaseResponse<Campaign[]>> {
  const response = await fetch(NEWEST_CAMPAIGNS, {
    method: "GET",
    credentials: "include",
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function getCampaigns({
  pageParam = 1,
  categoryId,
  sort = "desc",
}: {
  pageParam: number;
  categoryId: number | undefined;
  sort: "asc" | "desc";
}): Promise<BaseResponse<Pagination<Campaign>>> {
  const url = new URL(CAMPAIGNS);

  url.searchParams.append("page", pageParam.toString());

  if (categoryId) {
    url.searchParams.append("categoryId", categoryId.toString());
  }

  if (sort) {
    url.searchParams.append("sort", sort);
  }

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function getUserCampaigns({
  username,
  pageParam = 1,
}: {
  pageParam: number;
  username: string;
}): Promise<BaseResponse<Pagination<Campaign>>> {
  const response = await fetch(
    `${USER_CAMPAIGNS}/${username}?page=${pageParam}`,
    {
      method: "GET",
      credentials: "include",
    },
  );

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function getCampaignDetail(
  slug: string,
): Promise<BaseResponse<Campaign>> {
  const response = await fetch(`${CAMPAIGN_DETAIL}/${slug}`, {
    method: "GET",
    credentials: "include",
    next: {
      revalidate: 300,
    },
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function payment({
  nominal,
  campaignId,
  slug,
  message,
}: {
  nominal: number;
  campaignId: number;
  slug: string;
  message: string;
}): Promise<BaseResponse<PaymentResult>> {
  const response = await fetch(PAYMENT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      nominal,
      campaignId,
      slug,
      message,
    }),
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function getCampaignDonations({
  slug,
}: {
  slug: string;
}): Promise<BaseResponse<Donation[]>> {
  const response = await fetch(`${DONATIONS}/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function getNewestDonations(): Promise<BaseResponse<Donation[]>> {
  const response = await fetch(NEWEST_DONATIONS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function getUserDonations(): Promise<BaseResponse<UserDonations>> {
  const response = await fetch(USER_DONATIONS, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function getNotification(): Promise<BaseResponse<Notification[]>> {
  const response = await fetch(NOTIFICATION, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function updateNotification(
  notificationId: number,
): Promise<BaseResponse<UpdateNotification>> {
  const response = await fetch(`${NOTIFICATION}/${notificationId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}

export async function editProfile(formData: FormData) {
  const response = await fetch(EDIT_PROFILE, {
    method: "PATCH",
    body: formData,
    credentials: "include",
  });

  const parsedResponse = await response.json();

  if (!response.ok) {
    throw new Error(parsedResponse.message);
  }

  return parsedResponse;
}
