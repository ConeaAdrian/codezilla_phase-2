$(document).ready(function () {
    const bookmarkBtn = $(".bookmark-btn");
    let favoriteImgWrapper = $(".favorite-images");
    let bookmarksNumber = 0;

    bookmarkBtn.click(function () {
        localStorage.setItem(`image${bookmarksNumber}`, $(this).parent().parent().parent().parent().find(".card-img-top").attr("src"));

        if (localStorage.getItem(`image${bookmarksNumber - 1}`) === localStorage.getItem(`image${bookmarksNumber}`)) {
            localStorage.removeItem(`image${bookmarksNumber - 1}`);
            localStorage.removeItem(`image${bookmarksNumber}`);
        }

        bookmarksNumber++;
    });

    for (let i = 0; i < localStorage.length; i++) {
        let img = $("<img src='' alt='' />");
        let key = localStorage.key(i);
        img.attr("src", localStorage.getItem(key));
        favoriteImgWrapper.append(img);
    }
});
