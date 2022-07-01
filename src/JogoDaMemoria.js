class JogoDaMemoria {
     //se mandar um obj = {tela: 1, idade: 2, etc: 3}
     //vai ignoar o resto das propriedades e pegar somente a 
     //propriedade tela
    constructor({ tela, util }) {
        this.tela = tela 
        this.util = util
        // caminho do arquivo sempre será correspondente ao index.html
        this.heroisIniciais = [
            {img: './img/batman.png', nome: 'batman'},
            {img: './img/flash.png', nome: 'flash'},
            {img: './img/homiranha.png', nome: 'homiranha'},
            {img: './img/cyclope.png', nome: 'cyclope'},
            {img: './img/thor.png', nome: 'thor'},
            {img: './img/mulhermaravilha.png', nome: 'mulhermaravilha'},
        ]
        this.iconePadrao = './img/capa.png'
        this.heroisEscondidos = []
        this.heroisSelecionados = []

    }
    // para usar o this, nao podemos usar static!!
    inicializar() {
        // vai pegar todas as funcoes da classe tela!
        // coloca todos os gerois na tela
        this.tela.atualizarImagens(this.heroisIniciais)
        // força a tela usar o THIS de Jogo da memoria
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSeelecao(this.verificarSelecao.bind(this))
    }
    async embaralhar() {
        const copias = this.heroisIniciais
        //duplicar
        .concat(this.heroisIniciais)
        // entrar em cada item e criar um id aleatorio
        .map(item =>{
            return Object.assign({}, item, {id: Math.random() / 0.5})
        })
        // ordenar aleatoriamente
        .sort(() => Math.random() -0.5)

        this.tela.atualizarImagens(copias)
        this.tela.exibirCarregando()
        // vamos esperar 1s para atualizar a tela 
       await this.util.timeout(1500)
            this.esconderHerois(copias)
            this.tela.exibirCarregando(false)
    }
    esconderHerois(herois) {
        // vamos trocar a imagem de todos os herois por uma capa

    const heroisOcultos = herois.map(({ nome, id }) => ({
        id,
        nome,
        img: this.iconePadrao
    }))
        this.tela.atualizarImagens(heroisOcultos)
        this.heroisOcultos = heroisOcultos
    }
    exibirHerois(nomeDoHeroi) {
        //vamos procurar esse heroi pelo nome em nossos herois iniciais
        //vamos obter somente a imagem dele 
        const { img } = this.heroisIniciais.find(({ nome }) => nomeDoHeroi === nome)
        this.tela.exibirHerois(nomeDoHeroi, img)
    }
    verificarSelecao(id, nome) {
        const item = {id, nome }
        const heroisSelecionados = this.heroisSelecionados.length
        switch(heroisSelecionados) {
            case 0:
                //adicionar a escolha na lista, esperando pela proxima
                //clicada
                this.heroisSelecionados.push(item)
                break;
            case 1:
                // se a quantidade de escolhidos for 1, significa
                // que o usuario só pode escolher mais um 
                // vamos obter o primeiro item da lista
                const [ opcao1 ] = this.heroisSelecionados
                // zerar a lista anterior
                this.heroisSelecionados = []
                // conferimos se os nomes e ids batem conforme o esperado
                if(opcao1.nome === item.nome &&
                // aqui verificamos se sao ids para o usuario nao clicar duas vezes no mesmo card
                opcao1.id !== item.id
                ) {
                    this.exibirHerois(item.nome)
                    this.tela.exibirMensagem()
                    return;
                }
                this.tela.exibirMensagem(false)
                break;
        }
    }
    jogar() {
        this.embaralhar()
    }
}