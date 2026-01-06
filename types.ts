
export interface GlucoseReading {
  id: string;
  value: number;
  timestamp: string;
  note?: string;
  mealtime?: 'desayuno' | 'almuerzo' | 'merienda' | 'cena' | 'noche';
  timing?: 'antes' | 'despues';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

export type AppView = 'dashboard' | 'store' | 'chat' | 'learn' | 'tracker' | 'admin';
export type ChatSubView = 'hub' | 'ai-chat';
