import firebase from 'firebase';
export function signUpApi(user: string, password: string): Promise<void | firebase.User> {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(user, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) return user;
        })
        .catch((error) => {
            alert(error);
        });
}
