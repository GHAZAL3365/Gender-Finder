const url = "https://api.genderize.io?name=";

const wrapperEl = document.getElementById("wrapper");

const predictBtnEl = document.getElementById("submit");

let predictGender = () => {
  let name = document.getElementById("name").value.trim();
  let errorEl = document.getElementById("error");
  let finalUrl = url + name;

  wrapperEl.innerHTML = "";

  //check if input field is not empty and the entered name does not contain anything but all alphabates
  if (name.length > 0 && /^[A-Za-z]+$/.test(name)) {
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        let div = document.createElement("div");
        div.setAttribute("id", "info");
        div.innerHTML = `<h2 id="result-name">${data.name}</h2><img src="" id="gender-icon" />
        <h3 id="gender">${data.gender}</h3>
         <h4 id="prob">Probability: ${data.probability}</h4>`;

        wrapperEl.append(div);

        if (data.gender === "female") {
          div.classList.add("female");
          document
            .getElementById("gender-icon")
            .setAttribute("src", "female.png");
        } else {
          div.classList.add("male");
          document
            .getElementById("gender-icon")
            .setAttribute("src", "male.jpg");
        }
      });
    document.getElementById("name").value = "";
  } else {
    errorEl.innerText = "Enter a valid name with no spaces";

    setTimeout(() => {
      errorEl.innerText = "";
    }, 3000);
  }
};

predictBtnEl.addEventListener("click", predictGender);

window.addEventListener("load", predictGender);
