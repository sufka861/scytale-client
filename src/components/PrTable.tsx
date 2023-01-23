import React from 'react';
import {DataGrid, GridValueGetterParams} from '@mui/x-data-grid';
import {Box} from "@mui/material";
import {useQuery} from "react-query";
import axios from "axios";

type Author = {
    firstName: string;
    lastName: string;
};

type PullRequest = {
    title: string;
    description: string;
    author: Author;
    createdAt: Date;
    prNumber: number;
    status: string;
    labels: Array<string>;
    _id: string
};

const fetchPullRequests = async () => {
    return axios.get('http://localhost:4000/prs');
}

export const PrTable: React.FC = () => {
    const {data, status} = useQuery('prs', fetchPullRequests)
    if (status === 'error')
        return <h2>Error fetching data from DB</h2>
    if (status === 'loading')
        return <h2>Loading...</h2>

    const columns = [
        {field: "title", headerName: "Title"},
        {field: "description", headerName: "Description"},
        {
            field: "author",
            headerName: "Author",
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.author.firstName || ''} ${params.row.author.lastName || ''}`,
        },
        {field: "createdAt", headerName: "Created Date"},
        {field: "prNumber", headerName: "Number"},
        {field: "status", headerName: "Status"},
        {field: "labels", headerName: "Labels"},
        {field: "id", headerName: "ID"},
    ];

    const rows = data?.data.map((row: PullRequest) => ({
        title: row.title,
        description: row.description,
        author: row.author,
        createdAt: row.createdAt,
        prNumber: row.prNumber,
        status: row.status,
        labels: row.labels,
        id: row._id
    }));
    return (
        <Box sx={{height: 600, width: '90%'}} p={8}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={20}
                rowsPerPageOptions={[20]}
            />
        </Box>
    );
};