
const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", showPageData);

function showPageData() {

    document.getElementById("cards").innerHTML = "";
    let tittle = document.getElementById("textToSearch").value;
    data.getMoviesByTitle(tittle)
        .then(list => {
            let tabla = "<table>" + "<tr>" + "<th>" + "Titulo" + "</th>";
            
            for (let i = 0; i < list["Search"].length; i++) {
                let element=list["Search"][i];
                data.getMoviesByImdbID(element["imdbID"])
                    .then(movie => {
                        console.log(movie);
                        let col = document.createElement("div");
                        col.setAttribute("class", "col-sm-6 col-lg-3");
                        card=`
                <div class="card">
                    <img src="`+movie["Poster"]+`"
                        class="card-img-top" >
                    <div class="card-body py-1 px-3">
                        <h5 class="card-title my-1">`+movie["Title"]+`</h5> 
                        <label class="badge badge-secondary my-1">`+movie["Genre"]+`</label>
                        <span class="label label-warning">Rating `+movie["imdbRating"]+`</span>
                        <p class="card-text">`+movie["Plot"]+`</p>
                    </div>
                    
                </div>`;
            col.innerHTML = card;
            document.getElementById("cards").appendChild(col);

                    });

                
            }
        });
}