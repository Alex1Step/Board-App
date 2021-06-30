import firebase from 'firebase';
import { BoardI } from '../../redux/interfaces';

export const fetchUserDataFromBaseApi = (project: string): Promise<BoardI[]> => {
    const dbRef = firebase.database().ref();
    return dbRef
        .child('/projects/' + project)
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        });
};
