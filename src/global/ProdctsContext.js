import React, { createContext } from "react";
import { db } from "../config/Config";
import { collection, onSnapshot } from "firebase/firestore";

export const ProductsContext = createContext();

export class ProductsContextProvider extends React.Component {
    state = {
        products: []
    }

    componentDidMount() {
        const productsCollection = collection(db, 'Products');
        this.unsubscribe = onSnapshot(productsCollection, snapshot => {
            const newProducts = [];
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added') {
                    newProducts.push({
                        ProductID: change.doc.id,
                        ProductName: change.doc.data().ProductName,
                        ProductPrice: change.doc.data().ProductPrice,
                        ProductImg: change.doc.data().ProductImg
                    });
                }
            });

            this.setState({
                products: [...this.state.products, ...newProducts]
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        return (
            <ProductsContext.Provider value={{ products: this.state.products }}>
                {this.props.children}
            </ProductsContext.Provider>
        );
    }
}
