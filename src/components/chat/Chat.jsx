import React, { useEffect, useRef } from 'react';
import {
    ChatContainer,
    MessagesWrapper,
} from '../../customComponents/chatStyled';
import CustomTextField from '../../customComponents/customTextField/CustomTextField';
import chatBackgroundImage from '../../assets/images/bgchat.png';
import CustomUserMessage from '../../customComponents/customUserMessage/CustomUserMessage';

const Chat = ({
    user,
    messages,
    sendMessage
}) => {
    const messageText = useRef(null);

    useEffect(() => {
        if (messageText) {
            messageText.current.addEventListener('DOMNodeInserted', event => {
                const { currentTarget: target } = event;
                target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
            });
        }
    }, []);

    return (
        <ChatContainer
            chatBackgroundImage={chatBackgroundImage}
        >
            <MessagesWrapper 
            ref={messageText}
            >
                {  messages.length !== 0 &&
                messages.map(({ uid, image, createdAt, displayName, message }) =>
                    <CustomUserMessage
                        key={createdAt}
                        userId={user.googleId}
                        uid={uid}
                        image={image} 
                        createdAt={createdAt}
                        displayName={displayName}
                        message={message} 
                    />
                )
                }
            </MessagesWrapper>
            <CustomTextField
                type={'text'}
                sendMessage={sendMessage}
            />
        </ChatContainer>
    );
};

export default Chat;
