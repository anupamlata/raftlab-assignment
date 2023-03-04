import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface IMultiSelect {
  title:string;
  person?: any;
  personList?: any[];
  handleChange: any;
  personName?: any[];
}

function AddMultiSelect(props: IMultiSelect) {
  const { title,person, personList, handleChange, personName } = props;

  return (
    <>
      <FormControl variant="filled" size="medium" sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">{title}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected: any[]) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {personList?.filter((person_: any) => person?.id !== person_?.id).map((person: any) => (
            <MenuItem key={person?.id} value={person?.name}>
              {personName ?
                <Checkbox checked={personName.indexOf(person?.name) > -1} />
                : null}
              <ListItemText primary={person?.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}


export default AddMultiSelect;
