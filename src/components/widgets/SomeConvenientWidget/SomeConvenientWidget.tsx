import {FC} from 'react';
import {withLoadingTrack} from 'hoc';

import './SomeConvenientWidget.css';

const LOADING_STEPS_CHANGE_DELAY = 2000;

const SomeConvenientWidget:FC<any> = () => (
    <div className='SomeConvenientWidget'>
        Some Convenient Widget
    </div>
);

// Use HOC to add loading track for widget component
export default withLoadingTrack({loadingStepsChangeDelay: LOADING_STEPS_CHANGE_DELAY})(SomeConvenientWidget);
