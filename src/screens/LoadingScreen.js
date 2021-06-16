// import React, { Component } from "react";
// import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

// import Constant from "expo-constants";
// import firebase from 'firebase';

// class LoadingScreen extends Component {
//     // Call checkIfLoggedIn() when load this screen
//     componentDidMount() {
//         this.checkIfLoggedIn();
//     }

//     // // Check is user logged in or not
//     checkIfLoggedIn = () => {
//         // firebase.auth().onAuthStateChanged(user => {
//         //         // If user logged in -> load messages screen
//         // if (user) {
//         this.props.navigation.navigate('MessageScreen')
//         // }
//         //         // If user not logged in -> load login screen
//         // else {
//         // this.props.navigation.navigate('LoginScreen')
//         // }
//         // })
//     }

//     render() {
//         return (
//             <View style={styles.parent}>
//                 <ActivityIndicator color="#de5246" size="large" />
//             </View>
//         );
//     };
// }

// const styles = StyleSheet.create({
//     parent: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         marginTop: Constant.statusBarHeight
//     }
// });

// export default LoadingScreen;