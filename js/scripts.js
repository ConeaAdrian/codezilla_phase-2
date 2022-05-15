const images = [...document.querySelectorAll(".card-img-top")];

//popup

const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");
const popupImg = document.querySelector(".popup-img");
const popupTitle = document.querySelector(".popup .main-title");
const popupText = document.querySelector(".article-text");
const popupAuthor = document.querySelector(".authot");
const popupData = document.querySelector(".data");
const textSection = document.querySelector(".index");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

const API_KEY = "26884950-9bff0307598610d047d34164e";
let URL = `https://pixabay.com/api/?key=${API_KEY}&category=places`;

let index = 0;

let oldPost;
let newPost;

let postNumber = 0;

images.forEach((item, i) => {
    item.addEventListener("click", (event) => {
        let target = event.target;

        if (target.closest(".first-context")) {
            updateImage(
                target.src,
                target.closest(".first-context").children[0].children[0],
                target.closest(".first-context").children[0].children[1],
                target.closest(".first-context").children[0].children[2].children[0].children[0],
                target.closest(".first-context").children[0].children[2].children[0].children[1],
                false
            );
        } else {
            updateImage(
                target.src,
                target.closest(".card").children[1].children[0],
                target.closest(".card").children[1].children[1],
                target.closest(".card").children[1].children[2].children[0].children[0],
                target.closest(".card").children[1].children[2].children[0].children[1],
                false
            );
        }

        popup.classList.toggle("active");
    });
});

const updateImage = (path, views, tags, author, commentsAndLikes, popup) => {
    if (popup) {
        popupImg.src = path;
        popupTitle.textContent = views;
        popupText.textContent = tags;
        popupAuthor.textContent = author;
        popupData.textContent = commentsAndLikes;
    } else {
        popupImg.src = path;
        popupTitle.textContent = views.textContent;
        popupText.textContent = tags.textContent;
        popupAuthor.textContent = author.textContent;
        popupData.textContent = commentsAndLikes.textContent;
    }
};

closeBtn.addEventListener("click", () => {
    popup.classList.toggle("active");
});

//functionarea sagetilor
leftArrow.addEventListener("click", () => {
    index--;
    if (index >= 0) {
        $.getJSON(URL, function (data) {
            updateImage(
                data.hits[index].largeImageURL,
                data.hits[index].views,
                data.hits[index].tags,
                data.hits[index].user,
                `Comments: ${data.hits[index].comments}, Likes: ${data.hits[index].likes}`,
                true
            );
        });
    }
});

rightArrow.addEventListener("click", () => {
    index++;
    if (index >= 0) {
        $.getJSON(URL, function (data) {
            updateImage(
                data.hits[index].largeImageURL,
                data.hits[index].views,
                data.hits[index].tags,
                data.hits[index].user,
                `Comments: ${data.hits[index].comments}, Likes: ${data.hits[index].likes}`,
                true
            );
        });
    }
});

const searchInput = $("#search");

let searchSubmit = $(".searchSubmit"),
    mainArticleImg = $(".first-context .card-img-top"),
    mainArticleTitle = $(".main-article-title"),
    mainArticleText = $(".main-article-text"),
    mainArticleData = $(".main-article-data"),
    mainArticleAuthor = $(".main-article-author");

let smallArticles = $(".card");

searchSubmit.click(function () {
    let query = searchInput.val();

    const URL = `https://pixabay.com/api/?key=${API_KEY}&category=places&q=${encodeURIComponent(`${query}`)}`;
    $.getJSON(URL, function (data) {
        if (parseInt(data.hits.length) > 0) {
            mainArticleImg.attr("src", data.hits[postNumber].largeImageURL);
            mainArticleTitle.text(data.hits[postNumber].views);
            mainArticleText.text(data.hits[postNumber].tags);
            mainArticleData.text(`Comments: ${data.hits[postNumber].comments}, Likes: ${data.hits[postNumber].likes}`);
            mainArticleAuthor.text(data.hits[postNumber].user);
            $(".first-context").css("display", "flex");

            for (let j = postNumber; j < smallArticles.length; j++) {
                smallArticles[j].children[0].src = data.hits[j + 1].largeImageURL;
                smallArticles[j].children[1].childNodes[1].textContent = data.hits[j + 1].views;
                smallArticles[j].children[1].childNodes[3].textContent = data.hits[j + 1].tags;
                smallArticles[j].children[1].childNodes[5].childNodes[1].children[0].textContent = data.hits[j + 1].user;
                smallArticles[j].children[1].childNodes[5].childNodes[1].children[1].textContent = `Comments: ${data.hits[j + 1].comments}, Likes: ${
                    data.hits[j + 1].likes
                }`;
            }

            $(".small-articles").css("display", "flex");
        } else {
            console.log("No hits");
        }
    });
});

let seeAllArticlesBtn = $("#all-popular-content");
let nextArticles = $(".content-article");

seeAllArticlesBtn.click(function () {
    let query = searchInput.val();
    const URL = `https://pixabay.com/api/?key=${API_KEY}&category=places&q=${encodeURIComponent(`${query}`)}`;
    $.getJSON(URL, function (data) {
        if (parseInt(data.hits.length) > 0) {
            for (let j = 0; j < nextArticles.length; j++) {
                nextArticles[j].children[0].src = data.hits[j + 4].largeImageURL;
                nextArticles[j].children[1].childNodes[1].textContent = data.hits[j + 4].views;
                nextArticles[j].children[1].childNodes[3].textContent = data.hits[j + 4].tags;
                nextArticles[j].children[1].childNodes[5].childNodes[1].children[0].textContent = data.hits[j + 4].user;
                nextArticles[j].children[1].childNodes[5].childNodes[1].children[1].textContent = `Comments: ${data.hits[j + 4].comments}, Likes: ${
                    data.hits[j + 4].likes
                }`;
            }

            $(".all-elements").show();
        } else {
            console.log("No hits");
        }
    });

   

});

$("#old-post").click(function (event) {
    event.preventDefault();
    postNumber++;

    let query = searchInput.val();

    const URL = `https://pixabay.com/api/?key=${API_KEY}&category=places&q=${encodeURIComponent(`${query}`)}`;
    $.getJSON(URL, function (data) {
        if (parseInt(data.hits.length) > 0) {
            mainArticleImg.attr("src", data.hits[postNumber].largeImageURL);
            mainArticleTitle.text(data.hits[postNumber].views);
            mainArticleText.text(data.hits[postNumber].tags);
            mainArticleData.text(`Comments: ${data.hits[postNumber].comments}, Likes: ${data.hits[postNumber].likes}`);
            mainArticleAuthor.text(data.hits[postNumber].user);
            $(".first-context").css("display", "flex");

            for (let j = 0; j < smallArticles.length; j++) {
                smallArticles[j].children[0].src = data.hits[postNumber + 1 + j].largeImageURL;
                smallArticles[j].children[1].childNodes[1].textContent = data.hits[postNumber + 1 + j].views;
                smallArticles[j].children[1].childNodes[3].textContent = data.hits[postNumber + 1 + j].tags;
                smallArticles[j].children[1].childNodes[5].childNodes[1].children[0].textContent = data.hits[postNumber + 1 + j].user;
                smallArticles[j].children[1].childNodes[5].childNodes[1].children[1].textContent = `Comments: ${data.hits[postNumber + 1 + j].comments}, Likes: ${
                    data.hits[postNumber + 1 + j].likes
                }`;
            }

            $(".small-articles").css("display", "flex");
        } else {
            console.log("No hits");
        }
    });
});

