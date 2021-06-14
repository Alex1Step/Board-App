import { Button } from 'antd'
import styles from './AddButton.less'

interface AddButtonProps {
    text: string,
    type: string,
    onClick: ()=> void
}

const AddButton = (props: AddButtonProps) => {
    let cls = [styles[props.type]]

    return (
        <Button className={cls.join(" ")} onClick={props.onClick} type="primary">{props.text}</Button>
    )
}

export default AddButton