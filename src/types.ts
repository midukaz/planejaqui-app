export interface Item {
  id: string;
  name: string;
  description: string;
  price: number;
  storeLink: string;
  category: string;
  createdAt: Date;
}

export type Category = 
  | 'Sala de Estar'
  | 'Cozinha'
  | 'Quarto'
  | 'Banheiro'
  | 'Área Externa'
  | 'Decoração'
  | 'Eletrodomésticos'
  | 'Outros';

export const CATEGORIES: Category[] = [
  'Sala de Estar',
  'Cozinha',
  'Quarto',
  'Banheiro',
  'Área Externa',
  'Decoração',
  'Eletrodomésticos',
  'Outros'
];