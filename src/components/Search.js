import { 
    searchInputEl,
    searchFormEl,
    jobListSearchEl,
    numberEl,
    BASE_API_URL,
    getData,
    sortingBtnRecentEl,
    sortingBtnRelevantEl,
    state
} from '../common.js';
import renderError from './Error.js';
import renderSpinner from './Spinner.js';
import renderJobList from './JobList.js';
import renderPaginationButtons from './Pagination.js';

const submitHandler = async event => {
    //prevent default behavior
    event.preventDefault();
    const searchText = searchInputEl.value;
    
    //validation (regular expressions example)
    const forbiddenPattern = /[0-9@$#$^<>!?;'~¬`"*()]/;
    const patternMatch = forbiddenPattern.test(searchText);
    if (patternMatch) {
        renderError('Your text should not contain any numbers or special characters!')
        return;
    }
    searchInputEl.blur();
    jobListSearchEl.innerHTML = '';

    sortingBtnRelevantEl.classList.add('sorting__button--active');
    sortingBtnRecentEl.classList.remove('sorting__button--active');
    renderSpinner('search');

    try {
        const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
        const {jobItems} = data;
        
        state.searchJobItems = jobItems;
        state.currentPage = 1;

        renderSpinner('search');
        numberEl.textContent = jobItems.length;
        renderPaginationButtons();

        //render job-items
        renderJobList();
    }catch(error) {
        renderSpinner('search');
        renderError(error.message);
    }
};

searchFormEl.addEventListener('submit', submitHandler);