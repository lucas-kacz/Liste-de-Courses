import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

import { View } from "./Components/View";

//getting objects in local storage
const getDataFromLocalStorage=()=>{
    const data = localStorage.getItem('shopping_list1');
    if(data){
        return JSON.parse(data);
    }
    else{
        return []
    }
}

function ShoppingList(){

    //array of shopping list
    const[shoppingList, setShoppingList] = useState(getDataFromLocalStorage());

    const[apiShoppingList, setApiShoppingList] = useState()

    //input fields
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('');

    //form submit event
    const handleAddToShoppingList=(e)=>{
        e.preventDefault();
        //creating a shopping object
        const uniqueId = uuid()        

        let shopping={
            id : uuid(),
            product,
            quantity,
        }
        setShoppingList([...shoppingList, shopping]);
        console.log(uuid())
    }

    //local storage
    useEffect(()=>{
        localStorage.setItem('shopping_list1', JSON.stringify(shoppingList));
    },[shoppingList])

    const refresh = () => {
        fetch("https://esilv.olfsoftware.fr/td5/register")
            .then(res => res.json())
            .then(data => {
                window.localStorage.setItem('clientID', JSON.stringify(data.id));
                window.localStorage.setItem('teachersAPI',JSON.stringify(data.courses));
                window.localStorage.setItem('sequence', JSON.stringify(data.sequence));
                
            });
    }
    
        

    const getTeacherAPI = async () => {

    }

    const post = async () => {

    }

    return (
        <div>
            <h1>Shopping List App</h1>

            <div className="main">
                <div className="shopping-form">
                    <form onSubmit={handleAddToShoppingList}>
                        <label>Product</label>
                        <input type="text" required onChange={(e)=>setProduct(e.target.value)} value={product}></input>
                        <br/>
                        <label>Quantity</label>
                        <input type="number" required onChange={(e)=>setQuantity(e.target.value)} value={quantity}></input>
                        <br/>
                        <button type="submit">Add to Shopping List</button>
                    </form>
                </div>

                <div className="table">
                    {shoppingList.length > 0 &&
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <View shoppingList={shoppingList}/>
                                </tbody>
                            </table>
                        </div> 
                    }
                    {shoppingList.length < 1 && <div>No products in shopping list</div>}
                </div>
                <div>
                    <button onClick={refresh}>Refresh</button>
                    {apiShoppingList}
                </div>
            </div>
        </div>
    )
}

export default ShoppingList;