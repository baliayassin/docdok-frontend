

import React, { useState } from 'react';
import { View, Modal, Text, Alert,Pressable, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function Password() {

    // password
    const [password, setPassword] = useState()
    // confirm password
    const [reEnterPassword, setReEnterPassword] = useState()
    // error passwords match/not match 
    const [isError, setIsError] = useState()
    // flag match/not match
    const [matchPassword, setMatchPassword] = useState(false)
    // check regular letter
    const [regularletter, setIsRegularLetter] = useState(false)
    //check capital letter
    const [capitalLetter, setIsCapitalLetter] = useState(false)
    // check number
    const [number, setIsNumber] = useState(false)
    // check more than 6 characters
    const [passwordLength, setPasswordLength] = useState(false)
    // send data to server / save
    const [submit, setSubmit] = useState(true)
    // show and hide error flag
    const [hide, isHide] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState('')
    const [data, setData] = useState([])



    //const regex = '(?=.*[0-9])'

    const handlePassword = async (text) => {

        if (!text.trim()) setPassword('')

        setPasswordLength(text.length > 6 ? true : false)
        if (text.match(/\d+/g) != null) {
            setIsNumber(true)
        }
        else {
            setIsNumber(false)
        }


        if (text.match(/[a-z]/)) {
            setIsRegularLetter(true)
        }
        else {
            setIsRegularLetter(false)
        }

        if (text.match(/[A-Z]/)) {
            setIsCapitalLetter(true)
        }
        else {
            setIsCapitalLetter(false)
        }

        setPassword(text)
        if (password == null) {
            setSubmit(true)
        } else
            setSubmit((number && regularletter && capitalLetter && passwordLength) ? false : true)


    }

    const handleRePassword = async (text) => {

        if (!password) {

            alert(" Error : insert password first")

        }



        await setReEnterPassword(text)

        if (!text.trim()) setReEnterPassword('')

        if (password != '' && reEnterPassword != '') {

            if (password == text) {
                setIsError("password matched")

                setMatchPassword(true)

            }

            else {
                setIsError("re-enter password is not matched")
                setMatchPassword(false)
            }

        } else {
            isHide(false)
        }


    }

    const saveData = async () => {

        await fetch('http://192.168.1.112:3000/insert/', {

            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                password: password
            })
        }).then(response => response.json())
            .then(response => {
                setData(response)
                console.log(response)
                

            })




    }


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

            <Text style={{ color: 'cyan', fontSize: 22, fontWeight: 'bold', marginTop: 50 }}> DocDok</Text>

            {!password ? <Text style={{ position: 'absolute', top: 230, left: 170, color: 'red' }}>
                Enter password !
            </Text> : null}
            {hide == false ?
                <Text style={{ color: matchPassword ? 'green' : 'red', top: 225 }}>{isError} </Text>
                : null}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginTop: 100 }}>
                <Text style={{ marginRight: 30 }}> Enter Password:</Text>

                <TextInput value={password} secureTextEntry={true} style={styles.textInput} placeholder="Enter Password" onChangeText={text => handlePassword(text)} />

            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', position: 'absolute', top: 270 }}>
                <Text>Re-Enter Password: </Text>
                <TextInput value={reEnterPassword} autoCapitalize='none' secureTextEntry={true} style={styles.textInput} placeholder="Re-Enter Password" onChangeText={text => handleRePassword(text)} />
            </View>


            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', position: 'absolute' }} >
                <Text style={{ marginRight: 35, color: regularletter == true ? 'green' : 'red' }}> X    Regular Letter</Text>
                <Text style={{ color: number == true ? 'green' : 'red' }}> X    Number</Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 400, left: 57 }} >
                <Text style={{ marginRight: 35, color: capitalLetter == true ? 'green' : 'red' }}> X    Capital Letter</Text>
                <Text style={{ color: passwordLength == true ? 'green' : 'red' }} > X   Greater than 6</Text>
            </View>
            <TouchableOpacity onPress={() => saveData()} disabled={!matchPassword} style={{
                width: 100,
                position: 'absolute',
                top: 500,
                borderRadius: 10,
                borderWidth: 1,
                fontSize: 22,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                backgroundColor: 'gray',
                opacity: matchPassword == true ? 1 : 0.3
            }}>
                <Text style={{ color: 'white', fontSize: 22 }}>Submit</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Insert name</Text>
                        <TextInput style={styles.textInput} onChangeText={(text) => setName(text)} />
                        <View style={{ marginTop: 20 }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => { setModalVisible(!modalVisible) }}
                            >
                                <Text style={styles.textStyle}>Enter</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Enter Name</Text>
            </Pressable>

        </View>
    );
}


const styles = StyleSheet.create({


    textInput: {

        width: 200,
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        marginTop: -5,
        marginLeft: 20

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        bottom: 1
    },
    buttonOpen: {
        backgroundColor: "cyan",
    },
    buttonClose: {
        backgroundColor: "cyan",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

})