import React, { useEffect, useState } from "react";
import { app, auth } from "./Firebase";
import { getDatabase, ref, push, onValue, update, remove } from "firebase/database";

function Curd() {
    const database = getDatabase(app);
    const [input, setInput] = useState();
    const [user, setUser] = useState([]);
    const [id, setId] = useState(null);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        userlist();
    }, []);

    const userlist = () => {
        const userRef = ref(database, "user");
        onValue(userRef, (userdata) => {
            const data = userdata.val();
            if (data) {
                const list = Object.keys(data).map((id) => ({ id, ...data[id] }));
                setUser(list)
            } else {
                console.log("data not Found")
            }
        });
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (edit && id) {
            try {
                await update(ref(database, `user/${id}`), input);
                setId(null);
                setInput();
                setEdit(false);
            } catch (e) {
                console.error("Error updating document: ", e);
            }
        } else {
            try {
                await push(ref(database, "user"), input);
                setInput();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            await remove(ref(database, `user/${id}`));
            setUser((prevUser) => prevUser.filter((item) => item.id !== id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const handleEdit = (id) => {
        console.log(id)
        setInput(user.find((item) => item.id === id) || {});
        setId(id);
        setEdit(true);
    };

    return (
        <div>
            <h1 className="text-center">Crud Operation</h1>
            <form onSubmit={handleSubmit} className="m-auto col-3">
                <label htmlFor="name">Name :</label>
                <input type="text" className="form-control mb-3" name="name" placeholder="Enter your name" value={input ? input.name : ""} onChange={handleChange} />
                <label htmlFor="email">Email :</label>
                <input type="email" className="form-control mb-3" name="email" placeholder="Enter your email" value={input ? input.email : ""} onChange={handleChange} />
                <button className="btn btn-success form-control mt-1">{edit ? 'Update' : 'Add'}</button>
            </form>
            <table className="table  mt-3">
                <thead>
                    <tr>
                        <th className="col-3 text-center">Id</th>
                        <th className="col-3 text-center">Name</th>
                        <th className="col-3 text-center">Email</th>
                        <th className="col-3 text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user && user.map((item, index) => (
                        <tr key={item.id} className="col-3 text-center">
                            <td scope="row">{index + 1}</td>
                            <td className="col-3 text-center">{item.name}</td>
                            <td className="col-3 text-center">{item.email}</td>
                            <td>
                                <button className="btn col-3 text-center btn-warning text-white" onClick={() => handleEdit(item.id)}><i class="fa-regular fa-pen-to-square"></i></button>
                                <button className="btn col-3 text-center btn-danger mx-2 text-white" onClick={() => handleDelete(item.id)}><i class="fa-regular fa-trash-can"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Curd;