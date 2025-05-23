import React, {  useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const Add = ({url}) => {

  
const [image,setImage]=useState(false);
const [data,setData]=useState({
    name:"",
    description:"",
    price:"",
    category:'salad'
});

const onchangehandler=(event)=>{
    const {name,value}=event.target;
    setData(data=>({...data,[name]:value}))
}

const onSubmitHandler=async(event)=>{
event.preventDefault();
const formData=new FormData();
formData.append("name",data.name)
formData.append("description",data.description)
formData.append("price",Number(data.price))
formData.append("category",data.category)
formData.append("image",image)

const response =await axios.post(`${url}/api/food/add`,formData);
if(response.data.success){
setData({
    name:"",
    description:"",
    price:"",
    category:'salad'
})
setImage(false)
toast.success(response.data.message)
}else{
    console.log(response.data.message)
    toast.error(response.data.message)
}
}
// useEffect(()=>{
// console.log(data);
// },[data]) // to check if its working or not

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
<div className="add-img-upload flex-col">
    <p>Upload Image</p>
    <label htmlFor="image">
        <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
    </label>
    <input  type="file" onChange={(e)=>setImage(e.target.files[0])} id="image" hidden required />
</div>
<div className="add-product-name flex-col">
<p>Product name</p>
<input onChange={onchangehandler} value={data.name} type="text" name='name' placeholder='Type here' />


</div>
<div className="add-product-description flex-col">
    <p>Product description </p>
    <textarea onChange={onchangehandler} value={data.description} name="description" rows="6" placeholder='write content here'>

    </textarea>
</div>

<div className="add-category-price">
    <div className="add-category flrx-col">
        <p>Product category</p>
        <select  onChange={onchangehandler} name="category" >
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts  </option>
            <option value="Sandwich">Sandwich  </option>
            <option value="Cake">Cake  </option>
            <option value="Pure Veg"> Pure Veg </option>
            <option value="Pasta"> Pasta </option>
            <option value="Noodles"> Noodles </option>
            <option value="Non-veg"> Non-veg </option>
        </select>
    </div>
    <div className="add-price flex-col">
        <p>Product Price</p>
        <input onChange={onchangehandler} value={data.price} type="number" name="price" placeholder='$20' />
    </div>
</div>
<button type='submit' className='add-btn'>ADD</button>

      </form>
    </div>
  )
}

export default Add
