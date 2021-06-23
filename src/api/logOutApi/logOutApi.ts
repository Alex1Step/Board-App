import firebase from 'firebase';

export const logOutApi = (): Promise<void> => firebase.auth().signOut();
