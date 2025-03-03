import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Users from "./user/Users";
import Signup from "./user/Signup";
import Signin from "./auth/Signin";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from "./core/Menu";
import NewShop from "./shop/NewShop";
import Shops from "./shop/Shops";
import MyShops from "./shop/MyShops";
import Shop from "./shop/Shop";
import EditShop from "./shop/EditShop";
import NewProduct from "./product/NewProduct";
import EditProduct from "./product/EditProduct";
import Product from "./product/Product";
import Cart from "./cart/Cart";
import StripeConnect from "./user/StripeConnect";
import ShopOrders from "./order/ShopOrders";
import Order from "./order/Order";
import MySurveys from "./survey/MySurveys";
import CreateSurvey from "./survey/CreateSurvey";
import FillSurvey from "./survey/FillSurvey";
import SurveyResponses from "./survey/SurveyResponses";
import Survey from "./survey/survey";

const MainRouter = () => {
  return (
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />

        <Route path="/cart" component={Cart} />
        <Route path="/product/:productId" component={Product} />
        <Route path="/shops/:shopId" component={Shop} />

        <Route path="/order/:orderId" component={Order} />
        <PrivateRoute
          path="/seller/orders/:shop/:shopId"
          component={ShopOrders}
        />

        <PrivateRoute path="/survey/:userId" component={MySurveys} />
        <Route path="/fill-survey/:surveyId" component={FillSurvey} />
        <PrivateRoute
          path="/survey-responses/:surveyId"
          component={SurveyResponses}
        />
        <Route path="/public/survey/all" component={Survey} />

        {/* <PrivateRoute
          path="/survey-details/:surveyId"
          component={SurveyDetails}
        /> */}

        <PrivateRoute path="/seller/shop/new" component={NewShop} />
        <PrivateRoute path="/seller/shop/edit/:shopId" component={EditShop} />
        <PrivateRoute
          path="/seller/:shopId/products/new"
          component={NewProduct}
        />
        <PrivateRoute
          path="/seller/:shopId/:productId/edit"
          component={EditProduct}
        />

        <Route path="/create-survey" component={CreateSurvey} />

        <Route path="/seller/stripe/connect" component={StripeConnect} />
      </Switch>
    </div>
  );
};

export default MainRouter;
