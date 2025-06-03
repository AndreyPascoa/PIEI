'use client';

import { useDrag } from 'react-dnd';
import { CardType } from './types';
import styles from './kanban.module.css';

type Props = {
  card: CardType;
  from: string;
};

export default function Card({ card, from }: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { id: card.id, from },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={styles.card}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className={styles.tags}>
        {card.tags.map((tag) => (
          <span
            key={tag.name}
            style={{ backgroundColor: tag.color }}
            className={styles.tag}
          >
            {tag.name}
          </span>
        ))}
      </div>
      <p className={styles.title}>{card.title}</p>
      <div className={styles.footer}>
        <span className={styles.user}>📄 @{card.user}</span>
        <span className={styles.priority}>{card.priority}</span>
      </div>
    </div>
  );
}

