import React, {useState} from 'react'
import {View, Text, TextInput, Button} from 'react-native'
import { Formik } from 'formik';
import * as yup from 'yup'
import Axios from 'axios'

function Register({navigation}) {

    const reviewSchema = yup.object({
        username: yup.string().required(),
        email: yup.string().required().email(),
        password: yup
            .string()
            .required()
            .min(8, 'Password is too short - should be 8 chars minimum.')
            .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    });

    const handleRegister = (values) => {
        const data = {
            username: values.username,
            email: values.email,
            password: values.password
        }
        Axios.post('http://192.168.43.142:8001/auth/register', data)
            .then(res => {
                if(res.data.success){
                    navigation.navigate('Home')
                }
            })
            .catch(err => {
                console.log('error api =>', err)
            })
    }

    
    return (
        <View style={{flex: 1,justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 20}}>Register</Text>
            <View style={{width: '80%'}}>
                <Formik
                initialValues={{username: '', email: '', password: ''}}
                onSubmit={(values, {resetForm}) => {
                    handleRegister(values)
                    resetForm({ values: '' })
                }}
                validationSchema={reviewSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <TextInput
                            style={{borderWidth: 1, borderColor: 'black', borderRadius: 25, paddingHorizontal: 20, marginVertical: 10}}
                            placeholder='username'
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            value={values.username}
                            />
                            { errors.username && touched.username ? <Text style={{color: 'red'}}>{errors.username}</Text> : null}
                            <TextInput
                            style={{borderWidth: 1, borderColor: 'black', borderRadius: 25, paddingHorizontal: 20, marginVertical: 10}}
                            placeholder='email'
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            />
                            { errors.email && touched.email ? <Text style={{color: 'red'}}>{errors.email}</Text> : null}
                            <TextInput
                            secureTextEntry={true}
                            style={{borderWidth: 1, borderColor: 'black', borderRadius: 25, paddingHorizontal: 20, marginVertical: 10}}
                            placeholder='password'
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            />
                            { errors.password && touched.password ? <Text style={{color: 'red'}}>{errors.password}</Text> : null}
                            <Button onPress={handleSubmit} title="Register" 
                            style={{borderRadius: 50}}
                            />
                        </View>
                    )}
                </Formik>
            </View>

        </View>
    )
}

export default Register
