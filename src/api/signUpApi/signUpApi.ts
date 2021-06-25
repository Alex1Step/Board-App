import firebase from 'firebase';

export const signUpApi = (user: string, password: string): Promise<void | firebase.User> =>
    firebase
        .auth()
        .createUserWithEmailAndPassword(user, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) return user;
        });
