const contents = document.querySelector("contents");
//mainDiv.classList.add('container') 
const promise = fetch('http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json')
console.log(promise)
const response = promise.then((data)=> data.json())
console.log(response)
//let data =  response.then((data) => let characters = data)
let allChampions;
let champData= []
let championContainer = document.querySelector(".characterContainer")
charfetch()
function charfetch(){ fetch('http://ddragon.leagueoflegends.com/cdn/12.5.1/data/en_US/champion.json')
    .then(response=>response.json())
    .then(res=>{
      allChampions = res.data;
      for(const each in allChampions){
        champData.push(allChampions [each])
      }
      console.log('new',champData)
      renderResult(champData)
      clickEvent()
    }) 
}

function renderResult(data) {
  data.forEach((character)=>{
    const cardInfo = `
      <div class="card ${character.name}">
        <img class="card-img" src="http://ddragon.leagueoflegends.com/cdn/12.5.1/img/champion/${character.image.full}"/>
        <h3 class="title" >${character.name}</h3>
      </div>
    `;
    championContainer.insertAdjacentHTML("beforeend", cardInfo);
  })
}
function clickEvent(){
  let cards = document.querySelectorAll('.card')
  cards.forEach((card)=>{
    card.addEventListener('click',(e)=>{
      modalContent(e)
    })
  })
}
function modalContent(e){
  let qsModal = document.querySelector('.modal')
  let content = document.querySelector('.modal-content')
  let name =(e.path[1].innerText).replace(/\s/g, '')//R2 names with ' '.
  let champion = allChampions[`${name}`]
  let innerContent = `
  <div class = 'leftSide'>
    <img class='imgModal' src='http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${name}_0.jpg'/>
</div>
`;
  console.log(champData)
  let description =`
  <div class = 'rightSide'>
      <h1>${name}</h1>
    <h2>${champion.title}</h2>
    <h3>${champion.blurb}</h3>
    </div>
`;
  qsModal.style.display = 'flex'
  qsModal.style.flexWrap = 'wrap'
  //qsModal.style.gridTemplateColumn = '1fr 1fr'
  content.insertAdjacentHTML("beforeend", innerContent);
  content.insertAdjacentHTML("beforeend", description);
  // When the user clicks on <span> (x), close the modal
  document.querySelector('.close').onclick = function() {
    qsModal.style.display = "none";
    location.reload()
  }
}
