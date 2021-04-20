import * as React from 'react';
import {useState} from "react";

const ChatForm: React.FC = () => {
    const [messageValue, setMessageValue] = useState('')
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
                        <div className='message'>
                            <p>Hi, dear</p>
                            <div>
                                <span>User Nastia</span>
                            </div>
                        </div>
                    </div>
                    <div className='message'>
                        <p>Hello, my friend</p>
                        <div>
                            <span>User Anya</span>
                        </div>
                    </div>
                </div>
            </div>
            <form>
                    <textarea
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                        className="form-control"
                        rows={3}/>
                <button type='button' className='btn btn-secondary'>
                    Send
                </button>
            </form>
        </div>
    )
}
export default ChatForm;