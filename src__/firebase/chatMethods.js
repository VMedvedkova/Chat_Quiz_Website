import * as fb from './init';
import firebaseCollectionTypes from './constants';

export const sendMessageRequest = async value => {
    const user = fb.auth.currentUser;

    await fb.firestore.collection(firebaseCollectionTypes.MESSAGES).add({
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        text: value,
        createdAt: fb.firebase.firestore.FieldValue.serverTimestamp(),
    });

    // await fb.firestore.collection(firebaseCollectionTypes.MESSAGES).where('uid','==','J24XZ5kJVlV97IWw98YwoXFMeEn1').delete();

    // const doc = await fb.firestore
    //     .collection(firebaseCollectionTypes.MESSAGES)
    //     .where('uid', '==', user.uid)
    //     .get();

    //     console.log(user)

    //     const batch = fb.firestore.batch();

    //     doc.forEach(doc => {
    //     batch.delete(doc.ref);
    //     });

    //     await batch.commit();

}
