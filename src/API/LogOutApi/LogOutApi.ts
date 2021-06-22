import firebase from 'firebase';
export function logOutApi(): Promise<void> {
    return firebase.auth().signOut();
}
