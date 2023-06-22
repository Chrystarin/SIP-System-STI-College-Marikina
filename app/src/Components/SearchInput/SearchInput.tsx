import React,{useState,useEffect} from 'react'
import './SearchInput.scss';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import axios from './../../Utils/Axios';
import SearchSuggestion from './SearchSuggestion';
import { getAccordionDetailsUtilityClass } from '@mui/material';

  function SearchInput() {
    const [students, setStudents] = useState<any>();
    const [studentsFiltered, setStudentsFiltered] = useState<any>();

    const [employeesFiltered, setEmployeesFiltered] = useState<any>();
    const [employees, setEmployees] = useState<any>();


    const crawler = (data: object, parent?: string): object => {
      
      return Object.entries(data).reduce((result: object, [key, value]) => {
        if (value instanceof Array) {
          return result;
        }
        key = parent ? `${parent}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
          return {
            ...result,
            ...crawler(value, key),
          };
        }
        return { ...result, [key]: value };
      }, {});
    };

    const fetchStudents = async () => {
        try{
            await axios
            .get(`/students`)
            .then((response: any) => {
                setStudents(response.data.map((data:any)=>crawler(data)))
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    }
    const fetchUsers = async () => {
        try{
            await axios
            .get(`/users`)
            .then((response) => {
                setEmployees(response.data.map((data:any)=>crawler(data)));
            });
        }
        catch (error: any){
            console.log(error);
            alert(error.response.data.message);
        }
    }
    



    const [search,setSearch] = useState({
      value:"",
      focus:false,
    })

    useEffect(() => {
        fetchStudents();
        fetchUsers();
        setStudentsFiltered(searchData(students,["studentId","name.first","name.last"]));
        setEmployeesFiltered(searchData(employees,["employeeId","name.first","name.last"]));
        
      // console.log(searchData(teachers,["employeeId","name.first","name.last","role"]));

    }, [ search.value]);

    const searchData = (data:any, keys:any) => {
        return data?.filter((item:any)=>keys.some((key:any)=>item[key]?.toString().toLowerCase().includes(search.value.toLowerCase())))
    }


    if (!students) return <div>Loading...</div>


    return (
        <div className='SearchInput'>
        <div className='SearchInput__Container'>
            <IconButton aria-label="delete" disabled>
            <SearchIcon />
            </IconButton>
            <input 
            type="text" 
            value={search.value} 
            onChange={(e)=> {
                setSearch(search => ({...search,value: e.target.value}));
            }}
            onFocus={()=>setSearch(search => ({...search,focus: !search.focus}))} 
            onBlur={()=>setSearch(search => ({...search,focus: !search.focus}))} 
            />
            <div>
            <IconButton aria-label="delete" onClick={()=> setSearch(search => ({...search,value:""}))}>
                <CloseIcon />
            </IconButton>
            </div>
        </div>
        {SearchSuggestion ? <>
            {(search.focus && search.value!== "")|| search.value!==""?<>
                <SearchSuggestion EmployeesData={employeesFiltered} StudentData={studentsFiltered} />
            </>:<></>}
        </>:""}
        </div>
    )
    }

export default SearchInput