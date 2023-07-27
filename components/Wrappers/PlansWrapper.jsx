import useAuth from '@/hooks/useAuth';
import React from 'react'

const PlansWrapper = () => {
  const subsState = useStore((state)=>state.subscription)
 const {user} = useAuth()
    const subscription = subsState;
    console.log(subscription)
  
    if(subscription === null) return null;
    
    if(!subscription) return (
      <Plans/>
    )
}

export default PlansWrapper