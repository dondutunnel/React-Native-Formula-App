import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button,
  Alert
} from "react-native";
import {YellowBox} from 'react-native';
import DisplayModal from "./Rules";
import { underline } from "ansi-colors";
YellowBox.ignoreWarnings(['Warning: ']);
const DissmissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

state = {
  display: false
};

triggerModal = () => {
  this.setState(prevState => {
    return {
      display: true
    };
  });
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputX: "",
      inputY: "",
      inputZ: "",
      inputT: "",
      inputFormula: ""
    };
  };
  isMatch(formula) {
    var regex = /^(x|y|z|t)[-+*%](x|y|z|t)[-+*%](x|y|z|t)[-+*%](x|y|z|t){1}$/i;
    return regex.test(formula);
  }
  GetValueFunction = () => {
    inputFormula = this.state.inputFormula;
    if (this.isMatch(inputFormula)) {
      return true;
    } else {
      return false;
    }
  };
  applyValue(formula){
    inputX = this.state.inputX;
    inputY = this.state.inputY;
    inputZ = this.state.inputZ;
    inputT = this.state.inputT;
    formula.forEach(element => {
      switch(element){
      case(element === 'x' || element === 'X'):
      Alert.alert(indexOf(element))
      // parseInt(inputFormula.splice(indexOf(element),1,inputX)); break;
      // formula[formula.indexOf(element)] = inputX; 
      Alert.alert(formula[formula.indexOf(element)])
      case(element === 'y' || element === 'Y'): 
      // formula[formula.indexOf(element)] = inputY;break;
      Alert.alert(formula[formula.indexOf(element)])
      case(element === 'z' || element === 'Z'): 
      formula[formula.indexOf(element)] = inputZ;break;
      case(element === 't' || element === 'T'): 
      formula[formula.indexOf(element)] = inputT;break;
      }
  })
  Alert.alert(inputX.toString())
  Alert.alert(inputY.toString())
  Alert.alert(inputZ.toString())
  Alert.alert(inputFormula.toString())
};
  calculateFormula = () => {
    inputFormula = Array.from(inputFormula);
    this.applyValue(inputFormula);
    inputFormula.forEach(element => {
      if(element === '*'){
        var index = inputFormula.indexOf(element);
        var temp = this.operate('*',inputFormula[index-1],inputFormula[index+1]);
        inputFormula.splice(inputFormula[index-1],2,temp);
      }
      if(element === '%'){
        var index = inputFormula.indexOf(element);
        var temp = this.operate('%',inputFormula[index-1],inputFormula[index+1]);
        inputFormula.splice(inputFormula[index-1],2,temp);
      }
    });
    inputFormula.forEach(element => {
      if(element === '+'){
        var index = inputFormula.indexOf(element);
        var temp = this.operate('+',inputFormula[index-1],inputFormula[index+1]);
        inputFormula.splice(inputFormula[index-1],2,temp);
      }
      if(element === '-'){
        var index = inputFormula.indexOf(element);
        var temp = this.operate('-',inputFormula[index-1],inputFormula[index+1]);
        inputFormula.splice(inputFormula[index-1],2,temp);
      }
    });
    // Alert.alert(inputFormula.toString())
  };

  operate(operator, rvalue, lvalue) {
    switch (operator) {
      case "+":
        value = parseInt(rvalue) + parseInt(lvalue);
      case "-":
        value = parseInt(rvalue) - parseInt(lvalue);
      case "*":
        value = parseInt(rvalue) + parseInt(lvalue);
      case "%":
        value = parseInt(rvalue) / parseInt(lvalue);
    }
  }
  checkTextInputIsEmptyOrNot = () => {
    const { inputX } = this.state;
    const { inputY } = this.state;
    const { inputZ } = this.state;
    const { inputT } = this.state;
    if (inputX === "" || inputY === "" || inputZ === "" || inputT === "") {
      return false;
    } else {
      return true;
    }
  };

  //########  happens regresions #######
  // allowOnlyNumberInput = text => {
  //   if (/^\d+$/.test(text)) {
  //     this.setState({
  //       text: text
  //     });
  //   }
  // };
  //########  happens regresions #######

  onButtonPress = () => {
    this.checkTextInputIsEmptyOrNot();
    // if (this.checkTextInputIsEmptyOrNot()) {
    if (true) {
      if (this.isMatch) {
        if (this.GetValueFunction()) {
          this.calculateFormula();
        } else {
          Alert.alert("Please see the rules before enter the formula.");
        }
      } else {
        Alert.alert("Please see the rules.");
      }
    } else {
      Alert.alert("Please Enter All the Values.");
    }
  };

  render() {
    return (
      <DissmissKeyboard>
        <View style={styles.container}>
          <View style={styles.inputCont}>
            <TextInput
              style={styles.input}
              placeholder="X"
              keyboardType="numeric"
              onChangeText={inputX => this.setState({ inputX })}
              // , this.allowOnlyNumberInput}
              // value={this.state.text}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Y"
              keyboardType="numeric"
              onChangeText={inputY => this.setState({ inputY })}
              // , this.allowOnlyNumberInput }
              // value={this.state.text}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="Z"
              keyboardType="numeric"
              onChangeText={inputZ => this.setState({ inputZ })}
              // , this.allowOnlyNumberInput}
              // value={this.state.text}
            ></TextInput>
            <TextInput
              style={styles.input}
              placeholder="T"
              keyboardType="numeric"
              onChangeText={inputT => this.setState({ inputT })}
              // , this.allowOnlyNumberInput}
              // value={this.state.text}
            ></TextInput>
          </View>

          <Text style={styles.label}>Formula</Text>
          <TextInput
            onChangeText={inputFormula => this.setState({ inputFormula })}
            style={styles.inputFrml}
            placeholder="Enter your formula here"
          ></TextInput>
          <Button
            style={((width = 150), (height = 150))}
            title="Calculate"
            onPress={this.onButtonPress}
          />
          <Text style={styles.label}>Result</Text>
          <TextInput style={styles.inputFrml}></TextInput>
          <Text style={{ fontWeight: "100" }}>
            * Please check the
            <Text
              style={{ color: "red", textDecorationLine: "underline" }}
              // on={() => this.triggerModal()}
            >
              {"\b"}rules{"\b"}
            </Text>
            <Text>before start.</Text>
          </Text>
          {/* <DisplayModal 
            image = { Krunal }
            data = "Krunal"
            display = { this.state.display }
          /> */}
        </View>
      </DissmissKeyboard>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: 60,
    borderColor: "#878199",
    borderWidth: 1,
    marginRight: 5,
    textAlign: "center"
  },
  inputCont: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: "20%",
    paddingTop: 50
  },
  inputFrml: {
    width: "70%",
    height: "10%",
    borderColor: "#878199",
    borderWidth: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 40,
    paddingLeft: 5
  },
  label: {
    width: "70%",
    height: "5%",
    fontSize: 20,
    margin: 20,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
