import React, { useEffect, useState } from 'react'
const GetApi = () => {
    const [get, Setget] = useState([])
    // use for post method usestate
    const [title, setTitle] = useState('')
    const [author, setauthor] = useState('')

    useEffect(() => {
        Getapi();
    }, [])
    // get api syntax
    function Getapi() {
        fetch('http://localhost:8000/posts')
            .then((res) => {
                res.json().then((result) => {
                    console.log("Result...", result);
                    Setget(result);

                })
            })
            .catch(err => console.log(err))
    }
    //  post api syntaz
    const postdata = () => {
        if(!title && !author){
            alert("fill all the field")
        }else{
        // alert("button is press")
        // console.log({title,author})
        let postdata = { title, author };
        fetch('http://localhost:8000/posts', {
            // method 
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            body: JSON.stringify(postdata)
        }).then((res) => {
            res.json().then((result) => {
                console.log(result)
        Getapi();
            })
        }).catch(err => console.log(err))
        // window.location.reload()
    }
    }
    // const deletRec = (id) =>{
    //     alert(id)
    // }
    return (
        <div>
            <div >
            <div >
            <h1>Post Api Here</h1>
                <form>
                <ul>
                    <li><input type='text' onChange={e => setTitle(e.target.value)} name='title' /> </li>
                    <li><input type='text' onChange={e => setauthor(e.target.value)} name='author' /></li>
                    <li><button onClick={postdata}>Post Data</button></li>

                </ul>
                </form>
            </div>
            <hr></hr>
            <div >
            <h1>Update Api Here</h1>
                {/* <form>
                <ul>
                    <li><input type='text' onChange={e => setTitle(e.target.value)} name='title' /> </li>
                    <li><input type='text' onChange={e => setauthor(e.target.value)} name='author' /></li>
                    <li><button onClick={postdata}>Post Data</button></li>

                </ul>
                </form> */}
            </div>
            </div>
            <hr></hr>

            <h1>Get Api Here</h1>

            {
                get.map((index) => {
                    return (
                        <div style={{ display: 'inline-block',marginLeft:'5px',border:'2px solid red',marginTop:'10px',padding:'5px' }}>
                            <div>{index.title}</div>
                            <div>{index.author}</div>
                            <div><button>Edit</button></div>
                            <div><button >Delete</button></div>
                        </div>
                    
                    )
                })
            }
        </div>
    )

}
export default GetApi