import { Route, Switch } from "react-router"
import CartComponent from "../shop/CartComponent"
import StoreComponent from "../shop/StoreComponent"

const Routes = () => {
    return(
        <Switch>
            <Route exact path="/" component={StoreComponent} />
            <Route exact path="/store" component={StoreComponent} />
            <Route exact path="/cart" component={CartComponent} />
        </Switch>
    )
}

export default Routes