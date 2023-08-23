import React, { useEffect, useState } from 'react'
import PostApi from './PostApi';

const GetApi = () => {
    const [data, GetData] = useState([]) //getting data from api
    const [title, Settitle] = useState('')
    const [author, Setauthor] = useState('')
    const [userid, setuserid] = useState('')

    //remove sideeffects of the api 
    useEffect(() => {
        getusers()
    }, [])

    function getusers() {
        fetch('http://localhost:8000/posts')
            .then((result) => {
                result.json().then((resp) => {
                    console.log(resp);
                    GetData(resp)

                })
            })
            .catch(error => {
                // handle the error
                console.log(error);

            });
    }

    function delet(id) {
        // alert(id)
        fetch(`http://localhost:8000/posts/${id}`, {
            method: 'DELETE'
        }).then((result) => {
            result.json().then((resp) => {
                console.log("Record Deleted Successfully...", resp)
                getusers();
            })
        })
    }

    function edit(id) {
        // console.log(data[id]); //pic the id of the
        // console.log(data[id-1]);
        const user = data[id - 1]; //this use for selection
        Settitle(user.title)
        Setauthor(user.author)
        setuserid(user.id)
    }

    function update() {
        console.log({ title, author, userid })
        const data = { title, author, userid }
        fetch(`http://localhost:8000/posts/${userid}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => {
            res.json().then((result) => {
                console.log("Data Is Updated SuccessFully...", result)
                Settitle('')
                Setauthor('')
                getusers();
            })
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <PostApi />
            <form>
                <input type='text' value={title} onChange={e => Settitle(e.target.value)} name='title' />
                <input type='text' value={author} onChange={e => Setauthor(e.target.value)} name='author' />
                <input type='button' onClick={update} value='Update Record' />
            </form>
            <table style={{ border: '2px solid black' }}>
                <tr>
                    <td>ID.</td>
                    <td>Title.</td>
                    <td>Author Name</td>
                    <td>Actions.</td>

                </tr>
                {
                    data.map((i) => {
                        return (
                            <tr>
                                <td>{i.id}</td>
                                <td>{i.title}</td>
                                <td>{i.author}</td>
                                <td><button onClick={() => edit(i.id)}>Edit</button></td>
                                <td><button onClick={() => delet(i.id)}>Delete</button></td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default GetApi
