export interface HttpClientConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;

  constructor(config: HttpClientConfig = {}) {
    this.baseURL = config.baseURL || '';
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
    this.timeout = config.timeout || 30000;
  }

  private buildURL(url: string, params?: Record<string, string | number | boolean>): string {
    const fullURL = url.startsWith('http') ? url : `${this.baseURL}${url}`;
    
    if (!params || Object.keys(params).length === 0) {
      return fullURL;
    }

    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });

    const separator = fullURL.includes('?') ? '&' : '?';
    return `${fullURL}${separator}${searchParams.toString()}`;
  }

  private async request<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const { params, headers, ...fetchConfig } = config;
    const requestURL = this.buildURL(url, params);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(requestURL, {
        ...fetchConfig,
        headers: {
          ...this.defaultHeaders,
          ...headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }

      return (await response.text()) as unknown as T;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      throw error;
    }
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  async post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }
}

export const createHttpClient = (config?: HttpClientConfig): HttpClient => {
  return new HttpClient(config);
};
