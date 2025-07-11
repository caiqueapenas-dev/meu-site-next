export interface Service {
  id: string;
  name: string;
  price: number;
  type: 'checkbox' | 'quantity' | 'fixed';
  billing: 'monthly' | 'once';
  description: string;
  unit: string;
  deliverables: string[];
}

export interface Service {
  id: string;
  name: string;
  price: number;
  type: 'checkbox' | 'quantity' | 'fixed';
  billing: 'monthly' | 'once';
  description: string;
  unit: string;
  deliverables: string[];
  status?: 'soon';
}


export interface ServiceCategory {
  category: string;
  description: string;
  items: Service[];
}

export interface UserData {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  field: string;
  lgpdAccepted: boolean;
}

export interface Cart {
  [serviceId: string]: number;
}


export interface DiscountState {
  applied: boolean;
  timerId: NodeJS.Timeout | null;
}

export interface Totals {
  initialTotal: number;
  monthlyTotal: number;
  originalFirstMonthPayment: number;
  discountAmount: number;
  finalFirstMonthPayment: number;
  cartIsEmpty: boolean;
}