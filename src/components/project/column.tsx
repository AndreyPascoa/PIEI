'use client';

import { useDrop } from 'react-dnd';
import { ColumnType, CardType } from './types';
import Card from './card';
import styles from './kanban.module.css';

type Props = {
  column: ColumnType;
  moveCard: (cardId: string, fromId: string, toId: string) => void;
};

export default function Column({ column, moveCard }: Props) {
  const [, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item: { id: string; from: string }) => {
      moveCard(item.id, item.from, column.id);
    },
  }));

  const setDropRef = (node: HTMLDivElement | null) => {
    if (node) {
      drop(node);
    }
  };

  return (
    <div ref={setDropRef} className={styles.column}>
      <h2>{column.title}</h2>
      {column.cards.map((card) => (
        <Card key={card.id} card={card} from={column.id} />
      ))}
    </div>
  );
}
