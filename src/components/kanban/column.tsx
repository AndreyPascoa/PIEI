// Column.tsx
'use client';

import { useDrop } from 'react-dnd';
import { ColumnType } from './types';
import Card from './card';
import styles from './kanban.module.css';
import { Plus, Ellipsis } from 'lucide-react';

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
      <div className={styles.container_title}>
        <div
          className={styles.block}
          style={{ backgroundColor: column.color }}
        />
        <h2 className={styles.title}>{column.title}</h2>
        <div className={styles.actions}>
          <Plus className={`${styles.icons} ${styles.plus}`} />
          <Ellipsis className={styles.icons} />
        </div>
      </div>

      <div className={styles.cards_container}>
        {column.cards.map((card) => (
          <Card key={card.id} card={card} from={column.id} />
        ))}
      </div>
    </div>
  );
}