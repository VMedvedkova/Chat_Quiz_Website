import React from 'react';
import CustomButton from '../../customComponents/customButton/CustomButton';
import { CustomWrapper } from '../../customComponents/customWrapper';

const ReadyForQuiz = ({
    user,
    isUserReadyToStartQuiz,
    setIsUserReadyToStartQuiz
}) => {
    return (         
        !isUserReadyToStartQuiz &&
            (
            <CustomWrapper>
            <p>Click START if you are ready to start quiz</p>
            <CustomButton
            text={'START'}
            callback={setIsUserReadyToStartQuiz}
            />
            </CustomWrapper>
            )
         
    )
}

export default ReadyForQuiz
