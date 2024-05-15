import React from 'react'
import EntityForm from './EntityForm'
import EntityList from './EntityList'


const Home = () => {
  return (
    <div>
      <h1 >Entity Management</h1>
      <EntityForm />
      <EntityList />
    </div>
  )
}

export default Home
