//slider section
const slider = document.querySelector("#slider-img");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
let index = 1;

//event tombol prev dan next
next.addEventListener("click", (e) => {
  index += 1;
  if (index > 4) {
    index = 1;
    update();
  } else {
    update();
  }
});

prev.addEventListener("click", (e) => {
  index -= 1;
  if (index < 1) {
    index = 4;
    update();
  } else {
    update();
  }
});

//mengubah src pada elemen image
function update() {
  slider.setAttribute("src", `./img/${index}.jpg`);
}

//add autoplay slider
const autoPlay = setInterval(() => {
  next.click();
}, 2000);

//dropdown section
const dropBtn = document.querySelector(".drop-btn");
const dropContent = document.querySelector(".drop-content");

dropContent.addEventListener("click", () => {
  setInterval(() => {
    if (dropContent.classList.contains("drop")) {
      dropContent.classList.remove("drop");
    }
  }, 3000);
});

//event untuk mengganti display .drop-content
dropBtn.addEventListener("click", () => {
  dropContent.classList.toggle("drop");
});

//event untuk search player DOTA 2 dengan API dota 2
const submitDota = document.querySelector(".submit-dota");

submitDota.addEventListener("click", () => {
  const namePlayerDota = document.querySelector(".dota").value;
  const url = `https://api.opendota.com/api/search?q=${namePlayerDota}`;
  // console.log(namePlayerDota);
  $.getJSON(url, (data) => {
    // console.log(data[0]);
    let result = "";
    $.each(data, (i, data) => {
      result += `<tr><td>${i + 1}</td><td>${
        data.personaname
      }</td><td><img src="${data.avatarfull}" width=50></td><td>${
        data.similarity
      }</td></tr>`;
    });
    const fullTable =
      "<table><tr><th>No</th><th>PersonaName</th><th>Avatar</th><th>Similarity</th></tr>" +
      result +
      "</table>";
    $(".output-dota").empty();
    if (data < 1) {
      $(".output-dota").html("<h2>Data Tidak Ditemukan</h2>");
    } else {
      $(".output-dota").html(fullTable);
    }
  });
});

$.getJSON("https://api.opendota.com/api/proPlayers", (data) => {
  // console.log(data);
  let result = "";
  $.each(data, (i, data) => {
    if (i < 10) {
      result += `<tr><td>${i + 1}</td><td>${
        data.account_id
      }</td><td><img src="${data.avatar}" width=50></td><td>${
        data.personaname
      }</td></tr>`;
    }
  });
  const fullTable =
    "<table><tr><th>No</th><th>AccountID</th><th>Avatar</th></th><th>PersonaName</th></tr>" +
    result +
    "</table>";
  $(".top-player-dota").html(fullTable);
  // console.log(data);
});
