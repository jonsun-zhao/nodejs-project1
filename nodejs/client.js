// client-side js
// run by the browser each time your view template referencing it is loaded

console.log('Testing Add');

function submit()
{
  // request the user from our app's sqlite database
  const userRequest = new XMLHttpRequest();
  userRequest.open('post', '/addUser');
  userRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  userRequest.send(JSON.stringify({'name':document.getElementById("name").value, 'favoritecolor': document.getElementById("favoritecolor").value, 'catsordogs': document.getElementById("catsordogs").value}));

  userRequest.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var rows = JSON.parse(this.responseText);
    var tbl = "<table border=1>";
    tbl += "<thead><td>Name</td><td>Favorite Color</td><td>Cats or Dogs</td></thead>";
    for (var i = 0; i < rows.length; i++)
    {
      tbl+="<tr><td>"+rows[i].name+"</td><td>"+rows[i].favoritecolor+"</td><td>"+rows[i].catsordogs+"</td></tr>";
      console.log('record:', JSON.stringify(rows[i]));
    }
    tbl += "</table>";
    
    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.getElementById("showData");
    divContainer.innerHTML  =tbl;
   }
  }//end of  userRequest.onreadystatechange
}
