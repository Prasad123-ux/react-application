import {createSlice} from '@reduxjs/toolkit' 



const initialState={
    jobs:[],
    filteredJobs:[],
    jobSeekers:[],
    companies:[] ,
    companiesJobs:[],
    token:"",
    score:0
};


const jobSlice=createSlice({
    name:"jobs",
    initialState,
      reducers:{
        setAllJobs:(state, action)=>{

            state.jobs= action.payload;
            state.filteredJobs= action.payload
        },
        setFilteredJobs:(state, action)=>{
            state.filteredJobs= action.payload
        },
        setJobSeekers:(state, action)=>{
            state.jobSeekers=action.payload
        },
        setAllCompanies:(state,action)=>{
            state.companies= action.payload
        },
        setAllCompaniesJobs:(state,action)=>{
            state.companies= action.payload
        },
        setTokenData:(state,action)=>{
            state.token=action.payload
        },
        setProfileScore:(state, action)=>{
            state.score=action.payload
        }
       
    }
})

export const {setAllJobs, setFilteredJobs, setJobSeekers, setAllCompanies, setAllCompaniesJobs,setTokenData, setProfileScore}=jobSlice.actions;


export default jobSlice.reducer;