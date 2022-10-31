import {
  arrayUnion,
  doc,
  onSnapshot,
  Timestamp,
  updateDoc
} from 'firebase/firestore'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Message from '../components/Message'
import { auth, db } from '../utils/firebase'

export default function Details() {
  const router = useRouter()
  const routeData = router.query
  const [message, setMessage] = useState('')
  const [allMessages, setAllMessages] = useState([])

  const submitMessageHandler = async () => {
    if (!auth.currentUser) return router.push('/auth/login')
    if (!message.length) {
      toast.error('Your message field is empty :(', {
        position: 'top-center',
        autoClose: 1500
      })
      return
    }
    const docRef = doc(db, 'posts', routeData.id)
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now()
      })
    })
    setMessage('')
  }

  const getComments = async () => {
    const docRef = doc(db, 'posts', routeData.id)
    const unsubscribe = onSnapshot(docRef, snapshot =>
      setAllMessages(snapshot.data()?.comments)
    )
    return unsubscribe
  }

  useEffect(() => {
    if (!router.isReady) return
    getComments()
  }, [router.isReady])

  return (
    <div>
      <Message {...routeData} />
      <div className='my-4'>
        <div className='flex gap-x-2'>
          <input
            onChange={e => setMessage(e.target.value)}
            type='text'
            value={message}
            placeholder='Send a message'
            className='bg-gray-800 w-full p-2 text-white text-sm rounded-lg'
          />
          <button
            onClick={submitMessageHandler}
            className='bg-cyan-500 text-sm text-white py-2 px-4 rounded-lg'
          >
            Submit
          </button>
        </div>
        <div className='py-6'>
          <h2 className='font-bold'>Comments</h2>
          {allMessages?.map(message => (
            <div
              key={message.time}
              className='bg-white p-4 my-4 border-2 rounded-lg shadow-lg '
            >
              <div className='flex items-center gap-x-3 mb-4'>
                <Image
                  className='rounded-full'
                  src={message.avatar}
                  alt={message.username}
                  width={40}
                  height={40}
                />
                <h2 className='font-medium'>{message?.username}</h2>
              </div>
              <div className='flex items-center justify-between'>
                <h2>{message.message}</h2>
                <span className='text-xs text-slate-500'>{`${message.time
                  .toDate()
                  .toDateString()} ${message.time
                  .toDate()
                  .toLocaleTimeString()}`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
