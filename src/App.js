import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import AddProduct from "./components/AddProduct";
import { ProductsContextProvider } from "./global/ProdctsContext";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth, db } from "./config/Config";
import { CartContextProvider } from "./global/CartContext";
import { Cart } from "./components/Cart";
import Cashout  from "./components/Cashout";
import { doc, getDoc } from "firebase/firestore";
import NotFound from "./components/NotFound"

export class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          this.setState({
            user: docSnap.data().Username,
          });
        }
      } else {
        this.setState({
          user: null,
        });
      }
    });
  }

  render() {
    return (
      <ProductsContextProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Home user={this.state.user} />}
              />
              <Route path="/cartproducts/cashoutuser" element={<Cashout  />} />

              <Route path="/addproducts" element={<AddProduct />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/cartproducts"
                element={<Cart user={this.state.user} />}
              />
              <Route path="/signup" element={<SignUp />} />
              <Route element={NotFound} />
            </Routes>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </BrowserRouter>
        </CartContextProvider>
      </ProductsContextProvider>
    );
  }
}

export default App;
