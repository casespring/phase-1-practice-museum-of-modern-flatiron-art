// console.log('Write your code here'); my code

// fetch("http://localhost:3000/current-exhibits")
//     .then(res => res.json())
//     .then(data => {
//         data.forEach(exhibitFunc)
//         let commentsArray = []
//     })

//     function exhibitFunc(exhibits) {
//         console.log(exhibits)

//         let title = document.querySelector("#exhibit-title");
//         title.textContent = exhibits.title;

//         let name = document.getElementsByTagName("h3")
//         name[0].textContent += ` ${exhibits["artist_name"]}`

//         let tickets = document.querySelector("#buy-tickets-button");

//         let ticketsBought = document.querySelector("#tickets-bought");
//         ticketsBought.textContent = exhibits["tickets_bought"];

//         let exhibitDescription = document.querySelector("#exhibit-description");
//         exhibitDescription.textContent = exhibits.description;

//         let currentImage = document.querySelector("#exhibit-image");
//         currentImage.src = exhibits.image;

//         let commentSection = document.querySelector("#comments-section");
//         console.log(commentSection)
        
//         let ticketsBoutghtCounter = 0;
//         for (let i = 0; i < exhibits.comments.length; i++) {
//             let p = document.createElement('p')
//             p.textContent = exhibits.comments[i]
//             commentSection.append(p);
//             console.log(commentSection)
//         }


//         let form = document.querySelector("#comment-form");
    
//         form.addEventListener("submit", e => {
//             e.preventDefault();
//             console.log(e.target)
//             console.log(e.target["comment-input"].value)
//             let newCommentP = document.createElement('p')
//             newCommentP.innerText = e.target["comment-input"].value;
//             commentSection.append(newCommentP)
            
//            //p.innerText = e.target["comment-input"].value
           
//            fetch("http://localhost:3000/current-exhibits/1", {
//                 method: "PATCH",
//                 headers: {
//                     "content-type": "application/json"
//                 },
//                     body: JSON.stringify({
//                         comments: newCommentP
//                     })
//            }).then(res => res.json()).then(data => {
//                 console.log(data);
//                 console.log(data.comments)
//            })


//         })

//         tickets.addEventListener('click', (e) => {
//             console.log(e)
//             ticketsBoutghtCounter += 1 
//             ticketsBought.textContent = `${ticketsBoutghtCounter} Tickets Bought`
//         })


//     }

        
// Teacher code
let comments = [];

fetch("http://localhost:3000/current-exhibits")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        renderExhibit(data[0]);
        comments = data[0].comment
    });

function renderExhibit(exhibit) {
    let title = document.querySelector("#exhibit-title");
    title.textContent = exhibit.title

    let name = document.getElementsByTagName("h3")
    name[0].textContent += ` ${exhibit["artist_name"]}`

    let tickets_bought = document.querySelector("#tickets-bought");
    tickets_bought.textContent = exhibit.tickets_bought + " Ticket bought";

    let description = document.querySelector("#exhibit-description")
    description.textContent = exhibit.description

    let image = document.querySelector("#exhibit-image");
    image.src = exhibit.image;

    for (let comment of exhibit.comments) {
        renderComments(comment);
    }

    let button = document.querySelector("#buy-tickets-button");

    let count = exhibit.tickets_bought;
    button.addEventListener('click', function () {
            count++
            
            fetch("http://localhost:3000/current-exhibits/1", {
                method: "PATCH",
                headers: {
                    "content-type": "Application/json",
                },
                body: JSON.stringify({
                    tickets_bought: count,
                }),
            }).then(res => res.json()).then(data => { 
                console.log(data);              
                tickets_bought.textContent = count + " Ticket bought";
            })
    })
}

function renderComments(comment) {
    let comment_section = document.querySelector("#comments-section")

    let newComment = document.createElement("p");
    newComment.textContent = comment;

    comment_section.append(newComment);
}

let form = document.querySelector("#comment-form");
form.addEventListener("submit", function (e) {
    e.preventDefault()
    let newComment = e.target["comment-input"].value;
    renderComments(newComment);

    fetch("http://localhost:3000/current-exhibits/1", {
        method: "PATCH",
        headers: {
            "content-type": "Application/json",
        },
        body: JSON.stringify({
            comments: [...comments, newComment],

        })
    }) 

})

