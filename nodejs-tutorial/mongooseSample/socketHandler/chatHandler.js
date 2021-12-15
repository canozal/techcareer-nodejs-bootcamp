



module.exports = (io) => {

    const sendChatMessage = function (data) {


        let socketIds = [data.senderId, data.receiverId] ;

        const socket = this;

        console.log(socketIds);

        socketIds.forEach(id => {
            socket.to(id).emit('getmessage', data);

        })

    }


    return {
        sendChatMessage
    }

}