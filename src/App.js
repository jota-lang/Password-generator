
import {useState, useRef } from 'react';
import './style.css'
import {BiCopyAlt} from 'react-icons/bi';
import {BsArrowRightShort} from 'react-icons/bs';
import {AiOutlineCopy} from 'react-icons/ai'

function App() 
{
  //hooks
  const [inputValue, setInputValue] = useState('');
  useRef(inputValue);
  const [Length, setLength] = useState(0);
  const [password, setPassword] = useState('P4$5W0rD');
  const [icon, setIcon] = useState(<BiCopyAlt/>);

  //functions
  const handleInput = (event) => {
    const { value, checked } = event.target;
    setInputValue((prevState) =>
      checked ? [...prevState, value] : prevState.filter((v) => v !== value)
    );
  }
  const handleInputRange = (event) => {
    setLength(parseInt(event.target.value));
  }
  const createPassword = () =>{
    let newPassword = '';
    const symbols = '!@#$%*?';
    const length = parseInt(Length);
    const includeUppercase = inputValue.includes('uppercase');
    const includeLowercase = inputValue.includes('lowercase');
    const includeNumber = inputValue.includes('number');
    const includeSymbol = inputValue.includes('symbols');
    
    for (let i = 0; i < length; i++) {
      let newChar = '';
     
      if (includeUppercase && includeLowercase && includeNumber && includeSymbol) {
        // se ambas as opções estiverem marcadas, escolher aleatoriamente entre maiúsculas e minúsculas
        newChar = Math.random() < 0.5 ? String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65) : String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
      } else if (includeUppercase) {
        // se somente a opção "Include Uppercase Letters" estiver marcada, escolher uma letra maiúscula aleatória
        newChar = String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
      } else if (includeLowercase) {
        // se somente a opção "Include Lowercase Letters" estiver marcada, escolher uma letra minúscula aleatória
        newChar = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
      }else if(includeNumber){
        //exibir somente numeros
        newChar = Math.floor(Math.random() * Length);
      }else if(includeSymbol){
        //exibir somente simbolos
        newChar = symbols.charAt(Math.floor(Math.random() * symbols.length));
      }else{
        newChar = '';
      }
        newPassword += newChar;
    }
      setPassword(newPassword);
      setIcon(<BiCopyAlt/>);
      console.log(newPassword);//teste de exibição
    }
  const copy = () =>{
    const newImg = <AiOutlineCopy/> 
      navigator.clipboard.writeText(password)
      .then(() => {     
        setIcon(newImg);
      })
      .catch((error) => {
        console.error('Failed to copy password: ', error)
      })
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
          <input type='checkbox' id='op1' value='uppercase' onClick={handleInput}></input>
        </div>
        <div className='check'> 
          <label for="op2">Include Lowercase Letters</label>
          <input type='checkbox' id='op2' value='lowercase'onClick={handleInput} ></input>
        </div>
        <div className='check'> 
          <label for="op3">Include Numbers</label>
          <input type='checkbox' id='op3' value='number'onClick={handleInput}></input>
        </div>
        <div className='check'> 
          <label for="op4">Include Symbols</label>
          <input type='checkbox' id='op4' value='symbols'onClick={handleInput}></input>
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
