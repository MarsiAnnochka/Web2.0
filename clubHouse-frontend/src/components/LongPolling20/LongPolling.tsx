import * as React from 'react';
import {useEffect, useState} from "react";
import {fetchData} from '../../utils/API';
import {createAsyncThunk} from "@reduxjs/toolkit";
import {sendMessage, subscribe} from "./@slice";
import {useAppDispatch} from "../../hooks";

const LongPolling: React.FC = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(subscribe())
    }, [])

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
                <button type='button' className='btn btn-secondary' onClick={()=>dispatch(sendMessage({value}))}>
                    Send
                </button>
            </form>
        </div>
    )
}
export default LongPolling;