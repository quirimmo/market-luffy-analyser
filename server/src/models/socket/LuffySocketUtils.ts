export interface LuffySocketError {
  message: string;
}

export interface LuffySocketData {
  symbol: string;
  lastMovement: number;
  priceChange: number[];
  trend: number;
}

export interface LuffySocketResponse {
  error?: LuffySocketError;
  data?: LuffySocketData;
}

export interface LuffySocketRequest {
  action: string;
  size?: number;
  sectors?: string[];
  symbols?: string[];
}
