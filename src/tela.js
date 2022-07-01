const util = Util
const ID_CARREGANDO = "carregando"
const ID_CONTADOR = "contador"
const ID_CONTEUDO = "conteudo"
const ID_BTN_JOGAR = "jogar"
const ID_MENSAGEM = "mensagem"
const CLASSE_INVISIVEL = "invisible"
const MENSAGENS = {
    sucesso: {
        texto: 'Parabéns, combinação correta!',
        classe: 'alert-success'
    },
    erro : {
        texto: 'Que pena, a bombinação está incorreta!',
        classe: 'alert-danger'
    }
}
class Tela {
    static obterCodigoHtml(item) {
        return `
        <div class="col-md-3 mb-5">
            <div class="card" style="width: 70%;" onclick="window.verificarSelecao('${item.id}', '${item.nome}')">
            <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
            </div>
        </div>
        `
    }
    static configurarBotaoVerificarSeelecao(funcaoOnClick) {
        window.verificarSelecao = funcaoOnClick 
    }
    static alterarConteudoHTML(codigoHtml) {
        const conteudo = document.getElementById(ID_CONTEUDO)
        conteudo.innerHTML = codigoHtml
    }
    static gerarStringHTMLPelaImagem(itens) {
        // para cada item da lista, vai executar a funcao obterCodigoHtml
        //ao final, vai concatenar tudo em uma unica string
        //muda de Array para String
        return itens.map(Tela.obterCodigoHtml).join('')
    }
    static atualizarImagens(itens) {
        const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
        Tela.alterarConteudoHTML(codigoHtml)
    }

    static configurarBotaoJogar(funcaoOnClick) {
        const btnJogar = document.getElementById(ID_BTN_JOGAR)
        btnJogar.onclick = funcaoOnClick
    }
    static exibirHerois(nomeDoHeroi, img) {
        const elementosHtml = document.getElementsByName(nomeDoHeroi)
        elementosHtml.forEach(item => (item.src = img))
    }
    static async exibirMensagem(sucesso = true) {
        const elemento = document.getElementById(ID_MENSAGEM)
        if(sucesso) {
            elemento.classList.remove(MENSAGENS.erro.classe)
            elemento.classList.add(MENSAGENS.sucesso.classe)
            elemento.innerText = MENSAGENS.sucesso.texto
        }
        else{
            elemento.classList.remove(MENSAGENS.sucesso.classe)
            elemento.classList.add(MENSAGENS.erro.classe)
            elemento.innerText = MENSAGENS.erro.texto
        }
        elemento.classList.remove(CLASSE_INVISIVEL)
        await util.timeout(1000)
        elemento.classList.add(CLASSE_INVISIVEL)
    }
    static exibirCarregando(mostrar = true) {
        const carregando = document.getElementById(ID_CARREGANDO)
        if(mostrar) {
            carregando.classList.remove(CLASSE_INVISIVEL)
            return;
        }
        carregando.classList.add(CLASSE_INVISIVEL)
    }
}