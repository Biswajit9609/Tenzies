function Die(props) {
  const styles ={
    backgroundColor : props.isHeld ? "#59E391" : null

  }
  return (
    <button onClick={props.toggleIsHeld} className='dice font-bold' style={styles}>{props.value}</button>
  )
}

export default Die