import React from "react";


export const View = ({shoppingList}) => {
    return shoppingList.map(shopping=>(
        <tr key={shopping.id}>
            <td>{shopping.product}</td>
            <td>{shopping.quantity}</td>
            {/* <td className="delete">
                <button onClick={()=>deleteProduct()}>Delete</button>
            </td> */}
        </tr>
    ))
}