

export interface QRValidationResult {
  isValid: boolean;
  tableId?: string | null;
  outletId?: string | null;
  rawUrl?: string;
}

export const validateScannedQR = (scannedData: string): QRValidationResult => {
  try {
    if (!scannedData || !scannedData.includes('raishannan.com')) {
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