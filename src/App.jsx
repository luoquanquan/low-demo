import { useState } from "react";

const Button = ({onClick, setLoading,  children, ...rest}) => {
  
  const strongOnClick = async () => {
    try {
      setLoading(true)
      await onClick()
    } catch (err) {
      console.log(`Current log: err: `, err)
    } finally {
      setLoading(false)
    }
  }
  
  return <button onClick={strongOnClick} {...rest}>{children}</button>
}

export function App() {
  const [account, setAccount] = useState('')
  const [loading, setLoading] = useState(false)
  
  const connect = async () => {
    const [address] = await ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(address);
  }
  
  const disConnect = async () => {
    await ethereum.request({method: 'wallet_disconnect'})
    setTimeout(() => {
      window.location.reload()
    }, 500);
  }
  
  const getChainIdByRequest = async () => {
    const chainId = await ethereum.request({method: 'eth_chainId'})
    console.log(`Current log: chainId: `, chainId)
  }
  
  const getChainIdByDot = () => {
    const chainId = ethereum.chainId
    console.log(`Current log: chainId: `, chainId)
  }
  
  const getChainIdByRequestChainId = async () => {
    const chainId = await ethereum.requestChainId()
    console.log(`Current log: chainId: `, chainId)
  }
  
  const switchChainId = async () => {
    await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x89' }] });
  }
  
  const sendTransaction = async () => {
    ethereum.request({
      method: 'eth_sendTransaction',
      params: [{
        from: account,
        to: '0xfe8dc6394501a35ad1c4833f40f382e55dada4f3',
        value: '0x01',
      }],
    });
  }
  
  return (
    <>
      <p>
        <Button setLoading={setLoading} disabled={account || loading} onClick={connect}>connect</Button>&nbsp;
        <Button setLoading={setLoading} disabled={!account || loading} onClick={disConnect}>disConnect</Button>
      </p>
    
      <p>
        <Button setLoading={setLoading} disabled={!account || loading} onClick={getChainIdByRequest}>getChainIdByRequest</Button>&nbsp;
        <Button setLoading={setLoading} disabled={!account || loading} onClick={getChainIdByDot}>getChainIdByDot</Button>&nbsp;
        <Button setLoading={setLoading} disabled={!account || loading} onClick={getChainIdByRequestChainId}>getChainIdByRequestChainId</Button>&nbsp;
      </p>
      
      <p>
        <Button setLoading={setLoading} disabled={!account || loading} onClick={switchChainId}>switchChainId</Button>
      </p>
      
      <p>
        <Button setLoading={setLoading} disabled={!account || loading} onClick={sendTransaction}>sendTransaction</Button>
      </p>
    </>
  );
}
