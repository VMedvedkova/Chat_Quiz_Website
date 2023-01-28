import * as fb from './init';
import firebaseCollectionTypes from './constants';
import { getQestions } from '../api'

export const sendQuizReadiness = async (getUserId) => {

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.USERS_READINESS);
    const query = await fireBaseRef.get();
    if (query.docs.length === 0) {
        await fireBaseRef.add({
            uid:  [getUserId]
        })
    }

    const queryIds = await fireBaseRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return data;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    const newUserList = queryIds[0].uid;

    const isUserInList = newUserList.find(item => item === getUserId);
    if (!isUserInList) 
    {
        newUserList.push(getUserId)
        await fireBaseRef.doc(queryIds[0].id).update({
            uid: newUserList
        }); 
        
    }
    
    return newUserList
};

export const sendUnsetQuizReadiness = async (getUserId) => {

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.USERS_READINESS);
    const queryIds = await fireBaseRef.get()
    .then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return data;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });
    const defaultUserList = queryIds[0].uid;
    const newUserList = defaultUserList.filter(item => item !== getUserId);
        await fireBaseRef.doc(queryIds[0].id).update({
            uid: newUserList
        });
};


export const sendAddQuestionsRequest = async () => {
    let questionsDocId = '';

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.QUESTIONS);

    const query = await fireBaseRef
        .get();
    if (query.docs.length === 0) {
        
        const { results } = await getQestions();
        await fireBaseRef.add({ questions: results })
            .then(docRef => questionsDocId = docRef.id);
    }

    const queryDocs = await fireBaseRef
        .get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data;
        });
    
        questionsDocId = queryDocs[0].questions 

    return questionsDocId;
};


export const sendAddUsersRequest = async (getUser) => {
    let userDocId = '';

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.USERS);

    const queryDocs = await fireBaseRef
        .get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data;
        });
    return(queryDocs)
};

export const sendAddNewUserToBase = async (getUpdatedAllUsers) => {
    let userDocId = '';

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.USERS);

    const docId = await fireBaseRef
        .get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => doc.id);
            return data[0];
        });   
    await fireBaseRef.doc(docId).delete();
    
    await fireBaseRef.add({ users: getUpdatedAllUsers })
            .then(docRef => userDocId = docRef.id);

    return true;
};


export const setResultsList = async (getUser, getScore) => {    

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.USERS_RESULTS);
    const query = await fireBaseRef.get();
    if (query.docs.length === 0) {
        await fireBaseRef.add({
            userResults:  [{
                uid: getUser.googleId, 
                name: getUser.name, 
                score: getScore,
                image: getUser.imageUrl
            }]
        })
    }

    const queryRes = await fireBaseRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return data;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    const newResultList = queryRes[0].userResults;
    const isUserInList = newResultList.find(item => item.uid === getUser.googleId);
    if (!isUserInList) 
    {
        newResultList.push({
            uid: getUser.googleId, 
            name: getUser.name, 
            score: getScore,
            image: getUser.imageUrl
        })
        await fireBaseRef.doc(queryRes[0].id).update({
            userResults: newResultList
        }); 
        
    } else {
        const newUserListBase = newResultList.filter(item => item.uid !== getUser.googleId);
        newUserListBase.push({
            uid: getUser.googleId, 
            name: getUser.name, 
            score: getScore,
            image: getUser.imageUrl
        })
        await fireBaseRef.doc(queryRes[0].id).update({
            userResults: newUserListBase
        }); 
    }
};


export const getResultsList = async () => {    

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.USERS_RESULTS);
    const queryIds = await fireBaseRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return data;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    return queryIds[0].userResults
};

export const findCurrentUser = async (getUser, getAllUsers) => {
    const isUserInList = getAllUsers.find(item => item.googleId === getUser.googleId);
    if (isUserInList) return true
    else return false
}

export const sendMessageRequest = async () => {  

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.MESSAGES);

    const query = await fireBaseRef.get()

    if (query.docs.length === 0) {
        await fb.firestore.collection(firebaseCollectionTypes.MESSAGES).add({
            messages: []
        })       
    }  

    const queryIds = await fireBaseRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return data;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    return queryIds[0].id
};

export const sendMessage = async (getMessagesId, getUser, getMessage) => {

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.MESSAGES);
    // console.log(fb.firebase.firestore.Timestamp.now())
    await fireBaseRef.doc(getMessagesId).update({
        messages: fb.firebase.firestore.FieldValue.arrayUnion({
            uid: getUser.googleId,
            displayName: getUser.name,
            image: getUser.imageUrl,
            message: getMessage,
            createdAt: (fb.firebase.firestore.Timestamp.now().seconds*10000000000)+fb.firebase.firestore.Timestamp.now().nanoseconds
        })
        });         
}


export const getMessages = async () => {

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.MESSAGES);

    const query = await fireBaseRef.get().then((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return data;
    })
    .catch((error) => {
        console.log("Error getting documents: ", error);
    });

    return query[0].messages
}