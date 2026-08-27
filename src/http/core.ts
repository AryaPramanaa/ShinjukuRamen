export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
  baseUrl?: string;
}

export class HttpClient {
  private defaultBaseUrl: string;

  constructor(defaultBaseUrl: string = '') {
    this.defaultBaseUrl = defaultBaseUrl;
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined | null>, baseUrl?: string): string {
    const base = baseUrl !== undefined ? baseUrl : this.defaultBaseUrl;
    let fullUrl = endpoint.startsWith('http://') || endpoint.startsWith('https://')
      ? endpoint
      : `${base}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString;
      }
    }

    return fullUrl;
  }

  private async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<HttpResponse<T>> {
    const { params, baseUrl, headers: customHeaders, ...customOptions } = options;
    const url = this.buildUrl(endpoint, params, baseUrl);

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(customHeaders as Record<string, string>),
    };

    try {
      const response = await fetch(url, {
        ...customOptions,
        headers,
      });

      let data: any;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText || 'Request failed'}`);
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error: any) {
      console.error(`[HttpClient Error] [${options.method || 'GET'}] ${url}:`, error);
      throw error;
    }
  }

  public async get<T = any>(endpoint: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public async post<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<HttpResponse<T>> {
    const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: isFormData ? body : JSON.stringify(body),
    });
  }

  public async put<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public async patch<T = any>(endpoint: string, body?: any, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  public async delete<T = any>(endpoint: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const http = new HttpClient();
export default http;
