import ReactDOM from "react-dom";
import "./PersonalPage.css"
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import swal from "sweetalert";

import CalendarResultModal from "../../Components/CalendarResultModal/CalendarResultModal";

ChartJS.register(ArcElement, Tooltip, Legend);

const resultsColors = [
  { id: 0, threshold: 5, color: "#9999FF" },
  { id: 1, threshold: 10, color: "#5555FF" },
  { id: 2, threshold: 15, color: "#0000FF" },
];

export default function PersonalPage(props) {
  // State hooks
  let [userToken] = useState(localStorage.getItem("token"));
  let [user, setUser] = useState(undefined);
  let [userTestsResults, setUserTestsresults] = useState(undefined);

  // Navigation hook
  let navigate = useNavigate();

  // Reference Hooks
  const calendarRef = useRef(null);

  // Effect hooks
  useEffect(() => {
    // navigate to home if the user is not logged in
    if (userToken == null) return navigate("/");
    // If the user is logged fetch its data from the backend
    fetchUser();
    fetchUserTests();
  }, []);

  useEffect(() => {
    if (userTestsResults != undefined) {
      const calendarAPI = calendarRef.current.getApi();
      dataForDonutChart();
    }
  }, [userTestsResults]);

  return (
    <>
      {userTestsResults != undefined ? (
        <>
        <section className="containerGlobal">
          <section className="containerCalendar">
            <div class="calendar">
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
                eventClick={calendarEventClick}
              />
              </div>
            </section>
            <section className="containerDonut">
              <div className="donut">
                <Doughnut data={dataForDonutChart()} />
              </div>
            </section>
          </section>
        </>
      ) : null}
    </>
  );

  // Functions
  function mapUserResultsToCalendarEvents() {
    return userTestsResults.map(
      ({ dateTime, testScore, chatScore, totalScore }) => ({
        title: "",
        start: dateTime,
        testScore,
        chatScore,
        totalScore,
        color: resultsColors.find(({ threshold }) => totalScore <= threshold)
          .color,
      })
    );
  }

  function calendarEventClick(eventClickInfo) {
    // custom component inside a swalert modal
    let wrapper = document.createElement("div");
    ReactDOM.render(
      <CalendarResultModal event={eventClickInfo.event} />,
      wrapper
    );
    let el = wrapper.firstChild;
    swal({
      content: el,
    });
    // alert(eventClickInfo.event.extendedProps.totalScore);
  }

  // Obtain user info from the backend
  function fetchUser() {
    fetch(process.env.REACT_APP_API_URL+"/api/users", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw response;
        return response.json();
      })
      .then((data) => {
        setUser(data);
      });
  }

  // Obtain user historic of tests from the backend
  function fetchUserTests() {
    fetch(process.env.REACT_APP_API_URL+"/api/results", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) throw response;
        return response.json();
      })
      .then((data) => {
        setUserTestsresults(data);
      });
  }

  function dataForDonutChart() {
    let rangeCounts = [0, 0, 0];

    userTestsResults.forEach(({ totalScore }) => {
      let index = resultsColors.findIndex(
        ({ threshold }) => totalScore <= threshold
      );
      if (index >= 0) rangeCounts[index] += 1;
    });
    let data = {
      labels: [
        "Sin signos de depresión",
        "Signos depresivos leves",
        "Signos depresivos severos",
      ],
      datasets: [
        {
          label: "Nivel de ansiedad/depresión",
          data: rangeCounts,
          backgroundColor: resultsColors.map(({ color }) => color),
          borderWidth: 1,
        },
      ],
    };
    return data;
  }
}
