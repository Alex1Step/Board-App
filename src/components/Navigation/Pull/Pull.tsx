import styles from './Pull.less'
import Blackout from '../Blackout/Blackout'

interface PullPropsI {
    isOpen: boolean,
    onClick: ()=>void
}

const Pull = (props: PullPropsI) => {
    const cls = [
        styles.Pull
    ]

    if (!props.isOpen) {
        cls.push(styles.close)
    }

    return (
        <>
            <nav className={cls.join(" ")}>
                <ul>
                <li>qwe</li>
                <li>asd</li>
                <li>zxc</li>
                </ul>
            </nav>
            { (props.isOpen)? <Blackout isOpen={props.isOpen} onClick={ props.onClick }/> : null }
        </>
    )
}

export default Pull
