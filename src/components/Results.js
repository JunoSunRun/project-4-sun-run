const Results = (props) => {

    const {sunInformation, sunOption, userRunTime, selectedDate} = props

    const sunDateObject = new Date(sunInformation[sunOption]);

    // A variable to track the difference between sunset time and current time
    const today = Date.now(); 

    let sunTime = sunDateObject.getTime();

    const diff = sunDateObject.getTime() - today;

    const displayDate = new Date(selectedDate.replaceAll(`-`, `/`)).toLocaleString('en-US', {month: "short", day:"numeric"})

    const dateOrdinal = (date) => {
      let ordinal = date.slice(4)
      if ((ordinal > 3 && ordinal < 21) || (ordinal > 23)) {return `${date}th`;}
      else if (ordinal === "1" || ordinal === "21") {return `${date}st`;}
      else if (ordinal === "2" || ordinal === "22") {return `${date}nd`;}
      else if (ordinal === "3" || ordinal === "23"){return `${date}rd`;}
      else return null
    }

  // to calculate how many minutes user missed sunset 
 
    let overTime=[(today-sunTime)/1000/60,'minutes'];
    if(overTime[0]>60)
    {
      overTime=[(today-sunTime)/1000/60/60,'hours'];
    }

  // to calculate when user needs to leave in order to return before sunset
    function subtractMinutes(numOfMinutes, date = new Date(...sunDateObject)) {

      if(sunOption==='sunset'){
        date.setMinutes(date.getMinutes() - numOfMinutes);
      
        return date.toLocaleString('en-US', {timeStyle: 'short' } );
      }
    }
      
    const whatTimeToLeave = subtractMinutes(userRunTime, sunDateObject);
  
    return(

        <div className="results">

          { 
            
            //  Check for valid date and confirm sunrise hasn't past
              !isNaN(sunDateObject) &&  today<sunTime && sunOption === 'sunrise'?
              <p>Sunrise on {dateOrdinal(displayDate)} will be: <span className="displayDate">{sunDateObject.toLocaleString('en-US', {timeStyle: 'short' } )}</span></p>
              :!isNaN(sunDateObject)&&today>sunTime && sunOption && today>sunTime?
              <p>You missed the {sunOption} by {overTime[0].toFixed(1)} {overTime[1]}</p>

            // check for valid date, confirm sunset hasnt past and user has enough time for run
              :!isNaN(sunDateObject) && today<sunTime && sunOption === 'sunset' && (userRunTime * 1000 * 60) < diff?
              <p>For a {userRunTime} minute run on {dateOrdinal(displayDate)}, leave at <span className="displayDate">{whatTimeToLeave}</span> to get home before sunset</p>
    
            // check if the user's run time is enough time to return before sunset
              :!isNaN(sunDateObject) && sunOption === 'sunset' && (userRunTime*1000*60)>diff ?
              <p>You don't have enough time for this run, try another day or a shorter runtime</p>
      
            // Final check: do nothing 
            : <p className="instructions">Set your location, a run date, and whether you'd like to run at sunrise or before the sun sets!</p>
      
          }
        </div>
    )
}

export default Results;