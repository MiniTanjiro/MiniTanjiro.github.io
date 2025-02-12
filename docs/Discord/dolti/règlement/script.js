document.getElementById('search').addEventListener('input', function () {
    let query = this.value.toLowerCase();
    let resultsDiv = document.getElementById('results');

    // Efface les anciens résultats
    resultsDiv.innerHTML = '';

    if (query.length > 0) {
        let articles = document.querySelectorAll('section h2');

        articles.forEach(article => {
            let text = article.nextElementSibling ? article.nextElementSibling.innerText.toLowerCase() : "";
            
            if (text.includes(query)) {
                let title = article.innerText;
                let link = article.parentElement.id;

                resultsDiv.innerHTML += `<p>${title} <button class="button" onclick="location.href='#${link}'">Y aller</button></p>`;
            }
        });
    }
});
