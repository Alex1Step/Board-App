import firebase from 'firebase';

export const fetchListOfAssigneeApi = (): Promise<{ [key: string]: string }> => {
    return firebase
        .database()
        .ref()
        .child('assignee')
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        });
};