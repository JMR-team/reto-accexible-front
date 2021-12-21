export default function CalendarResultModal({event:{start,extendedProps}}) {
    let [date,time] = start.toLocaleString('es-ES').split(' ');
    return (
      <div>
        <h3>{`Resultados del ${date} a las ${time}`}</h3>
        <br />
        <div className="resultsInCalendarModal">
          <p>Puntuación del test:{extendedProps.testScore}</p>
          <p>Puntuación del chat:{extendedProps.chatScore}</p>
          <p>Puntuación total: {extendedProps.totalScore}</p>
        </div>
      </div>
    );
}