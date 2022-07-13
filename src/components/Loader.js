import React, { useEffect, useState } from "react";

function Loader(props) {
    // const [data, setData] = useState([]);
    const [loading, setLoading] = useState(undefined);
    const [completed, setCompleted] = useState(undefined);

    // useEffect(() => {
    //     setTimeout(() => {
    //         fetch("https://jsonplaceholder.typicode.com/posts")
    //             .then((response) => response.json())
    //             .then((json) => {
    //                 // setData(json);
    //                 // console.log(data)
    //                 setloading(true);
    //                 setTimeout(() => {
    //                     setcompleted(true);
    //                 }, 3000);
    //             });
    //     }, 4000);
    // }, []);



    // USEEFFECT for pageload?

    useEffect(()=> {
        
        setTimeout(()=> {
            setLoading(true);
            setTimeout(()=>{
                setCompleted(true);
            }, 3000)
            props.getApp();
        }, 4000)
        
        
    }, [props])

    return (
        <>
        {!completed ? (
            <>
                {!loading ? (
                    <div className="spinner">
                        <img src="/giphy.gif" alt="gif of cartoon Forrest Gump running on spot"></img> 
                    </div>
                ) : (
                    <div className="completed"></div>
                )}
            </>
        ) :null
            }
        </>
    );
}

export default Loader;