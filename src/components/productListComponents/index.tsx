import * as React from "react";
import lodash from 'lodash'
import { FaStar } from "react-icons/fa";
import styles from "./product-list-components.module.css";
import { Product as ProductInterface } from "../../model";

interface IPostsProps {
  products: ProductInterface[];
  onFav: (title: string) => void;
}

export default class Posts extends React.Component<IPostsProps, {}> {
  constructor(props: IPostsProps) { super(props) }
  render() {
    const { products, onFav } = this.props;
    let productsarr = []
    for (const [i, p] of products.entries()) {
      productsarr.push(
        <Product key={p.id} index={i} product={p} onFav={onFav} />
      );
    }
    return <div>{lodash.reverse(productsarr)}</div>
  }
}

export const Product: React.FC<{
  index: number;
  product: ProductInterface;
  onFav: (title: string) => void;
}> = ({ product, onFav }) => {
  const { product: productClass, productBody, actionBarItem, actionBarItemLabel } = styles

  return (
    <span className={productClass} style={{ display: 'inline-block', float: 'none', clear: 'both' }}>
      <div className={styles['product-title']} style={{ overflow: 'auto', textOverflow: 'ellipsis' }}>{product.title}</div>

      <p><strong>Rating: {product.rating ? `${product.rating.rate}/5` : ''}</strong></p>

      <p><b>Price: ${+product.price}</b></p>

      <p className={productBody}>
        <span><b data-testid="Description">Description:</b></span>
        <br />
        {product.description}
      </p>

      <span className={styles['action_bar']} style={{ display: 'table', width: "100%" }}>
        <span
          className={`${actionBarItem} ${product.isFavorite ? "active" : ""
            }`}
          role="button"
          onClick={() => {
            onFav(product.title);
          }}
        >
          <FaStar /> <span className={actionBarItemLabel}>{!!(!!(product.isFavorite)) ? 'Remove from favorites' : 'Add to favorites'}</span>
        </span>
      </span>
    </span>
  );
};
