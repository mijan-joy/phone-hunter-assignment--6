const searchPhone = () => {
  document.getElementById("search-result").textContent = "";
  document.getElementById("phone-details").textContent = "";
  displayError("none");
  const searchValue = document.getElementById("phone-input").value;

  if (searchValue == "") {
    displayError("block");
    notfound("none");
  } else {
    displayError("none");
    displaySpinner("block");
    //   console.log(searchValue);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
    //   console.log(url);
    fetch(url)
      .then((Response) => Response.json())
      // .then((data) => displayResult(data.data));
      .then((data) => displayResult(data.data.slice(0, 20)));
    document.getElementById("phone-input").value = "";
  }
};

const displayResult = (brands) => {
  // console.log(displayResult);
  displaySpinner("none");
  //   console.log(phones);
  if (brands.length == 0) {
    document.getElementById("notfound").style.display = "block";
  } else {
    for (const brand of brands) {
      // console.log(brand);
      const searchResult = document.getElementById("search-result");
      const div = document.createElement("div");
      div.innerHTML = `
    <div class="card shadow p-2 alert-info" id="card">
            <img src="${brand.image}" class="card-img-top p-3" alt="..." />
            <div class="card-body">
            <p class="card-text">
            <h5 class="card-title  text-center">${brand.phone_name}</h5>
            <h6 class="card-title  text-center">${brand.brand}</h6>
             </p>
            <div class="mx-auto text-center"><button onclick="loadDetails('${brand.slug}')" type="button" class="btn btn-dark btn-sm ">See More</button>
            </div>
            </div>
        </div>`;
      document.getElementById("notfound").style.display = "none";
      searchResult.appendChild(div);
    }
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
  // console.log(slug.name);
  const phoneDetails = document.getElementById("phone-details");
  phoneDetails.textContent = "";
  const div = document.createElement("div");

  div.innerHTML = `
  <div class="card mb-3 mx-auto col-md-9 p-3 shadow-lg">
  <div class="row g-0">
    <div class="col-md-4 my-auto">
      <img src="${
        slug.image
      }" class="img-fluid rounded-start w-100" alt="..." />
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h4 class="card-title text-uppercase">${slug.slug}</h4>

        <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <h6>Main Features</h6>
          </button>
        </h2>
        <div
          id="collapseOne"
          class="accordion-collapse collapse show"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
            <strong>Chip Set:</strong><code> ${
              slug.mainFeatures.chipSet
            }</code><br />
            <strong>SisplaySize:</strong><code> ${
              slug.mainFeatures.displaySize
            }</code><br />
            <strong>Storage:</strong><code> ${
              slug.mainFeatures.storage
            }</code><br />
            <strong>Memory:</strong><code> ${
              slug.mainFeatures.memory
            }</code><br />
            <strong>Release Date:</strong><code> ${
              slug.mainFeatures.releaseDate
                ? slug.mainFeatures.releaseDate
                : "Not Avaiable "
            }</code><br />
            <strong>Brand:</strong><code> ${slug.brand}</code><br />
            
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button
            class="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            <h6>Sensors & Others Features</h6>
          </button>
        </h2>
        <div
          id="collapseTwo"
          class="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body text-center">
            <strong>Sensors:</strong><code><br/> ${
              slug.mainFeatures.sensors
            }</code><br />
            <strong>Others Features :</strong><br />
            <strong>W-Lan:</strong><code> ${slug.others.WLAN}</code><br />
            <strong>Bluetooth:</strong><code> ${
              slug.others.Bluetooth
            }</code><br />
            <strong>GPS:</strong><code> ${slug.others.GPS}</code><br />
            <strong>NFC:</strong><code> ${slug.others.NFC}</code><br />
            <strong>Radio:</strong><code> ${slug.others.Radio}</code><br />
            <strong>USB:</strong><code> ${slug.others.USB}</code>
          </div>
        </div>
      </div>
    </div>
 
      </div>
      
    </div>
  </div>
</div>
  `;
  phoneDetails.append(div);
};
const displaySpinner = (condition) => {
  document.getElementById("spinner").style.display = condition;
  // console.log(displaySpinner);
};

const displayError = (condition) => {
  document.getElementById("error").style.display = condition;
  // console.log(displayError);
};
const notfound = (condition) => {
  document.getElementById("notfound").style.display = condition;
};
