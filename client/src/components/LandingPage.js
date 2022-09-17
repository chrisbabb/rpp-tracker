import React, {useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { thePlayerList, theRaidList, theCheckInOuts, theLoots } from '../atoms';

function LandingPage(){

    const [playerList, setPlayerList] = useRecoilState(thePlayerList);
    const [raidList, setRaidList] = useRecoilState(theRaidList);
    const [checkInOuts, setCheckInOuts] = useRecoilState(theCheckInOuts);
    const [loots, setLoots] = useRecoilState(theLoots);

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

    function parseCheckInOutForRaid(data, playerId, raidId){
        let totalRaidTime = 0;
        let totalTimeInRaid = 0;
        let firstCheckIn = 0;
        let lastCheckOut = 0;
        let getCheckInOutForThisRaid = [];
        let getCheckInOutForThisPlayer = [];
        let getCurrentRaid = [];

        getCurrentRaid = raidList.filter(raid => raid.id === raidId);
        totalRaidTime = getCurrentRaid[0].end_time - getCurrentRaid[0].start_time;

        getCheckInOutForThisRaid = data.filter(item => item.raid_id === raidId);
        getCheckInOutForThisPlayer = getCheckInOutForThisRaid.filter(item => item.player_id === playerId)

        if(getCheckInOutForThisPlayer.length === 1){
            if(getCheckInOutForThisPlayer[0].in_or_out === 'i'){
                totalTimeInRaid = getCurrentRaid[0].end_time - getCheckInOutForThisPlayer[0].time;
            }
            else{
                totalTimeInRaid = getCheckInOutForThisPlayer[0].time - getCurrentRaid[0].start_time; 
            }
        }
        else if(getCheckInOutForThisPlayer.length === 2){
            if(getCheckInOutForThisPlayer[0].in_or_out === 'i'){
                totalTimeInRaid = getCheckInOutForThisPlayer[1].time - getCurrentRaid[0].start_time
            }
            else{
                totalTimeInRaid = (getCheckInOutForThisPlayer[0].time - getCurrentRaid[0].start_time) + (getCurrentRaid[0].end_time - getCheckInOutForThisPlayer[1].time)
            }
        }
        else if(getCheckInOutForThisPlayer.length > 2){
            if(getCheckInOutForThisPlayer[0].in_or_out === 'i'){
                firstCheckIn = getCheckInOutForThisPlayer[0].time;

                if(getCheckInOutForThisPlayer[getCheckInOutForThisPlayer.length - 1].in_or_out === 'o'){
                    lastCheckOut = getCheckInOutForThisPlayer[getCheckInOutForThisPlayer.length - 1].time;
                }
                else{
                    lastCheckOut = getCurrentRaid[0].end_time;
                }
            }
            else if(getCheckInOutForThisPlayer[0].in_or_out === 'o'){
                firstCheckIn = getCurrentRaid[0].start_time;

                if(getCheckInOutForThisPlayer[getCheckInOutForThisPlayer.length - 1].in_or_out === 'o'){
                    lastCheckOut = getCheckInOutForThisPlayer[getCheckInOutForThisPlayer.length - 1].time;
                }
                else{
                    lastCheckOut = getCurrentRaid[0].end_time;
                }
            }
            else{
                lastCheckOut = getCurrentRaid[0].end_time;
            }

            let previousInOrOut = '';
            for(let i = 1; i < getCheckInOutForThisPlayer.length - 1; i++){
                if(i === 1){
                    if(getCheckInOutForThisPlayer[i].in_or_out === 'i'){
                        previousInOrOut = 'i';
                    }
                    else{
                        totalTimeInRaid += getCheckInOutForThisPlayer[i] - firstCheckIn;
                        previousInOrOut = 'o';
                    }
                }
                if(i > 1){
                    if(previousInOrOut === 'i'){
                        totalTimeInRaid += getCheckInOutForThisPlayer[i] - getCheckInOutForThisPlayer[i-1];
                        previousInOrOut = 'o';
                    }
                    if(previousInOrOut === 'o'){
                        previousInOrOut = 'i';
                    }
                    
                }
            }
        }
        return totalTimeInRaid
    }

    function getCheckInOutForPlayerOnRaid(playerId, raidId){
        let raidTime = 0;
        let totalRaidTime = 0;
        let totalPossiblePoints = 0.00;
        let earnedPoints = 0.00;
        let raidPercentage = 0.00;
        let currentRaid;

        currentRaid = raidList.filter(raid => raid.id === raidId);
        totalRaidTime = currentRaid[0].end_time - currentRaid[0].start_time;
        totalPossiblePoints = currentRaid[0].points;

        raidTime = parseCheckInOutForRaid(checkInOuts, playerId, raidId)
        
        if(raidTime > 0){
            raidPercentage = raidTime / totalRaidTime;
            earnedPoints = raidPercentage * totalPossiblePoints;
        }
        else{
            earnedPoints = currentRaid[0].points;
        } 

        return earnedPoints

    }

    let thirtyDayPointsPossible = 0;
    let nintyDayPointsPossible = 0;

    raidList.forEach(raid => {
        
        let currentDate = new Date();
        let raidDate = new Date(raid.created_at)
        let dateDifference = currentDate - raidDate - 28800000;

        if(dateDifference <= 2592000000){
            thirtyDayPointsPossible += raid.points;
            nintyDayPointsPossible += raid.points;
        }
        else if(dateDifference <= 7776000000){
            nintyDayPointsPossible += raid.points;
        }

    })

    let nowDate = new Date();
    let convertedDate = nowDate.getTime() - 28800000;

    function processPlayers(player){
        let totalPointsEarned = 0;
        let totalPointsSpent = 0;
        let thirtyDayPoints = 0;
        let nintyDayPoints = 0;
        let percentCalc = 0.0000;
        let thirtyDayPercent = 0;
        let nintyDayPercent = 0;
        let currentDate = new Date();

        player.raids.map(raid => {

            let raidDate = new Date(raid.created_at)
            let dateDifference = currentDate - raidDate - 28800000;

            totalPointsEarned += getCheckInOutForPlayerOnRaid(player.id, raid.id)

            if(dateDifference <= 2592000000){
                thirtyDayPoints += getCheckInOutForPlayerOnRaid(player.id, raid.id)
                nintyDayPoints += getCheckInOutForPlayerOnRaid(player.id, raid.id)
            }
            else if(dateDifference <= 7776000000){
                nintyDayPoints += getCheckInOutForPlayerOnRaid(player.id, raid.id)
            }

        })

        player.loots.map(loot => totalPointsSpent += loot.points)


        thirtyDayPercent = (thirtyDayPoints / thirtyDayPointsPossible) * 100;
        nintyDayPercent = (nintyDayPoints / nintyDayPointsPossible) * 100;
        return <tr><td>{player.name}</td><td>{totalPointsEarned}</td><td>{totalPointsSpent}</td><td>{totalPointsEarned - totalPointsSpent < 0 ? <span className='red'> {(totalPointsEarned - totalPointsSpent)} </span> : (totalPointsEarned - totalPointsSpent)}</td><td>{thirtyDayPercent}%</td><td>{nintyDayPercent}%</td></tr>
    }

    return (
        <Container>
            <Row className='header'>
                <Col>
                    <Link to="/rpp-admin"><Button>Admin Panel</Button></Link>
                </Col>
            </Row>
          <Row>
            <Col className="justify-content-left">
                <table>
                    <tr>
                        <td>Raider</td>
                        <td>Earned</td>
                        <td>Spent</td>
                        <td>Total</td>
                        <td>30 Days</td>
                        <td>90 Days</td>
                    </tr>
                    {playerList.map(player => processPlayers(player))}
                </table>
            </Col>
          </Row>
        </Container>
    )
}

export default LandingPage