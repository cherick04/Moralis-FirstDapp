import React, { useEffect, useState } from 'react'
import './Coin.css'
import { Button } from 'web3uikit'
import { useWeb3ExecuteFunction, useMoralis } from 'react-moralis'

function Coin({ perc, setPerc, token, setModalToken, setVisible }) {
  const [color, setColor] = useState()
  const contractProcessor = useWeb3ExecuteFunction()
  const { isAuthenticated } = useMoralis()

  useEffect(() => {
    perc < 50 ? setColor('#C43D08') : setColor('green')
  }, [perc])

  async function vote(upDown) {
    const options = {
      contractAddress: '0x798A56410af0980B5c86ca5Cd8AB1a289E868D82',
      functionName: 'vote',
      abi: [
        {
          inputs: [
            { internalType: 'string', name: '_ticker', type: 'string' },
            { internalType: 'bool', name: '_vote', type: 'bool' },
          ],
          name: 'vote',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      params: {
        _ticker: token,
        _vote: upDown,
      },
    }

    await contractProcessor.fetch({
      params: options,
      onSuccess: () => {
        console.log('Vote successful')
      },
      onError: (error) => {
        alert(error.data.message)
      },
    })
  }

  return (
    <>
      <div>
        <div className="token">{token}</div>
        <div className="circle" style={{ boxShadow: `0 0 20px ${color}` }}>
          <div
            className="wave"
            style={{
              marginTop: `${100 - perc}%`,
              boxShadow: `0 0 20px ${color}`,
              backgroundColor: `${color}`,
            }}
          ></div>
          <div className="percentage">{perc}%</div>
        </div>
        <div className="votes">
          <Button
            onClick={() => {
              isAuthenticated ? vote(true) : alert('Authenticate to vote')
            }}
            text="Up"
            theme="primary"
            type="button"
          />
          <Button
            color="red"
            onClick={() => {
              isAuthenticated ? vote(false) : alert('Authenticate to vote')
            }}
            text="Down"
            theme="colored"
            type="button"
          />
        </div>
        <div className="votes">
          <Button
            onClick={() => {
              setModalToken(token)
              setVisible(true)
            }}
            text="INFO"
            theme="translucent"
            type="button"
          ></Button>
        </div>
      </div>
    </>
  )
}

export default Coin
