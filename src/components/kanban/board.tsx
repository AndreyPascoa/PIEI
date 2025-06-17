// Board.tsx
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
          { nome: 'Economic', color_text: '#7F56D9', color_background: '#E9D7FE', status: 0 },
          { nome: 'Finance', color_text: '#17B26A', color_background: '#A6F4C5', status: 0 }
        ],
        user: 'mustafa',
        priority: 'High'
      },
      {
        id: '2',
        title: 'Fix Instagram content issues',
        tags: [
          { nome: 'Marketing', color_text: '#1570EF', color_background: '#D1E9FF', status: 0 },
          { nome: 'Social', color_text: '#12B76A', color_background: '#A6F4C5', status: 0 },
          { nome: 'Contents', color_text: '#F79009', color_background: '#FEDF89', status: 0 }
        ],
        user: 'mustafa',
        priority: 'Small'
      },
      {
        id: '5',
        title: 'Integrate ChatGPT',
        tags: [
          { nome: 'Website', color_text: '#F04438', color_background: '#FECDCA', status: 0 },
          { nome: 'AI', color_text: '#17B26A', color_background: '#A6F4C5', status: 0 }
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
          { nome: 'Visual ID', color_text: '#9E77ED', color_background: '#E9D7FE', status: 0 },
          { nome: 'Design', color_text: '#17B26A', color_background: '#A6F4C5', status: 0 },
          { nome: 'Logo', color_text: '#1570EF', color_background: '#D1E9FF', status: 0 }
        ],
        user: 'mustafa',
        priority: 'Small'
      },
      {
        id: '6',
        title: 'Start the new marketing strategy',
        tags: [
          { nome: 'Marketing', color_text: '#1570EF', color_background: '#D1E9FF', status: 0 }
        ],
        user: 'mustafa',
        priority: 'Medium'
      },
      {
        id: '7',
        title: 'Cancel the shop gifts',
        tags: [
          { nome: 'Commerce', color_text: '#32D583', color_background: '#A6F4C5', status: 0 }
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
          { nome: 'Website', color_text: '#9E77ED', color_background: '#E9D7FE', status: 0 },
          { nome: 'Courses', color_text: '#FDA29B', color_background: '#FECDCA', status: 0 }
        ],
        user: 'ahmed',
        priority: 'Very High'
      },
      {
        id: '8',
        title: 'Promote the website',
        tags: [
          { nome: 'Website', color_text: '#9E77ED', color_background: '#E9D7FE', status: 0 },
          { nome: 'Marketing', color_text: '#12B76A', color_background: '#A6F4C5', status: 0 }
        ],
        user: 'mustafa',
        priority: 'Medium'
      },
      {
        id: '9',
        title: 'Integrate help center',
        tags: [
          { nome: 'Website', color_text: '#F04438', color_background: '#FECDCA', status: 0 }
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

    const card = columns.find((col) => col.id === fromId)?.cards.find((c) => c.id === cardId);
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
        <Column key={column.id} column={column} moveCard={moveCard} />
      ))}
    </div>
  );
}
