import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import Button from "~components/button";
import { API } from "~constants/api";
import { MOCHI_AUTH_STORAGE_KEY } from "~hooks/useUserAuth";

const CLIENT_ID = process.env.CLIENT_ID;
const APP_URI = process.env.APP_URI;

const scope = ["identify"].join(" ");
const REDIRECT_URI = `${APP_URI}/api/oauth`;

const OAUTH_QS = new URLSearchParams({
  client_id: CLIENT_ID || "0",
  redirect_uri: REDIRECT_URI,
  response_type: "code",
  scope,
}).toString();

const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`;

export default function TestPage() {
  const router = useRouter();
  const { code } = router.query;

  useEffect(() => {
    (async () => {
      console.log("run this");
      if (!code || typeof code !== "string") return;
      console.log("to this");
      const { result } = await API.login(code);
      console.log("result", result);
      if (!result) return;
      const token = result.access_token;
      console.log("token", token);
      window.localStorage.setItem(MOCHI_AUTH_STORAGE_KEY, token);
      console.log("logged in!");
      if (window.opener && window.opener !== window) window.close();
    })();
  }, [code]);

  const handleLogin = useCallback(() => {
    console.log(OAUTH_URI);
    window.open(OAUTH_URI, "login cdmm", "width=480,height=640");
  }, []);

  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
