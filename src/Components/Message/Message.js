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

    sendMessage = () => {
        this.socket.emit('message sent', {
          message: this.state.messageInput,
          sender: this.props.user.user_id,
          group: this.props.selectedGroup
        })

        this.setState({messageInput: ''})
    }

    updateMessages(messages) {
        this.setState({
          messages
        })
    }

    render(){
        console.log(this.state.messages)
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
                {mappedMessages}
                <input className='message-input' value={this.state.messageInput} onChange={(e) => this.handleInput(e.target.value)}/>
                <button className='send-message-btn' onClick={this.sendMessage}>Send</button>
            </div>
        )
    }
}