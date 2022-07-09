import { useState } from "react";
import axios from "axios";

const Location = (props) => {

 const {setLocationBySearch} = props


  // STATE
  const [locData, setLocData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  // selectValue can be deleted, right now it's just holding the longitude and latitude, but we'll end up passing those up into App, right now it was just for testing:
  const [selectValue, setSelectValue] = useState();

//   // HANDLERS
  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value)
  }

//   const handleSelectChange = (e) => {
//     console.log(e.target.value);
//     setSelectValue(e.target.value);
//     //  Right now, the long/lat are being saved as an array in state, but if this works we can send them up to App individually:

//     // props.setLatitudeFunctionFromProps(e.target.value[0])
//     // props.setLongitudeFunctionFromProps(e.target.value[1])
//   }

  // API CALL


  // API call just needs a search term and the acccess key, search term is grabbed from the input field. The API returns an array of objects, each object is a city that matches the search term (the whole array is put into state, and then it will be mapped over and each city will end up in a dropdown menu)
  const makeLocationCall = (e) => {
    e.preventDefault();
    axios({
      url: 'http://api.positionstack.com/v1/forward',
      params: {
        access_key: '57c7fafe4d4cd9ab9aaf1450c00060fa',
        query: searchTerm,
      }
    }).then((res)=>{
      setLocData(res.data.data)
    })
  }




  return (
    <form action="">
      <input type="text" onChange={handleSearchChange} value={searchTerm} placeholder='search by city, postal code' required/>

      {/* Line 52 - ternary to hide the dropdown menu if the API array has nothing in it  */}
      {locData.length > 0 
      ? (
        <select name="" id="" onChange={() => setLocationBySearch} value={selectValue}>
          <option value="">Please Select</option>
          {[...locData].map((object) => {

            // Added console.log by Kiana
            console.log(object)
            return (

              <option
                key={object.label}
                // I did some googling to see how to pass 2 values into the 'value' field, and an array was suggested, this seems to work so far but I'm not sure if this is the proper way to do thing:
                value={[object.latitude, object.longitude]}
                id={object.label}
              >
                {object.label}
              </option>
            );
          })}
        </select>
      ) 
      : null}
      <button onClick={makeLocationCall}>Search</button>
    </form>
  );
};

export default Location;