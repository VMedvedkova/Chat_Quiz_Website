import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendAddUsersRequest } from '../../firebase/quizMethods';
import { signIn, signOut } from '../../redux/actions/currentUser'
import { setNewUser } from '../../redux/actions/users'
import { CustomWrapper } from '../../customComponents/customWrapper';
import QuizResults from '../quizResults';
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


const Game = ({
    setQuiz,
    getQuestions,
    getAnswers,
    setAnswer,
    currentQuestion,
    quizResult
}) => {
    const [ answerOptions, setAnswerOptions ] = useState([])

    useEffect(() => {
        if ( Object.keys(currentQuestion).length !== 0 ) {
            const ansArr = [currentQuestion.correct_answer]
            currentQuestion.incorrect_answers.forEach((currentValue, index, array) => {
                ansArr.push(currentValue)
            }, []);
            const mixarr = (arr) => {
                return arr.map(i=>[Math.random(), i]).sort().map(i=>i[1])
             }
            setAnswerOptions(mixarr(ansArr))            
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
        quizResult ? <QuizResults /> : 
        (
            getQuestions && (
                <GameWrapper>
                    {getAnswers.length ?
                        <AnswerResultImages>
                            {getAnswers.map((item, i) => {
                                return item
                                    ? <CustomImage
                                        key={i}
                                        image={correctAnswerImage}
                                        width={'31px'}
                                        height={'31px'}
                                        padding={'5px'}
                                    />
                                    : <CustomImage
                                        key={i}
                                        image={notCorrectAnswerImage}
                                        width={'31px'}
                                        height={'31px'}
                                        padding={'5px'}
                                    />
                            })}
                        </AnswerResultImages>
                        :
                        null
                        }
                    <GameWindow>
                        <QuestionWrapper>
                            <QuestionText
                                key={currentQuestion.question}
                                children={currentQuestion.question}
                            />
                        </QuestionWrapper>
                        <AnswerButtons>
                            {answerOptions.length !== 0 && answerOptions.map((item, i) => {
                                return (
                                <CustomButton
                                    key={i}
                                    text={item}
                                    // isDisabled={'isDisabled'}
                                    callback={() => {checkCorrectAnswer(item)}}
                                />
                                )
                                })
                            }
                        </AnswerButtons>
                    </GameWindow>
                </GameWrapper>
            )
            
        )
    )
}

export default Game
