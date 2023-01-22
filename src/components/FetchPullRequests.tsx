import axios from "axios";

async function fetchPullRequests() {
    return axios.get('http://localhost:4000/prs')
}

export default fetchPullRequests;