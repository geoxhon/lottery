import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from '@nextui-org/react';
import React from 'react';
import toast from 'react-hot-toast';
function Winners({mm}:any) {
    const containerStyles = {
        display: 'grid',
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '1%',
    };
    const [isDrawing, setIsDrawing] = React.useState(false);
    const drawWinners = async () =>{
        try{
            setIsDrawing(true);
            const contract = mm.connectToContract();
            const web3 = mm.getWeb3();
            const accounts = await web3.eth.getAccounts();
            contract.methods.revealWinners().send({from: accounts[0]})
            .then(async (result: any) => {
                await mm.getWinners();
                setWinners(mm.winners);
              })
            .catch((e: any) => {
                toast.error('Declaring Winners Failed. Please try again', {
                  position: "top-right"
                });
            });
        }finally{
            setIsDrawing(false);
        }
       
        
    }
    React.useEffect(() => {
        mm.checkMetaMaskConnection();
        return () => {
        };
      }, []);
    const [winners, setWinners] = React.useState(mm.winners);
      
    return (
        <>
            <div className="relative flex flex-col h-screen justify-center aling-center" style={containerStyles}>
            <Table  aria-label="Example empty table">
                <TableHeader>
                    <TableColumn>Winner Address</TableColumn>
                    <TableColumn>Item Won</TableColumn>
                </TableHeader>
                
                {
                    mm.winners.length == 0 ? <TableBody emptyContent={"No rows to display."}>{[]}</TableBody>
                    :
                    <TableBody>
                        {
                            mm.winners.map((winner: any, index: any)=>
                            <TableRow key={index}>
                                <TableCell>{winner.winner.addr}</TableCell>
                                <TableCell>{winner.winningItem.itemName}</TableCell>
                            </TableRow>)
                        }
                    </TableBody>
                }
                </Table>
                <Button color="success" isLoading={isDrawing} isDisabled={!mm.isOwner} onClick={drawWinners} variant="shadow">
                Declare Winners
                </Button>
            </div>
        </>
    );
}

export default Winners;