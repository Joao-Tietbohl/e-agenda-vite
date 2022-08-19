import { IPaginaListagem } from "../shared/IPagina.list.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Contato } from "./models/contato.model.js";
import { ContatoRepositoryLocalStorage } from "./repositories/contato.repository.local-storage.js";

class ContatoPaginaListagem implements IPaginaHTML, IPaginaListagem{
 
tabela: HTMLTableElement;
 
constructor(private repositorioContatos: IRepositorio<Contato>){
  this.configurarElementos();

  this.atualizarTabela();
}
  
configurarElementos(): void{
  this.tabela = document.getElementById("tabela") as HTMLTableElement;
}

atualizarTabela(): void {
    const contatos = this.repositorioContatos.selecionarTodos();
    
    let corpoTabela = this.tabela.getElementsByTagName("tbody")[0];

    contatos.forEach(contato => {
      const novaLinha = corpoTabela.insertRow();

      Object.values(contato).forEach((valor: any) => {
        const novaCelula = novaLinha.insertCell();

        novaCelula.innerText = valor;
      });

      const celulaBotoes = novaLinha.insertCell();

      const btnEditar = document.createElement("a");
      btnEditar.innerText = "Editar";
      btnEditar.className = "btn btn-primary me-2";

      btnEditar.addEventListener("click", () => {
        const idSelecionado = novaLinha.cells[0].innerText;

        window.location.href = `contato.create.html?id=${idSelecionado}`;
      });

      const btnExcluir = document.createElement("a");
      btnExcluir.innerText = "Excluir";
      btnExcluir.className = "btn btn-outline-warning";

      btnExcluir.addEventListener("click", () => {
        const idSelecionado = contato.id;

        this.repositorioContatos.excluir(idSelecionado);

        window.location.reload();
      });

      celulaBotoes.appendChild(btnEditar);
      celulaBotoes.appendChild(btnExcluir);

    });
  }
}

new ContatoPaginaListagem(new ContatoRepositoryLocalStorage);