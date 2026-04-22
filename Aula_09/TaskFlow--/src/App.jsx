import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Estados do formulário de criação
  const [taskText, setTaskText] = useState("");
  const [priority, setPriority] = useState("Baixa");

  // Lista principal de tarefas
  const [taskList, setTaskList] = useState([]);

  // Filtro ativo: "Todas", "Pendentes" ou "Concluídas"
  const [filter, setFilter] = useState("Todas");

  // Pesos para ordenação: Alta aparece primeiro, Baixa por último
  const priorityOrder = { "Alta": 0, "Média": 1, "Baixa": 2 };

  // Controla qual tarefa está em modo de edição (null = nenhuma)
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Texto digitado na busca em tempo real
  const [search, setSearch] = useState("");

  // Carrega as tarefas salvas no localStorage ao iniciar o app
  useEffect(() => {
    const saved = localStorage.getItem("@taskflow_data");
    if (saved) setTaskList(JSON.parse(saved));
  }, []);

  // Salva a lista no localStorage sempre que ela for atualizada
  useEffect(() => {
    localStorage.setItem("@taskflow_data", JSON.stringify(taskList));
  }, [taskList]);

  // Cria uma nova tarefa e adiciona no topo da lista
  const addTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),   // ID único gerado pelo browser
      text: taskText,
      priority: priority,
      completed: false,
      createdAt: new Date().toLocaleDateString()
    };

    setTaskList(prev => [newTask, ...prev]);
    setTaskText("");
  };

  // Alterna o status da tarefa entre concluída e pendente
  const toggleTask = (id) => {
    setTaskList(taskList.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Remove a tarefa após confirmação do usuário
  const deleteTask = (id) => {
    const confirmed = window.confirm("Tem certeza que deseja remover esta tarefa?");
    if (confirmed) setTaskList(taskList.filter(t => t.id !== id));
  };

  // Salva o texto editado e sai do modo de edição
  const saveEdit = (id) => {
    setTaskList(prev =>
      prev.map(t => t.id === id ? { ...t, text: editText } : t)
    );
    setEditingId(null);
    setEditText("");
  };

  // Aplica filtro de status + busca por texto + ordenação por prioridade
  const filteredTasks = taskList
    .filter(t => {
      if (filter === "Pendentes") return !t.completed;
      if (filter === "Concluídas") return t.completed;
      return true;
    })
    .filter(t => t.text.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return (
    <div className="app-container">
      <header>
        <h1>TaskFlow</h1>
        <p>Gestão de Produtividade</p>
      </header>

      {/* Formulário para adicionar nova tarefa */}
      <section className="form-section">
        <form onSubmit={addTask}>
          <input
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Descrição da tarefa..."
          />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
          <button type="submit">Criar</button>
        </form>
      </section>

      {/* Campo de busca — filtra tarefas em tempo real conforme o usuário digita */}
      <section className="search-section">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar tarefas..."
        />
      </section>

      {/* Botões de filtro por status */}
      <section className="filter-section">
        {["Todas", "Pendentes", "Concluídas"].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </section>

      {/* Grid de tarefas — renderiza cada tarefa filtrada e ordenada */}
      <main className="task-grid">
        {filteredTasks.map(item => (
          <div key={item.id} className={`task-card ${item.priority.toLowerCase()} ${item.completed ? 'done' : ''}`}>

            <div className="task-content">
              {/* Se a tarefa está em edição, mostra input; senão, mostra o texto */}
              {editingId === item.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEdit(item.id)}
                  autoFocus
                />
              ) : (
                <h3>{item.text}</h3>
              )}
              <span>Prioridade: {item.priority}</span>
              <small>Criada em: {item.createdAt}</small>
            </div>

            <div className="task-actions">
              {/* Botão alterna entre "Editar" e "Salvar" dependendo do modo */}
              {editingId === item.id ? (
                <button onClick={() => saveEdit(item.id)}>Salvar</button>
              ) : (
                <button onClick={() => { setEditingId(item.id); setEditText(item.text); }}>
                  Editar
                </button>
              )}
              <button onClick={() => toggleTask(item.id)}>
                {item.completed ? "Reabrir" : "Concluir"}
              </button>
              <button onClick={() => deleteTask(item.id)} className="delete">
                Remover
              </button>
            </div>

          </div>
        ))}
      </main>
    </div>
  );
}

export default App;