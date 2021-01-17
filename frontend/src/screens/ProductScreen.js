import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "../Components/Rating";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import axios from "axios";

const ProductScreen = ({ match }) => {
  const [product, setProducts] = useState({});
  useEffect(() => {
    axios
      .get(`/api/products/${match.params.id}`)
      .then((fetchProducts) => setProducts(fetchProducts.data));
  }, [match.params.id]);
  return (
    <>
      <Link to="/">
        <Button className="btn btn-light my3">Go Back</Button>
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Row>
                <Col>Price</Col>
                <Col>
                  <strong>{product.price}</strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Status</Col>
                <Col>
                  <strong>
                    {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                  </strong>
                </Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                className="btn-block"
                type="button"
                disabled={product.countInStock === 0}>
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
