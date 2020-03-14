import React from 'react'
import './sign-in.style.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { connect } from 'react-redux'

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.action'

class SignIn extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email:"",
            password:""
        }
    }

    handleSubmit = async e =>{
        e.preventDefault()
        const { emailSignInStart } = this.props
        const {email,password} = this.state
        emailSignInStart(email, password)
    
    }

    handleChange = e =>{
        const {value, name} = e.target
        this.setState({[name]:value})
    }

    render(){
        const { googleSignInStart } = this.props
        return(
            <div className='sign-in'>
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput
                        label="email" 
                        type="email"
                        name="email" 
                        value={this.state.email}
                        onChange={this.handleChange} 
                        required/>
            
                    <FormInput
                        label="password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange} 
                        required/>

                    <div className='buttons'>
                        <CustomButton type="submit" value="Submit">SIGN IN</CustomButton>
                        <CustomButton type='button' onClick={googleSignInStart} isGoogleSignIn>{' '}Sign in with Google{' '}</CustomButton>
                    </div>
                    
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email,password) => dispatch(emailSignInStart({email, password}))

})
export default connect(null, mapDispatchToProps)(SignIn) 