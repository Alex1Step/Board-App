import React from 'react';
import { useState } from 'react';

const Input = (): React.ReactElement => {
    const [text, setText] = useState('hello');

    return (
        <div>
            <span
                className="child"
                onClick={() => {
                    setText('world');
                    return 44;
                }}
            >
                {text}
            </span>
            <p className="child">hello</p>
        </div>
    );
};

export default Input;
