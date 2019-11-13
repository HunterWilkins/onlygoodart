
let currentUser;

$("#signup").on("click", async function(event){
    event.preventDefault();

    let user = {
        method: "signup",
        username : $("#account-form input[name=username]").val(),
        password : $("#account-form input[name=password]").val()    
    }

    signup(user);
    
});

$("#login").on("click", function(event){
    event.preventDefault();
    let user = {
        method: "login",
        username : $("#account-form input[name=username]").val(),
        password : $("#account-form input[name=password]").val()    
    }

    login(user);
});

// $("#update-user").on("blur", async function(event) {

//     if ($("#update-user").val().length > 0) {
//         let info = {
//             newUsername: updateUsername.value,
//             id: currentUser
//         }
     
//         const response = await fetch("/api/update", {
//             method: "PUT",
//             mode: "cors",
//             credentials: "same-origin",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             referrer: "no-referrer",
//             body: JSON.stringify(info),  
//         });
    
//         if (response) {
//             document.querySelector("#user").innerHTML = "Successfully changed username to " + info.newUsername;
//         }
//         console.log(response);    
//     }

// });

$("#delete").on("click", async function(event) {
    event.preventDefault();

    if (confirm("Are you sure?")) {
        const response = await fetch("/api/delete", {
            method: "delete",
            mode: "cors",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json"
            },
            referrer: "no-referrer",
            body: JSON.stringify({id: currentUser}),
             
        });

        window.location.reload();
    }

});

$("#trigger-account").on("click", function() {
    toggleDisplay("#account-form");
});

$("#post-submit").on("click", function(event) {
    event.preventDefault();

    let postInfo = {
        author: currentUser,
        title: $("#post-title").val(),
        body: $("#post-body").val()
    };

    makePost(postInfo);
});

$("#close-button").on("click", function() {
    toggleDisplay("#account-info", "off");
});

// $("#posts").on("blur", ".post input",function() {
//     let info = {
//         field: $(this).attr("field"),
//         text: $(this).val(),
//         author: currentUser,
//         id: $(this).parent().attr("postId")
//     }

//     console.log(info);

//     updatePost(info);
// });

function toggleDisplay(element, method) {    
    if ($(element).css("display") === "none" || method === "on") {
        $(element).css({"display" : "block"});
    }
    
    else if ($(element).css("display") === "block" || method === "off") {
        $(element).css({"display" : "none"});
    }
}

async function login(user) {

    const response = await fetch("/api/account", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
    });

    const result = await response.json();
  
    if (result) {
        currentUser = result.id;
        $("#user").text("Current User: " + result.username);
        $("#account-info").css({"display":"block"});
        $("#update-user").attr("placeholder", result.username);

        toggleDisplay("#account-form","off");

        getPosts();
    }
    
}

async function signup(user) {
    
    await fetch("/api/account", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user) 
    });

    toggleDisplay("#account-form","off");
}

async function makePost(post) {
    response = await fetch("/api/submitPost", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });

    result = await response.json();

    if (result) {
        $("section").append(`
        <div class = "post">
        <p>${result.title}</p>
        <br>
        <p>${result.body}</p>
        </div>
        <hr>
        `);

        $("#post-field input").val("");
        $("#post-field textarea").val("");
    }
}

async function getPosts() {
    $("#posts").empty();

    const posts = await fetch(`/api/posts/${currentUser}`, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json"
        },
    });

    const postsResults = await posts.json();
    postsResults.forEach(item => {
        console.log(item);

        $("#posts").append(`
        <div class = "post" postId = "${item.id}">
        <p>${item.title}</p>
        <br>
        <p>${item.body}</p>
        </div>
        <hr>
        `);
    })
}

async function updatePost(info) {

    response = await fetch("/api/posts/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(info)
    });

    result = await response.json();
}



