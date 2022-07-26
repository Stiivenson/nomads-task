import {FC, ReactNode} from 'react';

import './Box.css';

interface IBoxProps {
    children: ReactNode,
}

const Box:FC<IBoxProps> = (props) => (
    <div className='Box'>
        {props.children}
    </div>
);

export default Box;
