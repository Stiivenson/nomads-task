import {FC} from 'react';
import {withLoadingTrack} from 'hoc';

import './SomeConvenientWidget.css';

const MAX_WIDGET_LOADING_TIME = 3;

const SomeConvenientWidget:FC<any> = () => (
    <div className='SomeConvenientWidget'>
        Some Convenient Widget
    </div>
);

// Use HOC to add loading track for widget component
export default withLoadingTrack({maxLoadingTimeInSeconds: MAX_WIDGET_LOADING_TIME})(SomeConvenientWidget);
