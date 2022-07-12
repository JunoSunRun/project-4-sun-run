import React, { useEffect, useState } from "react";

function Loader() {
    // const [data, setData] = useState([]);
    const [loading, setloading] = useState(undefined);
    const [completed, setcompleted] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
            fetch("https://jsonplaceholder.typicode.com/posts")
                .then((response) => response.json())
                .then((json) => {
                    // setData(json);
                    // console.log(data)
                    setloading(true);
                    setTimeout(() => {
                        setcompleted(true);
                    }, 3000);
                });
        }, 4000);
    }, []);

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