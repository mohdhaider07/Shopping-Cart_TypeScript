import { Button } from "@mui/material";
//Types
import { CartItemType } from "../App";

type Props={
    item:CartItemType;
    handleAddToCart:(clickedItem:CartItemType) => void;
}
const Item:React.FC<Props>=({item,handleAddToCart})=>(
    <div className="flex justify-between flex-col w-full border-2 rounded-3xl height-full">
        <img className="max-h-[250px] object-cover rounded-t-3xl" src={item.image} alt={item.title}/>
        <div className="p-[1rem]">
            <h3 className="font-semibold">{item.title}</h3>
            <p>{item.description}</p>
            <h3 className="font-semibold">Price : ${item.price}</h3>
        </div>
        <Button 
        className="rounded-b-3xl"
        onClick={()=>handleAddToCart(item)}
        >
            Add to cart
        </Button>
    </div>
)

export default Item;