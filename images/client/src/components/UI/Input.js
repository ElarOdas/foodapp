import React, { useRef, useImperativeHandle } from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef((props, outerRef) => {
    const ref = useRef();
    const activate = function () {
        ref.current.focus();
    };
    useImperativeHandle(outerRef, () => {
        return {
            activate: activate,
            inputRef: ref,
        };
    });
    // ? For the future: Input is reusable
    return (
        <div className={styles.input}>
            <label>{props.label}</label>
            <input ref={ref} {...props.input} />
        </div>
    );
});
export default Input;
