import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Schedule() {

    const [data, setData] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            //fetching the data
            const request = await axios.get('https://cricapi.com/api/matchCalendar?apikey=GTarvRiUkLeT3j8UyVieBlBVIyl2');
            setData(request.data.data)

        }   
        fetchData()
    })
    console.log("data ", data)

    return (
        <>
        <div className='schedule'>
        <table>
            <tr>
                <th>Date</th>
                <th>Team1</th>
                <th>Team2</th>
                <th>Match</th>
            </tr>
            {data.map((x)=>{
                var team1 = /[^,]*/.exec(x.name)[0].substr(x.name.indexOf('v')+1);
                var res = team1.split(" ");
                if(res[3]=='at'){
                    var b = res[1]+' '+res[2];
                }else{
                    var b =res[1];
                }
                return (
                 <tr>
                    <td>{x.date}</td>
                    <td>{x.name.substr(0, x.name.indexOf('v'))}</td>
                    <td>{b}</td>
                    <td>{x.name.split(',')[1]}</td>
                </tr>
                )
            })}
        </table>
        </div>
        </>
    )
}

export default Schedule;
