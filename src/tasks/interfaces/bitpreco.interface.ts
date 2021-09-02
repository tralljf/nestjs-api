interface Bids {
  amount: number;
  price: number;
  id: string;
}

interface Asks {
  amount: number;
  price: number;
  id: string;
}

export interface Bitpreco {
  success: boolean;
  bids: Bids[];
  asks: Asks[];
  timestamp: string;
}
