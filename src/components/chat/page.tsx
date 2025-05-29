'use client';

import { Bot, Send, SendHorizontal } from 'lucide-react';
import styles from "./page.module.css";
import { useEffect, useRef, useState } from 'react';

export default function RightBar() {

    const [name, setName] = useState('Fernando');
    const [ask, setAsk] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const ws = useRef<WebSocket | null>(null);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:5000');

        ws.current.onopen = (event) => { }

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages(prevMessages => [...prevMessages, data.message]);
        };

        ws.current.onclose = () => { };

        return () => {
            ws.current?.close();
        };
    }, [])

    const sendMessage = () => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(ask);
            setMessages((prev) => [...prev, `${name}: ${ask}`]);
            setAsk('');
        }
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


            <div>

            </div>
        </div>
    )
}