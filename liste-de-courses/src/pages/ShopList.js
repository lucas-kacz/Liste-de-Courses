import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuid } from 'uuid';

import { View } from "./Components/View";

//getting objects in local storage
const getDataFromLocalStorage=()=>{
    const data = localStorage.getItem('shoppingListLocal');
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

    const[apiShoppingList, setApiShoppingList] = useState([]);

    const[myAPIURL, setMyAPIURL] = useState({
        myRegister : 'https://lucaskaczmarski.esilv.olfsoftware.fr/Liste_de_Courses/register.php',
        myCourses : 'https://lucaskaczmarski.esilv.olfsoftware.fr/Liste_de_Courses/courses.php',
    });

    const[teacherAPIURL, setTeacherURL] = useState({
        teacherRegister : 'https://esilv.olfsoftware.fr/td5/register',
        teacherCourses : 'https://esilv.olfsoftware.fr/td5/courses',
    });

    const[activeRegister, setActiveRegister] = useState('')
    const[activeCourses, setActiveCourses] = useState('')

    //input fields
    const [produit, setproduit] = useState('');
    const [qte, setqte] = useState('');

    //form submit event
    const handleAddToShoppingList=(e)=>{
        e.preventDefault();
        //creating a shopping object
        // const uniqueId = uuid()        

        let shopping={
            produit,
            qte,
        }

        // if (produit && qte) {
        //     let exists = false;
        //     let updatedList = shoppingList.map(item => {
        //         if (item.produit === produit) {
        //             exists = true;
        //             return {
        //                 produit: produit,
        //                 qte: parseInt(item.qte) + parseInt(qte)
        //             };
        //         }
        //         return item;
        //     });
        //     console.log(updatedList)

        //     if (!exists) {
        //         updatedList.push({ produit: produit, qte: qte });
        //     }

        //     setShoppingList(updatedList);
        //     setproduit("");
        //     setqte("");
        // }

        setShoppingList([...shoppingList, shopping]);
    }

    //local storage
    useEffect(()=>{
        localStorage.setItem('shoppingListLocal', JSON.stringify(shoppingList));
    },[shoppingList])

    //display online shopping list
    // useEffect(()=>{
    //     if(activeRegister !== ''){
    //         if (JSON.parse(localStorage.getItem('shoppingListApi')) !== apiShoppingList){
    //             getListedeCourses()
    //         }
    //         else{
    //             return 0
    //         }
    //     }
    // }, [])


    function myAPI(){
        setActiveRegister(myAPIURL.myRegister)
        setActiveCourses(myAPIURL.myCourses)
    }

    function teacherAPI(){
        setActiveRegister(teacherAPIURL.teacherRegister)
        setActiveCourses(teacherAPIURL.teacherCourses)
    }

    const refresh = () => {
        fetch(activeRegister)
            .then(res => res.json())
            .then(data => {
                window.localStorage.setItem('clientID', JSON.stringify(data.id));
                window.localStorage.setItem('shoppingListAPI',JSON.stringify(data.courses));
                window.localStorage.setItem('sequence', JSON.stringify(data.sequence));
                
            })

            // .then(function(data)){
            //     let placeholder = document.querySelector("#data-output");

            // }
    }

    const deleteItem=(produit)=>{
        const filteredList=shoppingList.filter((element, index)=>{
            return element.produit !== produit
        })
        setShoppingList(filteredList)
    }
    
    const getListedeCourses = async () => {
        if(activeRegister !== ''){
            fetch(activeRegister)
                .then(res => res.json())
                .then(data => {
                    console.log(data.courses)
                    setApiShoppingList(data.courses.map(({produit, qte}) => {
                        return(
                            <tr>
                                <td>{produit}</td>
                                <td>{qte}</td>
                            </tr>
                        )
                    }))
                })
        }
    }
        

    const sendChanges = async () => {
        const onlineShoppingList = JSON.parse(localStorage.getItem('shoppingListAPI'))
        const localShoppingList = JSON.parse(localStorage.getItem('shoppingListLocal'))

        console.log(onlineShoppingList)
        console.log(localShoppingList)

        for(var i=0; i<onlineShoppingList.length; i++){
            for(var j=0; j<localShoppingList.length; j++){
                if(onlineShoppingList[i].produit === localShoppingList[j].produit){
                    var quantity = 0;
                    for(var k =0; k<localShoppingList.length; k++){
                        if(onlineShoppingList[i].produit === localShoppingList[k].produit){
                            console.log(localShoppingList[k].produit)
                            quantity += parseInt(localShoppingList[k].qte)
                            // console.log(quantity)
                            // localShoppingList.splice(k,1)
                        }
                    }

                    console.log(quantity)
                    console.log(parseInt(onlineShoppingList[i].qte))
                    const change = quantity-parseInt(onlineShoppingList[i].qte)
                    onlineShoppingList[i].qte=change.toString()
                    localShoppingList.splice(j,1)
                }
            }
        }

        if(localShoppingList.length > 0){
            for(var l=0; l<localShoppingList.length; l++)
            {
                console.log(localShoppingList[l])
                onlineShoppingList.push(localShoppingList[l])
            }   
        }
        

        // console.log(typeof(localStorage.getItem('clientID')))
        console.log('id='+localStorage.getItem('clientID').replaceAll('"','')+'&chg='+JSON.stringify(localShoppingList))

        fetch(activeCourses ,{
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: 'id='+localStorage.getItem('clientID').replaceAll('"','')+'&chg='+JSON.stringify(onlineShoppingList)
        }).then((reponse) => {
            // console.log(reponse);
            if (reponse.ok) {
                reponse.text().then((json) => {
                    console.log(json);
                })
            }
        });
    }


    return (
        <div className="background">

            <div className="main">
                <div className="scroll">
                    <h1>Shopping List App</h1>
                    
                    <button onClick={myAPI}>My Api</button>                    
                    <button onClick={teacherAPI}>Teacher Api</button>
                    <br/>


                    <div className="shopping-form">
                        <form onSubmit={handleAddToShoppingList}>
                            <div className="split2">
                                <div className="split">
                                    <label>Produit</label><br/>
                                    <input type="text" required onChange={(e)=>setproduit(e.target.value)} value={produit}></input>
                                </div>
                                <div className="split">
                                    <label>Quantité</label><br/>
                                    <input type="number" required onChange={(e)=>setqte(e.target.value)} value={qte}></input>
                                </div>
                            </div>
                            
                            <button type="submit">Add to Shopping List</button>
                        </form>
                    </div>

                    <div className="list-table">
                        <h3>Local ShoppingList</h3>
                        {shoppingList.length > 0 &&
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Produit</th>
                                            <th>Quantité</th>
                                            <th>Supprimer</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <View shoppingList={shoppingList} deleteItem={deleteItem}/>
                                    </tbody>
                                </table>

                            </div> 
                        }
                        {shoppingList.length < 1 && <div>No produits in shopping list</div>}


                    </div>

                    <div className="list-table">
                        <h3>Online Shopping List</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Produit</th>
                                    <th>Quantité</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apiShoppingList}
                            </tbody>
                        </table>    
                    </div>


                    <div>
                        <button onClick={refresh}>Refresh</button>
                        <button onClick={sendChanges}>Update</button>
                        <button onClick={getListedeCourses}>Récupérer Liste</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShoppingList;