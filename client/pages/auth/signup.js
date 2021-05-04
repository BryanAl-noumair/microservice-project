import { useState } from 'react'
import { Router } from 'next/router'

import { useRequest } from '../../hooks/use-request'

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => {
      Router.push('/')
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()

    doRequest()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      <div>
        <label>Email Address</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {errors}
      <button>Sign Up</button>
    </form>
  )
}
