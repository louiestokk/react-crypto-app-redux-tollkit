import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 50;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setcryptos] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setcryptos(filteredData);
  }, [cryptoList, searchTerm]);
  if (isFetching) return "Loading...";
  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search cryptocurrencie"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-contaiiner">
        {cryptos?.map((el, i) => (
          <Col xs={24} key={el.uuid} sm={12} lg={6} className="crypto-card">
            <Link to={`/crypto/${el.uuid}`}>
              <Card
                title={`${el.rank}, ${el.name}`}
                extra={
                  <img
                    src={el.iconUrl}
                    alt={el.name}
                    className="crypto-image"
                  />
                }
                hoverable
              >
                <p>Price: {millify(el.price)}</p>
                <p>Market Cap: {millify(el.marketCap)}</p>
                <p>Daily Change: {millify(el.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CryptoCurrencies;
