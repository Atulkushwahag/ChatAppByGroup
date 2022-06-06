using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
namespace ChatApp
{
    public class ChatHub : Hub
    {
       

        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        
        public async Task JoinGroup(string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
        }
        public async Task SendMessageToGroup(string groupName, string user, string message)
    => await Clients.Group(groupName).SendAsync("ReceiveMessage", user, message);
        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has left the group {groupName}.");
        }
    }
}
