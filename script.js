let link = 'https://shaolincampinas.squareweb.app/' // `http://localhost:80/`
let senha
if (localStorage.getItem('senha2024') !== null && localStorage.getItem('senha2024') !== 'null') {
    senha = localStorage.getItem('senha2024')
} else {
    while (true) {
        const t = prompt("Digite sua senha")
        if (t == null || t == '') {
            continue
        }

        senha = t
        localStorage.setItem('senha2024', senha)
        break
    }
}

function diminuir_nome(nome) {
    var partes = nome.split(' ');

    var numPartes = partes.length;
    if (numPartes <= 2) {
        return partes[0] + ' ' + partes[numPartes - 1];
    } else {
        var nomeAbreviado = partes[0] + ' ';
        for (var i = 1; i < numPartes - 1; i++) {
            nomeAbreviado += partes[i][0] + '. ';
        }
        nomeAbreviado += partes[numPartes - 1];
        return nomeAbreviado;
    }
}

function formatar_qualquer_numero(numero) {
    numero = numero.toString();

    if (numero.startsWith('55')) {
        numero = numero.substring(2);
    }
    if (numero.length === 11) {

        //19 98361-11134

        return `${numero.substring(0, 2)} ${numero.substring(2, 7)}-${numero.substring(7, 11)}`
    } else {
        return numero;
    }
}
document.querySelector("#mobile_menu_active").style.transition = '200ms'
let menu_aberto = false
document.querySelector("#mobile_menu").addEventListener("click", async () => {

    if (menu_aberto == false) {
        document.querySelector("#mobile_menu_active").style.display = 'block'
        await new Promise(result => setTimeout(result, 10))
        menu_aberto = true
    }
})

document.body.addEventListener("click", async () => {
    if (menu_aberto == true) {
        document.querySelector("#mobile_menu_active").style.display = 'none'
        await new Promise(result => setTimeout(result, 10))
        menu_aberto = false
    }
})

