import React from 'react'
import { NavBar } from '../ui/NavBar'
import { Configuration } from './components/Configuration'
import { Table } from './components/Table'

export const AdminScreen = () => {

    return (
        <>
            <NavBar information={'Administrador '} />

            <div className='p-5'>
                <Configuration />
                <Table />
            </div>
        </>
    )
}
