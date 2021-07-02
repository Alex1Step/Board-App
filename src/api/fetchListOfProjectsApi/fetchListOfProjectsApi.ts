import firebase from 'firebase';
import { BoardI } from '../../redux/interfaces';

export const fetchListOfProjectsApi = (): Promise<{ [key: string]: BoardI[] }> => {
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
