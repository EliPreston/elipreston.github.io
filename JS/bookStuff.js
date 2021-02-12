
$('#top').click(function() { // when the button is clicked
    $('body,html').animate({scrollTop:0},1000); // return to the top with animation
  });


var firebaseConfig = {
    apiKey: "AIzaSyBeULEfZbAHtop5935vjHi9J0qNmvbKVF4",
    authDomain: "personalwebsite-githubio.firebaseapp.com",
    projectId: "personalwebsite-githubio",
    storageBucket: "personalwebsite-githubio.appspot.com",
    messagingSenderId: "342215478826",
    appId: "1:342215478826:web:3cca59a418d7dbc3c97d53",
    measurementId: "G-2Z3L0JLSBD",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var storage = firebase.storage();
  var storageRef = storage.ref();




const suggestedDisplay = document.getElementById("suggestedDisplay");
const suggestion_form = document.querySelector("#suggestionForm")
const bookDisplay = document.getElementById("bookDisplay");



document.addEventListener("DOMContentLoaded", function () {
    options = { opacity: 0.95 };
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems, options);
});


newSuggestionPostKey = database.ref().child("posts").push().key;

suggestion_form.addEventListener('submit', (e) => {
    e.preventDefault()

    const bookName = document.getElementById("bookName").value;
    const userSynposis = document.getElementById("userSynposis").value;
    const modal = document.querySelector("#bookSuggestion")


    var bookName2 = bookName.toLowerCase();
    var userSynposis2 = userSynposis.toLowerCase();
    var arr1 = bookName2.split(" ");
    var arr2 = userSynposis2.split(" ");

    var badWords = ["fuck", "shit", "bitch"];
    var foundBadWords1 = arr1.filter(el => badWords.includes(el));
    var foundBadWords2 = arr2.filter(el => badWords.includes(el));


    if (foundBadWords1.length > 0 || foundBadWords2.length > 0) {
        alert("I'm sorry but an expletive has been found in your input. Please retype your suggestion in a more polite manner.")
    }
    else {

        postData = {
        book: bookName,
        synposis: userSynposis,
        };

        var updates = {};
        updates["/posts/" + newSuggestionPostKey] = postData;
        database.ref().update(updates);
    }

    suggestion_form.reset()
    M.Modal.getInstance(modal).close();
});


function createCardBooksRead(booksOBJ) {
    const card = `
    <div class="col s12 m12 l4">
        <div class="card large blue-grey darken-1">
            <div class="card-content white-text">
                <span class="card-title black-text"">${booksOBJ["bookname"]}</span>
                <p>${booksOBJ["synopsis"]}</p>
                <p>Pages: ${booksOBJ["pages"]}</p>
                <p>Rating: ${booksOBJ["myrating"]}</p>
            </div>
            <div class="card-content green-text">
                <img alt="Image not found." style="height: 10vw; width: auto;" class="responsive-img cardpicMY" id = "${booksOBJ["img"]}" src="">
            </div>
            <div class="card-action">
                <a href="#">${booksOBJ["booklink"]}</a>
            </div>
        </div>
    </div>
    `;

    return card;
}
function setImage2(obj, info) {


    storageRef
      .child("bookCovers/" + info["img"])
      .getDownloadURL()
      .then(function (url) {
        obj.src = url;
      });
  }
databaseDB = firebase
.database()
.ref("/books/booksRead/")
.on("value", (snapshot) => {
    data = snapshot.val();


    for (key in data) {
        bookDisplay.innerHTML += createCardBooksRead(data[key]);
    }

    cards = document.getElementsByClassName("cardpicMY");
    
    for (i = 0; i < cards.length; i = i + 1) {
        setImage2(cards[i], data[i]);
      }

});



const listDisplay = document.getElementById("listDisplay");
function createCardBookList(booksOBJ) {
const card = `
<div class="col s12 m6 l4">
    <div class="card small grey darken-1">
        <div class="card-content white-text">
            <span class="card-title black-text"">${booksOBJ["bookname"]}</span>
        </div>
        <div class="card-content green-text">
            <img alt="Image not found." style="height: 10vw; width: auto;" class="responsive-img cardpicLIST" id = "${booksOBJ["img"]}" src="">
        </div>
        <div class="card-action">
            <a href="#">${booksOBJ["booklink"]}</a>
    </div>
</div>
`;

return card;
}
function setImage(obj, info) {


    storageRef
      .child("bookListCovers/" + info["img"])
      .getDownloadURL()
      .then(function (url) {
        obj.src = url;
      });
  }
databaseDB = firebase
    .database()
    .ref("/bookList/bookList/")
    .on("value", (snapshot) => {
        data = snapshot.val();

     
        for (key in data) {
            listDisplay.innerHTML += createCardBookList(data[key]);
        }

        cards = document.getElementsByClassName("cardpicLIST");

        for (i = 0; i < cards.length; i = i + 1) {
            setImage(cards[i], data[i]);
          }
    });




function createCardSuggestedBooks(data, key) {
    const card = `<div class="col l4">
                        <div class="card small deep-purple lighten-1" id="${key}">
                            <div class="card-content white-text">
                                <span class="card-title"><h5>${data["book"]}</h5></span>
                                <p>Synopsis: ${data["synposis"]}</p>
                                <br>
                                <p style="color:black">Post ID: ${key}</p>
                                <br>
                            </div>
                        </div>
                    </div>
                `;

    return card;
}
database.ref("/posts/").on("child_added", (snapshot) => {
    data = snapshot.val();
    key = snapshot.key;

    d = document.createElement("div");

    d.id = key + "c";
    d.innerHTML = createCardSuggestedBooks(data, key);
    suggestedDisplay.appendChild(d);
});

