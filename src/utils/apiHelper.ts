/**
 * API帮助工具类，展示TypeScript的实际用法
 */

// 定义通用的API响应类型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  statusCode: number;
}

// 定义用户类型
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

// 定义API错误类型
export class ApiError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'ApiError';
  }
}

/**
 * 模拟API请求函数
 * @param url 请求地址
 * @returns Promise<ApiResponse<T>>
 */
export async function mockApiRequest<T>(url: string): Promise<ApiResponse<T>> {
  try {
    // 模拟网络延迟
    await new Promise(resolve => setTimeout(resolve, 300));

    // 根据URL返回不同的模拟数据
    if (url.includes('/users')) {
      const mockUsers: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com', createdAt: '2023-01-01' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', createdAt: '2023-01-02' },
      ];

      return {
        success: true,
        data: mockUsers as unknown as T,
        statusCode: 200
      };
    }

    throw new ApiError('Resource not found', 404);
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: error.message,
        statusCode: error.statusCode
      };
    }

    return {
      success: false,
      error: 'An unexpected error occurred',
      statusCode: 500
    };
  }
}

/**
 * 获取用户列表
 * @returns Promise<ApiResponse<User[]>>
 */
export async function getUsers(): Promise<ApiResponse<User[]>> {
  return mockApiRequest<User[]>('/api/users');
}

/**
 * 获取单个用户
 * @param id 用户ID
 * @returns Promise<ApiResponse<User>>
 */
export async function getUser(id: number): Promise<ApiResponse<User>> {
  return mockApiRequest<User>(`/api/users/${id}`);
}

/**
 * 类型守卫函数 - 检查是否是成功的API响应
 */
export function isSuccessfulResponse<T>(response: ApiResponse<T>): response is ApiResponse<T> & { success: true, data: T } {
  return response.success === true && response.data !== undefined;
}