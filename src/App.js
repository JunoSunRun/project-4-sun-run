import { useState, useEffect } from 'react';
import axios from 'axios';

// COMPONENT IMPORTS //
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import Results from './components/Results';
import Loader from './components/Loader';


import './App.css';

function App() {

  // state
const [userLongitude, setUserLongitude] = useState("");
const [userLatitude, setUserLatitude] = useState("");
const [sunData, setSunData] = useState({})
const [selectedDate, setSelectedDate] = useState("")
const [isSunrise, setIsSunrise] = useState(true)
const [todaysDate, setTodaysDate] = useState("");
// const [isSubmit, setIsSubmit]=useState(true);
const [runTime, setRunTime]= useState(0);


// functions

const getLongitude = (long) => {

  setUserLongitude(long)

} 

const getLatitude = (lat) => {

  setUserLatitude(lat)
}

const getDate = (date) => {

  setSelectedDate(date)

}

const getSunOption = (option) => {

  setIsSunrise(option)


}

const getRunTime=(minutes)=>{
  setRunTime(minutes);
  console.log("Users run is", minutes);
}

  // // HANDLERS moved from Location
  // const handleSearchChange = (e) => {
  //   console.log(e.target.value);
  //   setSearchTerm(e.target.value)
  // }

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    // setSelectValue(e.target.value);
    //  Right now, the long/lat are being saved as an array in state, but if this works we can send them up to App individually:

    // props.setLatitudeFunctionFromProps(e.target.value[0])
    // props.setLongitudeFunctionFromProps(e.target.value[1])

    // this should not be updating our user lat and long to the values provided by the API call when they search by city name
    setUserLatitude(e.target.value[0])
    setUserLongitude(e.target.value[1])
  }


// useEffect(() => {
  const getFormSubmit = () =>{
  axios({
    url: `https://api.sunrise-sunset.org/json`,
    method: `GET`,
    dataResponse: `json`,
    params: {
      lat: userLatitude,
      lng: userLongitude,
      date: selectedDate,
      formatted:0
    }
  })
  .then(jsonData => {
    console.log(jsonData)

    setSunData(jsonData.data.results);
    
  })
  }
// }, [isSubmit] );

useEffect(()=>{
  let date = new Date();
  // Format date to YYYY-MM-DD
  let formatDate = date.toLocaleDateString();
  setTodaysDate(formatDate);

},[])

// const getFormSubmit = ()=>{
//   setIsSubmit(!isSubmit)
// }


  return (
    <div className="App">
      <Loader />
      <Header />
      <div className="clouds">
          <div className="cloud"></div>
          <div className="cloud a"></div>
          <div className="cloud b"></div>
          <div className="cloud c"></div>
      </div>

      <h1 className="animate pop">Sun Run</h1>
      
      <Form getLong={getLongitude} getLat={getLatitude} getDate={getDate} date={selectedDate} sunOption={isSunrise} updateSunOption={getSunOption} todaysDate={todaysDate} getSubmit={getFormSubmit} getRun = {getRunTime} run={runTime} setLocationBySearch={ () => handleSelectChange()}/>
      <Results sunInformation={sunData} sunOption={isSunrise} userRunTime={runTime} />
      <Footer />
    </div>
  );
}

export default App;
