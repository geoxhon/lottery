import { Card, Button, Image, CardHeader, CardBody, CardFooter, Modal, ModalHeader, ModalBody, ModalFooter, useDisclosure, ModalContent, Divider } from '@nextui-org/react';
import React from 'react';
import useMetaMask from './metamask';
import toast from 'react-hot-toast';

function SuccessModal({ isOpen, onOpenChange }: any) {
  return (
    
    <Modal aria-labelledby="modal-title" isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className="dark">
      <ModalContent>
      {(onClose) => (
        <div className="dark">
          <ModalHeader>
            <h4 style={{ color: 'white' }} className="font-bold text-large">Success</h4>  
          </ModalHeader>
          <Divider/>
          <ModalBody>
            <p style={{ color: 'white' }} className="text-tiny uppercase font-bold">You successfuly bidded to the item</p>
          </ModalBody>
          <Divider/>
          <ModalFooter>
            <Button color="danger" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
          </div>
      )}
      </ModalContent>
      </div>
    </Modal>
    
  );
}

function ProductCard({metamask, item}: any) {
  const [isBetting, setIsBetting] = React.useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const bet = async () => {
    try{
      setIsBetting(true);
      const contract = metamask.connectToContract();
      const web3 = metamask.getWeb3();
      const accounts = await web3.eth.getAccounts();
      contract.methods.bid(item.itemId, 1).send({from: accounts[0], value: web3.utils.toWei(0.01, 'ether')})
      .then((result: any) => {
        metamask.getItems();
        onOpen();
        setIsBetting(false);
      })
      .catch((e: any) => {
        setIsBetting(false);
        toast.error('Bidding Failed. Please try again', {
          position: "top-right"
        });
      });
      
    }catch{
      setIsBetting(false);
      toast.error('Bidding Failed. Please try again');
    }
  }
  return (
    <>
    <SuccessModal className="dark" isOpen={isOpen} onOpenChange={onOpenChange} />
    <Card isFooterBlurred className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">Lottery Item</p>
        <small className="text-default-500">{item.bidders.length} Bidders</small>
        <h4 className="font-bold text-large">{item.itemName}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={item.itemPic}
          width={270}
        />
      </CardBody>
      <CardFooter className="justify-center pb-0 pt-2 px-4 flex-col items-center">
        <Button isDisabled={!metamask.isMetaMaskConnected || item.hasWinner || metamask.isOwner} onClick={bet} isLoading={isBetting} color="primary" variant="shadow">
          Bet
        </Button>
        {
          item.hasWinner ? <p style={{color: "red"}} className="text-tiny uppercase font-bold">Item is not available</p> : <></>
        }
      </CardFooter>
    </Card>
    </>
  );
}
export default ProductCard;