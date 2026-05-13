import React, { useState, useEffect } from 'react';
import './App.css';

// Componente principal da aplicação EventPulse para gestão de eventos acadêmicos
function App() {
  // Estados para gerenciar o formulário de adição de eventos
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("Palestra");
  const [eventVagas, setEventVagas] = useState(50);
  
  // Carregar eventos do LocalStorage no estado inicial
  const [eventList, setEventList] = useState(() => {
    const saved = localStorage.getItem("@eventpulse_data");
    return saved ? JSON.parse(saved) : [];
  });
  
  // Estados para Modais
  const [showModal, setShowModal] = useState(false); // Changelog
  const [showEditModal, setShowEditModal] = useState(false); // Modal de Edição
  const [editingId, setEditingId] = useState(null);

  // Estados para filtros e busca
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  // Ordem de prioridade para ordenar os tipos de eventos na exibição
  const priorityOrder = { "Workshop": 0, "Palestra": 1, "Painel": 2 };

  // Sincronizar alterações na lista de eventos com o LocalStorage
  useEffect(() => {
    localStorage.setItem("@eventpulse_data", JSON.stringify(eventList));
  }, [eventList]);

  // Função para adicionar um novo evento à lista
  const addEvent = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEvent = {
      id: crypto.randomUUID(),
      title: eventTitle,
      type: eventType,
      vagas: eventVagas,
      status: "Agendado",
      date: new Date().toLocaleDateString()
    };

    setEventList(prev => [newEvent, ...prev]);
    setEventTitle("");
    setEventType("Palestra");
    setEventVagas(50);
  };

  // Função para salvar a edição vinda do Modal
  const saveEdit = (e) => {
    e.preventDefault();
    setEventList(eventList.map(evt =>
      evt.id === editingId
        ? { ...evt, title: eventTitle, type: eventType, vagas: eventVagas }
        : evt
    ));
    closeEditModal();
  };

  // Abre o modal de edição e preenche os estados
  const startEdit = (event) => {
    setEditingId(event.id);
    setEventTitle(event.title);
    setEventType(event.type);
    setEventVagas(event.vagas);
    setShowEditModal(true);
  };

  // Fecha o modal de edição e limpa os campos
  const closeEditModal = () => {
    setEditingId(null);
    setEventTitle("");
    setEventVagas(50);
    setShowEditModal(false);
  };

  // Função para alternar o status do evento
  const toggleStatus = (id) => {
    setEventList(eventList.map(evt => {
      if (evt.id === id) {
        const nextStatus = evt.status === "Agendado" ? "Em Andamento" :
          evt.status === "Em Andamento" ? "Encerrado" : "Agendado";
        return { ...evt, status: nextStatus };
      }
      return evt;
    }));
  };

  // Função para remover um evento da lista
  const deleteEvent = (id) => {
    setEventList(eventList.filter(evt => evt.id !== id));
  };

  // Função para decrementar o número de vagas (Inscrição)
  const inscricaoAluno = (id) => {
    setEventList(eventList.map(evt =>
      evt.id === id && evt.vagas > 0
        ? { ...evt, vagas: evt.vagas - 1 }
        : evt
    ));
  };

  // Função para limpar toda a lista
  const ClearList = () => {
    const confirmed = window.confirm("Tem certeza que deseja remover todos as atividades?");
    if (confirmed) setEventList([]);
  };

  // Filtrar e Ordenar eventos
  const filteredEvents = eventList.filter(evt => {
    if (filter === "Agendados") return evt.status === "Agendado";
    if (filter === "Em Andamento") return evt.status === "Em Andamento";
    if (filter === "Encerrados") return evt.status === "Encerrado";
    return true;
  })
  .filter(t => t.title.toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) => priorityOrder[a.type] - priorityOrder[b.type]);

  return (
    <div className="app-container">
      <header>
        <img src="/senai.svg" alt="SENAI Logo" className="logo" />
        <h1>EventPulse</h1>
        <p>Gestão de Eventos Acadêmicos</p>
      </header>

      {/* Formulário de Adição */}
      <section className="form-section">
        <form onSubmit={addEvent}>
          <input
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="Nome do evento ou atividade..."
          />
          <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
            <option value="Palestra">Palestra</option>
            <option value="Workshop">Workshop</option>
            <option value="Painel">Painel</option>
          </select>
          <input
            type="number"
            min={0} max={50}
            value={eventVagas}
            onChange={(e) => setEventVagas(Number(e.target.value))}
          />
          <button type="submit">Agendar</button>
        </form>
      </section>

      {/* Filtros e Busca */}
      <section className="filter-section">
        {["Todos", "Agendados", "Em Andamento", "Encerrados"].map(f => (
          <button key={f} className={filter === f ? "active" : ""} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <button onClick={ClearList}>Limpar Cronograma</button>
      </section>

      <section className="search-section">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar atividade..." />
      </section>

      {/* Grid de Cards */}
      <main className="event-grid">
        {filteredEvents.map(item => (
          <div key={item.id} className={`event-card ${item.type.toLowerCase()} ${item.status.toLowerCase().replace(" ", "-")}`}>
            <div className="event-content">
              <h3>{item.title}</h3>
              <span className="event-tag">Tipo: {item.type}</span>
              <span className="status-badge">Status: {item.status}</span>
              <span className="event-tag">Vagas{item.vagas ? `: ${item.vagas} disponível` : " Lotadas"}</span>
              <small>Registrado em: {item.date}</small>
            </div>

            <div className="event-actions">
              <button onClick={() => toggleStatus(item.id)} className="status-btn">
                {item.status === "Agendado" ? "Iniciar" : item.status === "Em Andamento" ? "Encerrar" : "Reiniciar"}
              </button>
              
              {/* Botão de Inscrição IMPORTANTE */}
              <button onClick={() => inscricaoAluno(item.id)} disabled={item.vagas === 0}>
                {item.vagas > 0 ? "Inscrever" : "Lotado"}
              </button>

              <button onClick={() => startEdit(item)} className="edit-btn">Editar</button>

              <button onClick={() => deleteEvent(item.id)} className="delete">Remover</button>
            </div>
          </div>
        ))}
      </main>

      {/* MODAL DE EDIÇÃO */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-box edit-modal">
            <h2>Editar Atividade</h2>
            <form onSubmit={saveEdit}>
               <div className="modal-form-group">
                  <label>Título:</label>
                  <input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} required />
               </div>
               <div className="modal-form-group">
                  <label>Tipo:</label>
                  <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                    <option value="Palestra">Palestra</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Painel">Painel</option>
                  </select>
               </div>
               <div className="modal-form-group">
                  <label>Vagas:</label>
                  <input type="number" value={eventVagas} onChange={(e) => setEventVagas(Number(e.target.value))} />
               </div>
               <div className="modal-actions">
                  <button type="submit" className="save-btn">Salvar Alterações</button>
                  <button type="button" onClick={closeEditModal} className="cancel-btn">Cancelar</button>
               </div>
            </form>
          </div>
        </div>
      )}

      {/* Botão flutuante Changelog */}
      <button className="fab" onClick={() => setShowModal(true)}>
        <img src="/favicon_css.png" alt="info" />
      </button>

      {/* Modal Changelog */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>Changelog</h2>
            <ul>
              <li>Sistema de edição via Modal implementado</li>
              <li>Botão de inscrição de aluno funcional</li>
              <li>Correção de estrutura de chaves</li>
            </ul>
            <button onClick={() => setShowModal(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;