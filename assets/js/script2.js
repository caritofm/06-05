const getCharacters = async(page = 1, limit = 8) =>{

    try{
        const response = fetch (`https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`)
        const data = (await response).json();
        return data.item;
    
    }catch(error){
        console.log(error);
    }

}

/*getCharacters();*/

const createCharacterCards= async(character) =>{

    const personajesRow = document.getElementById('personajesRow');

    characters.map((characters)=>{
        const{id,name, race,ki,description,image,maxKi,gender} =character;
        if (!loadedCharacters.includes(id)){
            loadedCharacters.push(id);

            const divRow = document.createElement('div');
            divRow.classList.add('col-xl-3');
            divRow.classList.add('col-lg-3');
            divRow.classList.add('col-md-3');
            divRow.classList.add('col-sm-12');
            divRow.classList.add('col-xs-12');

            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('mt-2');
            card.classList.add('mb-2');

            const imgCard = document.createElement('img');
            imgCard.classList.add('card-img-top');
            imgCard.classList.add('mt-2');
            imgCard.classList.add('mx-auto');
            imgCard.classList.add('w-75');
            imgCard.src= image;

            const divBody = document.createElement('div');
            divBody.classList.add('card-body');
            divBody.classList.add('text-center');
            divBody.classList.add('mx-auto');

            const tituloC = document.createElement('h5');
            tituloC.classList.add('card-title');
            tituloC.textContent = name;

            const levelC = document.createElement('p');
            levelC.classList.add('card-text');
            levelC.textContent = ki;

            const btnVer = document.createElement('button');
            btnVer.classList.add('btn');
            btnVer.classList.add('btn-prymary');
            btnVer.classList.add('text-center');
            btnVer.classList.add('mx-auto');

            btnVer.textContent = 'Ver detalles';
            
            btnVer.addEventListener("click", ()=> {
                console.log("hola");
            })

            divRow.appendChild(card);
            card.appendChild(imgCard);
            card.appendChild(divBody);

            divBody.appendChild(tituloC);
            divBody.appendChild(levelC);
            divBody.appendChild(btnVer);

            personajesRow.appendChild(divRow);

        }
    })

}

const loadInitialCharacters = async() => {
    const characters = await getCharacters();
    createCharacterCards(characters);
}




export const loadMoreCharacters = async() => {

    if(isloading) return;
    isloading = true;

    currentPage++;
    const characters = await getCharacters(currentPage);
    if(characters.length > 0 ){
        createCharacterCards(characters);
    }else{
        alert("No hay mas personajes disponibles");
    }

    isloading = false;

}

window.onload = loadInitialCharacters;

window.addEventListener('scroll',() => {
    const { scrollTop, scrollHeight, clienteHeight} = document.documentElement;

    if(scrollTop + scrollHeight + clienteHeight){
        loadMoreCharacters();
    }
})