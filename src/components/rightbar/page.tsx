'use client';

import { Bot, SendHorizontal, PencilLine, NotebookPen, Ellipsis, Plus } from 'lucide-react';
import styles from "./page.module.css";
import { useEffect, useRef, useState } from 'react';
import { API } from '@/utils/API';
import { notionType } from './type.module';

export default function RightBar() {

    localStorage.getItem('user');

    const [name, setName] = useState('');
    const [ask, setAsk] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [notion, setNotion] = useState<notionType[]>([]);
    const ws = useRef<WebSocket | null>(null);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:5000');

        ws.current.onopen = (event) => { }

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, data.message]);
        };

        ws.current.onclose = () => { };



        const notion = () => {

            const userData = sessionStorage.getItem('user');
            if (userData) {
                const user = JSON.parse(userData);
                setName(user.nome);
                API.post('notion', { user: user.id_user })
                    .then((response) => {
                        const data = response.data;
                        if (data && data.notions && data.notions.length > 0) {
                            setNotion(data.notions);
                        }
                    })
            }

        }

        notion();

        return () => {
            ws.current?.close();
        };
    }, [])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(ask);
            setMessages((prev) => [...prev, `${name}: ${ask}`]);
            setAsk('');
        }
    };

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.chat_container}>
                <div className={styles.chat_header}>
                    <Bot className={styles.icon} />
                    <h2 className={styles.title}>Hanna</h2>
                </div>

                <div className={styles.chat_body}>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`${styles.chat_message} ${msg.startsWith(`${name}:`) ? styles.user_message : styles.bot_message}`}
                        >
                            <div className={styles.message_content}>
                                <p className={styles.message_text}>{msg.startsWith(`${name}:`) ? msg : `Hanna: ${msg}`}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className={styles.input_group}>
                    <input
                        type="text"
                        placeholder="Type message..."
                        onChange={(e) => setAsk(e.target.value)}
                        value={ask}
                        className={styles.input}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') sendMessage();
                        }}
                    />
                    <SendHorizontal className={styles.send_icon} onClick={sendMessage} />
                </div>
            </div>


            <div className={styles.notion_container}>
                <div className={styles.notion_header}>
                    <PencilLine className={styles.notion_icon} />
                    <h2 className={styles.notion_title}>Notion</h2>
                    <Plus className={styles.add_item} />
                </div>

                <div className={styles.notion_list}>
                    {notion.map((notion, idx) => (
                        <div key={idx} className={styles.notion_item}>
                            <div className={styles.notion_header}>
                                <NotebookPen className={styles.notion_icon_item} />
                                <h3 className={styles.notion_date}>{formatDate(notion.date_notion)}</h3>
                                <Ellipsis className={styles.notion_icon_item} style={{ marginLeft: 'auto', cursor: 'pointer' }} />
                            </div>

                            <div className={styles.notion_content}>
                                <h4 className={styles.notion_title_item}>{notion.nome_notion}</h4>
                                <p className={styles.notion_description}>{notion.content_notion}</p>
                            </div>

                            <div className={styles.notion_footer}>
                                <span
                                    className={styles.tags}
                                    style={{
                                        color: notion.color_text ? `#${notion.color_text}` : '#000',
                                        backgroundColor: notion.color_background ? `#${notion.color_background}` : '#fff',
                                        padding: '2px 6px',
                                        borderRadius: '6px'
                                    }}
                                >
                                    {notion.nome_categoria}
                                </span>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}