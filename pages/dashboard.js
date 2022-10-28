import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../utils/firebase'
import Message from '../components/Message'
import { BsTrash2Fill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import Link from 'next/link'

export default function Dashboard() {
  const route = useRouter()
  const [user, loading] = useAuthState(auth)
  const [posts, setPosts] = useState([])

  const getData = async () => {
    if (loading) return
    if (!user) return route.push('/auth/login')
    const collectionRef = collection(db, 'posts')
    const q = query(collectionRef, where('user', '==', user.uid))
    const unsubscribe = onSnapshot(q, snapshot => {
      setPosts(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
    })
    return unsubscribe
  }

  const deletePost = async id => {
    const docRef = doc(db, 'posts', id)
    await deleteDoc(docRef)
  }

  useEffect(() => {
    getData()
  }, [user, loading])

  return (
    <div>
      <h1>Your posts</h1>
      <div className='grid gap-y-3'>
        {posts?.map(post => (
          <Message key={post.id} {...post}>
            {' '}
            <div className='flex gap-4 items-center '>
              <button
                onClick={() => deletePost(post.id)}
                className='text-pink-600 flex items-center gap-2 py-2 text-sm hover:text-pink-900 transition-all'
              >
                <BsTrash2Fill className='text-2xl' /> Delete
              </button>
              <Link href={{ pathname: '/post', query: post }}>
                <button className='text-cyan-500 flex items-center gap-2 py-2 text-sm hover:text-cyan-900 transition-all'>
                  <AiFillEdit /> Edit
                </button>
              </Link>
            </div>{' '}
          </Message>
        ))}
      </div>
      <button
        className='font-medium text-white bg-gray-800 py-2 px-4 rounded-lg mt-6'
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
    </div>
  )
}
