"use client"
import { useState } from "react";
import { useDispatch } from "react-redux";

import { userAdded } from "../features/usersSlice/usersSlice";

const AddUser = () => {
    const dispatch = useDispatch();

    const [Name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    
    const onNameChange = (e) => setName(e.target.value)
    const onEmailChange = (e) => setEmail(e.target.value);
    const onPhoneChange = (e) => setPhone(e.target.value);

    const onFormClick = () => {
        if (Name && email) {
          dispatch(userAdded(Name, email, phone));
          setName("");
          setEmail("");
          setPhone("");
        }
      };
    
      const canSave = Boolean(Name) && Boolean(email) && Boolean(phone);

    return(
        <form className="grid grid-rows-6 place-content-center grid-flow-row gap-2  " >
          
            <label className="block text-gray-700 text-sm font-bold mb-2">Name </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={Name} onChange={onNameChange} />
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone </label>
            <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  value={phone} onChange={onPhoneChange} />
            <label  className="block text-gray-700 text-sm font-bold mb-2"> Email </label>
            <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="test" value={email} onChange={onEmailChange} />
            <button onClick={onFormClick} className=" bg-transparent hover:bg-zinc-400 text--600 font-semibold hover:text-white py-2 px-4 border border-zinc-400 hover:border-transparent rounded" id="" type="button" disabled={!canSave}>
             submit
             </button>
        </form>
    )


}

export default AddUser;