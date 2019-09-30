const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMOLVL = 10;
var level = document.getElementById("Lsevel");


class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generar()
    setTimeout(this.siguienteNivel,500)
    
}
  inicializar() {
    
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggle()
    this.nivel= 1;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde
    }
  }

  toggle(){
      if (btnEmpezar.classList.contains("hide")){
          btnEmpezar.classList.remove("hide")
      }
      else{
          btnEmpezar.classList.add("hide")
      }
  }

  generar(){
  this.secuencia = new Array(ULTIMOLVL).fill(0).map(n => Math.floor(Math.random() * 4 ))

  }

  siguienteNivel(){
    this.subnivel = 0
    this.iluminar()
    this.agrgarClic()
  }

  transformaAcolor(numero){
        switch (numero){
          case 0:
            return "celeste"
          case 1:
            return "violeta"
          case 2:
            return "verde"
          case 3: 
            return "naranja"
        }
      }


      transformaAnumero(numero){
        switch (numero){
          case "celeste":
            return 0
          case "violeta":
            return 1
          case "verde":
            return 2
          case "naranja": 
            return 3
        }
      }

  iluminar(){
    for (let i = 0; i < this.nivel; i++){
     const color =  this.transformaAcolor(this.secuencia[i])

     setTimeout(()=> this.iluminarColor(color), 500 * i)
    }
  }

  iluminarColor(color){
    console.log(color)
    this.colores[color].classList.add("light");
    setTimeout(() => this.apagarColor(color), 350);
  }

  apagarColor(color){
    this.colores[color].classList.remove("light");
  }

  agrgarClic(){
      this.colores.celeste.addEventListener("click", this.elegirColor)
      this.colores.verde.addEventListener("click", this.elegirColor)
      this.colores.naranja.addEventListener("click", this.elegirColor)
      this.colores.violeta.addEventListener("click", this.elegirColor)

  }
  eliminarClic(){
    this.colores.celeste.removeEventListener("click", this.elegirColor)
    this.colores.verde.removeEventListener("click", this.elegirColor)
    this.colores.naranja.removeEventListener("click", this.elegirColor)
    this.colores.violeta.removeEventListener("click", this.elegirColor)

  }


  elegirColor(ev){
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformaAnumero(nombreColor)
    this.iluminarColor(nombreColor)
    if (numeroColor === this.secuencia[this.subnivel]){
        this.subnivel++
        if (this.subnivel === this.nivel){
            this.nivel++
            this.eliminarClic()
            if (this.nivel === (ULTIMOLVL + 1)){
                this.gano()
            }
            else{
                setTimeout(this.siguienteNivel, 1500)
            }
        }
            
    }
    else{
        this.perdio()
        }
}

    gano() {
        swal("Juego de Manuel", "Ganaste", "success")
        .then(this.inicializar)
        };

    perdio() {
        swal("Juego de Manuel", "Intentalo Nuevamente :(", "error")
        .then(() => {
            this.eliminarClic()
            this.inicializar()

        })
    }

  }




function empezarJuego() {
 window.juego = new Juego()
}