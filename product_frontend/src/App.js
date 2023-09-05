import './App.css';
import { Route, Routes} from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductEdit from "./components/ProductEdit";
import ProductCreate from './components/ProductCreate';

function App() {
    return (
        <>
            <Routes>
              <Route path={"/"} element={<ProductList/>}/>
                <Route path={"/edit/:id"} element={<ProductEdit/>}/>
                <Route path={"/create"} element={<ProductCreate/>}/>
            </Routes>

        </>

    );
}

export default App;
