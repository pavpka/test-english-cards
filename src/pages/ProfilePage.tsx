import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setDate, setGender, setName } from "../store/userSlice";

export default function ProfilePage() {
    //const [userName, setUserName] = useState(useAppSelector((state) => state.user).name)
    const { name } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(e.currentTarget.username.value.trim()) 
            dispatch(setName({name: e.currentTarget.username.value}));
        if (e.currentTarget.date.value)
            dispatch(setDate({date: e.currentTarget.date.value}));
        if (e.currentTarget.gender)
            dispatch(setGender({gender: e.currentTarget.gender.value}))
            
    }
  
    return (
      <>
      <div>profile {name}</div>
      <form onSubmit={handleSubmit}>
        <input name="username" type="text" defaultValue={name}/>
        <input name="date" type="date"/>
        <div role="radiogroup">
            <label htmlFor="gOpt1">a</label>
            <input type="radio" id="gOpt1" name="gender" value="W"/>
            <label htmlFor="gOpt2">b</label>
            <input type="radio" id="gOpt2" name="gender" value="M"/>
            <label htmlFor="gOpt3">-</label>
            <input type="radio" id="gOpt3" name="gender" value="null" defaultChecked/>
        </div>
        <button type="submit">Save</button>
      </form>
       </>
    )
  }