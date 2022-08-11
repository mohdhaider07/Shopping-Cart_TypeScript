import CartItem from './CartItem' 
import { CartItemType } from "../App";
import React from 'react';
//types
type Props={
    cartItems:CartItemType[]
    addToCart:(clickedItem:CartItemType)=>void;
    removeFromCart:(id:number)=>void;
    totalAmmout:(items:CartItemType[])=>number;

};

const CartItems:React.FC<Props>=({cartItems,addToCart,removeFromCart,totalAmmout})=>{

 return(<div className='w-96  p-[1rem]'>
<h2 className='font-bold'>Your Shopping Cart</h2>
{cartItems?.length===0?<p>No Item in Cart</p>:null}
{cartItems.map(item=>(
    <CartItem
    key={item.id}
    item={item}
    addToCart={addToCart}
    removeFromCart={removeFromCart}
    />
))}
<div className="mt-4 text-lg ">Total :<span className='font-bold'>{totalAmmout(cartItems)}</span></div>
 </div>  ) 
}

export default CartItems;