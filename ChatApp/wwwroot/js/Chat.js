var elList, counter;
elList = document.getElementById('messagesList');
counter = document.getElementById('counter');
const connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

//This method receive the message and Append to our list
connection.on("ReceiveMessage", (user, message) => {
    const msg = message.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const encodedMsg = user + " :: " + msg;
    const li = document.createElement("li");
    li.textContent = encodedMsg;
    document.getElementById("messagesList").appendChild(li);

    listItems = elList.getElementsByTagName('li');
    counter.innerHTML = listItems.length;

     
});

connection.start().catch(err => console.error(err.toString()));

//Send the message

//document.getElementById("sendMessage").addEventListener("click", event => {
//    const user = document.getElementById("userName").value;
//    const message = document.getElementById("userMessage").value;
//    connection.invoke("SendMessage", user, message).catch(err => console.error(err.toString()));
//    event.preventDefault();
//});


document.getElementById("sendMessage").addEventListener("click", event => {
    const groupName = document.getElementById("groupName").value;
    const user = document.getElementById("userName").value;
    const message = document.getElementById("userMessage").value;
    counter.innerHTML = 0;
    connection.invoke("SendMessageToGroup", groupName, user, message).catch(err => console.error(err.toString()));
    event.preventDefault();
   
});


document.getElementById("btnPrivateGroup").addEventListener("click", event => {
    const groupName = document.getElementById("groupName").value;
    connection.invoke("JoinGroup", groupName).catch(err => console.error(err.toString()));
    event.preventDefault();
});
 