import firebase from 'firebase';
export function logOutApi(): Promise<void> {
    return firebase
        .auth()
        .signOut()
        .then(() => {
            console.log('LOGGED OUT');
        })
        .catch(() => {
            console.log('NOT LOGGED OUT');
        });
}
