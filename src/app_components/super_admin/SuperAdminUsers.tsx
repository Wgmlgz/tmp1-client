import { Alert, Checkbox, Table } from 'antd'
import { ColumnsType } from 'antd/lib/table'
import axios from 'axios'
import React, { FC, useEffect, useState } from 'react'
import { superAdminGetUsers, superAdminUpdateUser } from '../../api/api'

export interface IUser {
  _id: string
  email: string
  admin: boolean
  super_admin: boolean
}

const SuperAdminUsers: FC = () => {
  const [err_msg, setErrMsg] = useState('')
  const [done_msg, setDoneMsg] = useState('')
  const [users, setUsers] = useState<IUser[]>([])

  const setup = async () => {
    try {
      const res = await superAdminGetUsers()
      setUsers(res.data)
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data)
      }
    }
  }
  useEffect(() => {
    setup()
  }, [])

  const columns: ColumnsType<IUser> = [
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'admin',
      dataIndex: 'admin',
      key: 'admin',
      render: (text, record, index) => (
        <div>
          <Checkbox
            checked={record.admin}
            onChange={async e => {
              try {
                const new_admin = e.target.checked
                await superAdminUpdateUser(record._id, new_admin)
                const new_users = [...users]
                new_users[index].admin = new_admin
                setUsers(new_users)
                setDoneMsg('Saved')
                setTimeout(() => {
                  setDoneMsg('')
                }, 2000)
              } catch (err) {
                if (axios.isAxiosError(err)) {
                  setErrMsg(err.response?.data)
                }
              }
            }}
          />
        </div>
      ),
    },
    {
      title: 'super_admin',
      dataIndex: 'super_admin',
      key: 'super_admin',
      render: (text, record, index) => (
        <div>
          <Checkbox checked={record.super_admin} disabled={true} />
        </div>
      ),
    },
  ]
  console.log(users)

  return (
    <div style={{ display: 'grid', width: 'fit-content', gap: '20px' }}>
      <div style={{height: '50px'}}>

      {err_msg && (
        <Alert type='error' message={err_msg}>
          aboba
        </Alert>
      )}
      {done_msg && (
        <Alert type='success' message={done_msg}>
          aboba
        </Alert>
      )}
      </div>
      <Table dataSource={users} columns={columns} />
    </div>
  )
}

export default SuperAdminUsers
