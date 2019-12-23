// client-side js
// run by the browser each time your view template referencing it is loaded

console.log('Testing Add');

function submit()
{
  // request the user from our app's sqlite database
  const userRequest = new XMLHttpRequest();
  userRequest.open('post', '/addUser');
  userRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  userRequest.send(JSON.stringify({'name':document.getElementById("name").value, 'favorite-color': document.getElementById("favorite-color").value, 'cats-or-dogs': document.getElementById("cats-o$
}

