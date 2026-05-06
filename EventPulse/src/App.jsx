import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [eventTitle, setEventTitle] = useState("");
  const [eventType, setEventType] = useState("Palestra");
  const [eventVagas, setEventVagas] = useState(50);
  const [eventList, setEventList] = useState([]);

  const [filter, setFilter] = useState("Todos");


  const priorityOrder = { "Workshop": 0, "Palestra": 1, "Painel": 2 };
  const [search, setSearch] = useState("");


  // Carregar dados iniciais do LocalStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem("@eventpulse_data");
    if (savedEvents) setEventList(JSON.parse(savedEvents));
  }, []);

  // Sincronizar alterações com o LocalStorage
  useEffect(() => {
    localStorage.setItem("@eventpulse_data", JSON.stringify(eventList));
  }, [eventList]);

  const addEvent = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEvent = {
      id: crypto.randomUUID(),
      title: eventTitle,
      type: eventType,
      vagas: eventVagas,
      status: "Agendado", // Status inicial padrão
      date: new Date().toLocaleDateString()
    };

    setEventList(prev => [newEvent, ...prev]);
    setEventTitle("");
  };

  const toggleStatus = (id) => {

    setEventList(eventList.map(evt => {
      if (evt.id === id) {
        // Rotaciona o status do evento sequencialmente
        const nextStatus = evt.status === "Agendado" ? "Em Andamento" :
          evt.status === "Em Andamento" ? "Encerrado" : "Agendado";
        return { ...evt, status: nextStatus };
      }
      return evt;
    }));
  };

  const deleteEvent = (id) => {
    setEventList(eventList.filter(evt => evt.id !== id));
  };

  const inscricaoAluno = (id) => {
    setEventList(eventList.map(evt =>
      evt.id === id
        ? { ...evt, vagas: evt.vagas - 1 }
        : evt
    ));
  };

  const ClearList = () => {
    const confirmed = window.confirm("Tem certeza que deseja remover todos as atividades?");
    if(confirmed) setEventList([]);
  };

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
        <h1>EventPulse</h1>
        <p>Gestão de Eventos Acadêmicos</p>
      </header>

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
            min={0}
            max={50}
            value={eventVagas}
            onChange={(e) => setEventVagas(Number(e.target.value))}
            placeholder="0-50"
          />
          <button type="submit">Agendar</button>
        </form>
      </section>
      <section className="filter-section">
        {["Todos", "Agendados", "Em Andamento", "Encerrados"].map(f => (
          <button
            key={f}
            className={filter === f ? "active" : ""}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
        <button onClick={ClearList}>Limpar Cronograma</button>
      </section>

      <section className="search-section">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar atividade..."
        />
      </section>


      <main className="event-grid">
        {filteredEvents.map(item => (
          <div
            key={item.id}
            className={`event-card ${item.type.toLowerCase()}
${item.status.toLowerCase().replace(" ", "-")}`}
          >
            <div className="event-content">
              <h3>{item.title}</h3>
              <span className="event-tag">Tipo: {item.type}</span>
              <span className="status-badge">Status: {item.status}</span>
              <span className="event-tag">Vagas{item.vagas ? `: ${item.vagas} disponível` : " Lotadas"}</span>
              <small>Registrado em: {item.date}</small>
            </div>
            <div className="event-actions">
              <button onClick={() => toggleStatus(item.id)} className="status-btn">
                {item.status === "Agendado" ? "Iniciar" : item.status === "Em Andamento"
                  ? "Encerrar" : "Reiniciar"}
              </button>
              <button onClick={() => inscricaoAluno(item.id)}
                disabled={item.vagas === 0}>
                {item.vagas > 0 ? "Inscreve" : "Lotado"}
              </button>
              <button onClick={() => deleteEvent(item.id)} className="delete">
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