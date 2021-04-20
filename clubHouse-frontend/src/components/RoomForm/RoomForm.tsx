import * as React from 'react';
import {useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../hooks";
import {createRoom, joinRoom} from './@slice';
import {Button, Col, Form} from "react-bootstrap";
import LoginForm from '../LoginForm/LoginForm';

const RoomForm: React.FC = () => {
    const [roomName, setRoomName] = useState("");
    const [roomId, setRoomId] = useState("");
    const currentRoom = useAppSelector(state => state.room);

    const dispatch = useAppDispatch();

    return (
        <React.Fragment>
            {currentRoom &&
            <div className="container-fluid w-25 my-5">

                <Form>
                    <Form.Group>
                        <Form.Label className='h6'>Create a new room</Form.Label>
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
                                <Button className="btn-secondary" type="submit"
                                        onClick={() => dispatch(createRoom(roomName))}>Create</Button>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className='h6'>Join a room</Form.Label>
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
                                <Button className="btn-secondary" type="submit"
                                        onClick={() => dispatch(joinRoom(roomId))}>Join</Button>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                </Form>
            </div>
            }

            {!currentRoom &&
            <LoginForm/>
            }
        </React.Fragment>
    );
}

export default RoomForm;