'use client';

import { useDrag } from 'react-dnd';
import { CardType } from './types';
import styles from './kanban.module.css';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Props = {
  card: CardType;
  from: string;
};

export default function Card({ card, from }: Props) {
  const [isDropped, setIsDropped] = useState(false);

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'CARD',
    item: { id: card.id, from },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      setIsDropped(true);
      setTimeout(() => setIsDropped(false), 200);
    },
  }));

  const dragRef = useRef<HTMLDivElement>(null);
  drag(dragRef);

  return (
    <motion.div
      ref={dragRef}
      className={styles.card}
      style={{
        opacity: isDragging ? 0.5 : 1,
        scale: isDropped ? 1.03 : 1,
        boxShadow: isDragging
          ? '0px 8px 20px rgba(0, 0, 0, 0.1)'
          : isDropped
          ? '0px 6px 14px rgba(0, 0, 0, 0.08)'
          : '0 4px 12px rgba(0, 0, 0, 0.04)',
      }}
      layout
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      whileTap={{ scale: 1.05 }}
    >
      <div className={styles.tags}>
        {card.tags.map((tag) => (
          <span
            key={tag.nome}
            style={{ backgroundColor: tag.color_text }}
            className={styles.tag}
          >
            {tag.nome}
          </span>
        ))}
      </div>
      <p className={styles.title}>{card.title}</p>
      <div className={styles.footer}>
        <span className={styles.user}>
          <span className={styles.details_user}>@</span>
          {card.user}
        </span>
        <span className={styles.priority}>{card.priority}</span>
      </div>
    </motion.div>
  );
}
