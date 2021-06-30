import firebase from 'firebase';

export const fetchListOfAdminsApi = () => {
    return firebase
        .database()
        .ref()
        .child('admins')
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        });
};
