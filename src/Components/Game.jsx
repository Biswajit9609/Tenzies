import {React,useState,useEffect,useRef} from 'react'
import Die from './Die'
import ReactConfetti from 'react-confetti'

function Game() {
    const buttonRef = useRef(null)
    let gameWon = false
    const [turn,setTurn] = useState(0)
    const [nums,setNums] = useState(()=>generateAllNewDice())
     if(nums.every(die=>die.isHeld) && nums.every(die=>die.value == nums[0].value)){
        gameWon = true
        console.log(gameWon)
        console.log(`Game won in ${turn} turns`)
     }
    useEffect(()=>{
        if (gameWon){
            buttonRef.current.focus()
        }
    },[gameWon])
    function generateAllNewDice(){
        const arr=[]
        for (let i=0;i<10;i++){
            let num = Math.ceil(Math.random()*6)
            arr.push({"id":i,"value":num, "isHeld":false})
        }
        return arr
    }

    function rollDice(){
        gameWon ? setNums(generateAllNewDice()) :
        setNums(prev=>prev.map(element=>{
            return (element.isHeld == false) ? {...element,"value":Math.ceil(Math.random()*6)} : element
        }))
        setTurn(prev=>prev+1)
    }

    function toggleIsHeld(id){
        setNums(prev=>(
            prev.map(entry=>{
            return (entry.id === id) ? {...entry,"isHeld":!entry.isHeld} : entry
    })
        ))
    }

    const dices = nums.map(entry=>{
        return (
            <Die value={entry.value} key={entry.id} isHeld={entry.isHeld} toggleIsHeld={()=>toggleIsHeld(entry.id)} />
        )
    })
  return (
    <div className='bg-gray-300 h-[100%] max-h-[30rem] w-[100%] rounded-lg flex justify-evenly items-center flex-col'>
        {gameWon && <ReactConfetti />}
        <h1 className='px-10'>{gameWon ? `Congratulations! you won in ${turn} steps.` : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}</h1>
        <div className='dice-conntainer'>
            {dices}
        </div>
        <button ref={buttonRef} onClick={rollDice} className='w-[8rem] h-[3rem] bg-blue-600 text-white rounded-lg text-[1.3rem]'>{gameWon ? "New Game":"Roll Dice"}</button>
    </div>
  )
}

export default Game