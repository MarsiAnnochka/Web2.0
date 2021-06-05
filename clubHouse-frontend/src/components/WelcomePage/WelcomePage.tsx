import * as React from 'react';

export const WelcomePage: React.FC = () => {
    return (
        <div className="wrapper">
            <h3 className="font-weight-bold text-center ">Enjoy!</h3>
            <div className='chat'>
                <div className='chat-users'>
                    <b>Rooms</b>
                    <ul>
                        <li><a href='/chat'>Girls' Power</a></li>
                        <li>WebDev</li>
                        <li>mephi :: networks-2021</li>
                        <li>B18-505 MeMes</li>
                        <li>GachiMephi</li>
                    </ul>
                </div>
                <div className='chat-messages'>
                    <div className='messages'>
                        <div><h5>Messages will be here...</h5></div>
                    </div>
                </div>
            </div>
        </div>
    )
}