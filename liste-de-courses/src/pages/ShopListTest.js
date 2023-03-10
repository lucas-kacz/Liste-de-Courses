import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

function ShopList(){

    // const [input, setInput] = useState('');

    const [list, setList] = useState([])
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");


    useEffect(() => {
        let storedList = window.localStorage.getItem('shopping_list');
        // if (storedList.length > 0) setList(JSON.parse(storedList))
        setList(JSON.parse(storedList));
    }, []);

    useEffect(() => {
        setTimeout(() => {
            window.localStorage.setItem('shopping_list', JSON.stringify(list));
        }, 500)
    }, [list])

    const onFormSubmit = (e) => {
        if (product !== "" && quantity !== ""){
            setList([...list, [product, quantity]])
        }
    }
    // const display = () => {
    //     console.log(list)
    // }

    return(
        <div>
            Liste de courses
            <div className="background">
                <div className="liste-de-courses">

                    {/* <label>Nom Produit</label><br/> */}
                    <input type="text" id="product" placeholder="Add a Product" value={product} required="required" onChange={(event) => setProduct(event.target.value)}></input><br/><br/>

                    {/* <label>Quantité</label><br/> */}
                    <input type="number" id="quantity" placeholder="Add Quantity" value={quantity} required="required" onChange={(event) => setQuantity(event.target.value)}></input><br/><br/>

                    <button onClick={onFormSubmit}>Add</button><br/><br/>

                    <table className="list-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((element, index) => (
                                <tr>
                                    <td>{element[0]}</td>
                                    <td>{element[1]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
        
    )
}

export default ShopList;