import { IPaginaFormulario } from "../shared/pagina.create.interface.js";
import { IPaginaHTML } from "../shared/pagina.interface.js";
import { IRepositorio } from "../shared/repositorio.interface.js";
import { Prioridade } from "./models/prioridade.enum.js";
import { Tarefa } from "./models/tarefa.model.js";
import { TarefaRepositoryLocalStorage } from "./repositories/tarefa.repository.local-storage.js";

class TarefaPaginaCadastro implements IPaginaHTML, IPaginaFormulario {
 
  private txtDescricao: HTMLInputElement;
  private btnSalvar: HTMLButtonElement;
  private rbdPrioridade?: HTMLInputElement;

  private idSelecionado: string;

  constructor(private repositorioTarefas: IRepositorio<Tarefa>, id?: string) {
    this.configurarElementos();

    if(id) {
      this.idSelecionado = id;

      const tarefaSelecionada = this.repositorioTarefas.selecionarPorId(id);

      if(tarefaSelecionada)
        this.preencherFormulario(tarefaSelecionada);        
    }
  }

  gravarRegistros(): void {
    
    const tarefa = this.obterDadosFormulario();

    if(!this.idSelecionado)
      this.repositorioTarefas.inserir(tarefa);
    else
      this.repositorioTarefas.editar(tarefa.id, tarefa);
    
      window.location.href = "tarefa.list.html";
  }
  
  configurarElementos(): void {

    this.txtDescricao = document.getElementById("txtDescricao") as HTMLInputElement;
    this.btnSalvar = document.getElementById("btnSalvar") as HTMLButtonElement;

    this.btnSalvar.addEventListener("click", (_evt) => this.gravarRegistros())
  }
  
  private preencherFormulario(tarefaSelecionada: Tarefa) {
    this.txtDescricao.value = tarefaSelecionada.descricao;

    switch(tarefaSelecionada.prioridade){

      case Prioridade.Baixa: 
        this.rbdPrioridade = document.querySelector("input[value='Baixa']") as HTMLInputElement;
        break;

        case Prioridade.Media: 
        this.rbdPrioridade = document.querySelector("input[value='Media']") as HTMLInputElement;
        break;

        case Prioridade.Alta: 
        this.rbdPrioridade = document.querySelector("input[value='Alta']") as HTMLInputElement;
        break;

    }

    this.rbdPrioridade.checked = true;
  }

  private obterDadosFormulario():Tarefa {
    const descricao = this.txtDescricao.value;
    const prioridade = this.obterPrioridadeSelecionada();

    let tarefa = null;

    if(!this.idSelecionado)
      tarefa = new Tarefa(descricao, prioridade)
    else
      tarefa = new Tarefa(descricao, prioridade, this.idSelecionado)

    return tarefa;
  }

  private obterPrioridadeSelecionada(): Prioridade {
    const rdbPrioridade = document.querySelector("input[type='radio']:checked") as HTMLInputElement;

    return rdbPrioridade.value as Prioridade; 
  }

}



const params = new URLSearchParams(window.location.search);

const id = params.get("id") as string;

new TarefaPaginaCadastro(new TarefaRepositoryLocalStorage, id);

