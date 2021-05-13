import * as React from 'react';
import {useEffect, useState} from "react";
import {fetchData} from '../../utils/API';
import {createAsyncThunk} from "@reduxjs/toolkit";

const LongPolling: React.FC = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    }, [])

    const subscribe = createAsyncThunk(
        'get-messages',
        async () => {
            const postOptions = {
                method: 'GET'
            };
            try {
                const data = await fetchData('/get-messages', postOptions)
                setMessages(prev => [data, ...prev])
                await subscribe()
            } catch (err) {
                setTimeout(() => {
                    subscribe()
                }, 500)
            }
        }
    )

    const sendMessage = createAsyncThunk(
        'new-messages',
        async (data, thunkAPI) => {
            const postOptions = {
                body: {
                    message: value,
                    id: Date.now()
                },
                method: 'POST'
            };
            await fetchData('/new-messages', postOptions)
        }
    )

    return (
        <div className="wrapper">
            <h3 className="font-weight-bold text-center ">Chat Messages</h3>
            <div className='chat'>
                <div className='chat-users'>
                    <b>Users:</b>
                    <ul>
                        <li>Nastia</li>
                        <li>Anya</li>
                    </ul>
                </div>
                <div className='chat-messages'>
                    <div className='messages'>
                        {
                            messages.map((message) => (
                                <div className="message" key={message.id}>
                                    <p>{message.message}</p>
                                    <div>
                                        <span>{message.userName}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <form>
                <textarea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="form-control"
                    rows={3}/>
                <button type='button' className='btn btn-secondary' onClick={sendMessage}>
                    Send
                </button>
            </form>
        </div>
    )
}
export default LongPolling;