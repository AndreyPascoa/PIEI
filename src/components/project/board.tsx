'use client';

import { useState } from 'react';
import Column from './column';
import styles from './kanban.module.css';
import { ColumnType } from './types';

const initialColumns: ColumnType[] = [
  {
    id: 'open',
    title: 'Open',
    color: 'gray',
    cards: [
      {
        id: '1',
        title: 'Manage Finances',
        tags: [
          { name: 'Economic', color: '#7F56D9' },
          { name: 'Finance', color: '#17B26A' }
        ],
        user: 'mustafa',
        priority: 'High'
      },
      {
        id: '2',
        title: 'Fix Instagram content issues',
        tags: [
          { name: 'Marketing', color: '#1570EF' },
          { name: 'Social', color: '#12B76A' },
          { name: 'Contents', color: '#F79009' }
        ],
        user: 'mustafa',
        priority: 'Small'
      },
      {
        id: '5',
        title: 'Integrate ChatGPT',
        tags: [
          { name: 'Website', color: '#F04438' },
          { name: 'AI', color: '#17B26A' }
        ],
        user: 'mustafa',
        priority: 'Medium'
      }
    ]
  },
  {
    id: 'inProgress',
    title: 'In Progress',
    color: '#444CE7',
    cards: [
      {
        id: '3',
        title: 'Re design the logo',
        tags: [
          { name: 'Visual ID', color: '#9E77ED' },
          { name: 'Design', color: '#17B26A' },
          { name: 'Logo', color: '#1570EF' }
        ],
        user: 'mustafa',
        priority: 'Small'
      },
      {
        id: '6',
        title: 'Start the new marketing strategy',
        tags: [
          { name: 'Marketing', color: '#1570EF' }
        ],
        user: 'mustafa',
        priority: 'Medium'
      },
      {
        id: '7',
        title: 'Cancel the shop gifts',
        tags: [
          { name: 'Commerce', color: '#32D583' }
        ],
        user: 'mustafa',
        priority: 'Small'
      }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: '#17B26A',
    cards: [
      {
        id: '4',
        title: 'Start how to use the service course',
        tags: [
          { name: 'Website', color: '#9E77ED' },
          { name: 'Courses', color: '#FDA29B' }
        ],
        user: 'ahmed',
        priority: 'Very High'
      },
      {
        id: '8',
        title: 'Promote the website',
        tags: [
          { name: 'Website', color: '#9E77ED' },
          { name: 'Marketing', color: '#12B76A' }
        ],
        user: 'mustafa',
        priority: 'Medium'
      },
      {
        id: '9',
        title: 'Integrate help center',
        tags: [
          { name: 'Website', color: '#F04438' }
        ],
        user: 'mustafa',
        priority: 'Small'
      }
    ]
  }
];

export default function Board() {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);

  const moveCard = (cardId: string, fromId: string, toId: string) => {
    if (fromId === toId) return;

    const card = columns
      .find((col) => col.id === fromId)
      ?.cards.find((c) => c.id === cardId);

    if (!card) return;

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === fromId) {
          return { ...col, cards: col.cards.filter((c) => c.id !== cardId) };
        }
        if (col.id === toId) {
          return { ...col, cards: [...col.cards, card] };
        }
        return col;
      })
    );
  };

  return (
    <div className={styles.board}>
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
}
