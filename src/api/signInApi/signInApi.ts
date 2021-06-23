import firebase from 'firebase';

export const signInApi = (user: string, password: string): Promise<void | firebase.User> =>
    firebase
        .auth()
        .signInWithEmailAndPassword(user, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) return user;
        });
