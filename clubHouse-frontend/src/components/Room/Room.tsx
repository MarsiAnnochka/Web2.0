import * as React from 'react';
import {useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {createRoom, joinRoom} from './@slice';
import {Button, Col, Form} from "react-bootstrap";
import LoginForm from '../LoginForm/LoginForm';

const enterRoom: React.FC = () => {
    const [roomName, setRoomName] = useState("");
    const [roomId, setRoomId] = useState("");
    const currentRoom = useAppSelector(state => state.room);

    const dispatch = useAppDispatch();

    return (
        <React.Fragment>
            {!currentRoom &&
            <div className="container-fluid w-25 my-5">

                <Form>
                    <h3 className="font-weight-bold ml-5">Hello, dear :)</h3>
                    <Form.Group>
                        <Form.Label className='h5'>Create a new room</Form.Label>
                        <Form.Row>
                            <Col>
                                <Form.Control
                                    id="roomName"
                                    placeholder="Enter Room Name"
                                    onChange={(event) => setRoomName(event.target.value)}
                                    value={roomName}
                                />
                            </Col>
                            <Col>
                                <Button className="color-primary" type="submit"
                                        onClick={() => dispatch(createRoom(roomName))}>Create</Button>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='h5'>Join a room</Form.Label>
                        <Form.Row>
                            <Col>
                                <Form.Control
                                    id="roomId"
                                    placeholder="Enter Room Id"
                                    onChange={(event) => setRoomId(event.target.value)}
                                    value={roomId}
                                />
                            </Col>
                            <Col>
                                <Button className="color-primary" type="submit"
                                        onClick={() => dispatch(joinRoom(roomId))}>Join</Button>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                </Form>
            </div>
            }

            {currentRoom &&
            <LoginForm/>
            }
        </React.Fragment>
    );
}

export default enterRoom;