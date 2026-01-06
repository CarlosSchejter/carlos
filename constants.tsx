import React from 'react';
import { Product, GlucoseReading } from './types.ts';
import { ShoppingCart, MessageCircle, BookOpen, Activity } from 'lucide-react';

export const COLORS = {
  primary: '#1e3a8a',
  secondary: '#10b981',
  accent: '#0ea5e9',
  danger: '#ef4444',
  warning: '#f59e0b',
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'cat_insulinas',
    name: 'Insulinas',
    category: 'Medicamentos',
    price: 0,
    image: 'https://cdn.pcdirecto.com.mx/wp-content/uploads/2021/04/NovoRapid-FlexPen-100-U-ml-Sol-Iny-3-ml-Caja-con-5-Plumas-Prellenadas.jpg',
    description: 'Análogos y Humanas. NovoRapid FlexPen, Lantus, Toujeo y más. Sujeto a validación de receta.'
  },
  {
    id: 'cat_tiras',
    name: 'Tiras Reactivas',
    category: 'Monitoreo',
    price: 0,
    image: 'https://shopdrofar.com.ar/wp-content/uploads/2025/02/Accu-chek-Active-50-tiras-reactivas.png',
    description: 'Accu-Chek, OneTouch, Freestyle y más. Consultar cobertura según tu obra social.'
  },
  {
    id: 'cat_sensores',
    name: 'Sensores de Glucosa',
    category: 'Tecnología',
    price: 0,
    image: 'https://i.pinimg.com/736x/87/00/f5/8700f513511855a90d40520627e77a28.jpg',
    description: 'Sistema FreeStyle Libre y otros. Monitoreo continuo sin pinchazos frecuentes.'
  },
  {
    id: 'cat_lector',
    name: 'Lector de Glucosa',
    category: 'Tecnología',
    price: 0,
    image: 'https://shopdrofar.com.ar/wp-content/uploads/2024/08/Lector-FSL2-1.png',
    description: 'Lector para sistema FreeStyle Libre. Visualización instantánea de tendencias y reportes.'
  },
  {
    id: 'cat_lancetas',
    name: 'Lancetas y Agujas',
    category: 'Insumos',
    price: 0,
    image: 'https://images.unsplash.com/photo-1615461066841-6116ecaaba7d?auto=format&fit=crop&q=90&w=800',
    description: 'Agujas ultra finas y lancetas para una punción prácticamente indolora.'
  }
];

export const MOCK_HISTORY: GlucoseReading[] = [
  { id: '1', value: 110, timestamp: '2023-10-20T08:00:00Z' },
  { id: '2', value: 145, timestamp: '2023-10-20T12:00:00Z' },
  { id: '3', value: 98, timestamp: '2023-10-20T20:00:00Z' },
  { id: '4', value: 105, timestamp: '2023-10-21T08:30:00Z' },
];

export const NAVIGATION_CARDS = [
  {
    id: 'tracker',
    title: 'Mi Diabetes',
    subtitle: 'Seguí tu progreso.',
    color: 'bg-rose-500',
    icon: <Activity className="w-6 h-6 text-white" />
  },
  {
    id: 'chat',
    title: 'Consultar',
    subtitle: 'Asesoría experta 24/7.',
    color: 'bg-emerald-500',
    icon: <MessageCircle className="w-6 h-6 text-white" />
  },
  {
    id: 'learn',
    title: 'Aprender',
    subtitle: 'Educación sobre diabetes.',
    color: 'bg-sky-500',
    icon: <BookOpen className="w-6 h-6 text-white" />
  },
  {
    id: 'store',
    title: 'Insumos',
    subtitle: 'Tiras, lancetas y sensores.',
    color: 'bg-blue-600',
    icon: <ShoppingCart className="w-6 h-6 text-white" />
  }
];