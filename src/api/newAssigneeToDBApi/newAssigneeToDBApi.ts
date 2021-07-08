import firebase from 'firebase';
import { IAssignee } from '../../containers/AdminPanel/interfaces';

export const newAssigneeToDBApi = (user: IAssignee): Promise<void | firebase.User> =>
    firebase
        .database()
        .ref()
        .update({ ['/assignee/' + user.email]: user.name });
