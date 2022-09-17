import React from "react";
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';
import { thePlayerList, theRaidList, theCheckInOuts, theLoots, thePlayersSelected, theEventList, theFormFieldAddPlayer, theFormFieldAddPlayerStatus, theFormFieldRemovePlayer, theFormFieldAddEvent, theFormFieldRemoveEvent } from '../atoms';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ColumnSelect from 'react-column-select';
import TimeField from 'react-simple-timefield';

function AdminPanel(){

    const [playerList, setPlayerList] = useRecoilState(thePlayerList);
    const [raidList, setRaidList] = useRecoilState(theRaidList);
    const [checkInOuts, setCheckInOuts] = useRecoilState(theCheckInOuts);
    const [loots, setLoots] = useRecoilState(theLoots);
    const [playersSelected, setPlayersSelected] = useRecoilState(thePlayersSelected);
    const [eventList, setEventList] = useRecoilState(theEventList);
    const [formFieldAddPlayer, setFormFieldAddPlayer] = useRecoilState(theFormFieldAddPlayer);
    const [formFieldAddPlayerStatus, setFormFieldAddPlayerStatus] = useRecoilState(theFormFieldAddPlayerStatus);
    const [formFieldRemovePlayer, setFormFieldRemovePlayer] = useRecoilState(theFormFieldRemovePlayer);
    const [formFieldAddEvent, setFormFieldAddEvent] = useRecoilState(theFormFieldAddPlayer);
    const [formFieldRemoveEvent, setFormFieldRemoveEvent] = useRecoilState(theFormFieldRemoveEvent);

    
    useEffect(()=>{
        fetch('http://localhost:4000/players/')    
        .then(response => response.json())
        .then(setPlayerList)
    },[])

    useEffect(()=>{
        fetch('http://localhost:4000/raids/')    
        .then(response => response.json())
        .then(setRaidList)
    },[])

    useEffect(()=>{
        fetch(`http://localhost:4000/check_in_outs/`)    
        .then(response => response.json())
        .then(setCheckInOuts)
    },[])

    useEffect(()=>{
        fetch(`http://localhost:4000/loots/`)    
        .then(response => response.json())
        .then(setLoots)
    },[])

    useEffect(()=>{
        fetch(`http://localhost:4000/events/`)    
        .then(response => response.json())
        .then(setEventList)
    },[])

    let todaysDateOnLoad = new Date().toLocaleDateString('en-US');

    const onChange = (values) => {
        setPlayersSelected(values)
    }

    function updatePlayerData(){
        fetch('http://localhost:4000/players/')    
        .then(response => response.json())
        .then(setPlayerList)        
    }

    function removePlayerFromDatabase(){
        if(formFieldRemovePlayer !== ""){
            fetch(`http://localhost:4000/players/${formFieldRemovePlayer}`, {
                method: "DELETE",
            })
            .then(updatePlayerData)
        }
    }

    function updateEventData(){
        fetch('http://localhost:4000/events/')    
        .then(response => response.json())
        .then(setEventList)        
    }

    function removeEventFromDatabase(){
        if(formFieldRemoveEvent !== ""){
            fetch(`http://localhost:4000/events/${formFieldRemoveEvent}`, {
                method: "DELETE",
            })
            .then(updateEventData)
        }
    }

    function addPlayerToDatabase(){
        fetch("http://localhost:4000/players",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                Accept:"application/json",
            },
            body: JSON.stringify({
                name: formFieldAddPlayer,
                status: formFieldAddPlayerStatus
            })
        })
        .then(res => res.json())
        .then(updatePlayerData)
    }

    let playersForSelect = [];
    playerList.forEach(player => playersForSelect.push({value: player.id, label: player.name}))
    playersForSelect.sort(function(a, b){
        let x = a.label.toLowerCase();
        let y = b.label.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });

    let eventsForSelect = [];
    eventList.forEach(event => eventsForSelect.push({value: event.id, label: event.name}))
    eventsForSelect.sort(function(a, b){
        let x = a.label.toLowerCase();
        let y = b.label.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });

    if (playerList.length === 0) {
        return <div className="App">Loading...</div>;
    }
    return(
        <Container>
            <Row className="header">
                <Col>
                    <h1>RPP Admin Panel</h1>
                </Col>
            </Row>
            
            <Form>
                <Row>
                    <Col xs={12}>
                        <Form.Group className="mb-3" controlId="formPointsPossible">
                            <Form.Label>Raid Name</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Group className="mb-3" controlId="formRaidDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="text" value={todaysDateOnLoad} />
                        </Form.Group>
                    </Col>
                    <Col xs={1}>
                        <Form.Group className="mb-3" controlId="formRaidStartTime">
                            <Form.Label>Start Time</Form.Label>
                            <TimeField className={'form-control time-width'} value={"00:00"} onChange={null} />
                        </Form.Group>
                    </Col>
                    <Col xs={2}>
                        <Form.Group className="mb-3" controlId="formRaidEndTime">
                            <Form.Label>End Time</Form.Label>
                            <TimeField className={'form-control time-width'} value={"00:00"} onChange={null} />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3" controlId="formPointsPossible">
                            <Form.Label>Maximum Possible Base RPP</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <Form.Group className="mb-3" controlId="formCheckInOut">
                            <Form.Label>Check In/Out Bonus</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group className="mb-3" controlId="formCheckInOut">
                            <Form.Label>Add New Player</Form.Label>
                            <Form.Control type="text" placeholder="Player Name" onChange={(e) => setFormFieldAddPlayer(e.target.value)} />
                            <Form.Label>Player Status</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setFormFieldAddPlayerStatus(e.target.value)} >
                                <option value={'m'}>Member</option>
                                <option value={'r'}>Recruit</option>
                                <option value={'a'}>Alt</option>
                                <option value={'g'}>Guest</option>
                                <option value={'o'}>Officer</option>
                            </Form.Select>
                            <Button onClick={addPlayerToDatabase}>Add Player</Button>
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group className="mb-3" controlId="formCheckInOut">
                            <Form.Label>Remove Existing Player</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setFormFieldRemovePlayer(e.target.value)} >
                                <option value="">Select a Player</option>
                                {playersForSelect.map(player => <option value={player.value}>{player.label}</option>)}
                            </Form.Select>
                            <Button onClick={removePlayerFromDatabase}>Remove Player</Button>
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group className="mb-3" controlId="formCheckInOut">
                            <Form.Label>Add New Event</Form.Label>
                            <Form.Control type="text" placeholder="Player Name" />
                            <Button onClick={"addEventToDatabase"}>Add Player</Button>
                        </Form.Group>
                    </Col>
                    <Col xs={3}>
                        <Form.Group className="mb-3" controlId="formCheckInOut">
                            <Form.Label>Remove Existing Event</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => setFormFieldRemoveEvent(e.target.value)}>
                            <option value="">Select an Event</option>
                                {eventsForSelect.map(event => <option value={event.value}>{event.label}</option>)}
                            </Form.Select>
                            <Button onClick={removeEventFromDatabase}>Remove Event</Button>
                        </Form.Group>
                    </Col>
                    <Col xs={6}>
                        <ColumnSelect
                            options={playersForSelect}
                            onChange={onChange}
                            isSearchable={true}
                            labels={{
                            leftHeader: 'Players',
                            rightHeader: 'Players in Raid',
                            }}
                        />
                    </Col>
                    <Col xs={6}>
                        <ColumnSelect
                            options={eventsForSelect}
                            onChange={onChange}
                            isSearchable={true}
                            labels={{
                            leftHeader: 'Events',
                            rightHeader: 'Events on Raid',
                            }}
                        />
                    </Col>
                </Row>
            </Form>
            
            
        </Container>
    )
}

export default AdminPanel;