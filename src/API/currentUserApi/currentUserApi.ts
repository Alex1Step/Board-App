import firebase from 'firebase';

export function currentUserApi(): firebase.User | null {
    const user = firebase.auth().currentUser;
    if (user) {
        return user;
    } else {
        return null;
    }
}
