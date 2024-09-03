// src/AlexBot.jsx

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AlexBot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]); // Estado para el historial de mensajes
    const [loading, setLoading] = useState(false); // Estado para el indicador de carga

    const obtenerRespuestaAlexBot = async () => {
        setLoading(true); //indicador de carga activado
        try {
            const res = await fetch('http://localhost:3000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userMessage }),
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            setMessages((prevMessages) => [
                ...prevMessages,
                { user: userMessage, bot: data.response },
            ]); // Agregar el nuevo mensaje al historial
            setUserMessage(''); // Limpiar el campo de entrada
        } catch (error) {
            console.error('Error al obtener la respuesta del AlexBot:', error);
        } finally {
            setLoading(false); // Desactivar el indicador de carga
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userMessage.trim() !== '') {
            obtenerRespuestaAlexBot();
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">AlexBot</h1>
            <div className="card mt-4">
                <div className="card-body">
                    <h2 className="mt-4">Historial de Mensajes:</h2>
                    <div className="border p-3 bg-light" style={{ height: '300px', overflowY: 'scroll' }}>
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-2">
                                <div className="text-primary"><strong>Tú:</strong> {msg.user}</div>
                                <div className="text-success"><strong>AlexBot:</strong> {msg.bot}</div>
                                <hr />
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit} className="mt-3">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Escribe tu mensaje aquí"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                required
                            />
                            <button className="btn btn-primary" type="submit" disabled={loading}>
                                {loading ? 'Enviando...' : 'Enviar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AlexBot;
