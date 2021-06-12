import React from 'react';
import { Form,  Card, Button, Alert} from 'react-bootstrap'
import {useRef, useState} from 'react';
import {  useAuth } from '../context/AuthContext'

export default function Signup() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Password didnt match')
        }
        try{
            setError('')
            setLoading(true)
            signup(emailRef.current.value, passwordRef.current.value);
        }catch {
            setError("Failed to create an account");
            
        }
        setLoading(false)
    }

    return (
        <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
                {currentUser && currentUser.email}
                {error && <Alert variant="Danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email" >
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm" >
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password-confirm" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <br></br>
                    <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an Account? Log In
        </div>
            
        </>
    )
    
}
