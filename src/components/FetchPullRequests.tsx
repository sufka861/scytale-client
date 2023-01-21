import axios from "axios";

async function fetchPullRequests() {
    return axios.get('http://localhost:3000/prs')
}

export default fetchPullRequests;