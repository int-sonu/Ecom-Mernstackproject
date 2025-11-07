import { useEffect } from "react";
import { useState } from "react";
import api from "../global/axios";


function Application(){
const[loading,setloading]=useState(false)


 useEffect(()=>{
    try{

        const data=api.fetch('')
    }
    catch(err){
        setloading(true)
    }
   
},[])

if(loading) return <div className="text-black">loading...</div>
return(
    <div onload={setHandler}>
       <p>hi</p>
       <h1>Home Page</h1>
        </div>
)
}

export default Application