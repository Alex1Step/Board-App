import firebase from 'firebase';

export const deleteProjectFromDBApi = (projectName: string): Promise<void | firebase.User> =>
    firebase.database().ref('/projects/').child(projectName).remove();
