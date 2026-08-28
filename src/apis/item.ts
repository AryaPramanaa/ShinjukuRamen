import http from '../http/core';
import { Endpoints } from './endpoints';

export interface ItemVariant {
  id: string;
  name: string;
  additional_price: string | number;
}

export interface ItemModifier {
  id: string;
  name: string;
  type: 'single' | 'multiple';
  variants: ItemVariant[];
}

export interface ItemDetailData {
  id: string;
  name: string;
  base_price?: string | number;
  gst_rate?: string | number;
  gst_on_price?: string | number;
  price: string | number;
  image?: string;
  description?: string;
  modifiers: ItemModifier[];
}

export interface ShowItemResponse {
  success: boolean;
  message: string;
  metadata?: Record<string, any>;
  data: ItemDetailData;
}

const ORDER_API_BASE_URL = 'https://terminalone-pos-staging-api-user.rapitech.id';

/**
 * Fetches item detail including modifiers, variants, and additional prices from live API.
 * 
 * Endpoint: https://terminalone-pos-staging-api-user.rapitech.id/api/v1/order/show-item
 * Query Params: item_id
 */
export const getShowItemApi = async (itemId: string): Promise<ShowItemResponse> => {
  const response = await http.get<ShowItemResponse>(Endpoints.ORDER_SHOW_ITEM, {
    baseUrl: ORDER_API_BASE_URL,
    params: {
      item_id: itemId,
    },
  });

  return response.data;
};
