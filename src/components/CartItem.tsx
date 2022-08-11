import { Button } from "@mui/material";
import React from "react";

import { CartItemType } from "../App";

type Props={
    item:CartItemType
    addToCart:(clickedItem:CartItemType)=>void;
    removeFromCart:(id:number)=>void;

};
const CartItem:React.FC<Props>=({item,addToCart,removeFromCart})=>(
   <div className="flex justify-between mb-2 border-b-2 ">
    <div className="flex flex-col w-full justify-between mr-[1rem]">
        <p className="font-semibold">{item.title}</p>
        <div className="flex justify-between">
            <span className="font-semibold">Price ${item.price}</span>
            <span className="font-semibold">Price ${(item.price*item.amount).toFixed(2)}</span>
        </div>
        <div className="flex mt-4 justify-between items-center">
            <Button onClick={()=>removeFromCart(item.id)}>-</Button>
            <span>{item.amount}</span>
            <Button onClick={()=>addToCart(item)}>+</Button>
        </div>
    </div>
    <div>
<img className="object-cover w-24" src={item.image} alt={item.title} />
    </div>
   </div>
)

export default CartItem;