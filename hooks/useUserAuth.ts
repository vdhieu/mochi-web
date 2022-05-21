import { useRouter } from "next/router";
import { useStorageState } from "./useStorateState";

const AUTH_STORAGE_KEY = "mochi_token";

export const useUserAuth = () => {
  const router = useRouter();
  const [token, setToken] = useStorageState({
    storageKey: AUTH_STORAGE_KEY,
    defaultValue: "",
  });

  const authorize = () => router.push("/api/oauth");

  const isAuthorized = () => {
    try {
      if (token === "") return false;
      const splitter = token.split(".");
      if (splitter.length === 3) {
        const decoder = atob(splitter[1]);
        const payload = JSON.parse(decoder);
        if (
          typeof payload === "object" &&
          "discord_access_token" in payload &&
          "user_discord_id" in payload
        ) {
          return true;
        }
        return false;
      }
    } catch (_) {
      return false;
    }
  };

  return { token, setToken, authorize, isAuthorized };
};
