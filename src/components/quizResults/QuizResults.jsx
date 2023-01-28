import React, { useState, useEffect } from 'react';
import { CustomWrapper } from '../../customComponents/customWrapper';
import {
    User,
    Scores,
    ScoresHeader,
    ResultsWrapper,
    ScoresContainer,
} from '../../customComponents/resultStyled';
import CustomImage from '../../customComponents/customImage/CustomImage';
import CustomButton from '../../customComponents/customButton/CustomButton';


const QuizResults = ({
    resultsList,
    resetInitialState
}) => {

    const [loading, setLoading] = useState(true)

    const handleClick = () => {
        resetInitialState()
    } 

    useEffect(() => {
        resultsList.length ? setLoading(false) : setLoading(true)
    }, [resultsList])

    return (
        <ResultsWrapper>
            {loading ? (<ScoresContainer>
                    <User children={'Loading...'}/>
                    </ScoresContainer>) : (
                        <ScoresContainer>
                        <ScoresHeader>
                        <User children={'user'}/>
                        <Scores children={'scores'}/>
                        </ScoresHeader>
                        {resultsList.map(item =>
                            <ScoresHeader key={item.uid+item.score}>
                                 <CustomImage
                                     image={item.image}
                                     key={item.uid+item.score}
                                     width={'25px'}
                                     height={'25px'}
                                     borderRadius={'50px'}
                                 />
                                 <User children={item.name}/>
                                 <Scores children={item.score}/>
                             </ScoresHeader>
                         )}
                </ScoresContainer>
                    )}
            <CustomWrapper>
                <CustomButton
                    text={'ok'}
                    callback={handleClick}
                />
            </CustomWrapper>
        </ResultsWrapper>
        )   
}
        
export default QuizResults
