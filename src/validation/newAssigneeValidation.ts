import * as Yup from 'yup';

const newAssigneeValidation = Yup.object({
    name: Yup.string().min(6, 'Must be longer than 6 characters').required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
});
export default newAssigneeValidation;
