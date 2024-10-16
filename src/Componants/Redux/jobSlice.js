import {createSlice} from '@reduxjs/toolkit' 



const initialState={
    jobs:[],
    filteredJobs:[],
    jobSeekers:[],
    companies:[] ,
    companiesJobs:[]
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
        }
       
    }
})

export const {setAllJobs, setFilteredJobs, setJobSeekers, setAllCompanies, setAllCompaniesJobs}=jobSlice.actions;


export default jobSlice.reducer;