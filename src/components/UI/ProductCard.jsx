import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/product-card.css';
import {Col} from "reactstrap";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux";
import { cartAction } from "../../redux/slices/cartSlice";

const ProductCard = ({product}) => {
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(cartAction.addItem({
            id: product.id,
            productName: product.productName,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: product.quantity,
            totalPrice: product.totalPrice
        }));

        toast.success('Product added successfully');
    }

    return (
        <Col lg='3' md='4' className='mb-2'>
            <div className="product__item" >
                <Link to={`/e-market/shop/${product.id}`}>
                    <div className="product__img">
                        <motion.img whileHover={{scale: .9}} src={product.imageUrl} alt={`prod-${product.id}`}/>
                    </div>
                    <div className="p-2 product__info">
                        <h3 className='product__name'>
                            {product.productName}
                        </h3>
                        <span>{product.category}</span>
                    </div>
                </Link>
                <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
                    <span className="price">${product.price}</span>
                    <motion.span whileTap={{scale: 1.2}} onClick={addToCart}><i className="ri-add-line"/></motion.span>
                </div>
            </div>
        </Col>
    );
};

export default ProductCard;