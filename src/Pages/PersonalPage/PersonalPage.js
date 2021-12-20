import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function PersonalPage(props) {
    
    // State hooks
    let [userToken,]   = useState(localStorage.getItem('token'));
    let [user,setUser] = useState(undefined);
    let [userTestsResults, setUserTestsresults] = useState(undefined);

    // Navigation hook
    let navigate = useNavigate();

    // Effect hooks
    useEffect(()=>{
        // navigate to home if the user is not logged in
        if (userToken==null) return navigate('/');
        // If the user is logged fetch its data from the backend
        fetchUser();
        fetchUserTests();
    },[])

    useEffect(()=>{
        console.log(user);
        console.log(userTestsResults);
    },[user,userTestsResults])

    return (
        <>
        <h1>Esta es la página personal</h1>
        </>
    )



    // Functions

    // Obtain user info from the backend
    function fetchUser() {
        fetch(
            '/api/users',
            {
                headers : {
                    'Authorization' : `Bearer ${userToken}`
                }
            }
        ).then( response => {
            if ( !response.ok) throw response;
            return response.json()
        }).then(data => {
            setUser(data);
        })
    }

    // Obtain user historic of tests from the backend
    function fetchUserTests() {
      fetch("/api/results", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw response;
          return response.json();
        })
        .then(data => {
            setUserTestsresults(data);
        });
    }
}