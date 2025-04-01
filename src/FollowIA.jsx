import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sparkle, AlertTriangle, Sparkles, BookOpen } from "lucide-react";

const respostasMock = {
  "qual o consumo total de energia": {
    titulo: "Consumo Total",
    texto: "O consumo total de energia em tempo real é de 1520 kWh. Unidade Aricanduva: 920 kWh | Unidade Mooca: 600 kWh.",
    link: "Ver dashboard"
  },
  "qual a previsão de consumo para aricanduva": {
    titulo: "Previsão Consumo",
    texto: "A previsão de consumo para os próximos 7 dias é de aproximadamente 10.500 kWh. Aricanduva: 6.300 kWh | Mooca: 4.200 kWh."
  },
  "quais são os picos de consumo ao longo do dia": {
    titulo: "Picos Consumo",
    texto: "Os picos de consumo médio por unidade ocorrem: Aricanduva entre 11h e 13h (máximo de 250 kWh), Mooca entre 14h e 16h (máximo de 230 kWh)."
  },
  "há consumo anômalo detectado": {
    titulo: "Consumo Anomalo",
    texto: "Detectado consumo anômalo em Aricanduva no dia 24/02/2024 às 00:00 com 65 kWh, acima do limite esperado para o horário.",
    link: "Ver dashboard"
  },
  "qual o consumo atual de gás": {
    titulo: "Gás Atual",
    texto: "O consumo atual de gás é de 9 m³. Unidade Aricanduva: 6 m³ | Unidade Mooca: 3 m³."
  },
  "qual a demanda média da unidade": {
    texto: "A demanda média das unidades é: Aricanduva 78 kW | Mooca 62 kW. Deseja saber apenas de uma unidade?"
  },
  "qual o consumo médio mensal": {
    texto: "O consumo médio mensal é: Aricanduva 9.800 kWh | Mooca 6.300 kWh. Deseja saber apenas de uma unidade?"
  },
  "o que é consumo": {
    texto: "Consumo é a quantidade de energia elétrica utilizada por uma unidade em determinado período. Medido em kWh."
  },
  "o que é demanda": {
    texto: "Demanda é a quantidade de energia requisitada pela instalação em seu pico de uso, geralmente cobrada pela concessionária."
  },
  "o que é energia reativa": {
    texto: "Energia reativa é a energia que circula nos circuitos e não realiza trabalho útil, mas é necessária para funcionamento de motores e transformadores."
  },
  "como funciona o gerenciamento de energia": {
    texto: "O gerenciamento permite identificar desperdícios, otimizar o uso de energia e controlar cargas remotamente para reduzir custos."
  },
  "quais empresas podem utilizar o follow energy": {
    texto: "Indústrias, redes de varejo, supermercados, bancos, hospitais e empresas com múltiplas unidades são beneficiadas com a solução."
  }
};

export default function FollowIA() {
  const [pergunta, setPergunta] = useState("");
  const [resposta, setResposta] = useState(null);
  const [glossarioAtivo, setGlossarioAtivo] = useState(null);

  const responder = (customKey) => {
    const chave = (customKey || pergunta).toLowerCase();
    const respostaEncontrada = Object.entries(respostasMock).find(([k]) => chave.includes(k));
    if (respostaEncontrada) {
      setResposta(respostaEncontrada[1]);
      setGlossarioAtivo(customKey || null);
    } else {
      setResposta({ texto: "Desculpe, ainda não consigo responder essa pergunta." });
    }
  };

  const insightsKeys = [
    "qual o consumo total de energia",
    "qual a previsão de consumo para aricanduva",
    "quais são os picos de consumo ao longo do dia",
    "qual o consumo atual de gás",
    "há consumo anômalo detectado"
  ];

  const glossarioKeys = Object.keys(respostasMock).filter((k) => k.startsWith("o que") || k.startsWith("como") || k.startsWith("quais"));

  return (
    <div className="p-4 space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-blue-800">Follow IA</h1>

      <div className="flex gap-2">
        <Input
          value={pergunta}
          onChange={(e) => setPergunta(e.target.value)}
          placeholder="Faça uma pergunta sobre energia..."
        />
        <Button onClick={() => responder()}>Perguntar</Button>
      </div>

      {resposta && !glossarioAtivo && (
        <Card className="bg-blue-50 border border-blue-200">
          <CardContent className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-blue-700">
              <Sparkle className="w-4 h-4" /> <span className="font-medium">Resposta da IA</span>
            </div>
            <p>{resposta.texto}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
