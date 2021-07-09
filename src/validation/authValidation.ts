import * as Yup from 'yup';

const authSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(6, 'Must be longer than 6 characters').required('Required'),
});
export default authSchema;
