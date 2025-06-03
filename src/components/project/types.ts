export type Tag = {
  name: string;
  color: string;
};

export type CardType = {
  id: string;
  title: string;
  tags: Tag[];
  user: string;
  priority: 'Small' | 'Medium' | 'High' | 'Very High';
};

export type ColumnType = {
  id: string;
  title: string;
  color: string;
  cards: CardType[];
};
