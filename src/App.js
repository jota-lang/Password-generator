
import {useState, useRef } from 'react';
import './style.css'
import {BiCopyAlt} from 'react-icons/bi';
import {BsArrowRightShort} from 'react-icons/bs';
import {AiOutlineCopy} from 'react-icons/ai'

function App() 
{
  //hooks
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(inputValue);
  const [Length, setLength] = useState(0);
  const [password, setPassword] = useState('P4$5W0rD');
  const [icon, setIcon] = useState(<BiCopyAlt/>);

  //functions
  const handleInput = (event) => {
    setInputValue(event.target.value);
  }

  const handleInputRange = (event) => {
    setLength(parseInt(event.target.value));
  }

  const createPassword = () =>{
    let newPassword = ''; 
    const regex = /^[a-zA-Z0-9!@#$%*?]*$/;
    const length = parseInt(Length);
    
    for (let i = 0; i < length; i++) {
        newPassword += regex.source.charAt(Math.floor(Math.random() * regex.source.length));
      }
      setPassword(newPassword);
      console.log('newPassword',newPassword);

      if(inputValue ==='uppercase'){
        let upperLetters= newPassword.toUpperCase();
        console.log('teste maiusculo',upperLetters);
      }
      if(inputValue ==='lowercase'){
        let lowerLetters= newPassword.toLowerCase();
        console.log('teste minusculo',lowerLetters);
      }
      if(inputValue ==='number'){
      }
      if(inputValue ==='symbols'){
        console.log('e simbolo');
      }
  }
    const copy = () =>{
      const newImg = <AiOutlineCopy/> 
      setIcon(newImg);
  }
    
  //JSX
  return (
   <div className='container'>
    <h1>Password Generator</h1>
    <div className='contentPassword'>
     <button className='copyIcon' onClick={copy}>
      <div className='icon'>
        {icon}
      </div>
     </button>
      <p className='password'>
      {password}
      </p>
    </div>
    <div className='content'>
      <header>Character Length</header>
      <span className='count'>{Length}</span>
      <input type='range' id='select' min={0} max={10} onChange={handleInputRange}></input>
      <div className='listCheck'>
        <div className='check'> 
          <label for="op1">Include Uppercase Letters</label>
          <input type='checkbox' id='op1' name='op1' value='uppercase' onClick={handleInput}></input>
        </div>
        <div className='check'> 
          <label for="op2">Include Lowercase Letters</label>
          <input type='checkbox' id='op2' name='op2' value='lowercase'onClick={handleInput} ></input>
        </div>
        <div className='check'> 
          <label for="op3">Include Numbers</label>
          <input type='checkbox' id='op3' name='op3' value='number'onClick={handleInput}></input>
        </div>
        <div className='check'> 
          <label for="op4">Include Symbols</label>
          <input type='checkbox' id='op4' name='op4' value='symbols'onClick={handleInput}></input>
        </div>
      </div>
      <div className='strength'>
        <p>STRENGTH</p>
      </div>
        <button className='buttonGenerator' type='button' onClick={createPassword}>
          <BsArrowRightShort className='arrow'/>
          <p>GENERATE</p>
        </button>
    </div>
   </div>
  );
}

export default App;
