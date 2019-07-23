const botonCifrar = document.getElementById("clickme");
botonCifrar.addEventListener("click", showPageData);

window.data = {
    path: "http://www.omdbapi.com/?apikey=319b68e3",
    getMoviesByTitle: (tittle) => {
        return fetch (data.path + "&s=" + tittle)
        .then(res => res.json());
        
    }

    
}

function showPageData(){
    let tittle = document.getElementById("searchByTittle").value;
    data.getMoviesByTitle(tittle)
    .then(list => {
        let tabla = "<table>" + "<tr>" + "<th>" + "Titulo" + "</th>";
        let rows;
        for (let i = 0; i < list["Search"].length; i++) {
            let value = list["Search"][i]["Title"];
            rows += "<td>" + value + "</td>";            
        }
        tabla += "</tr>" + rows + "</table>";
        document.getElementById("table").innerHTML = tabla;
    });
}