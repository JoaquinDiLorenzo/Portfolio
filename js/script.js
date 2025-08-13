
window.addEventListener('load', () => {
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    /* ------ Page Loader ------ */
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".page-loader").style.display = "none";
    }, 600);
})


/*--------------- Toogle Navbar ---------------*/
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () => {
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
});

function hideSection() {
    document.querySelector("section.active").classList.toggle("fade-out");
}

function toggleNavbar() {
    document.querySelector(".header").classList.toggle("active");
}

/*--------------- Active Section ---------------*/
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("link-item") && e.target.hash !== "") {
        //activate the overlay to prevent multiple clicks
        document.querySelector(".overlay").classList.add("active");
        navToggler.classList.add("hide");
        const hash = e.target.hash;
        if (e.target.classList.contains("nav-item")) {
            toggleNavbar();
        } else {
            hideSection();
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(() => {
            document.querySelector("section.active").classList.remove("active", "fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0,0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");
        }, 500)
    }
})

/*--------------- Portfolio Item Details Popup ---------------*/
document.addEventListener('click', (e) => {
    if(e.target.classList.contains("view-project-btn")){
        tooglePortfolioPopup();
        document.querySelector(".portfolio-popup").scrollTo(0,0);
        portfolioItemDetails(e.target.parentElement);
    }
});

function tooglePortfolioPopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}

document.querySelector(".pp-close").addEventListener("click", tooglePortfolioPopup);

// hide popup when clicking outside of it
document.addEventListener("click", (e) => {
    if(e.target.classList.contains("pp-inner")) {
        tooglePortfolioPopup()
    }
})

function portfolioItemDetails(portfolioItem) {
    document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML = portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML = portfolioItem.querySelector(".portfolio-item-details").innerHTML;
}

/*--------------- COntact Form ---------------*/
const $form = document.querySelector("#form");

$form.addEventListener("submit", handleSubmit );

async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(this);
    const response = await fetch(this.action, {
        method: this.method,
        body: form,
        headers: {
            'Accept': 'application/json'
        }
    });

    if(response.ok) {
        this.reset();
        alert('Thank you for contacting me, I will answer you as soon as possible!!!');
    }
}