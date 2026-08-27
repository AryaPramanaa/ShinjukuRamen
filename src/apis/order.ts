
import http from '../http/core';
import { Endpoints } from './index';

export interface OrderInfoParams {
  outlet_id?: string;
  table_id?: string;
  q?: string;
}

export interface OutletInfo {
  id: string;
  name: string;
  logo?: string;
  open_time?: string;
  close_time?: string;
}

export interface TableInfoData {
  id: string;
  name: string;
}

export interface OrderInfoData {
  outlet: OutletInfo;
  table: TableInfoData;
}

export interface OrderInfoResponse {
  success: boolean;
  message: string;
  metadata?: Record<string, any>;
  data: OrderInfoData;
}

const ORDER_API_BASE_URL = 'https://terminalone-pos-staging-api-user.rapitech.id';

/**
 * Fetches order, outlet, and table information from the live API.
 * 
 * @param params Query parameters (outlet_id, table_id, q)
 * @returns Promise resolving to OrderInfoResponse
 */
export const getOrderInfoApi = async (
  params: OrderInfoParams = {}
): Promise<OrderInfoResponse> => {
  const response = await http.get<OrderInfoResponse>(Endpoints.ORDER_SHOW_INFO, {
    baseUrl: ORDER_API_BASE_URL,
    params: {
      outlet_id: params.outlet_id ?? 'cmlqs8mip0000kgtt14z7csfb',
      table_id: params.table_id ?? 'cmlqs8naj008skgtthxor0re6',
      q: params.q ?? '',
    },
  });

  return response.data;
};
