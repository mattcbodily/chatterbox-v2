import React, {Component} from 'react';
import io from 'socket.io-client';
import Header from '../Header/Header';
import './Message.css';

export default class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            messageInput: '',
            settingMenuView: false
        }
    }

    componentDidMount(){
        this.socket = io('http://localhost:3333');
        this.socket.on('room joined', data => {
            this.joinSuccess(data)
          })
        this.socket.on('message dispatched', data => {
            this.updateMessages(data);
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.selectedGroup.group_id !== this.props.selectedGroup.group_id){
            this.joinRoom(this.props.selectedGroup.group_id);
        }
    }

    componentWillUnmount(){
        this.socket.disconnect()
    }

    joinRoom = async(id) => {
        this.socket.emit('join room', {
            group: this.props.selectedGroup.group_id
        })
    }

    joinSuccess(messages) {
        this.setState({
          messages
        })
    }

    handleInput = (val) => {
        this.setState({messageInput: val})
    }

    sendMessage = () => {
        this.socket.emit('message sent', {
          message: this.state.messageInput,
          sender: this.props.user.user_id,
          group: this.props.selectedGroup.group_id
        })

        this.setState({messageInput: ''})
    }

    updateMessages(messages) {
        this.setState({
          messages
        })
    }

    render(){
        const mappedMessages = this.state.messages.map((messageData, i) => (
            <div key={i} className='message-container'>
                <img src={messageData.image} alt={messageData.username} />
                <section>
                    <p className='message-sender'>{messageData.username}</p>
                    <p>{messageData.message}</p>
                </section>
            </div>
        ))

        return(
            <div className='message'>
                <Header selectedGroup={this.props.selectedGroup} toggleFn={this.props.toggleFn}/>
                {mappedMessages}
                <input className='message-input' value={this.state.messageInput} onChange={(e) => this.handleInput(e.target.value)}/>
                <button className='send-message-btn' onClick={this.sendMessage}>Send</button>
            </div>
        )
    }
}