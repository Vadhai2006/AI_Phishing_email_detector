// ==========================================================
// AI PHISHING EMAIL DETECTOR
// Premium JavaScript
// Part 1
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    initializeCounter();
    initializeProgressBars();
    initializeAnimations();
    initializeButtons();
    initializeTextarea();

});


// ==========================================================
// TEXTAREA CHARACTER COUNTER
// ==========================================================

function initializeCounter() {

    const textarea = document.querySelector("textarea");

    if (!textarea) return;

    const counter = document.createElement("div");

    counter.className = "char-counter";

    counter.style.textAlign = "right";
    counter.style.marginTop = "8px";
    counter.style.color = "#b9c7d6";
    counter.style.fontSize = "14px";

    textarea.parentNode.appendChild(counter);

    function updateCounter() {

        counter.innerHTML =
            textarea.value.length + " Characters";

    }

    textarea.addEventListener("input", updateCounter);

    updateCounter();

}


// ==========================================================
// PROGRESS BAR ANIMATION
// ==========================================================

function initializeProgressBars() {

    const bars = document.querySelectorAll(".progress-bar");

    bars.forEach(bar => {

        const width = bar.style.width;

        bar.style.width = "0%";

        setTimeout(() => {

            bar.style.width = width;

        }, 300);

    });

}


// ==========================================================
// CARD ANIMATION
// ==========================================================

function initializeAnimations() {

    const cards = document.querySelectorAll(".result-card");

    cards.forEach((card, index) => {

        card.style.opacity = "0";

        card.style.transform = "translateY(30px)";

        setTimeout(() => {

            card.style.transition =
                "all .6s ease";

            card.style.opacity = "1";

            card.style.transform =
                "translateY(0px)";

        }, index * 120);

    });

}


// ==========================================================
// BUTTON EFFECTS
// ==========================================================

function initializeButtons() {

    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {

        button.addEventListener("mouseenter", () => {

            button.style.transform = "translateY(-3px) scale(1.02)";

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });

}


// ==========================================================
// AUTO RESIZE TEXTAREA
// ==========================================================

function initializeTextarea() {

    const textarea = document.querySelector("textarea");

    if (!textarea) return;

    textarea.addEventListener("input", function () {

        this.style.height = "auto";

        this.style.height = this.scrollHeight + "px";

    });

}
// ==========================================================
// COPY EMAIL BUTTON
// ==========================================================

function copyEmail() {

    const textarea = document.querySelector("textarea");

    if (!textarea || textarea.value.trim() === "") {

        showToast("Nothing to copy!");

        return;

    }

    navigator.clipboard.writeText(textarea.value)
        .then(() => {

            showToast("Email copied successfully.");

        })
        .catch(() => {

            showToast("Unable to copy email.");

        });

}


// ==========================================================
// PRINT REPORT
// ==========================================================

function printReport() {

    window.print();

}


// ==========================================================
// SCROLL TO TOP
// ==========================================================

const scrollButton = document.createElement("button");

scrollButton.innerHTML = "↑";

scrollButton.className = "scroll-top";

scrollButton.style.position = "fixed";
scrollButton.style.right = "25px";
scrollButton.style.bottom = "25px";
scrollButton.style.width = "50px";
scrollButton.style.height = "50px";
scrollButton.style.borderRadius = "50%";
scrollButton.style.border = "none";
scrollButton.style.cursor = "pointer";
scrollButton.style.display = "none";
scrollButton.style.fontSize = "22px";
scrollButton.style.zIndex = "999";
scrollButton.style.background = "#00bcd4";
scrollButton.style.color = "#fff";

document.body.appendChild(scrollButton);

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        scrollButton.style.display = "block";

    } else {

        scrollButton.style.display = "none";

    }

});

scrollButton.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


// ==========================================================
// THREAT SCORE ANIMATION
// ==========================================================

function animateThreatScore() {

    const scoreElement = document.querySelector(".threat-score");

    if (!scoreElement) return;

    const target = parseInt(scoreElement.innerText);

    if (isNaN(target)) return;

    let value = 0;

    const interval = setInterval(() => {

        value++;

        scoreElement.innerText = value;

        if (value >= target) {

            clearInterval(interval);

        }

    }, 15);

}

animateThreatScore();


// ==========================================================
// TYPING EFFECT
// ==========================================================

