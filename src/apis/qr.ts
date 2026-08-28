import http from '../http/core';
import { Endpoints } from './endpoints';

export interface QRValidationResult {
  isValid: boolean;
  tableId?: string | null;
  outletId?: string | null;
  rawUrl?: string;
}

export interface GenerateQRParams {
  data: string;
  size?: number;
  format?: 'png' | 'jpg' | 'svg';
}

export interface GenerateQRResponse {
  qrUrl: string;
  data: string;
  size: number;
}

const QR_API_BASE_URL = 'https://terminalone-pos-staging-api-user.rapitech.id';

export const validateScannedQR = (scannedData: string): QRValidationResult => {
  try {
    if (!scannedData || (!scannedData.includes('raishannan.com') && !scannedData.includes('shinjukuramen'))) {
      return { isValid: false };
    }

    const parsedUrl = new URL(scannedData);
    const tableId = parsedUrl.searchParams.get('table_id');
    const outletId = parsedUrl.searchParams.get('outlet_id');

    return {
      isValid: true,
      tableId,
      outletId,
      rawUrl: scannedData,
    };
  } catch (error) {
    return { isValid: false };
  }
};

export const getQRCodeUrl = (data: string, size: number = 200): string => {
  const encodedData = encodeURIComponent(data);
  return `${QR_API_BASE_URL}${Endpoints.GENERATE_QR}?size=${size}x${size}&data=${encodedData}`;
};

export const generateQRCodeApi = async (params: GenerateQRParams): Promise<GenerateQRResponse> => {
  const size = params.size || 200;
  const qrUrl = getQRCodeUrl(params.data, size);

  await http.get(Endpoints.GENERATE_QR, {
    baseUrl: QR_API_BASE_URL,
    params: {
      size: `${size}x${size}`,
      data: params.data,
    },
  });

  return {
    qrUrl,
    data: params.data,
    size,
  };
};