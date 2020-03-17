import React, {Component} from 'react';
import io from 'socket.io-client';
import './Message.css';

export default class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            messageInput: ''
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
        if(prevProps.selectedGroup !== this.props.selectedGroup){
            this.joinRoom(this.props.selectedGroup);
        }
    }

    componentWillUnmount(){
        this.socket.disconnect()
    }

    joinRoom = async(id) => {
        this.socket.emit('join room', {
            group: this.props.selectedGroup
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

    sendMessage = (message) => {
        this.socket.emit('message sent', {
          message,
          sender: this.props.user.user_id,
          group: this.props.selectedGroup
        })
    }

    updateMessages(messages) {
        this.setState({
          messages
        })
    }

    render(){
        const mappedMessages = this.state.messages.map((message, i) => (
            <div key={i} className='message-container'>
                lelelelel
            </div>
        ))

        return(
            <div className='message'>
                {mappedMessages}
                <input className='message-input' value={this.state.messageInput} onChange={(e) => this.handleInput(e.target.value)}/>
            </div>
        )
    }
}