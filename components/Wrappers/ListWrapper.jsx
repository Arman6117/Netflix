'use client'
import useAuth from '@/hooks/useAuth'
import useList from '@/hooks/useList'
import { useStore } from '@/src/store'
import React from 'react'
import Row from '../Row'

const ListWrapper = () => {
const {user} = useAuth()
const list = useList(user?.reloadUserInfo.email);
const movie = useStore((state)=>state.currentMovie);
  return (
    <> {list.length > 0 && <Row title="My List" movies={list} />} </>
  )
}

export default ListWrapper