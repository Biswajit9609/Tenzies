function Die(props) {
  const styles ={
    backgroundColor : props.isHeld ? "#59E391" : null

  }
  return (
    <button 
        onClick={props.toggleIsHeld} 
        className='dice font-bold md:h-17 md:w-17 text-lg h-11 w-11 md:text-2xl' 
        style={styles}
    >
      {props.value}
    </button>
  )
}

export default Die