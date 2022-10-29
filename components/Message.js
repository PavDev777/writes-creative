import Image from 'next/image'

export default function Message({ children, avatar, username, description }) {
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
      <div className='py-4'>
        <p>{description}</p>
      </div>
      {children}
    </div>
  )
}
