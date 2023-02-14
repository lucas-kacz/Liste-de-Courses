import React from "react";


export const View = ({shoppingList, deleteItem}) => {

    return shoppingList.map((shopping, index)=>(
        <tr key={index}>
            <td>{shopping.produit}</td>
            <td>{shopping.qte}</td>
            <td className="delete">
                <button onClick={()=>deleteItem(shopping.produit)}>Delete</button>
            </td>
        </tr>
    ))
}