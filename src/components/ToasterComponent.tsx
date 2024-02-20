import React from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ToasterComponent({mm}: any): any {
    let winnerEvent: any;
    let biddingEvent: any;
    const setUpEvents = async () => {
        const myContract = mm.connectToContract();
        winnerEvent = await myContract.events.Winner({
            fromBlock: 'latest'
        });
        winnerEvent.on('data', function(event: any){ console.log(event);toast( event.returnValues.winner.substring(0,10)+ " Won an "+ event.returnValues.biddingItem.itemName,
        {
          icon: '👏',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
          duration: 10000
        }
      );})
      biddingEvent = await myContract.events.JustBidded({
        fromBlock: 'latest'
      });
      biddingEvent.on('data', function(event: any){ console.log(event);toast( event.returnValues.bidder.substring(0,10)+ " Just Bidded on "+ event.returnValues.biddingItem.itemName,
      {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
        duration: 10000
      }
    );})
    }
    React.useEffect(() => {
        
        setUpEvents();
        return () => {
            try{
                winnerEvent.unsubscribe();
                biddingEvent.unsubscribe();
            }catch{
                console.log("err");
            }
            
        };
      }, []);
    return (<Toaster position="top-right" />)
}