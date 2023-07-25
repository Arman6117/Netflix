'use client'
import React from 'react'
import Modal from '../Modal'
import { useStore } from '@/src/store'


const ModalWrapper = () => {
    const showModal = useStore((state)=>state.modal)
    return (
    <>
    {showModal &&  <Modal/>}
       
    </>
  )
}

export default ModalWrapper