import http from '../http/core';
import { Endpoints } from './endpoints';

export interface ShowMenuParams {
  outlet_id?: string;
  category_id?: string;
  q?: string;
}

export interface MenuItemData {
  id: string;
  name: string;
  base_price?: string | number;
  gst_rate?: string | number;
  price: string | number;
  image?: string;
  description?: string;
  options?: any[];
  modifiers?: any[];
  variants?: any[];
  spicy_level?: any[];
  noodles?: any[];
  broth?: any[];
  toppings?: any[];
  has_options?: boolean;
}

export interface SubCategoryWithItems {
  id: string;
  name: string;
  items: MenuItemData[];
}

export interface CategoryWithSubCategories {
  id: string;
  name: string;
  sub_categories: SubCategoryWithItems[];
}

export interface ShowMenuResponse {
  success: boolean;
  message: string;
  metadata?: Record<string, any>;
  data: CategoryWithSubCategories[];
}

const ORDER_API_BASE_URL = 'https://terminalone-pos-staging-api-user.rapitech.id';

export const getShowMenuApi = async (
  params: ShowMenuParams = {}
): Promise<ShowMenuResponse> => {
  const response = await http.get<ShowMenuResponse>(Endpoints.ORDER_SHOW_MENU, {
    baseUrl: ORDER_API_BASE_URL,
    params: {
      outlet_id: params.outlet_id ?? 'cmlqs8mip0000kgtt14z7csfb',
      category_id: params.category_id ?? 'cmlqs8n6i006qkgttdn8i3ewn',
      q: params.q ?? '',
    },
  });

  return response.data;
};
