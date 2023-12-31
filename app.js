
const main = document.querySelector('#card');
const searchBox = document.querySelector("#search");
async function getUser(username) {
    const response = await fetch("https://api.github.com/users/" + username);
    const data = await response.json(); // Convert response to JSON
    console.log(data); // Log the response data
    const user =
        `   <div class="row user" >
        <div class="col-sm-12 col-md-5 col-lg-5 image">
            <img src=${data.avatar_url}/>
        </div>
        <div class="col-sm-12 col-lg-7 col-md-7 user-info">
            <h2> ${data.name} </h2>
            <p> ${data.bio} </p>

            <div class="user-link d-flex ">
                <p style="margin-right: 15px;"> ${data.followers} <strong>Followers</strong></p>
                <p style="margin-right: 15px;">  ${data.following} <strong>Following</strong></p>
                <p > ${data.public_repos} <strong>Repos</strong></p>
            </div>

            
            <div id="user-repos" class="mb-3">
                
            </div>

            <a class="view-more " target="_blank" href=${data.html_url}>
            View More..
        </a>
        </div>
    </div> `;

    main.innerHTML = user;
    userRepo(username);

}

async function userRepo(username) {
    const repos = document.querySelector("#user-repos");
    const response = await fetch("https://api.github.com/users/" + username + "/repos");
    const data = await response.json();
    console.log(data);

   
        data.forEach((item, index)=>{
      console.log(item);
     
      const elem = document.createElement("a");
      if(index % 10 ===0){ 
      elem.classList.add("box");
        elem.href = item.html_url;
        elem.innerText = item.name;
        elem.target = "_blank";
        repos.appendChild(elem);
      }

    });

}
const formSubmit = () => {

    if (searchBox.value != "") {
        getUser(searchBox.value);
        searchBox.value = "";
    }
    return false;
}


searchBox.addEventListener(
    "focusout",
    function () {
        formSubmit();
    }
)
