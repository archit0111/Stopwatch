import { use } from 'react';
import './Stopwatch.css'
import { useState, useRef } from 'react'


function Stopwatch(){
    const [time,settime]=useState("00:00:00");
    const [clk,handleClk]=useState("Start");
    const [num,setnum]=useState(0);
    const c= useRef(false);
    const intervalRef = useRef(null);
    const [lap_divs, setDiv]=useState([]);
    function handleClick(e){
        setnum(0);
        if(e.target.name==='start'){
            if(c.current){
                    return;
                }
            c.current=true;
            intervalRef.current = setInterval(()=>{
                settime(time=>{
                    let [total_hour, total_min, total_sec]=time.split(":").map(Number);
                    total_sec++;
                    if(total_sec===60){
                    total_sec=0;
                    total_min++;
                    if(total_min===60){
                        total_min=0;
                        total_hour++;
                        if(total_hour===60){
                            alert("!Day one Completed!");
                        }
                    }
                }
                total_sec=String(total_sec).padStart(2,"0");
                total_min=String(total_min).padStart(2,"0");
                total_hour=String(total_hour).padStart(2,"0");
            return `${total_hour}:${total_min}:${total_sec}`;
                });
            },1000)
        }else{
            handleStop();
            handleClk("Start");
            setnum(0);
            setDiv([]);
            settime("00:00:00");
        }
    }


    function handleStop(){
        if(num===0){
            toaddDiv();
        }
        setnum(num+1);
        handleClk("Restart");
        clearInterval(intervalRef.current);
        intervalRef.current=null;
        c.current=false;
    }

    function toaddDiv(){
        setDiv([...lap_divs,
            <div className="lap">
            <div id="lap_row">LAP {lap_divs.length == NaN ? 1 : lap_divs.length+1}.</div>
            <div id="lap_time">{time}</div>
            </div>]
        )
    }


    return(
        <>
        <div id="heading"><h1>STOPWATCH</h1></div>
        <div className="main_div">
            <div id="display"><p id="display_para">{time}</p></div>
            <div className="btn">
                <div><button id="start_btn" name='start' onClick={handleClick}>{clk}</button></div>
                <div><button id="stop_btn" name='stop' onClick={handleStop}>Stop</button></div>
                <div><button id="reset_btn" name='reset' onClick={handleClick}>Reset</button></div>
            </div>
        </div>
        <div className="laps">{lap_divs}</div>
        </>
    )
}

export default Stopwatch