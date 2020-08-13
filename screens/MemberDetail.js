import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View, Modal, Button, TouchableHighlight, Dimensions
} from 'react-native';


let {width, height} = Dimensions.get("window");


export class MemberDetail extends Component {

    
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            scc_id: this.props.scc_id,
            name: this.props.name,
            chapter: this.props.chapter,
            city: this.props.city,
            photo: this.props.photo,
            modalVisible: false
        };
    }

    state = {
        modalVisible: false,
    }

    onPressCloseButton(visible) {
        this.setState({
            modalVisible: visible
        })
    }

    render() {
        console.log('Detail props: ', this.props);
        return (
            <View style={styles.container}>

                <Modal visible={this.state.modalVisible}
                animationType={"slide"} 
                transparent={true}>
                    <View style={styles.modal}>


                        <View style={styles.modalColumn}>


                            <View style={styles.modalRow}>
                                <Text style={styles.rowText}>ID: </Text>
                                <Text style={styles.rowText}>{this.state.scc_id} </Text>
                            </View>

                            <View style={styles.modalRow}>
                                <Text style={styles.rowText}>Name: </Text>
                                <Text style={styles.rowText}>{this.state.name} </Text>
                            </View>

                            <View style={styles.modalRow}>
                                <Text style={styles.rowText}>Chapter: </Text>
                                <Text style={styles.rowText}>{this.state.chapter}</Text>

                            </View>

                            <View style={styles.modalRow}>
                                 <Text style={styles.rowText}>City: </Text>
                                <Text style={styles.rowText}>{this.state.city} </Text>
                            </View>

                            <View style={styles.modalRow}>
                                <Image
                                style={{ width: 100, height: 100, alignSelf: 'center', alignItems: 'center', marginTop: 24, marginBottom: 24 }}
                                source={{ uri: this.state.photo }}
                                />
                                
                            </View>



                            <Button style={styles.modalCloseButton} title="Close"
                                color="blue"
                                onPress={this.onPressCloseButton.bind(this, false)}>
                            </Button>
                        </View>
                    </View>
                </Modal>

                <TouchableHighlight onPress={() => { this.onPressCloseButton(!this.state.modalVisible) }}>
               
                    <View style={styles.row}>
                        <Text style={styles.rowText}>{this.state.name} </Text>
                        <Text style={styles.rowText}>{this.state.chapter}</Text>
                    </View>
                </TouchableHighlight>


            </View>
        );
    }
}

const styles = StyleSheet.create({

     modal: {
        backgroundColor: '#add8e6',
        marginTop: height - 500,
        paddingLeft: 50,
        paddingRight: 50

    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#F6F6F6',

    },
    rowText: {
        flex: 1, 
        justifyContent: 'center',
         fontSize: 10

    },

    modalRow: {
                flexDirection: 'row',

        marginTop: 10,
        borderBottomWidth: 1,
        justifyContent: 'center'
        
    },
    modalCloseButton: {
        marginTop: 10
    },

});

export default MemberDetail;