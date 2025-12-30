
import React from 'react';
import { Product, GlucoseReading } from './types';
import { ShoppingCart, MessageCircle, BookOpen, Activity, Truck } from 'lucide-react';

export const COLORS = {
  primary: '#1e3a8a', // Deep Blue
  secondary: '#10b981', // Emerald Green
  accent: '#0ea5e9', // Sky Blue
  danger: '#ef4444', // Red
  warning: '#f59e0b', // Amber
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Glucómetro Accu-Chek Instant',
    category: 'Monitoreo',
    price: 45000,
    image: 'https://picsum.photos/seed/glucometer/300/300',
    description: 'Sistema de monitoreo de glucosa en sangre de fácil uso.'
  },
  {
    id: '2',
    name: 'Tiras Reactivas x50',
    category: 'Insumos',
    price: 18000,
    image: 'https://picsum.photos/seed/strips/300/300',
    description: 'Tiras reactivas compatibles con glucómetros de última generación.'
  },
  {
    id: '3',
    name: 'Lancetas Softclix x100',
    category: 'Insumos',
    price: 8500,
    image: 'https://picsum.photos/seed/lancets/300/300',
    description: 'Lancetas estériles para pinchazo suave e indoloro.'
  },
  {
    id: '4',
    name: 'Estuche de Viaje Pro',
    category: 'Accesorios',
    price: 12000,
    image: 'https://picsum.photos/seed/case/300/300',
    description: 'Organizador térmico para insulina y suministros.'
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
    id: 'store',
    title: 'Comprar',
    subtitle: 'Tiras, lancetas, glucómetros y más.',
    color: 'bg-blue-600',
    icon: <ShoppingCart className="w-6 h-6 text-white" />
  },
  {
    id: 'chat',
    title: 'Consultar',
    subtitle: 'Hablá con nuestro equipo de expertos.',
    color: 'bg-emerald-500',
    icon: <MessageCircle className="w-6 h-6 text-white" />
  },
  {
    id: 'learn',
    title: 'Aprender',
    subtitle: 'Videos, tips y educación sobre diabetes.',
    color: 'bg-sky-500',
    icon: <BookOpen className="w-6 h-6 text-white" />
  },
  {
    id: 'tracker',
    title: 'Mi Diabetes',
    subtitle: 'Registrá tus mediciones y seguí tu progreso.',
    color: 'bg-rose-500',
    icon: <Activity className="w-6 h-6 text-white" />
  },
  {
    id: 'delivery',
    title: 'Entrega Exprés',
    subtitle: 'Recibí tu pedido en el día.',
    color: 'bg-cyan-400',
    icon: <Truck className="w-6 h-6 text-white" />
  }
];
