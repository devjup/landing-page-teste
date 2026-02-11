$(document).ready(function(){
   $('#mobile_btn').on('click', function() {
      $('#mobile_menu').toggleClass('active'); 
      $('#mobile_btn').find('i').toggleClass('fa-regular fa-rectangle-xmark');
   });
});


        const track = document.querySelector('.carrosel-track');
        const next = document.querySelector('.carrosel-btn-right.next');
        const prev = document.querySelector('.carrosel-btn-left.prev');

        let position = 0;
        let autoPlay;
        const cardWidth = 374;


            // ===== BOTÕES =====
      next.onclick = () => move(-cardWidth);
      prev.onclick = () => move(cardWidth);

      function move(value){
        position += value;
        track.style.transform = `translateX(${position}px)`; 
      }

        // ===== AUTOPLAY =====
        function startAuto(){
        autoPlay = setInterval(()=>{
            move(-cardWidth);
        },3000);
        }

        function stopAuto(){
            clearInterval(autoPlay);
        }

    startAuto();

    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);

    // ===== SWIPE MOBILE =====
    let startX = 0;

    track.addEventListener('touchstart',(e)=>{
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend',(e)=>{
        let endX = e.changedTouches[0].clientX;

        if(startX - endX > 50){
            move(-cardWidth);
        }
        if(endX - startX > 50){
            move(cardWidth);
        }
    });
    const cards = document.querySelectorAll('.feedbacks-card');

    cards.forEach(card=>{
            const clone = card.cloneNode(true);
        track.appendChild(clone);
    });

       document.getElementById("form_rapido").addEventListener("submit", function(e) {
      e.preventDefault();

      const dados = new FormData(this);

      fetch("SUA_API_AQUI", {
        method: "POST",
        body: dados
      })
      .then(() => {
        alert("Obrigado! Um corretor entrará em contato em breve.");
        this.reset();
      })
      .catch(() => {
        alert("Erro ao enviar. Tente novamente.");
      });
    });

    const objetivo = document.getElementById("#fom_completo #objetivo");
    const valor = document.getElementById("#form_completo #valor");
    if (objetivo && valor) {
    objetivo.addEventListener("change", () => {
        valor.innerHTML = "<option value=''>Faixa de valor</option>";

        if (objetivo.value === "comprar" || objetivo.value === "investir") {
            valor.innerHTML += `
            <option>Até R$ 300.000</option>
            <option>R$ 300.000 a R$ 600.000</option>
            <option>Acima de R$ 600.000</option>
            `;
        }

        if (objetivo.value === "alugar") {
            valor.innerHTML += `
            <option>Até R$ 2.000</option>
            <option>R$ 2.000 a R$ 4.000</option>
            <option>Acima de R$ 4.000</option>
            `;
        }
      })
   };

    document.getElementById("form_completo").addEventListener("submit", function(e) {
        e.preventDefault();

    const dados = new FormData(this);

        fetch("SUA_API_AQUI", {
            method: "POST",
            body: dados
        })
        .then(() => {
            alert("Recebemos suas informações. Em breve entraremos em contato.");
            this.reset();
        })
        .catch(() => {
            alert("Erro ao enviar.");
        });
    });

   function bindCheckbox(checkboxId, hiddenId) {
      const checkbox = document.getElementById(checkboxId);
      const hidden = document.getElementById(hiddenId);

      if (!checkbox || !hidden) return;

      checkbox.addEventListener("change", () => {
      hidden.value = checkbox.checked ? "sim" : "nao";
      });
   }

   bindCheckbox("outrasPropostasCheckboxRapido", "aceitaOutrasPropostasRapido");
   bindCheckbox("outrasPropostasCheckboxCompleto", "aceitaOutrasPropostasCompleto");
  

     
