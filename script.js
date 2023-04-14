
//salvo il numero delle domande
const Numero_Domanda=document.querySelectorAll(".choice-grid").length;

//associa risposta data alla mappa
let Risposte={};

function RIAVVIA(event)
{
  event.currentTarget.removeEventListener('click', RIAVVIA);
  const resultblock = document.querySelector("#RISULTATO");
  resultblock.classList.add("hide");
  Risposte = {}; //riutilizo inizializzo 

  console.log(Risposte);
  const boxes = document.querySelectorAll(".choice-grid div");

  for(let box of boxes)
  {
    box.classList.remove("ATTIVO","NONATTIVO");
    let checkbox = box.querySelector(".checkbox");
    checkbox.src="./unchecked.png";
    box.addEventListener('click', Rispondi_Domanda);    
  }

  window.scroll({top:0});
 }
 
 //===============================================================================================

function Trova_Risultati()
{
  let Contatore={};
  const Valori=Object.values(Risposte);
  let ValoreMAX = Risposte["one"];

  for(let VALORE of Valori)
  {
    if(Contatore[VALORE]===undefined)
    {
      Contatore[VALORE]=0;
    }
    else
    {
      Contatore[VALORE]++;
    }       
        
    if(Contatore[VALORE]>Contatore[ValoreMAX])
    {
      ValoreMAX=VALORE;
    }
         
  }
  return ValoreMAX;
}

//===============================================================================================

function Mostra_Risultati()
{
  const resultblock = document.querySelector(".hide");

  let result = Trova_Risultati();
  console.log("RISULTATO :" + result);

  const title = resultblock.querySelector("h1");
  title.textContent = RESULTS_MAP[result].title;

  const contents = resultblock.querySelector("div");
  contents.textContent = RESULTS_MAP[result].contents;

  resultblock.classList.remove("hide");
  window.scrollTo(0, document.body.scrollHeight);
}

//===============================================================================================

function FINE(){

    if(Numero_Domanda === Object.keys(Risposte).length)
    {
      const boxes = document.querySelectorAll('.choice-grid div');

      for(let box of boxes) 
      {
        box.removeEventListener('click', Rispondi_Domanda);
      }

      return true;
    }
    else
    {
      return false;
    }
}

//===============================================================================================

function Assegna_Risposta(answer) 
{
    const index = answer.dataset.questionId;
    Risposte[index]= answer.dataset.choiceId;
    console.log(Risposte);
}

//===============================================================================================

function Attiva_Risposta(answer) 
{
  Assegna_Risposta(answer);
  answer.classList.remove("NONATTIVO");
  answer.classList.add("ATTIVO");

  const checkbox = answer.querySelector(".checkbox");
  checkbox.src = "checked.png";
}

//===============================================================================================

function Disattiva_Risposta( grid, actuallyActive ){
  const cointainers = grid.querySelectorAll("div");
  for( let container of cointainers )
  {
    if( container !== actuallyActive )
    {
      container.classList.remove("ATTIVO");
      container.classList.add("NONATTIVO");

      const checkbox = container.querySelector(".checkbox");
      checkbox.src = "unchecked.png";
    }  
  }
}

//===============================================================================================

function Rispondi_Domanda(event)
{
  console.log("Evento");
  Attiva_Risposta(event.currentTarget);
  Disattiva_Risposta(event.currentTarget.parentElement,event.currentTarget);

  if(FINE())
  {
    Mostra_Risultati();  
    const restartButton = document.querySelector("#RISULTATO button");
    restartButton.addEventListener('click', RIAVVIA);
  }
}

//============ MAIN =============================================================================

const boxes = document.querySelectorAll('.choice-grid div');
for(let box of boxes) 
{
  box.addEventListener('click', Rispondi_Domanda);
}











