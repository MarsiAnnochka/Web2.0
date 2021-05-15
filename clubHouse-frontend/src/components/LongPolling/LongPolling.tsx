import * as React from 'react';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {sendMessage, subscribe} from "./@slice";

const LongPolling: React.FC = () => {
    const [value, setValue] = useState('')
    const messages = useAppSelector(state => state.message.messages);
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
                            messages.map(message =>
                                <div className="message">
                                    <p>{message}</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <form>
                <textarea
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    className="form-control"
                    rows={3}/>
                <button type='button' className='btn btn-secondary' onClick={()=>dispatch(sendMessage({messages}))}>
                    Send
                </button>
            </form>
        </div>
    )
}
export default LongPolling;