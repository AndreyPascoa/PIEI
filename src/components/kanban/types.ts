export type Tag = {
  nome: string;
  color_text: string;
  color_background: string;
  status: 0 | 1; // 0 = Active, 1 = Inactive
};

export type ColumnType = {
  id: string;
  title: string;
  color: string;
  cards: CardType[];
};

export type CardType = {
  id: string;
  title: string;
  tags: Tag[];
  user: string;
  priority: 'Small' | 'Medium' | 'High' | 'Very High';
};