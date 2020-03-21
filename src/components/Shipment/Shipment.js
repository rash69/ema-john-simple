import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'; 
import { useAuth } from '../Login/useAuth';
const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { console.log(data) }
    const auth = useAuth();

  //console.log(watch('example')) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
    {/* register your input into the hook by invoking the "register" function */}
      {/* <input name="example" defaultValue="test" ref={register} /> */}
      
      {/* include validation with required or other standard HTML validation rules */}
      <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Your Name"/>
      {/* errors will return when field validation fails  */}
      {errors.name && <span className="error">Name is required</span>}

      <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your Email"/>
      {errors.email && <span className="error">Email is required</span>}

      <input name="addressLine1" ref={register({ required: true })} placeholder="Address Line 1"/>
      {errors.addressLine1 && <span className="error">Address is required</span>}

      <input name="addressLine2" ref={register({ required: true })}placeholder="Address Line 2"/>

      <input name="city" ref={register({ required: true })} placeholder="City"/>
      {errors.city && <span className="error">City is required</span>}

      <input name="country" ref={register({ required: true })} placeholder="Country"/>
      {errors.country && <span className="error">Country is required</span>}

      <input name="zipcode" ref={register({ required: true })}  placeholder="Zip Code"/>
      {errors.zipcode && <span className="error">Zip Code is required</span>}

      <input type="submit" />
    </form>
  )
};

export default Shipment; 