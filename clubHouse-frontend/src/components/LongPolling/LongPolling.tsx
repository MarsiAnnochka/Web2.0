import * as React from 'react';
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {sendMessage, getMessage, getAllMessages} from "./@slice";
import {store} from "../../store";

const LongPolling: React.FC = () => {
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState('');
    const [sms_array, setSmsArray] = useState([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAllMessages())
    }, [])

    useEffect(() => {
        dispatch(getMessage())
    }, [loading])

    store.subscribe(() => {
        setLoading(store.getState().message.loading)
    })

    store.subscribe(() => {
        setSmsArray(store.getState().message.sms_array)
    })

    return (
        <div className="wrapper">
            <h3 className="font-weight-bold text-center ">Chat Messages</h3>
            <div className='chat'>
                <div className='chat-users'>
                    <b>Users:</b>
                    <ul>
                        <li>Nastia</li>
                        <li>Anya</li>
                        {/*{*/}
                        {/*    users.map((name, id) => (*/}
                        {/*    <li key={id}>{name}</li>*/}
                        {/*))}*/}
                    </ul>
                </div>
                <div className='chat-messages'>
                    <div className='messages'>
                        {
                            sms_array.map(message =>
                                <div className="message">
                                    <p>{message}</p>
                                </div>)
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
                <button type='button' className='btn btn-secondary' onClick={() => dispatch(sendMessage(value))}>
                    Send
                </button>
            </form>
        </div>
    )
}
export default LongPolling;