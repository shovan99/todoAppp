import React , { useState , useEffect } from 'react'
import { Text , ScrollView , TouchableOpacity , StyleSheet, View , Button } from "react-native"

import AsyncStorage from '@react-native-async-storage/async-storage';

import { List , Checkbox , FAB , Chip } from "react-native-paper"

import { useIsFocused } from "@react-navigation/native"

const Home = ({ navigation , route }) => {

  const isFocused = useIsFocused()
  const [ todo , setTodos ] = useState([])
  const [ loading , setLoading ] = useState(false)

  const getLists = async() => {
  const todoss = await AsyncStorage.getItem("@todo_list")
  if( !todoss ) {
    setTodos([])
    return
  }
  const list = await JSON.parse(todoss)
  setTodos(list)
  setLoading(false)
}
  const deleteTodo = async( id ) => {
    const newList = await todo.filter((myTodo) => myTodo.id !== id)
    await AsyncStorage.setItem("@todo_list" , JSON.stringify(newList))
    setTodos(newList)
  }

  const markComplete = async( id ) => {
    const newArr = await todo.map(myTodo => {
      if( myTodo.id === id ) {
        myTodo.isChecked = !myTodo.isChecked
      }
      return myTodo
    })
    await AsyncStorage.setItem("@todo_list" , JSON.stringify(newArr))
    setTodos(newArr)
  }

  useEffect(() => {  
    getLists()
  },[isFocused])
    return (
        <>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}> Your Todos </Text>
            { loading && <View style={{ backgroundColor: "#664C28" , margin: 10 , borderRadius: 8 , borderWidth: 2 }}> 
            <Text style={{ color: "#FFF8DC" , fontSize: 20 , fontWeight: "bold" , textAlign: "center" }}> Loading </Text> 
            </View> }
            { todo.length > 0 ? ( 
              todo.map(( myTodo ) => (
                <View style={styles.todoContainer} key={myTodo.id}>
                <List.Item
                    title={myTodo.todo}
                    titleStyle={ myTodo.isChecked ? { fontWeight: "bold" , textDecorationLine: "line-through" } : { fontWeight: "bold" }}
                    left={props => (
                    <>
                    <TouchableOpacity onPress={() => navigation.navigate("Edit" , { myTodo })}>
                    <List.Icon {...props} icon="pencil" style={styles.todoIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteTodo(myTodo.id)}>
                    <List.Icon {...props} icon="delete" style={styles.todoIcon} />
                    </TouchableOpacity>
                    </>
                    )}
                    right={props => 
                    <View style={{ marginTop: 10 }}>
                    <TouchableOpacity onPress={() => markComplete(myTodo.id)}>
                    <Checkbox {...props} status={ myTodo.isChecked ? "checked" : "unchecked" }/>
                    </TouchableOpacity>
                    </View>
                    }
                />
            </View>
              ))
             ) : ( 
               <Chip icon="information" style={{ padding: 8 , margin: 8 }}> <Text style={{ fontSize: 20 , fontWeight: "bold" }}> No Items To Show </Text> </Chip>
              ) }
            
        </ScrollView>
        <FAB
                style={styles.fab}
                large
                icon="plus"
                onPress={() => navigation.navigate("Add")}
        />
      </>
    )
}


const styles = StyleSheet.create({
  emptyContainer: {
    backgroundColor: '#1b262c',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1b262c',
    flex: 1,
    // flexWrap: "wrap"
  },
  heading: {
    textAlign: 'center',
    color: '#00b7c2',
    marginVertical: 15,
    marginHorizontal: 5,
    fontSize: 20,
    fontWeight: "bold"
  },
  actionButton: {
    marginLeft: 5,
  },
  seasonName: {
    color: '#fdcb9e',
    textAlign: 'justify',
  },
  listItem: {
    marginLeft: 0,
    marginBottom: 20,
  },
  todoContainer: {
    backgroundColor: "#F4C2C2",
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 8
  },
  todoIcon: {
    marginLeft: 0,
    marginRight: 0
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#02B290",
    borderColor: "green"
  },
});


export default Home