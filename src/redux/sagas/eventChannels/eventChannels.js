import { eventChannel } from 'redux-saga';
import * as fb from '../../../firebase/init';
import * as actions from '../../actions/eventChanellActions';
import constants from '../../../firebase/constants';

export function chatMessagesEventChannel() {
    const listener = eventChannel(
        emmiter => {
            fb.firebase.firestore().collection(constants.MESSAGES)
                .onSnapshot({ includeMetadataChanges: true }, snapshot => {

                    const messages = snapshot.docChanges().map( message => message.doc.data());
                    let messagesArray = []
                    if ( messages[0] !== undefined ) 
                       { 
                        messagesArray = messages[0].messages
                        emmiter(actions.setUserMessage(messagesArray)); 
                    }
                  
                });           

            const listeners = [
                fb.firebase.database().ref(constants.MESSAGES)
            ];

            return () => listeners.forEach(listener => listener.off(listener));
        }
    );

    return listener;
}

export function resultsEventChannel() {
    const listener = eventChannel(
        emmiter => {
            fb.firebase.firestore().collection(constants.USERS_RESULTS)
                .onSnapshot({ includeMetadataChanges: true }, snapshot => {

                    const results = snapshot.docChanges().map( result => result.doc.data());
                    console.log('results', results)
                    let resultsArray = []
                    if ( results[0] !== undefined ) 
                        { 
                            resultsArray = results[0].userResults
                        emmiter(actions.setUsersResultsList(resultsArray)); 
                    }
                    
                });

            const listeners = [
                fb.firebase.database().ref(constants.USERS_RESULTS)
            ];

            return () => listeners.forEach(listener => listener.off(listener));
        }
    );

    return listener;
}
