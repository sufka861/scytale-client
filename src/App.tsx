import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Dashboard from './components/layout/Dashboard';

const queryClient = new QueryClient();

function App() {
    return (
        <div className='App'>
            <QueryClientProvider client={queryClient}>
                <Dashboard />
            </QueryClientProvider>
        </div>
    );
}

export default App;
