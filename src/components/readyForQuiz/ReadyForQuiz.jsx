import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CustomButton from '../../customComponents/customButton/CustomButton';
import { sendAddUsersRequest } from '../../firebase/quizMethods';
import { signIn, signOut } from '../../redux/actions/currentUser'
import { setNewUser } from '../../redux/actions/users'
import { CustomWrapper } from '../../customComponents/customWrapper';

const ReadyForQuiz = ({
    user,
    isUserReadyToStartQuiz,
    setIsUserReadyToStartQuiz,
    unSetIsUserReadyToStartQuiz
}) => {
    return ( <CustomWrapper>
        
        {isUserReadyToStartQuiz ? 
            (<>
            <p>You are READY for Quiz!<br />
            Please, wait for other students to be ready</p>
            <CustomButton
            text={'CANCEL'}
            callback={unSetIsUserReadyToStartQuiz}
            /></>)
        :  
            (<>
            <p>Click START if you are ready to start quiz</p>
            <CustomButton
            text={'START'}
            callback={setIsUserReadyToStartQuiz}
            />
            </>)
        }   
        </CustomWrapper>
    )
}

export default ReadyForQuiz
