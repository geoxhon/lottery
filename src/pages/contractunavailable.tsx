// Import necessary components from NextUI
import { Input, Image, Button, Spacer, Link, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
const UnavailablePage = ({mm}: any) => {
    
    return (
        <Card style={{margin: "0 auto"}}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-md">Web3 Error</p>
            
            <h4 className="font-bold text-large">Contract is not available.</h4>
            </CardHeader>
            <CardBody>
                
            </CardBody>
        </Card>
    );
};

export default UnavailablePage;
