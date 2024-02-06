import {
    spinnerSearchEl,
    spinnerJobDetailsEl
} from '../common.js';

const renderSpinner = (spinner) => {
    const spinnerEL = spinner === 'search' ? spinnerSearchEl : spinnerJobDetailsEl;
    spinnerEL.classList.toggle('spinner--visible');
};

export default renderSpinner;