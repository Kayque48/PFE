import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'


function Saudacao({nome}) {
  return (
    <>
      <div style={{backgroundColor: 'cyan', padding: '10px',
        borderRadius: '8px', marginBottom: '10px'}}>
        <h2 style={{color: 'red'}}>Olá, {nome}!</h2>
        <p>Este componete foi criado separadamente.</p>
      </div>
    </>
  );
}




function Botão() {

  const [clicado, setClicado] = useState(false);

  return (
    <>
      <button
        onClick={() => setClicado(!clicado)}
        style={{
          backgroundColor: clicado ? '#16a34a' : '#e11d48',
          color: '#fff',
          border: 'none',
          padding: '12px 28px',
          fontSize: '15px',
          fontWeight: '600',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
          letterSpacing: '0.03em',
        }}
      >
        {clicado ? '✅ Clicado!' : '🎁 Clica aqui'}
      </button>
    </>
  );
}

function Tabela() {

   const produtos = [
    { nome: "iPhone 15 Pro",        categoria: "Eletrônicos",      qtd: 18420, preco: 7999.99 },
    { nome: "Air Fryer Philco",     categoria: "Eletrodomésticos", qtd: 34750, preco: 349.90  },
    { nome: "Tênis Nike Air Max",   categoria: "Calçados",         qtd: 22100, preco: 599.90  },
    { nome: "Cadeira Gamer DXRacer",categoria: "Móveis",           qtd: 9870,  preco: 1299.00 },
    { nome: "Whey Protein Integral",categoria: "Suplementos",      qtd: 51300, preco: 189.90  },
  ];

  return (
    <>
    <div style={{TextAlign: 'center'}}>
      <h1>Produtos mais vendidos em 2025</h1>
        <table style={{TextAlign: 'center'}}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Quantidade vendidos</th>
              <th>Preço Unitário</th>
              <th>Fatura Total</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p, i) => (
              <tr key={i}>
                <td>{p.nome}</td>
                <td>{p.categoria}</td>
                <td>{p.qtd.toLocaleString('pt-BR')}</td>
                <td>{p.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                <td>{(p.qtd * p.preco).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )

}


function App() {
  return (
    <>
      <div>
        <h1>Olá, React!</h1>
        <p>Estou alterando meu primeiro componente.</p>
      </div>

      <Saudacao nome = 'Kayque Costa da Silva' />
      <Botão />
      <Tabela />
    </>
  )
}

export default App