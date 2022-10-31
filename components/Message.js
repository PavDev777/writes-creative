import Image from 'next/image'

export default function Message({
  children,
  avatar,
  username,
  description,
  timestamp
}) {
  const dateInMillis =
    typeof timestamp === 'object'
      ? Number(timestamp?.seconds) * 1000
      : Number(timestamp) * 1000
  const date =
    new Date(dateInMillis).toDateString() +
    ' at ' +
    new Date(dateInMillis).toLocaleTimeString('en-US')
  return (
    <div className='bg-white p-5 border-b-2 rounded-lg'>
      <div className='flex items-center gap-3 '>
        {avatar && username && (
          <Image
            src={avatar}
            alt={username}
            width={40}
            height={40}
            className='rounded-full'
          />
        )}
        <h2>{username}</h2>
      </div>
      <div className='py-4 flex items-center justify-between'>
        <p>{description}</p>
        <span className='text-xs text-slate-500'>{date}</span>
      </div>
      {children}
    </div>
  )
}
