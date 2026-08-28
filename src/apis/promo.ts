/**
 * Promo API Module
 */

import http from '../http/core';
import { Endpoints } from './endpoints';

export interface ListPromosParams {
  outlet_id?: string;
  phone_number?: string;
  item_ids?: string;
}

export interface PromoItemData {
  id: string;
  name: string;
  picture?: string | null;
  min_purchase?: number;
  end_date?: string;
  discount_amount?: string | number;
  category_name?: string;
}

export interface ListPromosResponse {
  success: boolean;
  message: string;
  metadata?: Record<string, any>;
  data: PromoItemData[];
}

const ORDER_API_BASE_URL = 'https://terminalone-pos-staging-api-user.rapitech.id';

/**
 * Fetches active promo list from live API.
 * Endpoint: GET /api/v1/order/list-promos
 */
export const getListPromosApi = async (
  params: ListPromosParams = {}
): Promise<ListPromosResponse> => {
  const response = await http.get<ListPromosResponse>(Endpoints.ORDER_LIST_PROMOS, {
    baseUrl: ORDER_API_BASE_URL,
    params: {
      outlet_id: params.outlet_id ?? 'cmlqs8mip0000kgtt14z7csfb',
      phone_number: params.phone_number ?? '6289504469254',
      item_ids: params.item_ids ?? 'cmlqs8n210021kgttf79o3u2e',
    },
  });

  return response.data;
};
