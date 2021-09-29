import React , { useState , useEffect } from 'react'
import { Text , ScrollView , View , StyleSheet } from "react-native"
import { TextInput , Button , Portal , Dialog , List , Paragraph } from "react-native-paper"
import shortid from "shortid"

import AsyncStorage from '@react-native-async-storage/async-storage';

const Edit = ({ navigation , route }) => {
    const [ todo , setTodos ] = useState("")
    const [ visible , setVisible ] = useState(false)
    const [ id , setId ] = useState("")
    const [ checked , setChecked ] = useState(false)

    const updateTodo = async() => {
        if( !todo ) {
            setVisible(true)
            console.log("Enter A Value First")
            setTimeout(() => {
                setVisible(false)
            },2000)
            return
        }
        const todoToUpdate = {
          id,
          todo,
          isChecked: !checked
        }
        const storedValue = await AsyncStorage.getItem("@todo_list")
        const allTodos = await JSON.parse(storedValue)

        allTodos.map(( myTodo ) => {
            if( myTodo.id === id ) {
                myTodo.todo = todo
            }
            return myTodo
        })
        await AsyncStorage.setItem("@todo_list" , JSON.stringify(allTodos))

        navigation.navigate("Home")
    }

    useEffect(() => {
        const { myTodo } = route.params
        const { id , todo , isChecked } = myTodo
        setId(id)
        setTodos(todo)
        setChecked(isChecked)
    },[])
    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
        <View style={ styles.container }>
        <Text style={styles.heading}> Add To Your Todo </Text>
        { visible && <View style={{ backgroundColor: "#664C28" , margin: 10 , borderRadius: 8 , borderWidth: 2 }}> 
        <Text style={{ color: "#FFF8DC" , fontSize: 20 , fontWeight: "bold" , textAlign: "center" }}> Enter A Value First </Text> 
        </View> }
            <TextInput
              placeholder="Enter Your Todo Here"
              style={styles.textInputs}
              value={todo}
              onChangeText = { text => setTodos(text) }
              outlineColor="#00b7c2"
              mode="outlined"
            />
            <Button icon="send" style={styles.button} mode="contained" onPress={updateTodo}>
                Update
            </Button>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'flex-start',
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginHorizontal: 5,
    marginTop: 50,
    marginBottom: 20,
  },
  formItem: {
    marginBottom: 20,
  },
  textInputs: {
      marginLeft: 20,
      marginRight: 20,
  },
  button: {
      marginTop: 20,
      backgroundColor: "#00b7c2",
      marginLeft: 20,
      marginRight: 20
  }
});

export default Edit