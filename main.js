//boton de busqueda
const btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", showPageData);

const btnMovies = document.getElementById("btnMovies");
btnMovies.addEventListener("click", function(){ selectBtn(btnMovies); });

const btnSeries = document.getElementById("btnSeries");
btnSeries.addEventListener("click", function(){ selectBtn(btnSeries); });

function showPageData() {

    document.getElementById("cards").innerHTML = "";
    let tittle = document.getElementById("textToSearch").value;
    let type = getBtnActive();
    data.getMoviesByTitle(tittle, type )
        .then(list => {
            let tabla = "<table>" + "<tr>" + "<th>" + "Titulo" + "</th>";

            for (let i = 0; i < list["Search"].length; i++) {
                let element = list["Search"][i];
                data.getMoviesByImdbID(element["imdbID"])
                    .then(movie => {
                        let col = document.createElement("div");
                        col.setAttribute("class", "col-sm-6 col-lg-3");
                        let moviePoster = movie["Poster"];
                        if(moviePoster=="N/A"){
                            moviePoster = "img/no-image.jpg"
                        }
                        let movieNameForUrl = movie["Title"].replace(/ /g,"+");
                        let shareMessage = "http://www.google.com/search?q="+movieNameForUrl;

                        card = `
                <div class="card mb-3">
                    <img src="` + moviePoster + ` "class="card-img-top" >
                    <div class="card-body py-1 px-3">
                        <h5 class="card-title my-1">` + movie["Title"] + `</h5> 
                        <label class="badge badge-secondary my-1">` + movie["Genre"] + `</label> 
                        <br>
                        <label class="badge badge-secondary my-1">Rating ` + movie["imdbRating"] + `</label>
                        <p class="card-text">` + movie["Plot"] + `</p>
                        <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#shareToFriend" data-whatever="` + shareMessage + `">Share with a friend</button>

                </div>`;
                        col.innerHTML = card;
                        document.getElementById("cards").appendChild(col);

                    });


            }
        });
}

function getBtnActive() {
    let type = "";
    let selectionBtns = document.getElementById("selectionBtns");
    let selection = selectionBtns.getElementsByClassName("active")[0].id;
    if (selection == "btnMovies") {
        type = "movie";
    } else {
        type = "series";
    }
    return type
}


function selectBtn(btnselected) {

    let activeBtn = getBtnActive();

    if (activeBtn == "movie") {
        let btnMovies = document.getElementById("btnMovies");
        btnMovies.classList.remove("active");


    } else {
        let btnSeries = document.getElementById("btnSeries");
        btnSeries.classList.remove("active");
    }
    document.getElementById("cards").innerHTML = "";
    btnselected.classList.add("active");

    showPageData();

}

$('#shareToFriend').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var recipient = button.data('whatever') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)
    modal.find('.modal-title').text('Share ' + getBtnActive())
    modal.find('.modal-body textarea').val(recipient)
  })