import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { NFTContext } from '../context/NFTcontext';
import Button from './Button';

const MenuItems = () => {
  const generateLink = (i) => {
    switch (i) {
      case 0:
        return '/';     
      case 1:
        return '/my-nfts';
      default:
        return '/';
    }
  };

  return (
    <ul className={`list-none flexCenter flex-row`}>
      {['View All Market NFTs', 'My Owned NFTs'].map((item, i) => (
        <li key={i} className={`flex flex-row items-center font-poppins font-semibold text-base dark:hover:text-white hover:text-nft-dark mx-3
         `}
        >
          <Link href={generateLink(i)}>{item}</Link>
        </li>
      ))}
    </ul>
  );
};

const ButtonGroup = ({ setActive, router }) => {
  const { connectWallet, currentAccount } = useContext(NFTContext);

  return currentAccount ? (
    <div className="flexCenter">
      <Button
        btnName="Create NFT"
        btnType="primary"
        classStyles="mx-2 rounded-xl"
        handleClick={() => {
          router.push('/create-nft');
        }}
      />
    </div>
  ) : (
    <Button
      btnName="Connect Metamask Wallet"
      btnType="outline"
      classStyles="mx-2 rounded-xl"
      handleClick={connectWallet}
    />
  );
};

const Navbar = () => {

  const router = useRouter();

  
  return (
    <nav className="flexBetween w-full fixed z-10 p-4 flex-row border-b dark:bg-nft-dark bg-white dark:border-nft-black-1 border-nft-gray-1">
      <div className="flex flex-1 flex-row justify-start">
        
      </div>

      <div className="flex flex-initial flex-row justify-end">
        

        <div className="md:hidden flex">
          <ul className="list-none flexCenter flex-row">
            <MenuItems />
          </ul>
          <div className="ml-4">
            <ButtonGroup router={router} />
          </div>
        </div>
      </div>    
    </nav>
  );
};

export default Navbar;
