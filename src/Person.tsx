import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AddMultiSelect from './AddMultiSelect';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

function Person({ person, personList }: any) {
  const [personName, setPersonName] = useState([]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === 'string' ? value.split(',') : value);
    const toBeStoredFriendName = typeof value === 'string' ? value.split(',') : value;
    localStorage.setItem(person?.name, JSON.stringify(toBeStoredFriendName))
  };

  return (
    <>
      <Stack style={{ border: "1px solid red", marginTop: "10px" }} direction="row" spacing={2}>
        <div style={{ display: "flex", alignItems: "center" }}>

          <Grid container spacing={12}>
            <Grid xs={2}>
              <div style={{ flexDirection: "column", lineHeight: "22px", padding: "6px" }}>
                <Avatar sx={{ bgcolor: 'orange' }}>{person?.name?.slice(0, 2)}</Avatar>
                <label>{person?.name}</label>
              </div>
            </Grid>
            <Grid xs={2}>
              <Avatar style={{ marginTop: "28px" }} sx={{ width: 18, height: 18, bgcolor: '#4caf50' }}>
              </Avatar>
            </Grid>
            <Grid xs={8}>
              <AddMultiSelect
                personName={personName}
                person={person}
                title={'Friends'}
                handleChange={handleChange}
                personList={personList}
              />
            </Grid>
          </Grid>
        </div>
      </Stack>
    </>
  );
}

export default Person;
