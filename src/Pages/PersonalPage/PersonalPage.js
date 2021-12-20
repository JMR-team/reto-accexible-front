import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


const resultsColors = [
  { threshold: 5, color: "#9999FF" },
  { threshold: 10, color: "#5555FF" },
  { threshold: 15, color: "#0000FF" },
];


export default function PersonalPage(props) {
    
    // State hooks
    let [userToken,]   = useState(localStorage.getItem('token'));
    let [user,setUser] = useState(undefined);
    let [userTestsResults, setUserTestsresults] = useState(undefined);

    // Navigation hook
    let navigate = useNavigate();

    // Reference Hooks
    const calendarRef = useRef(null);

    // Effect hooks
    useEffect(()=>{
        // navigate to home if the user is not logged in
        if (userToken==null) return navigate('/');
        // If the user is logged fetch its data from the backend
        fetchUser();
        fetchUserTests();
    },[])

    useEffect(()=>{
        if (userTestsResults != undefined){
            const calendarAPI = calendarRef.current.getApi();
            console.log(calendarAPI.getEvents());
        }
    },[userTestsResults])

    return (
      <>
        {userTestsResults != undefined ? (
          <FullCalendar
            initialView="dayGridMonth"
            plugins={[dayGridPlugin]}
            ref={calendarRef}
            events={mapUserResultsToCalendarEvents()}
            displayEventTime={true}
            eventDisplay="block"
            eventTimeFormat={{
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
            }}
          />
        ) : null}
      </>
    );



    // Functions
    function mapUserResultsToCalendarEvents() {
        return userTestsResults.map(
          ({ dateTime, testScore, chatScore, totalScore }) => ({
            title:'',
            start: dateTime,
            testScore,
            chatScore,
            totalScore,
            color:resultsColors.find(({threshold})=>totalScore<=threshold).color,
          })
        );
    }

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