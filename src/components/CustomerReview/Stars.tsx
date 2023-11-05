function Star({ quantity }: { quantity: number }) {
  const stars = Array.from({ length: quantity }, (_, index) => {
    return <p key={index}>⭐</p>
  })
  return <div className='flex'>{stars}</div>
}

export default Star
