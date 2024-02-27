import './App.css'
import { useState } from 'react';


const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];


function Button({children, onClick}){
  <button className='button' onClick={onClick}>{children}</button>
}

function App() {
  const [friends, setFriends] =useState([initialFriends])
  const [showAddFriend,setShowAddFriend] = useState(false)
  const [selectedFriend, setSelectedFriend] =useState(null)


  function handleState(){
    setShowAddFriend((show)=> !show)
  }

  function handleAddFriend(friend){
    setFriends(friends=>[...friends,friend])
  }


  function handleSelection(friend){
    // setSelectedFriend(friend)
    setSelectedFriend((current)=>
      current?.id === friend.id ? null : friend)
      setShowAddFriend(false)
  }
  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}/>

        {showAddFriend && <FormsFriend onAddFriend={handleAddFriend}/>}

        <Button onClick={handleShowAddFriend} >{showAddFriend ? 'Close' : 'Add Friend'}</Button>
      </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend}/>}
    </div>
  )
}

function FriendList({friends,onSelection,selectedFriend}){

  return(
    <ul>
      {friends.map((friend)=>(
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}/>
      ))}
    </ul>

  )
}

function Friend({friend,onSelection}){
  const isSelected = selectedFriend?.id === friend.id
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name}/>
      <h3>{friend.name}</h3>

      {friend.balance < 0 && (
        <p className='red'>
          You owe {friend.name} {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className='green'>
          {friend.name} owes you {Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p >
          You and {friend.name} are even
        </p>
      )}
      <Button onClick={()=> onSelection(friend)}>{isSelected ? "Close" : "Select"}</Button>
    </li>
  )
}



function FormsFriend({onAddFriend}){
  const [name,setName] = useState("")
  const [image, setImage] = useState("")

  function handleSumbit(e){
    e.preventDefault()

    if(!name || !image) return

    const id = crypto.randomUUID()
    const newFriend = {
      name,
      image: `${image}?=${id}`,
      balance:0,
    }

    onAddFriend(newFriend)
    setName("")
    setImage("")
  }
  return(
    <form
      className="form-add-friend"
      onSubmit={handleSubmit}>
      <label> Friend name</label>
      <input
        type="text"
        value={name}
        onClick={(e)=> setName(e.target.value)}/>
      <label> Image URL</label>
      <input
        type="text"
        value={image}
        onClick={(e)=> setImage(e.target.value)}/>
      <Button>Add</Button>
    </form>
  )
}

function FormSplitBill(){
  return(
    <form className='form-split-bill'>
      <h2>Split a bill with {selectedFriend.name}</h2>
      <label> Bill Value</label>
      <input type="text"/>

      <label> Your expense</label>
      <input type="text"/>

      <label> {selectedFriend.name} expense</label>
      <input type="text" disabled/>

      <label> Who is paying</label>
      <select>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  )
}




export default App
