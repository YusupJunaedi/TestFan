import React from 'react'
import { View, Text, TextInput } from 'react-native'
import {Button} from 'native-base'
import { Formik } from 'formik';
import * as yup from 'yup'
import Axios from 'axios'

const Login = ({navigation}) => {

    const reviewSchema = yup.object({
        email: yup.string().required().email(),
        password: yup
            .string()
            .required()
    });

    const handleLogin = (values) => {
        const data = {
            email: values.email,
            password: values.password
        }
        Axios.post('http://192.168.43.142:8001/auth/login', data)
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

            <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 20}}>Login</Text>
            <View style={{width: '80%'}}>
                <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={(values, {resetForm})=> {
                    handleLogin(values)
                    resetForm({ values: '' })
                }}
                validationSchema={reviewSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
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
                            <Button success block rounded onPress={handleSubmit}>
                                <Text>Login</Text>
                            </Button>
                        </View>
                    )}
                </Formik>
                <View style={{marginVertical: 10}}>
                    <Button info block rounded onPress={() => navigation.navigate('Register')}>
                        <Text>Register</Text>
                    </Button>
                </View>
            </View>

        </View>
    )
}

export default Login
