import firebase from 'firebase';

export const fetchListOfAdminsApi = (): Promise<{ [key: string]: string }> =>
    firebase
        .database()
        .ref()
        .child('admins')
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        });
