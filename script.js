const containerVideos = document.querySelector(".videos__container")
const barraDePesquisa = document.querySelector(".pesquisar__input")

async function buscaEMostraVideos() {

        const busca =  await fetch('http://localhost:3000/videos')
        const videos = await busca.json()

        /*    .then(busca => res.json())
            .then(videos => {
        */
    try {
        videos.forEach(video => {
        if (!video.categoria) throw new Error("Videos sem classificação")
        containerVideos.innerHTML += `
        <li class="videos__item">
            <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
            <div class="descricao-video">
                <img src="${video.imagem}" class="img-canal" alt="logo do canal" >
                <h3 class="titulo-video">${video.titulo}</h3>
                <p class="titulo-canal">${video.descricao}</p>
            </div>
        </li>
        `
        })

    } catch (error) {
        containerVideos.innerHTML = `<p>Erro no carregamento dos vídeos. Error Code :: ${error}</p>`
    }
}

function filtrarPesquisa() {
    const videos = document.querySelectorAll(".videos_item")
    let filtro = barraDePesquisa.value.toLowerCase()

    if (filtro != "") {
        videos.forEach(video => {
            const titulo = video.querySelector(".titulo-video").textContent.toLowerCase()
            video.style.display = titulo.includes(filtro) ? 'block' : 'none'
        })
    }
}

barraDePesquisa.addEventListener('input', filtrarPesquisa)
buscaEMostraVideos()