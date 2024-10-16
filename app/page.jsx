"use client";

import { useState, useEffect } from "react";
import {
  createClienteAction,
  createProcessoAction,
  getClientesAction,
} from "./actions";

export default function Home() {
  const [clientes, setClientes] = useState([]);
  const [clienteData, setClienteData] = useState({
    nome: "",
    tipo: "",
    score: "",
  });
  const [processoData, setProcessoData] = useState({
    estado: "",
    tipoDeCredito: "",
    deferido: "",
    clienteId: "",
  });

  const getClientes = async () => {
    try {
      const data = await getClientesAction();

      setClientes(data);
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  };

  useEffect(() => {
    getClientes();
  }, []);

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Cliente</h1>
      <form action={createClienteAction} className="space-y-4">
        <input
          name="nome"
          type="text"
          placeholder="Nome"
          value={clienteData.nome}
          onChange={(e) =>
            setClienteData({ ...clienteData, nome: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          name="tipo"
          type="text"
          placeholder="Tipo"
          value={clienteData.tipo}
          onChange={(e) =>
            setClienteData({ ...clienteData, tipo: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          name="score"
          type="text"
          placeholder="Score"
          value={clienteData.score}
          onChange={(e) =>
            setClienteData({ ...clienteData, score: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Adicionar Cliente
        </button>
      </form>

      <h1 className="text-2xl font-bold mt-8 mb-4">Cadastro de Processo</h1>
      <form action={createProcessoAction} className="space-y-4">
        <select
          name="clienteId"
          value={processoData.clienteId}
          onChange={(e) =>
            setProcessoData({ ...processoData, clienteId: e.target.value })
          }
          className="w-full p-2 border rounded"
        >
          <option value="">Selecione um Cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
        <input
          name="estado"
          type="text"
          placeholder="Estado"
          value={processoData.estado}
          onChange={(e) =>
            setProcessoData({ ...processoData, estado: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          name="tipoDeCredito"
          type="text"
          placeholder="Tipo de Crédito"
          value={processoData.tipoDeCredito}
          onChange={(e) =>
            setProcessoData({ ...processoData, tipoDeCredito: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <input
          name="deferido"
          type="text"
          placeholder="Deferido"
          value={processoData.deferido}
          onChange={(e) =>
            setProcessoData({ ...processoData, deferido: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Adicionar Processo
        </button>
      </form>
    </div>
  );
}
