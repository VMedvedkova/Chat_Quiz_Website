import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendAddUsersRequest } from '../../firebase/quizMethods';
import { signIn, signOut } from '../../redux/actions/currentUser'
import { setNewUser } from '../../redux/actions/users'
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


const QuizResults = ({
    quizResult
}) => {
    
    return ( 
        quizResult && 
        <CustomWrapper>
            <p>
                Your Quiz is finished!<br />
                Congratulation!
            </p>
        </CustomWrapper>
        
    )
}

export default QuizResults
