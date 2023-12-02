import { useEffect, useState } from "react";
import AxiosPublic from "../../Axios/AxiosBase";
import AlertMessage from "../../hooks/UseAlert";

const ManageUsers = () => {

    const [users, setusers] = useState([])

    useEffect(() => {
        AxiosPublic.get('allusers')
            .then(res => {
                setusers(res.data)
            })


    }, [])

const handledelete=(id)=>{
AxiosPublic.delete(`/deleteuser?id=${id}`)

.then(res=>{           <AlertMessage title={'Delete Successful'}></AlertMessage>
})

}



    return (
        <div className="ml-5">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>

                            <tr key={user._id}>
                             
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.profilepic} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-xl">{user.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-xl">
                                    {user.email}
                                    <br />
                                </td>
                                <th>
                                    <button className="btn btn-danger text-xl" onClick={()=>handledelete(user._id)}>delete</button>
                                </th>
                            </tr>

                        )


                    }

                </tbody>


            </table>



        </div>
    );
};

export default ManageUsers;