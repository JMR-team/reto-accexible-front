import './QuestionsComponent.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { unstable_batchedUpdates } from 'react-dom';


function QuestionsComponent(props) {
    const [questions, setQuestion] = useState([]);
    const [allSelectedAnswers, setAllSelectedAnswers] = useState([{}]); // variable que contendra todas las respuestas seleccionadas
    const [selectedAnswer, setSelectedAnswer] = useState(); // variable que se usara para actualizarla cuando pulsemos en un button de respuesta, ira cambiando
    const [questionIndex, setQuestionIndex] = useState(0); // variable que se usara para actualizar el indice del array que contiene las preguntas
    let [okButtonIsActive,setOkButtonIsActive] = useState(false);
    let [optionIsSelectedArray,setOptionIsSelectedArray] = useState([false,false,false,false]);

    useEffect(() => {
        async function fetchData() {
            let listaQuestions = await getQuestions();
            setQuestion(listaQuestions);
        }
        fetchData();
    }, [])

    return (
        <>
            <div className="quiz-body">
            {
            questions.length > 0 && questionIndex < questions.length &&// comprobamos si questions tiene elementos dentro y si la variable questionIndex es menor que la longitud del array de questions
                <div className="quiz-modal">
                    <div className="quiz-modal-header">
                        <label className="quiz-modal-title">{questions[questionIndex].question} </label>
                    </div>
                    <br />
                    {
                    questions[questionIndex].answers.map(function (answerIndividual,index) {
                        return (
                            <>
                                <button className={optionIsSelectedArray[index] ? "selected" : "quiz-modal-option"} onClick={() => selectAnswer(answerIndividual.text, answerIndividual.score,index)}>{answerIndividual.text} </button>
                                <br />
                            </>
                            )
                        })
                    }
                    <br />
                    <div className="quiz-modal-footer">
                        <div className="quiz-modal-progress-controls">
                            <p className="quiz-modal-progress-current">{`${questionIndex <= questions.length - 1 ? questionIndex + 1 : ""} / ${questions.length}`}</p>
                            <button className={"quiz-modal-btn" + (okButtonIsActive ? "" : " quiz-modal-btn-disabled")} onClick={ okButtonIsActive ? () => nextQuestion() : null}> Síguiente </button>
                        </div>
                    </div>
                </div>
            }
            </div>
        </>
    );
    function selectAnswer(answer, score,index) {
        let previouslySelectedIndex = optionIsSelectedArray.findIndex(item=>item);
        if (previouslySelectedIndex >= 0) optionIsSelectedArray[previouslySelectedIndex] = false;
        optionIsSelectedArray[index] = true;
        setOptionIsSelectedArray([...optionIsSelectedArray]);
        setOkButtonIsActive(true);
        setSelectedAnswer({ answerInicial: answer, scoreInicial: score }) //meter variable cual de las respuestas es selecionada.
    }

    function nextQuestion() {
        props.setResults( prevState => {
            return {
                ...prevState,
                testScore:prevState.testScore + selectedAnswer.scoreInicial
            }
        })
        if (questionIndex === questions.length - 1){
            props.setActualPart("chat");
        }
        setOkButtonIsActive(false);
        setOptionIsSelectedArray([false,false,false,false])
        setQuestionIndex(questionIndex + 1);
        // setAllSelectedAnswers(allSelectedAnswers.push(selectedAnswer))
        // setSelectedAnswer();
        // console.log(allSelectedAnswers);
    }

    function getQuestions() {
        let response = fetch(`/api/test-questions`)
            .then(responseFetch => responseFetch.json())
            .then(respuestaJSON => respuestaJSON)
        return response;
    }
}
export default QuestionsComponent;