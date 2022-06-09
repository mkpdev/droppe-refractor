import * as React from "react";
import lodash from 'lodash';
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "../button";
import ProductList from "../productListComponents";
import { Form } from "../form";
import logo from "../../images/droppe-logo.png";
import img1 from "../../images/img1.png";
import img2 from "../../images/img2.png";
import styles from "./shopApp.module.css";
import { Product } from "../../model";

type MyProps = {};

type MyState = {
  products: Product[],
  isOpen: boolean,
  isShowingMessage: boolean,
  message: string,
  numFavorites: number,
  prodCount: number
};

export class ShopApp extends React.Component<MyProps, MyState> {

  constructor(props: MyProps) {
    super(props);

    this.favClick = this.favClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { products: [], isOpen: false, isShowingMessage: false, message: '', numFavorites: 0, prodCount: 0 };

    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then((rawData: Product[]) => {
        this.setState({ products: rawData, prodCount: rawData.length });
      });
  }

  favClick(title: string) {
    const prods = this.state.products;
    const idx = lodash.findIndex(prods, { title: title })
    let currentFavs = this.state.numFavorites
    let totalFavs: number;

    prods[idx].isFavorite ? totalFavs = --currentFavs : totalFavs = ++currentFavs
    prods[idx].isFavorite = !prods[idx].isFavorite;

    this.setState(() => ({ products: prods, numFavorites: totalFavs }));
  }

  onSubmit(payload: Product) {
    const updated = lodash.clone(this.state.products);
    const { title, description, price } = payload;

    const newData = {
      title: title,
      price: price,
      description: description,
    }

    this.setState({
      isOpen: false,
      isShowingMessage: true,
      message: 'Adding product...'
    })

    // **this POST request doesn't actually post anything to any database**
    fetch('https://fakestoreapi.com/products', {
      method: "POST",
      body: JSON.stringify(newData)
    })
      .then(res => res.json())
      .then(json => {
        ((t) => {
          setTimeout(() => {
            //since this api is fake and not returning required output that's why
            // adding new data into existing state
            updated.push(newData);

            this.setState({
              products: updated,
              prodCount: lodash.size(this.state.products) + 1,
              isShowingMessage: false,
              message: ''
            });
          }, 2000)
        })(this);
      })
  }

  render() {
    const { products, isOpen, isShowingMessage, message, prodCount, numFavorites } = this.state;
    return (
      <>
        <div className={styles.header}>
          <div className={`container ${styles.headerImageWrapper}`}>
            <img src={logo} className={styles.headerImage} />
          </div>
        </div>

        <>
          <span
            className={`container ${styles.main}`}
            style={{ margin: '50px inherit', display: 'flex', justifyContent: 'space-evenly' }}
          >
            <img src={img1} style={{ maxHeight: "15em", display: 'block' }} />
            <img src={img2} style={{ maxHeight: "15rem", display: 'block' }} />
          </span>
        </>

        <div className={`container ${styles.main}`} style={{ paddingTop: 0 }}>
          <div className={styles.buttonWrapper}>
            <span role="button">
              <Button
                onClick={() =>
                  this.setState({
                    isOpen: true,
                  })
                }
              >Send product proposal</Button>
            </span>
            {isShowingMessage &&
              <div className={styles.messageContainer}>
                <i>{message}</i>
              </div>}
          </div>

          <div className={styles.statsContainer}>
            <span>Total products: {prodCount} - Number of favorites: {numFavorites}</span>
          </div>

          {products && !!products.length && <ProductList products={products} onFav={this.favClick} />}
        </div>

        <Modal
          isOpen={isOpen}
          className={styles.reactModalContent}
          overlayClassName={styles.reactModalOverlay}
        >
          <div className={styles.modalContentHelper}>
            <div
              className={styles.modalClose}
              onClick={() =>
                this.setState({
                  isOpen: false
                })
              }
            ><FaTimes /></div>

            <Form on-submit={this.onSubmit} />
          </div>
        </Modal>

      </>
    );
  }
}
