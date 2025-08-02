import React, { useState } from 'react'
import { Button } from './ui/button'
import {Search} from "lucide-react"
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'


const HeroSection = () => {
    const [query,setQuery]=useState("")
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const searchJobHandler=()=>{
        dispatch(setSearchedQuery(query))
        console.log(query)
        navigate("/browse")

    }
    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className=' mx-auto px-4 py-2 rounded-full bg-gray-100 font-medium text-[#F83002]'>No 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search,Apply &<br></br> Get Your  <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Possimus doloribus praesentium modi facilis veritatis debitis quis, atque optio officiis? Beatae at dolores qui officiis ea tempore dignissimos quisquam iusto dolorem!</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
                    <input
                        type="text"
                        placeholder='Find your Dream jobs'
                        className='outline-none border-none w-full'
                        onChange={(e)=>setQuery(e.target.value)}
                        

                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className='h-5 w-5'/>

                    </Button>
                </div>
            </div>

        </div>
    )
}

export default HeroSection
