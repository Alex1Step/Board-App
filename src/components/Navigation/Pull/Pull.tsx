import styles from './Pull.less'

interface PullPropsI {
    isOpen: boolean
}

const Pull = (props: PullPropsI) => {
    const cls = [
        styles.Pull
    ]

    if (!props.isOpen) {
        cls.push(styles.close)
    }

    return (
        <nav className={cls.join(" ")}>
            <ul>
            <li>qwe</li>
            <li>asd</li>
            <li>zxc</li>
            </ul>
        </nav>
    )
}

export default Pull
