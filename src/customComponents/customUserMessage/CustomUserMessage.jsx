import React from 'react';
import {
    Name,
    Message,
    MessageName,
    MessageInfo,
    MessageContainer,
    UserMessageWrapper,
} from './styledComponents';
import CustomImage from '../customImage/CustomImage';

const CustomUserMessage = ({
    userId,
    uid, 
    image, 
    createdAt, 
    displayName, 
    message
}) => {
    return (
        <UserMessageWrapper
            isSelfMessage={userId === uid}
            key={createdAt}
        >
            <MessageInfo>
                <CustomImage
                    image={image}
                    width={'30px'}
                    height={'30px'}
                    borderRadius={'50%'}
                />
                <MessageName>
                    <Name children={displayName}/>
                </MessageName>
            </MessageInfo>
            <MessageContainer>
                <Message children={message}/>
            </MessageContainer>
        </UserMessageWrapper>
    );
};

export default CustomUserMessage;
