import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../utils/firebase'
import { toast } from 'react-toastify'

export default function Post() {
  const [user, loading] = useAuthState(auth)
  const route = useRouter()
  const [post, setPost] = useState({ description: '' })
  const routeData = route.query

  const submitPostHandler = async e => {
    e.preventDefault()
    if (!post.description)
      return toast.error('Description Field is empty', {
        autoClose: 1500,
        position: 'top-center'
      })

    if (post.description.length > 300)
      return toast.error('The number of characters is more than 300 :(', {
        autoClose: 1500,
        position: 'top-center'
      })

    const collectionRef = collection(db, 'posts')
    await addDoc(collectionRef, {
      ...post,
      user: user.uid,
      avatar: user.photoURL,
      username: user.displayName,
      timestamp: serverTimestamp()
    })
    setPost({ description: '' })
    return route.push('/')
  }

  const checkUser = async () => {
    if (loading) return
    if (!user) return route.push('/auth/login')
  }

  useEffect(() => {
    checkUser()
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id })
    }
  }, [user, loading, routeData])

  return (
    <div className='my-20 p-12 shadow-lg rounded-lg max-w-md mx-auto'>
      <form onSubmit={submitPostHandler}>
        <h1 className='text-2xl font-bold'>Create a new post</h1>
        <div className='py-2'>
          <h3 className='text-lg font-medium py-2'>Description</h3>
          <textarea
            onChange={e => setPost({ ...post, description: e.target.value })}
            value={post.description}
            className='bg-slate-700 h-48 w-full text-white rounded-lg outline-none p-2 text-sm'
          ></textarea>
          <p
            className={`text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? 'text-red-600' : ''
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type='submit'
          className='w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-lg text-sm'
        >
          Send
        </button>
      </form>
    </div>
  )
}
