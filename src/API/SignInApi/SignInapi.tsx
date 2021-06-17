import firebase from 'firebase';
function signIn(user: string, password: string): Promise<void | firebase.User> {
    return firebase
        .auth()
        .signInWithEmailAndPassword(user, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user) return user;
        })
        .catch((error) => {
            console.log(error.message);
        });
}
