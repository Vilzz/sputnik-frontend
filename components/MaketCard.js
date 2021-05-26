const MaketCard = ({ maket }) => {
  return (
    <div className='card' style={{ width: '16rem' }}>
      <div className='card-body'>
        <div className='card-title'>{maket.name}</div>
        <p className='card-text'>{maket.description}</p>
        <p className='card-text'>{maket.scales.join()}</p>
      </div>
    </div>
  )
}

export default MaketCard
