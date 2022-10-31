import { collection, deleteDoc, doc, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../utils/firebase'
import Message from '../components/Message'
import { BsTrash2Fill } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import Link from 'next/link'
import { useCollection } from 'react-firebase-hooks/firestore'
import { MutatingDots } from 'react-loader-spinner'

export default function Dashboard() {
  const route = useRouter()
  const [user] = useAuthState(auth)
  const collectionRef = collection(db, 'posts')
  const q = query(collectionRef, where('user', '==', user && user.uid))
  const [value, loading] = useCollection(q)

  const deletePost = async id => {
    const docRef = doc(db, 'posts', id)
    await deleteDoc(docRef)
  }

  const checkUser = () => {
    if (!user) return route.push('/auth/login')
  }

  const logOut = async () => {
    await auth.signOut()
    route.push('/auth/login')
  }

  useEffect(() => {
    checkUser()
  }, [user])

  return (
    <div>
      <h1>Your posts</h1>
      <div className='grid gap-y-3'>
        {loading && (
          <MutatingDots
            height='100'
            width='100'
            color='#27bdec'
            secondaryColor='#31a0a6'
            radius='12.5'
            ariaLabel='mutating-dots-loading'
            visible={true}
          />
        )}
        {value?.empty && (
          <div className='text-center text-lg'>You don&apos;t have posts</div>
        )}
        {value?.docs.map(doc => (
          <Message key={doc.id} {...doc.data()}>
            {' '}
            <div className='flex gap-4 items-center '>
              <button
                onClick={() => deletePost(doc.id)}
                className='text-pink-600 flex items-center gap-2 py-2 text-sm hover:text-pink-900 transition-all'
              >
                <BsTrash2Fill className='text-2xl' /> Delete
              </button>
              <Link
                href={{
                  pathname: '/post',
                  query: { description: doc.data().description, id: doc.id }
                }}
              >
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
        onClick={logOut}
      >
        Sign out
      </button>
    </div>
  )
}
