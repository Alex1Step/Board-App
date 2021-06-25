import firebase from 'firebase';

export const currentUserApi = (): firebase.User | null => firebase.auth().currentUser;
