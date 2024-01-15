import Center from "@/components/Center";
import styles from '@/styles/login.module.css'
import Link from "next/link";
import { useState } from "react";
import {signIn} from "next-auth/react"
import axios from "axios";
import { useRouter } from "next/router";

export default function Login(){
    const router = useRouter()
    const [isRegistering, setIsRegistering] = useState(false)
    
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value,
        }));
    };
    
    async function handleRegister(event){
        event.preventDefault()
        try{
            const response = await axios.post('/api/register',formData)
            console.log(response.data)
        }catch(error){
            console.log(error)
        }
    }

    async function handleLogin(event){
        event.preventDefault()
        
        try{ 
        signIn('credentials',{
                username: formData.username,
                password:formData.password,
                redirect:false
            })
            router.push('/')
        }catch(error){
            console.log(error)
        }
        
    }

    return (
            <div className={styles.page_container}>
                <div className={styles.login_container}>
                <svg id={styles.logo} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>
                {isRegistering?
                 <form onSubmit={handleRegister}>
                <div>
                <div className={styles.input_container}>
                    <svg id={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                    </svg>

                    <input id={styles.login_inputs} type="text" placeholder="Full Name" onChange={(ev) => handleChange('name', ev.target.value)} />
                </div>

                <div className={styles.input_container}>
                <svg id={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                    </svg>


                    <input id={styles.login_inputs} type="text" placeholder="Username" onChange={(ev) => handleChange('username', ev.target.value)}/>
                </div>

                <div className={styles.input_container}>
                <svg id={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>


                    <input id={styles.login_inputs} type="e-mail" placeholder="E-mail" onChange={(ev) => handleChange('email', ev.target.value)} />
                </div>


                <div className={styles.input_container}>
                <svg id={styles.svg}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                </svg>
                    <input id={styles.login_inputs} type="password" placeholder="Password" onChange={(ev) => handleChange('password', ev.target.value)} />
                </div>

                <div className={styles.input_container}>
                <svg id={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0 1 18 9.375v9.375a3 3 0 0 0 3-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 0 0-.673-.05A3 3 0 0 0 15 1.5h-1.5a3 3 0 0 0-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6ZM13.5 3A1.5 1.5 0 0 0 12 4.5h4.5A1.5 1.5 0 0 0 15 3h-1.5Z" clipRule="evenodd" />
                    <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V9.375Zm9.586 4.594a.75.75 0 0 0-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 0 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.116-.062l3-3.75Z" clipRule="evenodd" />
                </svg>

                    <input id={styles.login_inputs} type="password" placeholder="Password" onChange={(ev) => handleChange('confirmPassword', ev.target.value)} />
                </div>
            </div>
            <button type="submit" className={styles.submit_button} href={""}>{isRegistering?'Register':'Login'}</button>
            </form>
            :
            <form onSubmit={handleLogin}>
            <div>
                <div className={styles.input_container}>
                    <svg id={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                        </svg>


                        <input id={styles.login_inputs} type="text" placeholder="Username" onChange={(ev) => handleChange('username', ev.target.value)} />
                    </div>
                <div className={styles.input_container}>
                <svg id={styles.svg}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                </svg>
                    <input id={styles.login_inputs} type="password" placeholder="Password" onChange={(ev) => handleChange('password', ev.target.value)}  />
                </div>
            </div>
            <button type="submit" className={styles.submit_button} href={""}>{isRegistering?'Register':'Login'}</button>
            </form>
                    
            }
                    
                    
                    <span>{isRegistering?'Already have an account?':"Don&rsquo;t have an account?"}</span>

                    {isRegistering?
                    <button onClick={()=>setIsRegistering(!isRegistering)} className={styles.register_link} href={""}>
                    Register
                    </button>
                    :
                    <button onClick={()=>setIsRegistering(!isRegistering)} className={styles.register_link} href={""}>
                    Login
                    </button>
                    }
                    
                    <span>OR</span>

                    <button className={styles.google_link}
                    onClick={()=>signIn()}
                    >
                    <svg className={styles.google_svg} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                        <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
                    </svg>
                        <p>Login Wth Google</p>
                    </button>
                    
                </div>
            </div>
       
    )
}