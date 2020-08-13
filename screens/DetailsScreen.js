import React, { Component } from 'react';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from '../components/Loader';

export class DetailsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    const item = this.props.navigation.state.params;
    console.log(item, item.Name);
        this.setState({
            scc_id : item.scc_id
        }, () => {
            this.makeRemoteRequest();
        })
  }

  makeRemoteRequest = () => {
    //const url = `https://randomuser.me/api/?&results=20`;
    const url = `http://apps.airfastindonesia.com/rnim/student/ShowAllSCCList.php`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res;
        console.log(res);
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };


  
    render() {
      return (
        <View style={{ flex: 1 }}>
             <Text>ID: </Text>
             <Text>{item.SCC_ID} </Text>
    
        </View>
      );
  
    }
         
}
  
export default function DetailsScreen({ navigation }){
  return (
    <DetailsList />  );

}    