

function deleteFromFavorites(subscriberId, subscribedId, state, updateState){
    fetch('http://localhost:8000/api/favorites/delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subscribedId: subscribedId,
            subscriberId: subscriberId
        })
    }).then(res => console.log(res.status))
    .then(() =>
    updateState(!state))
 } 

 export default deleteFromFavorites;