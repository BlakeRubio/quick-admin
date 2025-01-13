import type {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";

export type resultType = {
  accessToken?: string;
};

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface httpError extends AxiosError {
  isCancelRequest?: boolean;
}

export interface httpResponse extends AxiosResponse {
  config: httpRequestConfig;
}

export interface httpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: httpRequestConfig) => void;
  beforeResponseCallback?: (response: httpResponse) => void;
}

export default class QuickHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: httpRequestConfig
  ): Promise<T>;
  post<T, P>(url: string, params?: P, config?: httpRequestConfig): Promise<T>;
  get<T, P>(url: string, params?: P, config?: httpRequestConfig): Promise<T>;
}
