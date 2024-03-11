import { API_BASE_URL, ISuccessResponse, IFailedResponse } from "@shared/model";
import { getLocalStorageItem } from "@shared/lib";

export class FetchService {
  constructor() {}

  public serviceFetch<T>(url: string, options?: RequestInit) {
    return fetch(API_BASE_URL.DEV.concat(url), {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${getLocalStorageItem("access_token")}`,
      },
    })
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          if (response.status === 401) {
            // TODO: рефреш токена
          } else {
            throw new Error(String(response.status));
          }
          throw new Error(String(response.status));
        }
      })
      .then((data: ISuccessResponse<T> | IFailedResponse) => data)
      .catch((error: Error) => {
        throw error;
      });
  }

  public get = async <T>(url: string, options?: RequestInit) =>
    await this.serviceFetch<T>(url, { ...options, method: "GET" });

  public post = async <T>(url: string, options?: RequestInit) =>
    await this.serviceFetch<T>(url, { ...options, method: "POST" });

  public put = async <T>(url: string, options?: RequestInit) =>
    await this.serviceFetch<T>(url, { ...options, method: "PUT" });

  public delete = async <T>(url: string, options?: RequestInit) =>
    await this.serviceFetch<T>(url, { ...options, method: "DELETE" });
}
