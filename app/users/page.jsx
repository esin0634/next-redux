"use client"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  selectAllUsers,
  getUsersError,
  getUsersStatus,
  fetchUsers,
  userRemoved,
} from "../features/usersSlice/usersSlice";

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);

  const usersStatus = useSelector(getUsersStatus);
  const error = useSelector(getUsersError);

  useEffect(() => {
    if (usersStatus === "idle") {
      dispatch(fetchUsers());
    }
  }, [usersStatus, dispatch]);

  let content;
  console.log(users);
  if (usersStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (usersStatus === "succeeded") {
    content = (
      <table className="container  mx-auto text-center  space-x-12">
        <thead  >
          <tr>
            <th >Name</th>
            <th >Email</th>
            <th >Phone</th>
            <th >Action</th>
          </tr>
        </thead>
        <tbody className="">
          {users.map((user) => (
            <tr className="  " key={user.id}>
              <td className="">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td className="">
                <button className="bg-transparent hover:bg-zinc-400 text-zinc-600 font-semibold hover:text-white py-2 px-4 border border-zinc-400 hover:border-transparent rounded" onClick={() => handleUserDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (usersStatus === "failed") {
    content = <p>{error}</p>;
  }

  const handleUserDelete = (userId) => {
    dispatch(userRemoved(userId));
  };

  return <div>{content}</div>;
};

export default Users;
