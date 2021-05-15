import * as React from 'react';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {enterMessage, sendMessage, subscribe} from "./@slice";

const LongPolling: React.FC = () => {
    const [messages, setMessages] = useState([]);
    const message = useAppSelector(state => state.message.message);
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
                    value={message}
                    onChange={(event) => dispatch(enterMessage(event.target.value))}
                    className="form-control"
                    rows={3}/>
                <button type='button' className='btn btn-secondary' onClick={()=>dispatch(sendMessage({message}))}>
                    Send
                </button>
            </form>
        </div>
    )
}
export default LongPolling;