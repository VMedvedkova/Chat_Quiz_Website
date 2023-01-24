import * as fb from './init';
import firebaseCollectionTypes from './constants';
import { getQestions, getUsers } from '../api'

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
        console.log('isUserInList', isUserInList)
        newUserList.push(getUserId)
        await fireBaseRef.doc(queryIds[0].id).update({
            uid: newUserList
        }); 
        
    }
    
    return newUserList.length
   

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

    const query = await fireBaseRef
        .get();
    if (query.docs.length === 0) {        
        // const results = await getUsers();
        const results = [
            {
                'googleId':"105175748177826381297",
                'name':"Валентина Медведкова",
                'givenName':"Валентина",
                'familyName':"Медведкова",
                'email': "valuga007@gmail.com",
                'imageUrl':"https://lh3.googleusercontent.com/a/AEdFTp7_7DBFSpEFEmYilatrDqjmJBeWW6xB_rhz-QCbUw=s96-c"
            },
            {
                'googleId':"105175748177826381298",
                'name':"Валентина Овечкина",
                'givenName':"Валентина",
                'familyName':"Овечкина",
                'email': "valuga007@gmail.com",
                'imageUrl':"https://lh3.googleusercontent.com/a/AEdFTp7_7DBFSpEFEmYilatrDqjmJBeWW6xB_rhz-QCbUw=s96-c"
            },
            {
                'googleId':"105175748177826381299",
                'name':"Валентина Лошадкина",
                'givenName':"Валентина",
                'familyName':"Лошадкина",
                'email': "valuga007@gmail.com",
                'imageUrl':"https://lh3.googleusercontent.com/a/AEdFTp7_7DBFSpEFEmYilatrDqjmJBeWW6xB_rhz-QCbUw=s96-c"
            }
        ]
        await fireBaseRef.add({ users: [getUser] })
            .then(docRef => userDocId = docRef.id);
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
    
        userDocId = queryDocs[0].users

    return userDocId;
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

export const findCurrentUser = async (getUser, getAllUsers) => {
    const isUserInList = getAllUsers.find(item => item.googleId === getUser.googleId);
    if (isUserInList) return true
    else return false
}

export const sendAddUserReadinessRequest = async () => {
    const user = fb.auth.currentUser;

    let userReadinessDocId = '';

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.USERS_READINESS);
    const query = await fireBaseRef
        .where('uid', '==', user.uid)
        .get();
    if (query.docs.length === 0) {
        await fb.firestore.collection(firebaseCollectionTypes.USERS_READINESS).add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
        })
            .then(docRef => userReadinessDocId = docRef.id);
    }

    return { uid: user.uid, userReadinessDocId };
};

export const sendAddUserResultsRequest = async correctAnswersCount => {
    const user = fb.auth.currentUser;
    const {
        uid,
        photoURL,
        displayName,
    } = user;

    let correctAnswersCountDocId = '';

    const fireBaseRef = fb.firestore.collection(firebaseCollectionTypes.USERS_RESULTS);
    const query = await fireBaseRef
        .where('uid', '==', uid)
        .get();
    if (query.docs.length === 0) {
        await fb.firestore.collection(firebaseCollectionTypes.USERS_RESULTS).add({
            uid,
            displayName,
            photoURL,
            correctAnswersCount,
        })
            .then(docRef => correctAnswersCountDocId = docRef.id);
    }

    return correctAnswersCountDocId;
};

export const deleteFromCollectionByDocIdRequest = async ({ type, docId }) => {
    const fireBaseUserRef = fb.firestore.collection(type);

    await fireBaseUserRef.doc(docId).delete();
};

export const checkIsUsersReadyToStartQuiz = async () => {
    const firebaseUsersRef = fb.firestore.collection(firebaseCollectionTypes.USERS);
    const firebaseUsersReadinessRef = fb.firestore.collection(firebaseCollectionTypes.USERS_READINESS);
    try {
        const userQuery = await firebaseUsersRef.get();
        const userReadinessQuery = await firebaseUsersReadinessRef.get();

        return (userQuery.docs.length && userQuery.docs.length === userReadinessQuery.docs.length);
        // return 0;
    } catch (error) {
        console.error('error', error);
    }
};
