import React, { useState } from 'react'

const PostApi = () => {
    const [title,Setname]=useState('')
    const [author,Setauthor]=useState('')

    const handler =()=>{
        console.log({title,author});
        let data={title,author};
        fetch('http://localhost:8000/posts',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((result)=>{
            console.log("result",result);
            window.location.reload();
        })
    }

  return (
    <div>
      <form>
        <input type='text' value={title} onChange={e => Setname(e.target.value)} name='title' />
        <input type='text' value={author} onChange={e => Setauthor(e.target.value)} name='author' />
        <input type='button' onClick={handler} value='Submit Record' />
      </form>
    </div>
  )
}

export default PostApi
