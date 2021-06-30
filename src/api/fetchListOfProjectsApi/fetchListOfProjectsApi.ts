import firebase from 'firebase';

export const fetchListOfProjectsApi = () => {
    return firebase
        .database()
        .ref()
        .child('projects')
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        });
};
