import { useEffect, useState } from "react";
import axios from "axios";

const Location = (props) => {

  const { setLatBySearch, setLongBySearch } = props;

  // STATE
  const [locData, setLocData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectValue, setSelectValue] = useState('');

  // HANDLERS
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const handleSelectChange = (e) => setSelectValue(e.target.value);


  useEffect(()=>{
    // Converting the string in SelectValue to an array, then sending the individual array values up to App as longitude/latitude
    const array = selectValue.split(',')
    setLatBySearch(array[0]);
    setLongBySearch(array[1]);
  }, [selectValue, setLatBySearch, setLongBySearch])


  // API call to retrieve array of matched cities, containing each cities longitude and latitude 
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
    <form className='locationForm' onSubmit={makeLocationCall}>
      <input type="text" onChange={handleSearchChange} value={searchTerm} placeholder='enter your city' required/>
      <button>Search</button>
      {/* Line 52 - ternary to hide the dropdown menu if the API array has nothing in it  */}
      {
      locData.length > 0 
      ? (
        <select name="" id="" onChange={handleSelectChange} value={selectValue}>
          <option value="">Please Select</option>
          {[...locData].map((object) => {
            return (
              <option
                key={object.latitude}
// ! look into how this is converting into a string (Done - creating an actual string for value instead of an array that magically turns into a string)
                // value={[object.latitude, object.longitude]}
                value={`${object.latitude}, ${object.longitude}`}
                id={object.label}
              >
                {object.label}
              </option>
            );
          })}
        </select>
        ) 
      : null
      }
      
    </form>
  );
};

export default Location;
