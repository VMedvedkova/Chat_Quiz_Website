import React from 'react'
import Quiz from '../components/quiz';
import Chat from '../components/chat';
import { CustomWrapper } from '../customComponents/customWrapper';

const MainPage = () => {
    return (
        <CustomWrapper>
            <Quiz />   
            <Chat />
        </CustomWrapper>        
        
    )
}

export default MainPage
