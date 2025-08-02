import React, { useEffect ,useState} from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
// import useGetSingleJob from '@/hooks/useGetSingleJob'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { toast } from 'sonner'


const JobDescription = () => {
    // const isApplied = true;
    const params = useParams();
    const jobId = params.id;
    const {singleJob}=useSelector(store=>store.job)
    const {user}=useSelector(store=>store.auth)
    const dispatch = useDispatch()
    const isInitiallyApplied=singleJob?.applications?.some(application=>application.applicant===user?._id)||false
    const [isApplied,setIsApplied]=useState(isInitiallyApplied)



    const applyJobHandler=async()=>{
        try {
            const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true})
            console.log(res.data)
            if(res.data.success){
                toast.success(res.data.message)
                setIsApplied(true)
                const updateSingleJob={...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updateSingleJob))
            
            }
        } catch (error) {
            console.log(error)
            toast.success(error.response.data.message)
        }
    }
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                // console.log(jobId)
                const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, {withCredentials: true })
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job))
                    setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id))
                }

            } catch (error) {
                console.log(error)

            }
        }
        fetchSingleJob();
    },[jobId,dispatch,user?._id])

    return (
        <div className='max-w-7xl mx-auto my-10'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                    <div className='flex items-center gap-2 mt-4'>
                        <Badge className={"text-blue-700 font-bold"} variant="ghost">{singleJob?.position}position</Badge>
                        <Badge className={"text-[#F83002] font-bold"} variant="ghost">{singleJob?.jobType}</Badge>
                        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">{singleJob?.salary}salary</Badge>
                    </div>
                </div>
                <Button onClick={isApplied?null:applyJobHandler} disabled={isApplied} className={`rounded-lg ${isApplied ? `bg-gray-600 text-white cursor-not-allowes` : 'bg-[#7209b7] hover:bg-[#5f32ad] text-white'}`}>{isApplied ? "Already applied" : "Apply now"} </Button>

            </div>
            <h1 className='border-b-2 border-b-gray-300 font-medium my-4'>Job Description</h1>
            <div className='my-4'>
                <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-gray-800'>{singleJob?.location}</span></h1>
                <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-gray-800'>{singleJob?.description}
                </span></h1>
                <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-gray-800'>{singleJob?.experienceLevel}</span></h1>
                <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-gray-800'>{singleJob?.salary}</span></h1>
                <h1 className='font-bold my-1'>Total Application:<span className='pl-4 font-normal text-gray-800'>{singleJob?.application?.length}</span></h1>
                <h1 className='font-bold my-1'>Posted Date:<span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>


            </div>
        </div>
    )
}

export default JobDescription
