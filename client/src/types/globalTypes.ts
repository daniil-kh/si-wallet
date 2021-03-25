export interface serverResponse {
  statusCode: number;
  data: any;
}
export interface errorServerResponse {
  data: {errors: string[]};
}

export interface Fonts {
  BALSAMIQ_BOLD: string;
  BALSAMIQ_BOLD_ITALIC: string;
  BALSAMIQ_ITALIC: string;
  BALSAMIQ_REGULAR: string;
}

export interface iconsList {
  rentPrice: string;
  rentTime: string;
  range: string;
  APY: string;
}

export interface Bot {
  title: string;
  rentPrice: string;
  rentTime: string;
  tradingBalanceDown: number;
  tradingBalanceUp: number;
  range: string;
  APY: string;
  id: string;
  url: string;
}

export interface Event {
  _id: string;
  title: string;
  publishedAt: number;
  originalImageUrl: string;
  description: string;
  url: string;
}

export interface NewsType {
  latest: Event[];
  top: Event[];
}
