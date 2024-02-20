import React from 'react';
import NavBar from '../components/navbar';
import ProductCard from '../components/productcard';
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, CircularProgress, Divider, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export function TransferModal({mm}: any) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [newOwner, setNewOwner] = React.useState("");
    const [isTransfering, setIsTransfering] = React.useState(false);
    const handleInputChange = (event:any) => {
        setNewOwner(event.target.value);
    };

    const transfer = async () => {
        try{
            setIsTransfering(true);
            const contract = mm.connectToContract();
            const web3 = mm.getWeb3();
            const accounts = await web3.eth.getAccounts();
            contract.methods.transfer(newOwner).send({from: accounts[0]})
            .then((result: any) => {
              toast.success('Transfer Success', {
                  position: "top-right"
                })
              mm.checkMetaMaskConnection();
              setIsTransfering(false);
            })
            .catch((e: any) => {
              setIsTransfering(false);
              toast.error('Transfer Failed. Please try again', {
                position: "top-right"
              });
            });
            
          }catch{
            setIsTransfering(false);
            toast.error('Transfer Failed. Please try again');
          }
    }
    return(
      <>
        <Button className="text-tiny" isDisabled={!mm.isOwner} onClick={onOpen} color="primary" radius="full" size="sm">
        Transfer
        </Button>
        <Modal className="dark"
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
          isDismissable={!isTransfering}
          closeButton={<></>}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-white flex flex-col gap-1">Transfer Contract Ownership</ModalHeader>
                <ModalBody>
                  <Input className='text-white dark'
                    autoFocus
                    label="New Owner"
                    placeholder="Enter new owners address"
                    variant="bordered"
                    onChange={handleInputChange}
                  />
                </ModalBody>
                <ModalFooter>
                    <div style={{gap: '1%'}}>
                        <Button color="danger" isDisabled={isTransfering} variant="flat" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" isLoading={isTransfering} onPress={transfer}>
                            Transfer
                        </Button>
                        <br/>
                        <p style={{color: "red"}} className="text-tiny uppercase font-bold">This action cannot be undone</p>
                    </div>
                  
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  export function DeleteModal({mm}: any) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [isDeleting, setIsDeleting] = React.useState(false);
    

    const transfer = async () => {
        try{
            setIsDeleting(true);
            const contract = mm.connectToContract();
            const web3 = mm.getWeb3();
            const accounts = await web3.eth.getAccounts();
            contract.methods.destroy().send({from: accounts[0]})
            .then((result: any) => {
              toast.success('Transfer Success', {
                  position: "top-right"
                })
              setIsDeleting(false);
            })
            .catch((e: any) => {
              setIsDeleting(false);
              toast.error('Transfer Failed. Please try again', {
                position: "top-right"
              });
            });
            
          }catch{
            setIsDeleting(false);
            toast.error('Transfer Failed. Please try again');
          }
    }
    return(
      <>
        <Button className="text-tiny" isDisabled={!mm.isOwner} onClick={onOpen} color="danger" radius="full" size="sm">
        Delete
        </Button>
        <Modal className="dark"
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="top-center"
          isDismissable={!isDeleting}
          closeButton={<></>}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="text-white flex flex-col gap-1">Destroy Contract</ModalHeader>
                <ModalBody>
                <p style={{color: "red"}} className="text-tiny uppercase font-bold">This action cannot be undone</p>
                </ModalBody>
                <ModalFooter>
                    <div style={{gap: '1%'}}>
                        <Button color="danger" isDisabled={isDeleting} variant="flat" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="primary" isLoading={isDeleting} onPress={transfer}>
                            Destroy
                        </Button>
                        <br/>
                        
                    </div>
                  
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
function Home({mm}:any) {
    const containerStyles = {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: '1%',
      };
    const [items, setItems] = React.useState([]);
    const [contractOwner, setContractOwner] = React.useState(undefined);
    const [isWithdrawing, setIsWithdrawing] = React.useState(false);
    const [isResetting, setIsResetting] = React.useState(false);
    const [balance, setBalance] = React.useState(0);
    const withdraw = async () => {
        try{
          setIsWithdrawing(true);
          const contract = mm.connectToContract();
          const web3 = mm.getWeb3();
          const accounts = await web3.eth.getAccounts();
          contract.methods.withdraw().send({from: accounts[0]})
          .then((result: any) => {
            toast.success('Withdraw Success', {
                position: "top-right"
              })
            setIsWithdrawing(false);
          })
          .catch((e: any) => {
            setIsWithdrawing(false);
            toast.error('Withdrawing Failed. Please try again', {
              position: "top-right"
            });
          });
          
        }catch{
          setIsWithdrawing(false);
          toast.error('Withdrawing Failed. Please try again');
        }
      }
    const reset = async () => {
        try{
            setIsResetting(true);
            const contract = mm.connectToContract();
            const web3 = mm.getWeb3();
            const accounts = await web3.eth.getAccounts();
            contract.methods.reset(1).send({from: accounts[0]})
            .then((result: any) => {
              toast.success('Reset Success', {
                  position: "top-right"
                })
              setIsResetting(false);
            })
            .catch((e: any) => {
              setIsResetting(false);
              toast.error('Resetting Failed. Please try again', {
                position: "top-right"
              });
            });
            
          }catch{
            setIsResetting(false);
            toast.error('Resetting Failed. Please try again');
          }
    }
    const refreshData = async () => {
        mm.getItems();
        const web3 = mm.getWeb3();
        setBalance(web3.utils.fromWei(await web3.eth.getBalance(mm.contractAddress), 'ether'));
    }
    React.useEffect(() => {
        setItems(mm.items);
        setContractOwner(mm.contractOwner);
        refreshData();
        const intervalId = setInterval(refreshData, 5000);
        return () => clearInterval(intervalId);
    }, []);
    
    React.useEffect(() => {
        
        mm.checkMetaMaskConnection();
        
        return () => {
        };
      }, []);
    
    return (
        <>
        <div className="relative flex-col justify-center aling-center" style={{gap: '1%'}}>
            <div style={containerStyles}>
                <Card className=" justify-center">
                    <CardHeader className="flex gap-3">
                        <div className="flex flex-col">
                        <p className="text-md">Contract Owner</p>
                        {
                            mm.contractOwner ? <p className="text-small text-default-500">{mm.contractOwner}</p> : <CircularProgress aria-label="Loading..." />
                        }
                        <p className="text-md">Contract Balance</p>
                        <p className="text-small text-default-500">{balance} ETH</p> 
                        </div>
                    </CardHeader>
                    <CardBody className=" flex justify-center">
                        <Button color="success" isLoading={isWithdrawing} isDisabled={!mm.isOwner} onClick={withdraw} variant="shadow">
                            Withdraw
                        </Button>
                    </CardBody>
                    <CardFooter className="flex justify-between">
                        <Button className="text-tiny" isLoading={isResetting} isDisabled={!mm.isOwner} onClick={reset} color="primary" radius="full" size="sm">
                        Reset
                        </Button>
                        <TransferModal mm={mm}/>
                        <DeleteModal mm={mm}/>
                    </CardFooter>
                </Card>
            </div>
        
            <div style={containerStyles}>
            {
                mm.items ? 
                    mm.items.map((item: any, index: any) => (
                        <ProductCard metamask={mm} item={item}/>
                    ))
                 : 
                    <CircularProgress label="Loading Items" />
            }
            </div>
        </div>
        </>
    );
}

export default Home;
