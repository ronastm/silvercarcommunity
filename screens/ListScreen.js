import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, Modal } from 'react-native';
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
      };
  
      this.arrayholder = [];
    }
  
    componentDidMount() {
      this.makeRemoteRequest();
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
    renderDetail = (item) => {
      //const { itemId } = this.props.SCC_ID;
      return (
        <View>
        <Modal visible={this.state.modalVisible}
        animationType={"slide"} 
        transparent={true}>
        <View>
             <Text>ID: </Text>
             <Text>{item.SCC_ID} </Text>
         </View>
         </Modal>
         </View>
      )
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
              <ListItem onPress={() => {
                this.props.navigation.navigate('MemberDetail')
              }}

                leftAvatar={{ source: { uri: item.Photo } }}
                title={`${item.SCC_ID} ${item.Name}`}
                subtitle={item.Chapter}
              />
            )}
            // renderRow={this.renderRow.bind(this)}
            keyExtractor={item => item.ID.toString()}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
      );
    }
} 
  
export default function ListScreen({navigation}) {
    return (
    <SearchableFlatList />  );
               
}