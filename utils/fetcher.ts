interface FetcherMayError {
  error?: string;
}

interface FetcherResult<T> extends FetcherMayError {
  status?: number;
  result?: T;
}

const get = async <T>(
  endpoint: string,
  initHeaders?: HeadersInit
): Promise<FetcherResult<T>> => {
  try {
    const headers: Record<string, any> = {
      "Content-Type": "application/json",
      ...initHeaders,
    };

    const fetcher = await fetch(endpoint, {
      headers,
      method: "GET",
    });
    const response = await fetcher.json();
    if ("error" in response) {
      return { status: fetcher.status, error: response.error };
    }
    return { status: fetcher.status, result: response as T };
  } catch (e) {
    console.error(`Call GET to ${endpoint} error\n`, e);
    return {
      error:
        typeof e === "object" && "message" in (e as any)
          ? (e as any).message
          : "Something went wrong",
    };
  }
};

const post = async <T>(
  endpoint: string,
  body: Record<string, any>,
  initHeaders?: HeadersInit
): Promise<FetcherResult<T>> => {
  try {
    const headers: Record<string, any> = {
      "Content-Type": "application/json",
      ...initHeaders,
    };

    const fetcher = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      method: "POST",
      body: JSON.stringify(body),
    });
    const response = await fetcher.json();
    if ("error" in response) {
      return { status: fetcher.status, error: response.error };
    }
    return { status: fetcher.status, result: response as T };
  } catch (e) {
    console.error(`Call POST to ${endpoint} error\n`, e);
    return {
      error:
        typeof e === "object" && "message" in (e as any)
          ? (e as any).message
          : "Something went wrong",
    };
  }
};

export const fetcher = { get, post };
