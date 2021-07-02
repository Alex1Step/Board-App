import firebase from 'firebase';
import { IAssignee } from '../../pages/UserPage/interfaces';

export const newAssigneeToDBApi = (user: IAssignee): Promise<void | firebase.User> =>
    firebase
        .database()
        .ref()
        .update({ ['/assignee/' + user.email]: user.name });
