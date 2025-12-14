type FetcherResponse<T> = {
  data: T;
  status: number;
};

interface FetcherParams {
  endpoint: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  contentType: "json" | "formdata";
  body?: Record<
    string,
    string | number | boolean | Blob | File | null | undefined
  >;
  query?: Record<string, string | number | boolean | null | undefined>;
  path?: string;
  tokenType?: "user" | "guest";
}

export async function fetcher<T>(
  params: FetcherParams
): Promise<FetcherResponse<T>> {
  try {
    const isServer = typeof window === "undefined";
    let tokenGuest: string | undefined;
    let tokenUser: string | undefined;

    if (isServer) {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      tokenGuest = cookieStore.get("guest_token")?.value;
      tokenUser = cookieStore.get("token")?.value;
    } else {
      const parseCookie = (name: string) => {
        const match = document.cookie.match(
          new RegExp("(^| )" + name + "=([^;]+)")
        );
        return match ? decodeURIComponent(match[2]) : undefined;
      };
      tokenGuest = parseCookie("guest_token");
      tokenUser = parseCookie("token");
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const headers: Record<string, string> = {};
    const method = params.method.toUpperCase();
    let query = "";
    if (params.query) {
      query = `?${new URLSearchParams(params.query as Record<string, string>)}`;
    }
    if (params.tokenType === "user" && tokenUser) {
      headers["Authorization"] = `Bearer ${tokenUser}`;
    } else if (params.tokenType === "guest" && tokenGuest) {
      headers["Authorization"] = `Bearer ${tokenGuest}`;
    }
    let body: BodyInit | undefined;
    if (params.contentType === "json") {
      headers["Content-Type"] = "application/json";
      if (params.body && method !== "GET") {
        body = JSON.stringify(params.body);
      }
    } else if (params.contentType === "formdata" && params.body) {
      const formData = new FormData();
      Object.entries(params.body).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (value instanceof Blob) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });
      body = formData;
    }
    const path = params.path ? `/${params.path}` : "";
    const url = `${baseUrl}${params.endpoint}${path}${query}`;
    const res = await fetch(url, {
      method,
      headers,
      body,
    });
    const data = (await res.json()) as T;
    /*
    console.log(`
=============================================
status: ${res.status}
method: ${params.method}
endpoint: ${params.endpoint}
path: ${JSON.stringify(params.path)}
body: ${JSON.stringify(params.body)}
query: ${JSON.stringify(params.query)}
response: ${JSON.stringify(data)}
=============================================
    `);
    */
    return {
      data,
      status: res.status,
    };
  } catch (error) {
    console.error(error);
    return {
      data: {
        message: "یک خطای ناشناخته رخ داد.",
      } as unknown as T,
      status: 500,
    };
  }
}


