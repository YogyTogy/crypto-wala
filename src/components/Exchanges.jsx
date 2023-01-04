import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { server } from "../index"
import { Container, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import Loader from './Loader';
import ExchangeCard from './ExchangeCard';
import ErrorComponent from './ErrorComponent'

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr")

  const currencySymbol = currency==="inr"?"₹":currency==="eur"?"€":"$"

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`)
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchExchanges();
  }, [currency]);

  if(error) return <ErrorComponent message={"error while fetching Exchanges"} />


  return (
    <Container maxW={"container.xl"}>
      {loading ? <Loader /> : <>

      <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
          <HStack spacing={"4"}>
            <Radio value={"inr"}>INR</Radio>
            <Radio value={"usd"}>USD</Radio>
            <Radio value={"eur"}>EUR</Radio>
          </HStack>
        </RadioGroup>

        <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
          {
            exchanges.map((i) => (
              <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url}  currencySymbol={currencySymbol} />
            ))
          }

        </HStack>

        
      </>}
    </Container>
  )
}

export default Exchanges