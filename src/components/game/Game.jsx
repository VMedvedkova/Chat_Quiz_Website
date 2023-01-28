import React, { useState, useEffect } from 'react';
import { CustomWrapper } from '../../customComponents/customWrapper';
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
    setQuizWaiting,
    unSetIsUserReadyToStartQuiz,
    getQuestions,
    getAnswers,
    setAnswer,
    currentQuestion,
    setCorrectAnswerCount
}) => {
    const [answerOptions, setAnswerOptions] = useState([])
    const [isDisabled, setIsDisabled] = useState(false);
    const [enableQuiz, setEnableQuiz] = useState(false);

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
            setEnableQuiz(true)            
        }
    }, [currentQuestion])

    const checkCorrectAnswer = (item) => {
        setIsDisabled(true);
        if (item === currentQuestion.correct_answer) {
            setCorrectAnswerCount()
            setAnswer(true)
        } else {
            setAnswer(false)
        }
    }
    
    useEffect(() => {
        setIsDisabled(false);
    }, [currentQuestion]);
   
    return ( 
        <GameWrapper>
        {setQuiz ? (
            getQuestions && (
                <>
                    {getAnswers.length ?
                        <AnswerResultImages>
                            {getAnswers.map((item, i) => {
                                return item
                                    ? <CustomImage
                                        key={i}
                                        image={correctAnswerImage}
                                        width={'25px'}
                                        height={'25px'}
                                        padding={'5px'}
                                    />
                                    : <CustomImage
                                        key={i}
                                        image={notCorrectAnswerImage}
                                        width={'25px'}
                                        height={'25px'}
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
                                    fontSize={'1rem'}
                                    text={item}
                                    isDisabled={isDisabled}
                                    callback={() => {checkCorrectAnswer(item)}}
                                    activeBackgroundColor={item !== currentQuestion.correct_answer && `${colors.wrongAnswerBgColor}`}
                                />
                                )
                                })
                            }
                        </AnswerButtons>
                    </GameWindow>
                </>
            )    
        ) : ( setQuizWaiting ? 
            <CustomWrapper>
                <div>
                <p>You are READY for Quiz!<br />
                Please, wait for other students to be ready</p>
                <CustomButton
                text={'CANCEL'}
                callback={unSetIsUserReadyToStartQuiz}
            /></div></CustomWrapper>
            : <CustomWrapper><p>Loading...</p></CustomWrapper>
            )
        }
        </GameWrapper>
    )

}

export default Game
