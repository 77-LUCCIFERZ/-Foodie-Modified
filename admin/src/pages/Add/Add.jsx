import React, {  useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
const Add = () => {

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
// useEffect(()=>{
// console.log(data);
// },[data]) // to check if its working or not

  return (
    <div className='add'>
      <form className='flex-col'>
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
