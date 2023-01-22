import React from 'react';
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import './App.css';
import {PrTable} from "./components/PrTable";
import NewPrButton from "./components/NewPrButton";

const queryClient = new QueryClient();

function App() {
    return (
    <div className="App">
        <QueryClientProvider client={queryClient}>
            <NewPrButton />
            <PrTable />
            <ReactQueryDevtools />
        </QueryClientProvider>
    </div>
  );
}

export default App;
