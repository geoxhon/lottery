// Import necessary components from NextUI
import { Input, Image, Button, Spacer, Link, Card, CardBody, CardFooter, CardHeader } from '@nextui-org/react';
import React from 'react';
import metamaskImage from '../icons/metamask.png'; 
import { useNavigate } from 'react-router-dom';
const LoginPage = ({mm}: any) => {
    
    return (
        <Card style={{margin: "0 auto"}}>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-md">Login</p>
            
            <h4 className="font-bold text-large">To use this this website you must connect with Metamask.</h4>
            </CardHeader>
            <CardBody>
                
            </CardBody>
            <CardFooter className="justify-center" >
            <Button color="primary" onClick={mm.enableEth} variant="flat" endContent={<Image src={require('../icons/metamask.png')} alt="Icon" width={20} height={20} />}>
                Sign In With
            </Button>
            </CardFooter>
        </Card>
    );
};

export default LoginPage;
