var websiteName = document.getElementById("websiteName");
var url = document.getElementById("url");
var cartona = ``;
var data = [];
var regex={
  websiteName:{
    value:/^[A-Z][a-z0-9]{5,8}$/,
    status:false
},
url:{
  value:/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/.*)*$/,
  status:false
}

}
var btn=document.getElementById("submitButton");

// Load data from localStorage on page load

  if (localStorage.getItem("bookmarks")) {
    data = JSON.parse(localStorage.getItem("bookmarks"));
    displayProduct();
  }


function addProduct(event) {
  event.preventDefault();

  data.push({
    name: websiteName.value,
    websiteUrl: url.value
  });
  localStorage.setItem("bookmarks", JSON.stringify(data));

  websiteName.value = '';
  url.value = '';
  displayProduct();
}

function displayProduct() {
  cartona = ``;
  for (let i = 0; i < data.length; i++) {
    var index = i + 1;  
    cartona += `
      <hr class="m-0">
      <div class="col-3 text-center p-3">${index}</div>
      <div class="col-3 text-center p-3">${data[i].name}</div>
      <div class="col-3 text-center p-3"><a href="${data[i].websiteUrl.startsWith('http') ? data[i].websiteUrl : 'http://' + data[i].websiteUrl}" target="_blank" class="text-decoration-none btn btn-success"> <i class="fa-solid fa-eye me-1" style="color: white;"></i> Visit</a></div>
      <div class="col-3 text-center p-3"><a href="#" class="text-decoration-none btn btn-danger" onclick="deleteProduct(${i})"> <i class="fa-solid fa-trash me-2" style="color: white;"></i> Delete</a></div>
      <hr class="m-0">
    `;
  }

  document.getElementById("product-list").innerHTML = cartona;
}

function deleteProduct(index) {
  data.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(data));
  displayProduct();
}

function validateInput(element){
  if(regex[element.id].value.test(element.value) == true){
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.add("d-none");
    regex[element.id].status=true;
  }
  else{
    element.classList.remove("is-valid");
element.classList.add("is-invalid");
element.nextElementSibling.classList.remove("d-none");
regex[element.id].status=false;
    
  }
  disabledButton()
}

function disabledButton(){
  if(regex.websiteName.status && regex.url.status){
    btn.disabled=false
  }
  else{
    btn.disabled=true
  }
}
