import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './Navbar';
import Schedule from './Schedule';
import { useEffect, useState } from 'react';
import axios from 'axios'


function App() {

  const [s11, setS11] = useState(0);
  const [s12, setS12] = useState(0);
  const [s21, setS21] = useState(0);
  const [s22, setS22] = useState(0);
  const [s31, setS31] = useState(0);
  const [s32, setS32] = useState(0);
  const [sum1, setSum1] = useState(0);
  const [sum2, setSum2] = useState(0);
  const [sum3, setSum3] = useState(0);
  const [sums, setSums] = useState([]);
  const [flag, setFlag] = useState(false);
  const [datas, setDatas] = useState([]);


  useEffect(()=>{
    async function fetchData(){
      //fetching the data
      await axios.get('http://localhost:8000/api')
      .then(res=>{
        setDatas(res.data)
      })
      .catch(er=>console.log(er))
      let i, a=0,b=0,c=0;

      for (i = 0; i < datas.length; i++) {
        a = a+datas[i].one;
        b = b+datas[i].two;
        c = c+datas[i].three;
      }
      setSum1(a)
      setSum2(b)
      setSum3(c)
      let ar = []
      ar.push(a)
      ar.push(b)
      ar.push(c)
      ar.sort( function( a , b){
        if(a > b) return 1;
        if(a < b) return -1;
        return 0;
    });
      setSums(ar)

  }
  fetchData()
  },[datas])

  const handleSubmit = (e)=>{ 
 
    e.preventDefault();
     console.log("handlesubmit")
  
    var one = parseInt(s11) + parseInt(s12);

    var two = parseInt(s21) + parseInt(s22);
    var three =parseInt(s31) + parseInt(s32);

    const data = {
        one,two,three
    }
  
    setDatas(Object.assign(datas, data));
    axios.post('http://localhost:8000/api', data)
    .then(setDatas(Object.assign(datas, data)));
    setSum1(sum1+one)
    setSum2(sum2+two)
    setSum3(sum3+three)

    sums[0]+=one;
    sums[1]+=two;
    sums[2]+=three;
    console.log("sums data1", sums)
    sums.sort( function( a , b){
      if(a > b) return 1;
      if(a < b) return -1;
      return 0;
  });
  setSums(sums)
    console.log("sums data2", sums)
    setFlag(!flag)
    setS11(0);
    setS12(0);
    setS21(0);
    setS22(0);
    setS31(0);
    setS32(0);
  }
 
  return (

    <>
    <Router>
      <div>
        <Switch>            

          <Route path="/Home">   
            <Navbar/>
            <div className="records">
            <form>
                    <br/>
                    <br/>
                    <div className='form-group'>
                        <label>Score 1: </label>
                        <input type="Number" required className='form-control' value={s11} onChange={(e)=>setS11(e.target.value)} />
                    </div>
                    {/* {s11} */}
                    <div className='form-group'>
                    <label>Score 2: </label>
                        <input type="Number" required className='form-control' value={s12} onChange={(e)=>setS12(e.target.value)} />
                    </div>
                    {/* {s12} */}
                    <div className='form-group' style={{marginTop:"30px"}}>
                    <label>Score 1: </label>
                        <input type="Number" required className='form-control'  value={s21} onChange={(e)=>setS21(e.target.value)}/>
                    </div>
                    {/* {s21} */}
                    <div className='form-group'>
                    <label>Score 2: </label>
                        <input type="Number" required className='form-control' value={s22}  onChange={(e)=>setS22(e.target.value)}/>
                    </div>
                    {/* {s22} */}
                    <div className='form-group' style={{marginTop:"30px"}}>
                        <label>Score 1: </label>
                        <input type="Number" required className='form-control' value={s31} onChange={(e)=>setS31(e.target.value)}/>
                    </div>
                    {/* {s31} */}
                    <div className='form-group'>
                        <label>Score 2: </label>
                        <input type="Number" required className='form-control'  value={s32} onChange={(e)=>setS32(e.target.value)} />
                    </div>
                    {/* {s32} */}
                    <button type='submit' value='Submit' onClick={handleSubmit} style={{backgroundColor:"#4CAF50"}}>
                       <input type='submit' value='Submit' style={{ padding:"10px 30px",fontSize: "25px" , cursor: "pointer",color:"white", backgroundColor:"#4CAF50"}} />
                    </button>

                </form>
            </div> 
            
            <div className='homw_table' style={{marginBottom:"100px"}}>
              {sums.indexOf(sum1)==2 && sums.indexOf(sum2)==1 && sums.indexOf(sum3)==0 &&
                    <table >
                    
                    <tr>
                      <th>Time</th>
                      <th>Virat Kohli</th>
                      <th>AB De Villiers</th>
                      <th>Kane Williamson</th>
                    </tr>
                  {datas.map((x)=>{
                      return (
                      <tr>
                          <td>{x.createdAt.slice(0,10)}</td>
                          <td>{x.one}</td>
                          <td>{x.two}</td>
                          <td>{x.three}</td>
                      </tr>
                      )
                  })}
                  <tr>
                          <td><h3>Total</h3></td>
                          <td>{sum1}</td>
                          <td>{sum2}</td>
                          <td>{sum3}</td>
                  </tr>
              </table>
              }
              {sums.indexOf(sum1)==2 && sums.indexOf(sum2)==0 && sums.indexOf(sum3)==1 &&
                              <table >
                    
                    <tr>
                      <th>Time</th>
                      <th>Virat Kohli</th>
                      <th>Kane Williamson</th> 
                       <th>AB De Villiers</th>
                    </tr>
                  {datas.map((x)=>{
                      return (
                      <tr>
                          <td>{x.createdAt.slice(0,10)}</td>
                          <td>{x.one}</td>
                          <td>{x.three}</td>
                          <td>{x.two}</td>
                          
                      </tr>
                      )
                  })}
                  <tr>
                          <td><h3>Total</h3></td>
                          <td>{sum1}</td>
                          <td>{sum3}</td>
                          <td>{sum2}</td>
                          
                  </tr>
              </table>
              }
              {sums.indexOf(sum1)==1 && sums.indexOf(sum2)==0 && sums.indexOf(sum3)==2 &&
                              <table >
                    
                    <tr>
                      <th>Time</th>
                      <th>Kane Williamson</th>
                      <th>Virat Kohli</th>
                      <th>AB De Villiers</th>
                    </tr>
                  {datas.map((x)=>{
                      return (
                      <tr>
                          <td>{x.createdAt.slice(0,10)}</td>
                          <td>{x.three}</td>
                          <td>{x.one}</td>
                          <td>{x.two}</td>
                          
                      </tr>
                      )
                  })}
                  <tr>
                          <td><h3>Total</h3></td>
                          <td>{sum3}</td>
                          <td>{sum1}</td>
                          <td>{sum2}</td>
                  </tr>
              </table>
              }
              {sums.indexOf(sum1)==1 && sums.indexOf(sum2)==2 && sums.indexOf(sum3)==0 &&
                              <table >
                    
                    <tr>
                      <th>Time</th>
                      <th>AB De Villiers</th>
                      <th>Virat Kohli</th>
                      <th>Kane Williamson</th>
                      
                    </tr>
                  {datas.map((x)=>{
                      return (
                      <tr>
                          <td>{x.createdAt.slice(0,10)}</td>
                          <td>{x.two}</td>
                          <td>{x.one}</td>
                          <td>{x.three}</td>
                      </tr>
                      )
                  })}
                  <tr>
                          <td><h3>Total</h3></td>
                          <td>{sum2}</td>
                          <td>{sum1}</td>
                          <td>{sum3}</td>
                  </tr>
              </table>
              }
              {sums.indexOf(sum1)==0 && sums.indexOf(sum2)==1 && sums.indexOf(sum3)==2 &&
                              <table >
                    
                    <tr>
                      <th>Time</th>
                    
                      <th>Kane Williamson</th> 
                      <th>AB De Villiers</th>
                       <th>Virat Kohli</th>
                    </tr>
                  {datas.map((x)=>{
                      return (
                      <tr>
                          <td>{x.createdAt.slice(0,10)}</td>
                          <td>{x.three}</td>
                          <td>{x.two}</td>
                          <td>{x.one}</td>
                      </tr>
                      )
                  })}
                  <tr>
                          <td><h3>Total</h3></td>
                          <td>{sum3}</td>
                          <td>{sum2}</td>
                          <td>{sum1}</td>
                  </tr>
              </table>
              }
              {sums.indexOf(sum1)==0 && sums.indexOf(sum2)==2 && sums.indexOf(sum3)==1 &&
                              <table >
                    
                    <tr>
                      <th>Time</th>
                      
                      <th>AB De Villiers</th>
                      <th>Kane Williamson</th>
                      <th>Virat Kohli</th>
                    </tr>
                  {datas.map((x)=>{
                      return (
                      <tr>
                          <td>{x.createdAt.slice(0,10)}</td>
                          <td>{x.two}</td>
                          <td>{x.three}</td>
                          <td>{x.one}</td>
                      </tr>
                      )
                  })}
                  <tr>
                          <td><h3>Total</h3></td>
                          <td>{sum2}</td>
                          <td>{sum3}</td>
                          <td>{sum1}</td>
                  </tr>
              </table>
              }

          </div> 
          </Route>
          <Route path="/schedule">
            <Navbar/>
            <Schedule />
          </Route>
        </Switch>
      </div>
    </Router>
  </>
  );
}

export default App;
