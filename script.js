const filterbuttons = document.querySelectorAll(".buttons button");
const rangeinput = document.querySelector("#rangeinput");
const showrange = document.querySelector("#showrange");
const image = document.querySelector("#image");
const fileinput = document.querySelector("#fileinput");
const imageloader = document.querySelector("#image-loader")
const option_container = document.querySelector("#option-container");
const filtername = document.querySelector("#filtername");
const rotatebtns = document.querySelectorAll(".align-options button");


let selectedfilter = "brightness";
let rotate = 0;
let fliphorizontal = 1;
let flipvertical = 1;

rotatebtns.forEach((e) => {
    e.addEventListener("click", () => {
        if (e.id === "left") {
            rotate -= 90;
        }
        if (e.id === "right") {
            rotate += 90;
        }
        if (e.id === "horizontal") {
            fliphorizontal = fliphorizontal === 1 ? -1 : 1
        }
        if (e.id === "vertical") {
            flipvertical = flipvertical === 1 ? -1 : 1
        }
        applyFilters()

    })
})


filterbuttons.forEach((e) => {
    e.addEventListener("click", () => {
        filterbuttons.forEach((e) => e.classList.remove("active"))
        e.classList.add("active")
        filtername.innerHTML = e.id;
        selectedfilter = e.id;
        if (selectedfilter === "brightness" || selectedfilter === "saturation") {
            rangeinput.value = 100;
            showrange.innerHTML = `${rangeinput.value}%`

        } else {
            rangeinput.value = 0;
            showrange.innerHTML = `${rangeinput.value}%`

        }

    })
})


function applyFilters() {
    image.style.filter = `${selectedfilter}(${rangeinput.value}%)`;
    image.style.transform = `rotate(${rotate}deg) scale(${fliphorizontal},${flipvertical})`;

}


rangeinput.addEventListener("input", () => {
    showrange.innerHTML = `${rangeinput.value}%`;
    applyFilters()
})

// add user image function 

function loadimage() {
    const file = fileinput.files[0];
    if (!file) return;
    image.src = URL.createObjectURL(file);
    imageloader.style.display = "none";
    image.style.display = "block";
    option_container.classList.remove("disabled")
    rangeinput.value = 100;
}

function addUserImage() {
    fileinput.click();
    loadimage()
}

imageloader.addEventListener("click", () => {
    loadimage()
})

// save image function 

const saveImage = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    ctx.filter = `${selectedfilter}(${rangeinput.value}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(fliphorizontal, flipvertical);
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
}