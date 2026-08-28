/**
 * Order & Outlet API Module
 */

import http from '../http/core';
import { Endpoints } from './endpoints';

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

export interface CalculateOrderItem {
  id: string;
  quantity: number;
  modifier?: string[];
  modifiers?: { variant_id: string[] }[];
  note?: string;
}

export interface CalculateOrderParams {
  outlet_id?: string;
  table_id?: string;
  phone_number?: string;
  payment_channel_id?: string;
  payment_method?: string;
  items: CalculateOrderItem[];
  promo_ids?: string[];
  reward_id?: string;
  note?: string;
}

export interface CalculateOrderData {
  subtotal: string | number;
  discount_total: string | number;
  reward_discount_total?: string | number;
  you_just_saved?: string | number;
  service_charge: string | number;
  service_charge_percentage?: string | number;
  surcharge: string | number;
  surcharge_percentage?: string | number;
  gst_total: string | number;
  final_total: string | number;
  items: any[];
  free_items?: any[];
  note?: string;
}

export interface CalculateOrderResponse {
  success: boolean;
  message: string;
  metadata?: Record<string, any>;
  data: CalculateOrderData;
}

export interface ShowCheckoutParams {
  outlet_id?: string;
  table_id?: string;
}

export interface ShowCheckoutData {
  order_type: string;
  table: string;
}

export interface ShowCheckoutResponse {
  success: boolean;
  message: string;
  metadata?: Record<string, any>;
  data: ShowCheckoutData;
}

const ORDER_API_BASE_URL = 'https://terminalone-pos-staging-api-user.rapitech.id';

/**
 * Fetches order, outlet, and table information from the live API.
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

/**
 * Calculates order subtotal, GST tax, surcharge, discounts, and final total bill.
 * Endpoint: POST /api/v1/order/calculate
 */
export const calculateOrderApi = async (
  params: CalculateOrderParams
): Promise<CalculateOrderResponse> => {
  const response = await http.post<CalculateOrderResponse>(
    Endpoints.ORDER_CALCULATE,
    {
      outlet_id: params.outlet_id ?? 'cmlqs8mip0000kgtt14z7csfb',
      table_id: params.table_id ?? 'cmlqs8naj008skgtthxor0re6',
      phone_number: params.phone_number ?? '6289504469252',
      payment_channel_id: params.payment_channel_id ?? 'cmlqs8mjd000dkgtt9f4t388y',
      payment_method: params.payment_method ?? 'self_order',
      items: params.items,
      promo_ids: params.promo_ids ?? [],
      reward_id: params.reward_id,
      note: params.note ?? '',
    },
    {
      baseUrl: ORDER_API_BASE_URL,
    }
  );

  return response.data;
};

/**
 * Fetches order_type and table info for the checkout screen.
 * Endpoint: GET /api/v1/order/show-checkout?outlet_id=...&table_id=...
 */
export const getShowCheckoutApi = async (
  params: ShowCheckoutParams = {}
): Promise<ShowCheckoutResponse> => {
  const response = await http.get<ShowCheckoutResponse>(Endpoints.ORDER_SHOW_CHECKOUT, {
    baseUrl: ORDER_API_BASE_URL,
    params: {
      outlet_id: params.outlet_id ?? 'cmlqs8mip0000kgtt14z7csfb',
      table_id: params.table_id ?? 'cmlqs8naj008skgtthxor0re6',
    },
  });

  return response.data;
};
