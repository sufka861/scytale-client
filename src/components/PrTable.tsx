import React from 'react';
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import {Box} from "@mui/material";
import {useQuery} from "react-query";
import axios from "axios";
import moment from "moment-timezone"
import renderCellExpand from "./renderCellExpand";

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

    const columns: GridColDef[] = [
        {field: "title", headerName: "Title", width: 150, renderCell: renderCellExpand},
        {field: "description", headerName: "Description", width: 200, renderCell: renderCellExpand},
        {
            field: "author",
            headerName: "Author",
            valueGetter: (params: GridValueGetterParams) =>
                `${params.row.author.firstName || ''} ${params.row.author.lastName || ''}`,
            renderCell: renderCellExpand
        },
        {field: "createdAt", headerName: "Created Date", width: 140, renderCell: renderCellExpand},
        {field: "prNumber", headerName: "Number", width: 70, type: 'number', renderCell: renderCellExpand},
        {field: "status", headerName: "Status", type: 'singleSelect', valueOptions: ['Open', 'Closed', 'Draft'], renderCell: renderCellExpand},
        {field: "labels", headerName: "Labels", renderCell: renderCellExpand},
        {field: "id", headerName: "ID", renderCell: renderCellExpand},
    ];

    const rows: any = data?.data.map((row: PullRequest) => ({
        title: row.title,
        description: row.description,
        author: row.author,
        createdAt: moment.tz(row.createdAt.toString(), "Israel").format("YYYY-MM-DD HH:mm"),
        prNumber: row.prNumber,
        status: row.status,
        labels: row.labels,
        id: row._id
    }));
    return (
        <Box sx={{height: 500, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
            />
        </Box>
    );
};