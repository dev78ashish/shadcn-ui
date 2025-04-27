import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button';


const DataContainer = () => {

    const navigate = useNavigate();

    const location = useLocation();


    const handleBack = () => {
        navigate('/data');
    };

    return (
        <div>
            {location.pathname !== '/data' && (
                <Button
                    variant="outline"
                    onClick={handleBack}
                    className="mb-4"
                >
                    <ArrowLeft /> Back to Data
                </Button>
            )}
            <Outlet />
        </div>
    )
}

export default DataContainer