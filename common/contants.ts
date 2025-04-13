// API ENDPOSINT
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const LOGIN = BASE_URL + "/auth/login";
export const GOOGLE_LOGIN = BASE_URL + "/auth/google-login";
export const ME = BASE_URL + "/users/me";
export const REGISTER = BASE_URL + "/auth/register";
export const CREATE_CAMPAIGN = BASE_URL + "/campaigns/create";
export const CATEGORIES = BASE_URL + "/categories";
export const CAMPAIGNS = BASE_URL + "/campaigns";
export const NEWEST_CAMPAIGNS = BASE_URL + "/campaigns/newest";
export const USER_CAMPAIGNS = BASE_URL + "/campaigns/user";
export const CAMPAIGN_DETAIL = BASE_URL + "/campaigns/detail";
export const PAYMENT = BASE_URL + "/payment";
export const DONATIONS = BASE_URL + "/donations";
export const NEWEST_DONATIONS = BASE_URL + "/donations/newest";
export const USER_DONATIONS = BASE_URL + "/donations/user";
export const NOTIFICATION = BASE_URL + "/notification";
export const EDIT_PROFILE = BASE_URL + "/users/edit";

// QUERY KEY
export const CATEGORY = "CATEGORY";
export const USER_CAMPAIGNS_KEY = "USER_CAMPAIGNS_KEY";
export const CAMPAIGNS_KEY = "CAMPAIGNS_KEY";
export const NEWEST_CAMPAIGNS_KEY = "NEWEST_CAMPAIGNS_KEY";
export const CAMPAIGN_DETAIL_KEY = "CAMPAIGN_DETAIL_KEY";
export const CAMPAIGN_DONATIONS_KEY = "CAMPAIGN_DONATIONS_KEY";
export const NEWEST_DONATION_KEY = "NEWEST_DONATION_KEY";
export const USER_DONATIONS_KEY = "USER_DONATIONS_KEY";
export const NOTIFICATION_KEY = "NOTIFICATION_KEY";

// MUTATION KEY
export const CREATE_CAMPAIGN_KEY = "CREATE_CAMPAIGN";
export const UPDATE_NOTIFICATION_KEY = "UPDATE_NOTIFICATION_KEY";
export const EDIT_PROFILE_KEY = "EDIT_PROFILE_KEY";

// CONSTANT
export const AUTH_COOKIE = "Authentication";
