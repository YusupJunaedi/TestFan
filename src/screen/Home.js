import React, {useState, useEffect} from 'react'
import { View } from 'react-native'
import { Container, Card, CardItem, Text, Icon, Right, Button } from 'native-base';
import Axios from 'axios'

const Home = ({navigation}) => {

    const [data, setData] = useState(null)
    console.log('data user', data)

    useEffect(() => {
        Axios.get('http://192.168.43.142:8001/auth/user')
        .then(res => {
            setData(res.data.data)
        })
        .catch(err => {
            console.log('err get user', err)
        })
    }, [])

    return (
        <View style={{padding: 20}}>
            
                <Text style={{textAlign: 'center', paddingVertical: 20, fontSize: 20, fontWeight: 'bold'}}>List User</Text>
                
                {data === null ? <Text>Loading...</Text> : 
                <Card>
                    {
                        data.map(e => {
                            return <CardItem style={{justifyContent: 'space-between'}}>
                               
                                <Text>{e.username}</Text>
                                <Text>{e.email}</Text>      
                            </CardItem>
                        })
                    }
                    
                </Card>}
 
           
           <Button 
           style={{marginVertical: 10}}
            danger
            block
            onPress={() => navigation.navigate('Login')}>
                <Text>Logout</Text>
            </Button>
        </View>
    )
}

export default Home
