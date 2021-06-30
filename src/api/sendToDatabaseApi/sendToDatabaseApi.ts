import firebase from 'firebase';
import { BoardI } from '../../redux/interfaces';

export const sendToDatabaseApi = (data: BoardI[], projectTitle: string): Promise<void | firebase.User> =>
    firebase
        .database()
        .ref()
        .update({ ['/projects/' + projectTitle]: data });
