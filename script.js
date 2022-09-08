let url = "https://random-flat-colors.vercel.app/api/random?count=5";

let leftbtns = document.querySelectorAll(".leftclrbtn");
let rightbtns = document.querySelectorAll(".rightclrbtn");
let addbtn = document.querySelector(".addBtn");
let rightsection = document.querySelector(".right");
let crossbtn = document.querySelector(".cross");
let donebtn = document.querySelector(".donebtn");
let subtitleInput = document.querySelector("#subtitleInput");
let titleInput = document.querySelector("#titleInput");
let color = -1;
let righcolordiv = document.querySelector(".rightbtn");
let creativeContainer = document.querySelector(".creatives");
let range = document.querySelector(".rangebar");
let creativecount = document.getElementById("spancount");
let counts = 0;
let creativedivs = document.getElementsByClassName("properties");
let leftclrbox = document.querySelector(".clr");
let filterInput = document.querySelector(".search");
let searchclr = -1;

//To filter the creatives by color
leftclrbox.addEventListener("click", (event) => {
  if (event.target.tagName === "INPUT" && event.target.name === "lc") {
    searchclr = event.target.id;
    if (filterInput.value === "") {
      for (let element of creativedivs) {
        if (!element.classList.contains(event.target.id)) {
          element.style.display = "none";
        } else {
          if (element.style.display === "none") element.style.display = "block";
          else {
            element.style.display = "block";
          }
        }
      }
    } else {
      for (let element of creativedivs) {
        if (
          !element.classList.contains(event.target.id) ||
          !element.classList.contains(filterInput.value)
        ) {
          element.style.display = "none";
        } else {
          element.style.display = "block";
        }
      }
    }
  }
});

filterInput.addEventListener("input", (event) => {

  if (searchclr === -1) {
    for (let element of creativedivs) {
      if (element.classList.contains(filterInput.value)) {
        if (element.style.display === "none") {
          element.style.display = "block";
        }
      } else {
        element.style.display = "none";
      }
    }
  }
  else {
   
    for (let element of creativedivs) {
      if (
        element.classList.contains(filterInput.value) &&
        element.classList.contains(searchclr)
      ) {
        if (element.style.display === "none") {
          element.style.display = "block";
        } else {
          element.style.display = "block";
        }
      } 
      else {
        element.style.display = "none";
      }
    }
  }
});

document.addEventListener("click", (event) => {
  if (event.target.tagName !== "INPUT") {
    let creatives = document.getElementsByClassName("properties");
    for (let i = 0; i < creatives.length; i++) {
      creatives[i].style.display = "block";
    }
    searchclr = -1;
  }
});

// To add bg color to all buttons by fetching colors from the API
async function addColors() {
  let response = await fetch(url);
  let data = await response.json();

  let colors = data.colors;

  for (let i = 0; i < colors.length; i++) {
    leftbtns[i].style.backgroundColor = colors[i];
    leftbtns[i].setAttribute("id", colors[i]);
    rightbtns[i].style.backgroundColor = colors[i];
    rightbtns[i].setAttribute("id", colors[i]);
  }
}

addColors();

// To open the right section after clicking on add btn
addbtn.addEventListener("click", () => {
  if (counts >= 5) {
    alert("Cannot create more than 5 creatives");
    return;
  }
  rightsection.style.display = "block";
  addbtn.disabled = "true";
});

// To close the right section after clicking on cross
crossbtn.addEventListener("click", () => {
  rightsection.style.display = "none";
  addbtn.disabled = false;
});

// To create a new creative
donebtn.addEventListener("click", (event) => {
  if (subtitleInput.value === "" || titleInput.value === "" || color === -1) {
    alert("All the fields need to be filled");
    return;
  }

  counts++;
  let eachcreative = document.createElement("section");
  eachcreative.setAttribute("class", "properties");
  eachcreative.classList.add(color);
  eachcreative.classList.add(subtitleInput.value);
  eachcreative.classList.add(titleInput.value);

  let title = titleInput.value;
  let subTitle = subtitleInput.value;

  let heading = document.createElement("h3");
  let para = document.createElement("p");
  heading.innerText = title;
  para.innerText = subTitle;
  
  eachcreative.appendChild(heading);
  eachcreative.appendChild(para);
  eachcreative.style.backgroundColor = color;
  
  range.value = counts * 20;
  creativecount.innerHTML = counts;
  creativeContainer.appendChild(eachcreative);
  titleInput.value = "";
  subtitleInput.value = "";
  color = -1;
  rightsection.style.display = "none";
  addbtn.disabled = false;
});

//To select color for creating creative
righcolordiv.addEventListener("click", (event) => {
  if (event.target.tagName === "INPUT") {
    color = event.target.id;
    if (subtitleInput !== "" && titleInput !== "") donebtn.disabled = false;
  }
});
