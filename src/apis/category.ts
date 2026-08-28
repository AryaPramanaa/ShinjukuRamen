
import http from '../http/core';
import { Endpoints } from './endpoints';

export interface CategoryParams {
  outlet_id?: string;
  category_id?: string;
}

export interface SubCategoryItem {
  id: string;
  name: string;
}

export interface CategoryData {
  id: string;
  name: string;
  sub_categories?: SubCategoryItem[];
}

export interface CategoryListResponse {
  success: boolean;
  message: string;
  metadata?: Record<string, any>;
  data: CategoryData;
}

export interface MainCategoryItem {
  id: string;
  name: string;
  item_count?: string | number;
}

export interface ShowCategoryResponse {
  success: boolean;
  message: string;
  metadata?: Record<string, any>;
  data: MainCategoryItem[];
}

const ORDER_API_BASE_URL = 'https://terminalone-pos-staging-api-user.rapitech.id';

export const getShowCategoryApi = async (
  outlet_id: string = 'cmlqs8mip0000kgtt14z7csfb'
): Promise<ShowCategoryResponse> => {
  const response = await http.get<ShowCategoryResponse>(Endpoints.ORDER_SHOW_CATEGORY, {
    baseUrl: ORDER_API_BASE_URL,
    params: {
      outlet_id,
    },
  });

  return response.data;
};


export const getCategoriesApi = async (
  params: CategoryParams = {}
): Promise<CategoryListResponse> => {
  const response = await http.get<CategoryListResponse>(Endpoints.ORDER_LIST_CATEGORY, {
    baseUrl: ORDER_API_BASE_URL,
    params: {
      outlet_id: params.outlet_id ?? 'cmlqs8mip0000kgtt14z7csfb',
      category_id: params.category_id ?? 'cmlqs8n6i006qkgttdn8i3ewn',
    },
  });

  return response.data;
};