function typingEffect(element, speed = 20) {

    if (!element) return;

    const text = element.innerText;

    element.innerText = "";

    let index = 0;

    const timer = setInterval(() => {

        element.innerText += text[index];

        index++;

        if (index >= text.length) {

            clearInterval(timer);

        }

    }, speed);

}

const recommendation = document.querySelector(".recommendation-text");

if (recommendation) {

    typingEffect(recommendation);

}


// ==========================================================
// TOAST NOTIFICATION
// ==========================================================

function showToast(message) {

    const toast = document.createElement("div");

    toast.innerText = message;

    toast.style.position = "fixed";
    toast.style.top = "30px";
    toast.style.right = "30px";
    toast.style.padding = "15px 22px";
    toast.style.borderRadius = "12px";
    toast.style.background = "#00bcd4";
    toast.style.color = "#fff";
    toast.style.fontWeight = "600";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = ".4s";

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.style.opacity = "1";

    }, 100);

    setTimeout(() => {

        toast.style.opacity = "0";

        setTimeout(() => {

            toast.remove();

        }, 400);

    }, 2500);

}


// ==========================================================
// KEYBOARD SHORTCUTS
// ==========================================================

document.addEventListener("keydown", function(e){

    if(e.ctrlKey && e.key === "Enter"){

        const form = document.querySelector("form");

        if(form){

            form.submit();

        }

    }

});
// ==========================================================
// LOADING EFFECT
// ==========================================================

function initializeLoading() {

    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", function () {

        const button = this.querySelector('button[type="submit"]');

        if (!button) return;

        button.disabled = true;

        button.dataset.originalText = button.innerHTML;

        button.innerHTML = `
            <span class="loader"></span>
            Analyzing...
        `;

    });

}

initializeLoading();


// ==========================================================
// FORM VALIDATION
// ==========================================================

function validateForm() {

    const form = document.querySelector("form");

    if (!form) return;

    form.addEventListener("submit", function (e) {

        const textarea = this.querySelector("textarea");

        if (!textarea) return;

        if (textarea.value.trim().length < 15) {

            e.preventDefault();

            showToast("Please enter a complete email.");

            return false;

        }

    });

}

validateForm();


// ==========================================================
// RIPPLE EFFECT
// ==========================================================

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", function (e) {

        const ripple = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        ripple.style.width = ripple.style.height = diameter + "px";

        ripple.style.position = "absolute";

        ripple.style.borderRadius = "50%";

        ripple.style.left =
            e.clientX - this.getBoundingClientRect().left - diameter / 2 + "px";

        ripple.style.top =
            e.clientY - this.getBoundingClientRect().top - diameter / 2 + "px";

        ripple.style.background = "rgba(255,255,255,.35)";

        ripple.style.transform = "scale(0)";

        ripple.style.animation = "ripple .6s linear";

        ripple.style.pointerEvents = "none";

        this.style.position = "relative";

        this.style.overflow = "hidden";

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


// ==========================================================
// FADE IN ON SCROLL
// ==========================================================

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("fade-up");

        }

    });

}, {

    threshold: 0.2

});

document.querySelectorAll(".result-card,.tip,.stat-card").forEach(element => {

    observer.observe(element);

});


// ==========================================================
// EMAIL STATISTICS
// ==========================================================

function calculateStats() {

    const textarea = document.querySelector("textarea");

    if (!textarea) return;

    const text = textarea.value;

    const words = text.trim().split(/\s+/).filter(Boolean).length;

    const characters = text.length;

    const links = (text.match(/https?:\/\/|www\./gi) || []).length;

    const emails = (text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []).length;

    console.log({

        words,

        characters,

        links,

        emails

    });

}

const textarea = document.querySelector("textarea");

if (textarea) {

    textarea.addEventListener("input", calculateStats);

}


// ==========================================================
// PREVENT DOUBLE SUBMIT
// ==========================================================

let submitted = false;

document.querySelector("form")?.addEventListener("submit", function (e) {

    if (submitted) {

        e.preventDefault();

        return;

    }

    submitted = true;

});


// ==========================================================
// CURRENT YEAR
// ==========================================================

const year = document.querySelector(".current-year");

if (year) {

    year.textContent = new Date().getFullYear();

}


// ==========================================================
// PAGE READY
// ==========================================================

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    console.log("AI Phishing Email Detector Loaded Successfully");

});


// ==========================================================
// END OF FILE
// ==========================================================