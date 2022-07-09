const Results = (props) => {

    const {sunInformation, sunOption, userRunTime } = props
    console.log("results rerendred");


    const sunriseDateObject = new Date(sunInformation.sunrise);
    // console.log(sunriseDateObject);
    const sunsetDateObject = new Date(sunInformation.sunset);
    console.log(sunsetDateObject.toLocaleString())


    // let hours = sunsetDateObject.getHours();
    // let minutes = sunsetDateObject.getMinutes();
    // console.log(hours,minutes);


    function subtractMinutes(numOfMinutes, date = new Date(sunInformation.sunset)) {
        date.setMinutes(date.getMinutes() - numOfMinutes);
      
        return date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' } );
      }

    const whatTimeToLeave = subtractMinutes(userRunTime, sunsetDateObject);
    console.log(whatTimeToLeave);




    return(
        <>
          {
          sunOption?
            <p>{sunInformation.sunrise}</p>
          :<>
            {/* <p>{`${userRunTime} minutes`}</p>
            <p>{`Leave at ${whatTimeToLeave} to get home before the sunset`}</p> */}
            <p>{`For a ${userRunTime} minute run, leave at ${whatTimeToLeave} to get home before sunset`}</p>
          </>
          }
        </>
    )
}

export default Results;