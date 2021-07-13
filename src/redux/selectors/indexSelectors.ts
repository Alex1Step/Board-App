import { RootState } from '../../redux/store';

const projectCreated = (state: RootState) => state.globalReducer.projectCreated;
const user = (state: RootState) => state.globalReducer.userName;

const indexSelectors = { projectCreated, user };

export default indexSelectors;
