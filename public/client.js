const socket = io()

let Name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message__area');
let sendBtn = document.querySelector('.fa.fa-send-o');

Name = prompt('Please enter your name:');
while(!Name){
    Name = prompt('Please enter your name:');
}


textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
})

sendBtn.addEventListener('click', () => {
    if (textarea.value !== ''){
        sendMessage(textarea.value)
    }
})


const sendMessage = (message) => {
    let msg = {
        user: Name,
        message: message.trim(),
    }
    //Append
    appendMessage(msg, 'outgoing');
    textarea.value = '';
    Bottom();

    //Send to server
    socket.emit('message', msg);

}

const appendMessage = (msg, type) => {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')
    let markup
    if (type === 'incoming') {
        markup = `
     <p>${msg.user}: ${msg.message}</p>
     `
    } else {
        markup = `
    <p>You: ${msg.message}</p>
    `
    }
    mainDiv.innerHTML = markup;

    messageArea.appendChild(mainDiv);

}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    Bottom();
})


const Bottom = () => {
    messageArea.scrollTop = messageArea.scrollHeight;
}
