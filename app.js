
var edt_form = document.getElementById("edit_form");
var del_form = document.getElementById("delete_form");



function submit_new()
{

    var f_Names = document.getElementById("f_name").value;
    var l_Names = document.getElementById("l_name").value;
    var emails = document.getElementById("email").value;
    var m_num = document.getElementById("m_number").value;
    var firebaseRef = firebase.database().ref('users');

    firebaseRef.child(m_num+'_'+l_Names).set(
    {
        First_name: f_Names,
        Last_name: l_Names,
        email: emails,
        Mobile_number: m_num
    });
    window.alert("Added to database");
}

function create_user() 
{
    document.getElementById("demo").innerHTML = "Fill in details";
    if (form.style.display === "block") 
    {
        form.style.display = "none";
    } 
    else 
    {
        form.style.display = "block";
    }
}


function delete_user() 
{
    var demails = document.getElementById("demail").value;
    var firebaseRefdel = firebase.database().ref().child("users").child(demails);
    firebaseRefdel.once('value', 
        function (snapshot) {
            if (snapshot.val() === null) 
            {
                alert('does not exist');
            } 
            else 
            {
                firebaseRefdel.remove();
                window.alert("Removed from database");
            }
        });
    }


function read_data()
{
    var user_ref = firebase.database().ref().child("users");

    user_ref.on("value", 
        function (snapshot) 
        {
            snapshot.forEach(function (childSnapshot) 
            {
                var key = childSnapshot.key;
                var child_data = childSnapshot.val();
                var tr = '<tr>' +
                            '<td>' + key + '</td>' +
                            '<td>' + child_data.First_name + '</td>' +
                            '<td>' + child_data.Last_name + '</td>' +
                            '<td>' + child_data.Mobile_number + '</td>' +
                            '<td>' + child_data.email + '</td>' +
                        '</tr>';
                $('#lstTable').append(tr);
                console.log(snapshot.val());
            });
        }, 
        function (error) 
        {
            console.log("Error: " + error.code);
        }
    );
}


function writeNewPost() 
{
    var f_Names = document.getElementById("f_name").value;
    var l_Names = document.getElementById("l_name").value;
    var emails = document.getElementById("email").value;
    var m_num = document.getElementById("m_number").value;

    var demails = document.getElementById("demail").value;
    var firebaseRefdel = firebase.database().ref().child("users").child(demails);

    // A post entry.
    var postData = {
        First_name: f_Names,
        Last_name: l_Names,
        email: emails,
        Mobile_number: m_num
    };
  
    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('users').push().key;
  
    // Write the new post's data simultaneously in the posts list and the user's post list.
    var updates = {};
    updates[m_num + '_' + l_Names] = postData;
   //dates['/user-posts/' + uid + '/' + newPostKey] = postData;
  
   firebaseRefdel.update(updates);
    window.alert("Contact information changed");

}


function show_form()
{
    if (edt_form.style.display === "block") 
    {
        edt_form.style.display = "none";
    } 
    else 
    {
        edt_form.style.display = "block";
    }
}

