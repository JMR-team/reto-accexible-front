import './QuestionsComponent.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { unstable_batchedUpdates } from 'react-dom';


function QuestionsComponent() {
    const [questions, setQuestion] = useState([]);
    const [allSelectedAnswers, setAllSelectedAnswers] = useState([{}]); // variable que contendra todas las respuestas seleccionadas
    const [selectedAnswer, setSelectedAnswer] = useState(); // variable que se usara para actualizarla cuando pulsemos en un button de respuesta, ira cambiando
    const [questionIndex, setQuestionIndex] = useState(0); // variable que se usara para actualizar el indice del array que contiene las preguntas

    useEffect(() => {
        async function fetchData() {
            let listaQuestions = await getQuestions();
            setQuestion(listaQuestions);
        }
        fetchData();
    }, [])

    return (
        <>
            <div>
                {questions.length > 0 && questionIndex < questions.length &&// comprobamos si questions tiene elementos dentro y si la variable questionIndex es menor que la longitud del array de questions
                    <div>
                        <label>{questions[questionIndex].question} </label>
                        <br />
                        {
                            questions[questionIndex].answers.map(function (answerIndividual) {
                                return (
                                    <>
                                        <button onClick={() => selectAnswer(answerIndividual.text, answerIndividual.score)}>{answerIndividual.text} </button>
                                        <br />
                                    </>
                                )
                            })
                        }
                        <br />
                        {//selectedAnswer != undefined &&
                            <button onClick={() => nextQuestion()}> ok </button>
                        }
                        {//selectedAnswer == undefined &&
                            // <button disabled> Nok </button>
                        }
                    </div>
                }
            </div>
        </>
    );
    function selectAnswer(answer, score) {
        setSelectedAnswer({ answerInicial: answer, scoreInicial: score }) //meter variable cual de las respuestas es selecionada.
        console.log(selectedAnswer);

    }

    function nextQuestion() {
        setQuestionIndex(questionIndex + 1);
        // setAllSelectedAnswers(allSelectedAnswers.push(selectedAnswer))
        // setSelectedAnswer();
        // console.log(allSelectedAnswers);
    }

    function getQuestions() {
        let response = fetch(`http://localhost:9000/api/test-questions`)
            .then(responseFetch => responseFetch.json())
            .then(respuestaJSON => respuestaJSON)
        return response;
    }
}
export default QuestionsComponent;