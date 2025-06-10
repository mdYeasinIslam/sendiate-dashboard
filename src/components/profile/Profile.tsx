'use client'
import LoadingSpinner from '@/app/loading';
import { useGetProfileQuery } from '@/redux/services/Apis/profileApi/profileApi';
import { ProfileType } from '@/type/profileType';
import { User } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
type ProfileStatsResponse = {
    meta?: { page: number, limit: number, total: number, totalPage: number };
    data: ProfileType
};
const Profile = () => {
    const { data, error, isLoading } = useGetProfileQuery() as { data?: ProfileStatsResponse, error?: unknown, isLoading: boolean};

    const [profileData,setProfileData] = useState<ProfileType | null>(null)
    useEffect(() => {
        if (data?.data) {
            setProfileData(data?.data)
        }
    },[data])
    console.log(profileData)
    if (isLoading) return <div><LoadingSpinner /></div>
    if (error) return <div>An Error occurred</div>
    console.log(error)

  return (
      <div>
          <figure className=" md:flex items-center  gap-3">
              {
                  profileData?.profileImage ?
                    <Image
                        src={profileData?.profileImage}
                        alt='pravatar'
                        width={500}
                        height={500}
                          className="w-10 h-10 rounded-full" />
                      :
                      <User className='border border-black rounded-full w-7 h-7 p-0.5'/>
              }
                <div className='hidden md:block'>
                  <p className="font-semibold">{profileData?.fullName}</p>
                  <p className="text-sm ">{profileData?.email}</p>
                </div>
            </figure>
    </div>
  )
}

export default Profile