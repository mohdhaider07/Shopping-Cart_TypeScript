import { useState } from 'react';
import { useQuery } from 'react-query';

import './App.css';
// MUI
import {LinearProgress,Alert,Grid,Drawer,Badge} from '@mui/material'
import {BsCart4} from 'react-icons/bs'
// components
import Item from './components/Item';
import CartItems from './components/CartItems';
//type
export type CartItemType={
  id:number
  category:string
  description:string
  image:string
  price:number
  title:string
  amount:number
}

const getProducts=async (): Promise<CartItemType[]>=>await (await fetch('https://fakestoreapi.com/products')).json()

function App() {
  const [isCartOpen,setIsCartOpen] =useState(false);
  const [cartItems,setCartItems] = useState([] as CartItemType[]);
  const {data,isLoading,error} = useQuery<CartItemType[]>('products',getProducts);
  console.log(data);


  const calculateTotal=(items:CartItemType[])=>
  items.reduce((ack:number,item)=>ack+item.amount+item.price,0);

  const getTotalItems=(items:CartItemType[])=>(
    items?.length
  );
  const handleAddToCart=(clickedItem:CartItemType)=>{
    setCartItems(prev=>{
      // if item is already in the cart?
      const isItemInCart =prev.find(item=>item.id ===clickedItem.id);
      if(isItemInCart){
        return prev.map(item=>
          item.id ===clickedItem.id
          ?{...item,amount:item.amount+1}
          :item
          )
      }

      return [...prev, {...clickedItem,amount:1}]
    })
  };
  const handleRemoveFromCart=(id:number) =>{

    setCartItems(prev=>prev.reduce((ack,item)=>{
      if(item.id===id){
        if(item.amount===1)return ack;
        return [...ack,{...item,amount:item.amount-1}]
      }else{
        return [...ack,item]
      }
    },[]as CartItemType[]))

  };


  if (isLoading)return <LinearProgress/>
  if (error)return <Alert severity='error'>Somethin went Wrong </Alert>
  return (
    <div className="App flex justify-between flex-col w-full border-2 rounded-lg height-full">
        <Drawer
   className="w-96"
   anchor='right'
   open={isCartOpen}
   onClose={()=>setIsCartOpen(false)}

   >
  <CartItems cartItems={cartItems} totalAmmout={calculateTotal} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
  

   </Drawer>

   <div onClick={()=>setIsCartOpen(true)} className=' cursor-pointer fixed z-50 top-[20px] right-[20px]'>
<Badge badgeContent={getTotalItems(cartItems)} color='secondary' >
<BsCart4 className='text-xl text-slate-800' />
</Badge>
   </div>
     
      <Grid container spacing={3}>
      {
        data?.map((item)=>(
          <Grid item key={item.id} xs={12} sm={4}>
        <Item  item={item} handleAddToCart={handleAddToCart} />
        </Grid>
        )
        )
      }
   
   </Grid>

    </div>
  );
}

export default App;
