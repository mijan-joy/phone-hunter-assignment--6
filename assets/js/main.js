const searchPhone = () => {
  const searchValue = document.getElementById("phone-input").value;
  //   console.log(searchValue);
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  //   console.log(url);
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => displayResult(data.data.slice(0, 9)));
  document.getElementById("phone-input").value = "";
};
const displayResult = (brands) => {
  //   console.log(phones);
  for (const brand of brands) {
    console.log(brand);
    const searchResult = document.getElementById("search-result");
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card rounded">
            <img src="${brand.image}" class="card-img-top p-3" alt="..." />
            <div class="card-body">
            <h5 class="card-title  text-center">${brand.phone_name}</h5>
            <h6 class="card-title  text-center">${brand.brand}</h6>
            <h6 class="card-title  text-center">Model: ${brand.slug}</h6>
            <p class="card-text"> </p>
            <button onclick="loadDetails('${brand.slug}')" class="btn btn-success btn-sm">Details</button>
            </div>
        </div>
    `;
    searchResult.appendChild(div);
  }
};

const loadDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  //   console.log(url);
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => setDetails(data.data));
};

const setDetails = (slug) => {
  console.log(slug.name);
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = "";
  const div = document.createElement("div");

  div.innerHTML = `
  <img class="card-img-top" src="${slug.image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${slug.slug}</h5>
          <p class="card-text">${slug.releaseDate}</p>
          <p class="card-text">${slug.mainFeatures.storage}</p>
          <p class="card-text">Sensor: ${slug.mainFeatures.sensors}</p>
          
          <a href="${slug.strYoutube}" class="btn btn-primary">Go somewhere</a>,
        </div>
  `;
  phoneDetails.append(div);
};
