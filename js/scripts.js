const images = [...document.querySelectorAll(".card-img-top")];

//popup

const popup = document.querySelector(".popup");
const closeBtn = document.querySelector(".close-btn");
const popupImg = document.querySelector(".popup-img");
const textSection = document.querySelector(".index");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

let index = 0;

images.forEach((item, i) => {
    item.addEventListener("click", () => {
        updateImage(i);
        popup.classList.toggle("active");
    });
});

const updateImage = (i) => {
    let path = `/assets/img/Rectangle5(${i + 1}).png`;
    popupImg.src = path;
    // textSection.innerHTML = `0${i+1}`;
    index = i;
};

closeBtn.addEventListener("click", () => {
    popup.classList.toggle("active");
});

//functionarea sagetilor
leftArrow.addEventListener("click", () => {
    if (index > 0) {
        updateImage(index - 1);
    }
});

rightArrow.addEventListener("click", () => {
    if (index >= 0) {
        updateImage(index + 1);
    }
});

const API_KEY = "26884950-9bff0307598610d047d34164e";
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
            mainArticleImg.attr("src", data.hits[0].largeImageURL);
            mainArticleTitle.text(data.hits[0].views);
            mainArticleText.text(data.hits[0].tags);
            mainArticleData.text(`Comments: ${data.hits[0].comments}, Likes: ${data.hits[0].likes}`);
            mainArticleAuthor.text(data.hits[0].user);
            $(".first-context").css("display", "flex");

            for (let j = 0; j < smallArticles.length; j++) {
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
