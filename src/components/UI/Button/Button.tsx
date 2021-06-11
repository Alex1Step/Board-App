import React from 'react'
import styles from './Button.less'

interface ButtonI {
    classes?: string,
    onClick: ( )=>void
}



const Button = (props: ButtonI) => {

    const cls = [
        styles.Button
      ]

    return (   
        <div className={cls.join(" ")} onClick={props.onClick}>x</div>
    )
}

export default Button