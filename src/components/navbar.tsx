import React from "react";
import {Navbar,Image, NavbarBrand, NavbarContent, NavbarItem, Link, Button, User} from "@nextui-org/react";
import useMetaMask from "./metamask";
import metamaskImage from '../icons/metamask.png'; 
export function UserProfile({mm}:any):any{
  const [user, setUser] =  React.useState("");
  const userAccount = async () => {
    const { Web3 } = require('web3');
    const web3 = new Web3(( (window as any).ethereum));
    const accounts = await web3.eth.getAccounts();
    setUser(accounts[0].substring(0,10));
  }
  React.useEffect(() => {
    userAccount();
    return () => {
    };
  }, []);
  
  return (
    <User
    name={user}
    description={"MetaMask User"}
    avatarProps={{ src: metamaskImage }}/>
  );
}
export default function NavBar({mm}: any): any {
  const metamask = React.useRef();
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Lottery</p>
      </NavbarBrand>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Products
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="winners" aria-current="page">
            Winners
          </Link>
        </NavbarItem>
        
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          {
            mm.isMetaMaskConnected ? <UserProfile></UserProfile>
                          :
                          <Button as={Link} color="primary" onClick={mm.enableEth} variant="flat" endContent={<Image src={require('../icons/metamask.png')} alt="Icon" width={20} height={20} />}>
                            Sign In With
                          </Button>

          }
          
        </NavbarItem>
      </NavbarContent>
    </Navbar>

  );
}
