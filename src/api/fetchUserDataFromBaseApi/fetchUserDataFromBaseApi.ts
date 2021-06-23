import firebase from 'firebase';
import { GlobalState } from '../../redux/interfaces';

export const fetchUserDataFromBaseApi = (user: string): Promise<GlobalState> => {
    const dbRef = firebase.database().ref();
    return dbRef
        .child(user.replace(/[\s.,%]/g, ''))
        .get()
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }
        });
};
