import styles from './AddButton.less'

interface AddButtonProps {
    text: string,
    type: string,
    onClick: ()=> void
}

const AddButton = (props: AddButtonProps) => {
    let cls = [styles[props.type]]
    return (
        <div onClick={props.onClick} className={cls.join(' ')}>
            <span>
                {props.text}
            </span>
        </div>
    )
}

export default AddButton