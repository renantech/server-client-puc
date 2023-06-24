document.addEventListener("DOMContentLoaded", function() {
    var nameFilterInput = document.getElementById("nameFilter");
    var durationFilterSelect = document.getElementById("durationFilter");
    var courseFilterSelect = document.getElementById("courseFilter");
    var filterButton = document.getElementById("filterButton");
    var resultsContainer = document.getElementById("results");
    var allAreas = [];

    function applyFilters() {
        var nameFilter = nameFilterInput.value.toLowerCase();
        var durationFilter = durationFilterSelect.value;
        var courseFilter = courseFilterSelect.value;

        var filteredResults = allAreas.filter(function(area) {
            var nameMatches = area.nome.toLowerCase().includes(nameFilter);
            var durationMatches = durationFilter === "" || area.duracao_anos.toString() === durationFilter;
            var courseMatches = courseFilter === "" || area.curso === courseFilter;

            return nameMatches && durationMatches && courseMatches;
        });

        showResults(filteredResults);
    }

    function showResults(results) {
        resultsContainer.innerHTML = "";

        if (results.length === 0) {
            resultsContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        } else {
            results.forEach(function(area) {
                var resultElement = document.createElement("div");
                resultElement.classList.add("col-md-4"); 
                resultElement.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${area.nome}</h5>
                            <p class="card-text">Curso: ${area.curso}</p>
                            <p class="card-text">Duração: ${area.duracao_anos} anos</p>
                            ${area.prerequisito ? '<p class="card-text">Pré-requisito: Sim</p>' : ''}
                        </div>
                    </div>
                `;

                resultsContainer.appendChild(resultElement);
            });
        }
    }

    fetch("db.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            allAreas = data.areas;
            showResults(allAreas); 


            filterButton.addEventListener("click", function() {
                applyFilters();
            });
        });
});
