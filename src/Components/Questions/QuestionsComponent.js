import './QuestionsComponent.css';
import { useState } from 'react';
import { useEffect } from 'react';


function QuestionsComponent() {
    const [questions, setQuestion] = useState([]);

    useEffect(async () => {
        // async function fetchData() {
        //     let listaQuestions = await getQuestions();
        //     setQuestion(listaQuestions);
        // }
        // fetchData();
        let listaQuestions = await getQuestions();
        setQuestion(listaQuestions);
    }, [])

    return (
        <>
            <div>
                {
                    questions.map(function (questionsIndividuales) {
                        return (
                            <div>
                                <label>{questionsIndividuales.question} </label>
                                {
                                    questionsIndividuales.answers.map(function (answerIndividual) {
                                        return (
                                            <button>{answerIndividual.text} </button>

                                        )
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}

function getQuestions() {
    let response = fetch(`http://localhost:9000/api/test-questions`)
        .then(responseFetch => responseFetch.json())
        .then(respuestaJSON => respuestaJSON)
    return response;






}

export default QuestionsComponent;