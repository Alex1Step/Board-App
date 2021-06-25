import firebase from 'firebase';
import { GlobalState } from '../../redux/interfaces';

export const sendToDatabaseApi = (data: GlobalState): Promise<void | firebase.User> =>
    firebase
        .database()
        .ref()
        .update({ [data.userName.replace(/[\s.,%]/g, '')]: data });
