import { useCallback, useState } from "react";
import { API } from "~constants/api";

export const MOCHI_AUTH_STORAGE_KEY = "mochi_token";

export const useUserAuth = (discordToken: string) => {
  const [token, setToken] = useState("");

  const isAuthorized = useCallback(() => {
    if (typeof window === undefined) return null;
    const mochiToken = window.localStorage.getItem(MOCHI_AUTH_STORAGE_KEY);
    if (mochiToken) {
      setToken(mochiToken);
      return true;
    }
    return false;
  }, []);

  const authorize = useCallback(async () => {
    try {
      const { error, result } = await API.login(discordToken);
      if (error) {
        console.error("authorize error", error);
        return;
      }
      if (result) {
        window.localStorage.setItem(
          MOCHI_AUTH_STORAGE_KEY,
          result.access_token
        );
      }
    } catch (e) {
      console.error("authorize error", authorize);
    }
  }, [discordToken]);

  return { token, isAuthorized, authorize };
};
