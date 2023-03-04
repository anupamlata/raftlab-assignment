import { useState } from 'react';
import Button from '@mui/material/Button';
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Person from './Person';
import { calculateDegreeOfSeparation, getUniqueName } from './utils';
import AddMultiSelect from './AddMultiSelect';
import { Container } from '@mui/material';

function App() {
  const [personList, setPersonList] = useState<any[]>([]);
  const [personFriendList, setPersonFriendList] = useState<any[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  const [showCalculateMultiSelect, setShowCalculateMultiSelect] = useState(false);
  const [personName, setPersonName] = useState('');
  const [degreeOfSeparation, setDegreeOfSeparation] = useState('');
  const [calculatePersonName, setCalculatePersonName] = useState([]);

  const onAddPersonClick = () => {
    setShowInput(true)
  }

  const handleCalculateChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const personValue = typeof value === 'string' ? value.split(',') : value;
    setCalculatePersonName(personValue);

    if (personValue.length === 2) {
      setShowCalculateMultiSelect(false);
      const degree: any = calculateDegreeOfSeparation(personFriendList, personValue[0], personValue[1]);
      if(degree) {
        setDegreeOfSeparation(`Degree of Separation between ${personValue[0]} and ${personValue[1]} is ---
        ${degree?.join(' > ')}`);
      } else {
        setDegreeOfSeparation(`No Degree of Separation found between ${personValue[0]} and ${personValue[1]}`);
      }
    }
  };

  const onCalculateClick = () => {
    const friendList: any[] = [];

    for (let p of personList) {
      const lsData = localStorage.getItem(p?.name);
      if (lsData !== null) {
        const friendData = JSON.parse(lsData);
        friendList.push({ name: p?.name, friends: friendData })
      }
    }
    setShowCalculateMultiSelect(true);
    setPersonFriendList(friendList);

  }

  const onSubmit = (event: any) => {
    event.preventDefault();
    if (personName !== '') {
      personList.push({ id: personList.length + 1, name: getUniqueName(personList, personName) })
      setPersonList(personList)
      setShowInput(false);
      setPersonName('');
      setShowSubmit(false);
    }
  }

  const onTextChange = (personName: string) => {
    setPersonName(personName);
    if (personName.length > 0) {
      setShowSubmit(true);
    } else {
      setShowSubmit(false);
    }
  }

  return (
    <>
      <Container style={{background: "rgb(238 229 229)", marginTop: "42px" }} maxWidth="sm">
        {personList.map((person, index) => (
          <Person
            personList={personList}
            key={index}
            person={person}
          />
        ))}

        {showInput ?
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" onChange={(event) => onTextChange(event.target.value)} label="Enter Name" variant="outlined" />
            {
              showSubmit ?
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Button onClick={(event) => onSubmit(event)} variant="outlined">Submit</Button>
              </div>
                : null
            }
          </Box>
          : null
        }

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          {
            personList.length <= 5 ?
              <Button onClick={() => onAddPersonClick()} variant="contained">Add Persons</Button>
              : null
          }
        </div>

        {
          personList.length > 5 ?
            <>
              <div style={{ display: "flex", alignItems: "center", marginTop :"12px",justifyContent: "center" }}>
                {!showCalculateMultiSelect ?
                  <Button onClick={(event) => onCalculateClick()} variant="outlined">Calculate</Button>
                  : null
                }
              </div>

              {
                showCalculateMultiSelect ?
                  <AddMultiSelect
                    title={'CalculateNow'}
                    personName={calculatePersonName}
                    handleChange={handleCalculateChange}
                    personList={personList}
                  />
                  : null
              }
              <p>{degreeOfSeparation}</p>
            </>
            : null
        }
      </Container>
    </>
  );
}

export default App;
