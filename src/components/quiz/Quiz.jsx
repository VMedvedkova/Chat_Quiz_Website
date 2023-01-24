import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendAddUsersRequest } from '../../firebase/quizMethods';
import { signIn, signOut } from '../../redux/actions/currentUser'
import { setNewUser } from '../../redux/actions/users'
import { CustomWrapper } from '../../customComponents/customWrapper';
import ReadyForQuiz from '../readyForQuiz';
import Game from '../game';
import {
    GameWindow,
    GameWrapper,
    QuestionText,
    AnswerButtons,
    QuestionWrapper,
    AnswerResultImages,
} from '../../customComponents/quizStyled';
import CustomImage from '../../customComponents/customImage/CustomImage';
import CustomButton from '../../customComponents/customButton/CustomButton';
import correctAnswerImage from '../../assets/images/correct-answer-image.svg.png';
import notCorrectAnswerImage from '../../assets/images/not-correct-answer-image.png';
import colors from '../../themeManager/colors';


const Quiz = ({
    setQuiz,
    getQuestions,
    getAnswers,
    setAnswer,
    currentQuestion
}) => {
    const [ answerOptions, setAnswerOptions ] = useState([])

    useEffect(() => {
        if ( Object.keys(currentQuestion).length !== 0 ) {
            const ansArr = [currentQuestion.correct_answer]
            currentQuestion.incorrect_answers.forEach((currentValue, index, array) => {
                ansArr.push(currentValue)
            }, []);
            setAnswerOptions(ansArr)            
        }
    }, [currentQuestion])

    const checkCorrectAnswer = (item) => {
        console.log('item', item)
        console.log('currentQuestion.correct_answer', currentQuestion.correct_answer)

        if (item === currentQuestion.correct_answer) {
            console.log(true)
            setAnswer(true)
        } else {
            setAnswer(false)
        }
    }
   
    return ( 
        setQuiz ? 
        <ReadyForQuiz /> : <Game />
    )
}

export default Quiz
