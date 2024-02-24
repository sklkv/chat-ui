import { API_BASE_URL, ISuccessResponse, IFailedResponse } from "@shared/model";

export class FetchService {
  constructor() {}

  public serviceFetch<T>(url: string, options?: RequestInit) {
    return fetch(API_BASE_URL.DEV.concat(url), {
      ...options,
      headers: {
        ...options?.headers,
        "Content-Type": "application/json",
      },
    })
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          // TODO: обернуть приложение в error boundary, обработать ошибку
          console.log(response.status);
          throw new Error(response.statusText);
        }
      })
      .then((data: ISuccessResponse<T> | IFailedResponse) => {
        // TODO: обернуть приложение в error boundary, обработать ошибку
        return data;
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
