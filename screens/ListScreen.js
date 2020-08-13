import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Modal, TouchableHighlight, Button, StyleSheet } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import MemberDetail from './MemberDetail';
import { Actions as NavigationActions } from 'react-native-router-flux';
import { useNavigation } from '@react-navigation/native';

export class SearchableFlatList extends Component {
        
    constructor(props) {
      super(props);
     
      this.state = {
        loading: false,
        data: [],
        error: null,
        isVisible: false, //state of modal default false
      };
  
      this.arrayholder = [];
    }
  
    componentDidMount() {
      this.makeRemoteRequest();
    }
  
    makeRemoteRequest = () => {
      
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
  
    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: '86%',
            backgroundColor: '#CED0CE',
            marginLeft: '14%',
          }}
        />
      );
    };
  
    searchFilterFunction = text => {
      this.setState({
        value: text,
      });
  
      const newData = this.arrayholder.filter(item => {
        const itemData = `${item.SCC_ID.toUpperCase()} ${item.Name.toUpperCase()}`;
        const textData = text.toUpperCase();
  
        return itemData.indexOf(textData) > -1;
      });
      this.setState({
        data: newData,
      });
    };
    _onPress = (item) => {
      //const { itemId } = this.props.SCC_ID; 
      console.log(item, item.SCC_ID, item.Name);
    
  
      this.setState({ isVisible: true});
      return (
        <Modal animationType = {"slide"} transparent = {false}
        visible = {this.state.isVisible}
        onRequestClose = {() =>{ console.log("Modal has been closed.") } }>
        <View style = {styles.modal}>
          <Text style = {styles.text}>Modal is open!</Text>
          <View style={{ flex: 1 }}>
           <Text>ID: </Text>
           <Text>{item.SCC_ID} </Text>
          </View>
          <Button title="Click To Close Modal" onPress = {() => {
              this.setState({ isVisible:!this.state.isVisible})}}/>
        </View>
    </Modal>
  
      );
      
    }

    renderHeader = () => {
      return (
        <SearchBar
          placeholder="Type Here..."
          lightTheme
          round
          onChangeText={text => this.searchFilterFunction(text)}
          autoCorrect={false}
          value={this.state.value}
        />
      );
    };

    render() {
      
      if (this.state.loading) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator />
          </View>
        );
      }
      return (
        
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableHighlight
              key={item.key} 
               onPress={() => this._onPress(item)}
              >      
              <ListItem navigation={this.props.navigation}
                leftAvatar={{ source: { uri: item.Photo } }}
                title={`${item.SCC_ID} ${item.Name}`}
                subtitle={item.Chapter}
                
              ></ListItem>
              </TouchableHighlight>
        
              
            )}
        
            keyExtractor={item => item.ID.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          ></FlatList>
        
        </View>
        
      );
    }
} 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    marginTop:30
  },
   modal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#00ff00',
      padding: 100
   },
   text: {
      color: '#3f2949',
      marginTop: 10
   }
});

export default function ListScreen({navigation}) {
    return (
    <SearchableFlatList  />  );
                
}