console.log(senha)
async function index() {
    let last = null
    let procurarpor = 'agendamentos'
    let agendamentoss = true

    document.querySelector("#historico").addEventListener("click", () => {
        procurarpor = "antigos"
        last = null
        agendamentoss = true
        document.querySelector("#titulo_site").textContent = `Agendamentos - Antigos`
    })

    document.querySelector("#agenda").addEventListener("click", () => {
        procurarpor = "agendamentos"
        last = null
        agendamentoss = true
        document.querySelector("#titulo_site").textContent = `Agendamentos - Atuais`
    })

    function pegar_itens_tempo(tabela, ms = null) {
        if (ms === null) {
            return tabela;
        } else {
            const agora = new Date();
            console.log(agora.getTime())
            const tempoAnterior = agora.getTime() - ms;
            console.log(tempoAnterior)
            const dataAnterior = new Date(tempoAnterior);

            return tabela.filter(item => {
                const a = `${item[2].split("/")[1]}/${item[2].split("/")[0]}/${item[2].split("/")[2]}`
                
                console.log(a)
                
                const dataItem = new Date(a);
 
                return dataItem > dataAnterior;
            });
        }
    }

    let filtro

    document.querySelector("#pessoas").addEventListener("click", async () => {
        agendamentoss = false
        document.querySelector("#titulo_site").textContent = `Agendamentos - Todos`

        const pessoas = JSON.parse((await ((await fetch(link + "pessoas")).json())).pessoas)


        function converterStringParaData(stringData) {
            const partes = stringData.split('/');
            return new Date(partes[2], partes[1] - 1, partes[0]);
        }

        if (filtro == 1) {
            pessoas.sort((a, b) => {
                const dataA = converterStringParaData(a[2]);
                const dataB = converterStringParaData(b[2]);
                return dataA - dataB;
            });
        } else if (filtro == 2) {
            pessoas.sort((a, b) => {
                const dataA = converterStringParaData(a[2]);
                const dataB = converterStringParaData(b[2]);
                return dataB - dataA;
            });
        }


        console.log(pessoas)


        let inner = `<br><br>
        


        <div id="outrainformacao">
                <div id="informacao_botoes">
                    <button id="escolher_data">1 Dia</button>
                    <button id="escolher_data">1 Semana</button>
                    <button id="escolher_data">2 Semanas</button>
                    <button id="escolher_data">3 Semanas</button>
                    <button id="escolher_data">1 Mês</button>
                    <button id="escolher_data">6 Meses</button>
                    <button id="escolher_data">1 Ano</button>
                    <button id="escolher_data">Todos</button>
                    
                </div>

                <div id="informacao_pessoas" class="total_conversas">
                    <h1>Total de Conversas</h1>
                    <h1>N/A</h1>
                </div>
            </div>
        
        <div id="tabela_tlgd">` + `

        <select name="Filtros" id="filtros" title="Filtros">
        <option selected>Selecione um Filtro</option>
        <option value"antigo_novo">Antigo >> Novo</option>
        <option value="novo_antigo">Novo >> Antigo</option>
        
    </select>

            <div id="topo_tabela">
            <h1>Nome</h1>
            <h1>Telefone</h1>
            <h1 id="dtcontato">Data de contato</h1>
                
            </div>
        
        `

        for (v of pessoas) {
            const div = document.createElement("div")

            div.id = "informacao"

            div.innerHTML =
                inner = inner + `

            

            <div id="informacao">
                <h1  id="nome_da_praga" alt="${v[1]}">${diminuir_nome(v[1])}</h1>
                <h1><strong id="dinheiro" onclick="window.open('https://wa.me/+${v[0].replace('@c.us', '')}','__blank')" style="color:rgb(130, 200, 0)">${formatar_qualquer_numero(v[0].replace("@c.us", ""))}</strong></h1>
                <h1 id="data_contato_">${v[2]}</h1>

                <div id="outrasopcoes">
                    <img id="editar" src="./editar-texto.png" alt="${formatar_qualquer_numero(v[0].replace("@c.us", ""))}">
                    <img id="excluir" src="./excluir.png" alt="${formatar_qualquer_numero(v[0].replace("@c.us", ""))}">
                    ${v[3] == './robô.png' ? `<img id="mudar_atendimento" src="${v[3]}" style="background-color:rgb(66, 179, 245);border-radius:4px;padding:3px" alt="${formatar_qualquer_numero(v[0].replace("@c.us", ""))}">` : `<img id="mudar_atendimento" src="${v[3]}" style="background-color:rgb(200, 200, 200);border-radius:4px;padding:3px" alt="${formatar_qualquer_numero(v[0].replace("@c.us", ""))}">`}
                </div>
            </div>
        `
        }
        inner = inner + `</div>`

        document.querySelector("#bottom").innerHTML = inner

        document.querySelectorAll("#nome_da_praga").forEach(button => {
            button.addEventListener("click", () => {
                alert(button.getAttribute('alt'))
            })
        })

        const tempos = {
            "1 Dia": 1000 * 60 * 60 * 24 * 2,
            "1 Semana": 1000 * 60 * 60 * 24 * 7,
            "2 Semanas": 1000 * 60 * 60 * 24 * 14,
            "3 Semanas": 1000 * 60 * 60 * 24 * 21,
            "1 Mês": 1000 * 60 * 60 * 24 * 31,
            "6 Meses": (1000 * 60 * 60 * 24 * 31) * 6,
            "1 Ano": (1000 * 60 * 60 * 24 * 31) * 12,
            "Todos": null,


        }

        document.querySelectorAll('#escolher_data').forEach(button => {
            const tempo = button.textContent

            button.addEventListener("click", () => {
                const selecionado = tempos[tempo]

                const teste = pegar_itens_tempo(pessoas, selecionado)
                console.log(teste)
                document.querySelector(".total_conversas").querySelectorAll("h1")[1].textContent = teste.length
            })
        })

        document.querySelectorAll("#editar, #excluir").forEach(async button => {
            button.addEventListener("click", async () => {
                const numero = button.getAttribute('alt')

                if (button.src.includes("editar-texto")) {
                    if (confirm('Deseja editar?')) {
                        const novo = prompt("Novo nome:")
                        if (novo !== null && novo !== '') {
                            await fetch(link + 'numero_editar', {
                                headers: { "Content-Type": "application/json" },
                                method: "POST",
                                body: JSON.stringify({ number: numero, senha: senha, novo_nome: novo })
                            })
                            document.querySelector("#pessoas").click()
                        }

                    }
                } else {
                    if (confirm('Deseja remover?')) {
                        await fetch(link + 'numero_excluir', {
                            headers: { "Content-Type": "application/json" },
                            method: "POST",
                            body: JSON.stringify({ number: numero, senha: senha })
                        })
                        document.querySelector("#pessoas").click()
                    }
                }

            })
        })

        document.querySelectorAll("#mudar_atendimento").forEach(async button => {
            const numero = button.getAttribute('alt')
            button.style.transition = '1s'
            button.addEventListener("click", async () => {
                button.src = 'https://portal.ufvjm.edu.br/a-universidade/cursos/grade_curricular_ckan/loading.gif/@@images/image.gif'
                await fetch(link + 'mudar_atendimento', {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify({ number: numero, senha: senha })
                })
                document.querySelector("#pessoas").click()
            })
        })

        document.querySelector("select").addEventListener("change", (e) => {
            filtro = document.querySelector("select").selectedIndex
            document.querySelector("#pessoas").click()
        })
    })

    async function reiniciar() {
        document.querySelector("#bottom").innerHTML = `<br><br>`
        const agendamentos = JSON.parse((await ((await fetch(link + procurarpor)).json())).agendamentos)
        last = agendamentos
        for (o of agendamentos) {
            const v = o
            console.log(v)
            const { aula, dia_da_semana, nome, número, other } = v
            const div = document.createElement('div');
            div.id = 'template';

            const h1 = document.createElement('h1');
            h1.id = 'nome';
            h1.innerHTML = `${nome}<br><strong style="color:rgb(130, 200, 0);font-size:15px;height:5px">${número.replace("@c.us", "")}</strong>`;
            h1.style.cursor = 'pointer'
            h1.addEventListener('click', () => {
                window.open('https://wa.me/+' + (número.replace("@c.us", "")), '__blank')
            })
            div.appendChild(h1);

            const h2Dia = document.createElement('h2');
            h2Dia.id = 'dia_da_semana';
            h2Dia.textContent = dia_da_semana + "-feira " + other;
            div.appendChild(h2Dia);

            const h2Aula = document.createElement('h2');
            h2Aula.id = 'aula';
            h2Aula.textContent = aula;
            div.appendChild(h2Aula);

            const divFlutuante = document.createElement('div');
            divFlutuante.id = 'flutuante';

            const buttonDesmarcar = document.createElement('button');
            buttonDesmarcar.id = 'desmarcar';
            buttonDesmarcar.textContent = 'Excluir';
            divFlutuante.appendChild(buttonDesmarcar);

            const buttonRemarcar = document.createElement('button');
            buttonRemarcar.id = 'remarcar';
            buttonRemarcar.textContent = 'Remarcar';



            buttonRemarcar.addEventListener("click", () => {
                console.log(v)
                if (confirm('Deseja remarcar?')) {
                    fetch(link + 'remarcar', {
                        headers: { "Content-Type": "application/json" },
                        method: "POST",
                        body: JSON.stringify([

                            v,
                            senha
                        ])

                    })
                }
            })

            buttonDesmarcar.addEventListener("click", () => {
                console.log(v)
                if (confirm('Deseja excluir este agendamento?')) {
                    
                    if (procurarpor == 'agendamentos') {
                        fetch(link + 'desmarcar', {
                            headers: { "Content-Type": "application/json" },
                            method: "POST",
                            body: JSON.stringify([
                                v, senha
                            ])

                        })
                    } else if (procurarpor == 'antigos') {
                        fetch(link + 'desmarcar2', {
                            headers: { "Content-Type": "application/json" },
                            method: "POST",
                            body: JSON.stringify([
                                v, senha
                            ])

                        })
                    }

                }
            })


            divFlutuante.appendChild(buttonRemarcar);

            div.appendChild(divFlutuante);

            document.querySelector("#bottom").appendChild(div);

            if (procurarpor == 'antigos') {
                buttonRemarcar.style.display = 'none'
            }
        }
    }

    while (true) {

        try {
            if (agendamentoss == true) {
                if (last == null || JSON.parse((await ((await fetch(link + procurarpor)).json())).agendamentos).length !== last.length) {
                    reiniciar()
                }
            }
        } catch { }


        await new Promise(result => setTimeout(result, 1500))
    }
}



index()

document.addEventListener('DOMContentLoaded', function () {
    const fadeIns = document.querySelectorAll('.fade-left, .fade-right, .fade-top, .fade-bottom');

    function checkFadeIns() {
        fadeIns.forEach(function (fadeIn) {
            if (fadeIn.style.display !== 'none' && isInViewport(fadeIn)) {
                if (fadeIn.classList.contains('fade-in')) {

                } else {
                    fadeIn.classList.add('fade-in');
                }
            } else {
                if (fadeIn.classList.contains('fade-in')) {
                    fadeIn.classList.remove('fade-in');
                }
            }
        });
    }

    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;


        return (
            rect.top >= -rect.height &&
            rect.left >= -rect.width &&
            rect.bottom <= windowHeight + rect.height &&
            rect.right <= windowWidth + rect.width
        );
    }

    checkFadeIns();

    setInterval(checkFadeIns, 100);
});
