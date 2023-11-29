'use client'
import { useGetManagers, useManager, useStaff } from '@/hooks';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import Router from 'next/router';
import React, { useMemo, useState } from 'react';

export default function Page() {
  const router = useRouter()
  const [staffId, setStaffId] = useState('');
  const {factor} = use2Factor()
  const handleStaffIdChange = (e: any) => {
    setStaffId(e.target.value);
  };

  const handle2Factor = (e: any) => {
    e.preventDefault();
    // Add your logic to handle the form submission with the staff ID
    console.log('Submitted Staff ID:', staffId);
    if(factor(staffId)) 
      localStorage.setItem('is2factor', JSON.stringify({
        staffId,
        is2Factor: true
      }))
      router.push('/')
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee ID Form</h1>

      <form onSubmit={handle2Factor}>
        <div className="mb-4">
          <label htmlFor="staffId" className="block text-sm font-medium text-gray-600">
            Employee ID
          </label>
          <input
            type="text"
            id="staffId"
            name="staffId"
            value={staffId}
            onChange={handleStaffIdChange}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Enter Staff ID"
          />
        </div>

        <div>
          <Button
          onClick={handle2Factor}
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};


export function use2Factor() {
  const {managers} = useGetManagers()
  const {staffs} = useStaff()

  const optStaff = useMemo(() => {
    if(!staffs) return []

    return staffs.docs.map((doc) => {
      const data = doc.data()
      return {...data}
    })
  }, [staffs])

  const optManager = useMemo(() => {
    if(!managers) return []

    return managers.docs.map((doc) => {
      const data = doc.data()
      return {...data}
    })
  }, [managers])

  return {
    factor: (id: string) => {
      const foundStaff = optStaff.find((staff) => staff.managerID === id)
      if(foundStaff) return foundStaff

      const foundManger = optManager.find((staff) => staff.managerID === id)
      if(foundManger) return foundManger
    }
  }
}
