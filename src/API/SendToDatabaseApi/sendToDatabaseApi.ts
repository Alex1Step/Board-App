import firebase from 'firebase';
import { GlobalState } from '../../redux/interfaces';

export function sendToDatabaseApi(data: GlobalState): Promise<void | firebase.User> {
    return firebase
        .database()
        .ref()
        .update({ [data.userName.replace(/[\s.,%]/g, '')]: data });
}
