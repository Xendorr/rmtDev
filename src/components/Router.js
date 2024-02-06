import {
    jobDetailsContentEl,
    BASE_API_URL,
    getData,
    state
} from '../common.js';
import renderSpinner from './Spinner.js';
import renderError from './Error.js';
import renderJobDetails from './JobDetails.js';
import renderJobList from './JobList.js';

const loadHashChangeHandler = async () => {
    const jobId = location.hash.substring(1);
    if (jobId) {
        document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));
        jobDetailsContentEl.innerHTML = '';
        
        renderSpinner('job-details');
        
        try {
            const data = await getData(`${BASE_API_URL}/jobs/${jobId}`);
            const {jobItem} = data;
            
            state.activeJobItem = jobItem;
            
            renderJobList();
            renderSpinner('job-details');
            renderJobDetails(jobItem);
        }catch(error) {
            renderSpinner('job-details');
            renderError(error.message);
        }
    }
}

window.addEventListener('DOMContentLoaded', loadHashChangeHandler);
window.addEventListener('hashchange', loadHashChangeHandler);