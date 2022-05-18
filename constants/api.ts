import { fetcher } from "~utils/fetcher";

const isProd = process.env.NEXT_PUBLIC_ENV === "production";

console.log(isProd);

const API_GW = {
  DEV: "https://develop-api.mochi.pod.town/api/v1",
  PROD: "https://api.mochi.pod.town/api/v1",
};

const getGW = () => (isProd ? API_GW.PROD : API_GW.DEV);

const verify = (wallet_address: string, code: string, signature: string) =>
  fetcher.post<{ status: string }>(`${getGW()}/verify`, {
    wallet_address,
    code,
    signature,
  });

const login = (access_token: string) =>
  fetcher.post<{ access_token: string; expires_at: number }>(
    `${getGW()}/auth/login`,
    { access_token }
  );

export const API = {
  verify,
  login,
};
