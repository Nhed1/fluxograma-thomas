"use client";

import { useEffect, useState } from "react";
import { getProcessosAction } from "../actions";
import Link from "next/link";

export default function Processos() {
  const [processos, setProcessos] = useState([]);

  const getProcessos = async () => {
    try {
      const data = await getProcessosAction();

      setProcessos(data);
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  };

  useEffect(() => {
    getProcessos();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <Link href="/">Voltar</Link>

      <h1 className="text-2xl font-bold mb-6">Lista de Processos</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Cliente ID</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-left">Tipo de Crédito</th>
              <th className="py-3 px-6 text-left">Deferido</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {processos.map((processo) => (
              <tr
                key={processo.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{processo.id}</td>
                <td className="py-3 px-6">{processo.clienteId}</td>
                <td className="py-3 px-6">{processo.estado}</td>
                <td className="py-3 px-6">{processo.tipoDeCredito}</td>
                <td className="py-3 px-6">{processo.deferido}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
