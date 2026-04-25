// Mock intelligence feed for Moloch Deck terminal.
// Estructura plana y serializable: lista para alimentarse desde JSON
// externo (REST, fetch local o build-time import) sin cambiar el render.
//
// Trend tokens: "up-strong" | "up" | "flat" | "down" | "down-strong"
// Level tokens: "Low" | "Medium" | "High" | "Extreme"

export const INTELLIGENCE = {
  generatedAt: "2026-04-25",
  cycle: "Q2 2026 · semana 17",

  signal: {
    id: "moloch-signal",
    title: "Moloch Signal",
    quote:
      "Cada lab sabe que la pausa es óptima. Ninguno puede pausarse primero. Moloch sigue sonriendo.",
    context: "Tras el acuerdo Trump-Xi sobre AI freeze: tres releases frontier en 18 días.",
  },

  primary: [
    {
      id: "frontier-labs",
      title: "Frontier Labs Pulse",
      subtitle: "Quién marca el ritmo de la carrera AGI",
      level: "Extreme",
      headline:
        "Anthropic captura enterprise. OpenAI defiende consumer. xAI sorprende en compute. Meta sangra talento.",
      rows: [
        { name: "OpenAI", trend: "up", note: "GPT-5.5 + Sora 2 + agentes nativos en macOS/iOS" },
        { name: "Anthropic", trend: "up-strong", note: "Claude 4.7 lidera coding; ARR >$15B" },
        { name: "Google DeepMind", trend: "flat", note: "Gemini 3 sólido, no diferenciador" },
        { name: "Meta", trend: "down", note: "Llama 5 retrasado; éxodo a xAI y Anthropic" },
        { name: "xAI", trend: "up", note: "Grok 4 frontier-tier; Colossus 2 con 1M GPUs" },
        { name: "DeepSeek", trend: "up", note: "V4 abierto fuerza recortes de precio en Occidente" },
      ],
      signal: "Tres labs occidentales superan $10B ARR. La carrera ya no es técnica: es financiera.",
      risk: "Concentración de capital — 4 actores controlan ~90% del compute frontier global.",
    },

    {
      id: "compute-datacenter",
      title: "Compute & Datacenter Watch",
      subtitle: "Silicio, fabs, hyperscalers, energía",
      level: "High",
      headline:
        "El cuello de botella ya no son los chips. Es la energía firme y los permisos de red.",
      rows: [
        { name: "Nvidia", trend: "up", note: "Blackwell Ultra a full output; Rubin sample en Q3" },
        { name: "AMD", trend: "up", note: "MI400 gana cuota en hyperscalers no-frontier" },
        { name: "TSMC", trend: "flat", note: "N2 en producción; CoWoS-L sigue siendo bottleneck" },
        { name: "Broadcom", trend: "up", note: "Custom silicon Google/Meta/OpenAI consolidado" },
        { name: "Hyperscalers", trend: "up", note: "Stargate fase 1 online; capex 2026 >$420B" },
      ],
      signal: "Texas y Virginia bloquean 4 GW de permisos en Q1 2026. Capex sin energía firmada.",
      risk: "Mercados eléctricos saturados: nuevos clusters dependen de gas y nuclear privado.",
    },

    {
      id: "china-stack",
      title: "China Stack Monitor",
      subtitle: "Stack chino: modelos, chips, eficiencia",
      level: "High",
      headline:
        "Eficiencia algorítmica china reduce el gap a ~10 meses. Export controls produjeron lo opuesto a lo previsto.",
      rows: [
        { name: "DeepSeek", trend: "up-strong", note: "V4 abierto, eficiencia ~3x sobre GPT-5" },
        { name: "Huawei", trend: "up", note: "Ascend 920 + CloudMatrix 384 ≈ NVL72 doméstico" },
        { name: "Alibaba", trend: "up", note: "Qwen 4 lidera en chino; expansión SE Asia" },
        { name: "Tencent", trend: "flat", note: "Hunyuan video competitivo con Sora 1" },
        { name: "ByteDance", trend: "up", note: "Doubao captura mercado interno; talento masivo" },
        { name: "Baidu", trend: "down", note: "Foundation models sin tracción comercial" },
      ],
      signal: "Open weights chinos comoditizan inferencia global por debajo de $1 / M tokens.",
      risk: "Si Huawei resuelve yields HBM, el moat de Nvidia en China cae en 12 meses.",
    },

    {
      id: "geopolitical",
      title: "Geopolitical Pressure Map",
      subtitle: "EE.UU. · China · UE · Taiwán · Golfo · India · Japón",
      level: "Extreme",
      headline:
        "Acuerdo Trump-Xi sobre AI freeze: papel mojado. G42 desplaza a la UE como tercer polo.",
      rows: [
        { name: "EE.UU.", trend: "up", note: "Stargate $500B aprobado; export controls ampliados a memoria" },
        { name: "China", trend: "up", note: "Plan 2030 reasignado a IA; subsidios SMIC + Huawei" },
        { name: "UE", trend: "down", note: "AI Act fase 2 vigente; frontier labs evitan deployment" },
        { name: "Taiwán", trend: "flat", note: "TSMC dual-fab Arizona operativa; tensión sobre N2 doméstico" },
        { name: "Golfo (G42, Saudi)", trend: "up-strong", note: "Capex >$80B; alianzas con OpenAI y xAI" },
        { name: "India", trend: "flat", note: "Reliance + Adani en datacenters; modelo doméstico ausente" },
        { name: "Japón", trend: "up", note: "Sakana + Rakuten cierran gap; alineación EE.UU. firme" },
      ],
      signal: "El Golfo emerge como tercer hub de cómputo, financiado por petróleo, no por VC.",
      risk: "No hay Schelling point a la vista. Coordinación EE.UU.-China estructuralmente imposible.",
    },

    {
      id: "tesla-rwai",
      title: "Tesla / Real-World AI",
      subtitle: "Embodied AI · FSD · Optimus · Robotics",
      level: "Medium",
      headline:
        "Optimus V3 entra en Fremont: 500 unidades, tareas reales. Demo → deployment, aún no moat.",
      rows: [
        { name: "Tesla FSD", trend: "up", note: "V14: 1 intervención cada 10K millas en highway" },
        { name: "Optimus V3", trend: "up", note: "Grok integrado; BoM <$25K; primera producción interna" },
        { name: "xAI ↔ Tesla", trend: "up", note: "Grok-Vision compartido FSD/Optimus; sinergia data" },
        { name: "Figure", trend: "up", note: "Figure 03 levanta $5B; pilots con BMW y Walmart" },
        { name: "Apptronik", trend: "flat", note: "Expansión con Mercedes; sin modelo foundation propio" },
      ],
      signal: "Embodied AI pasó de demo a deployment en 2026. Ningún actor tiene aún defensibilidad.",
      risk: "Si FSD no se generaliza fuera de EE.UU. en 2026, la narrativa de Tesla colapsa.",
    },

    {
      id: "agentic-radar",
      title: "Agentic Automation Radar",
      subtitle: "Agentes de código, browser y workflow",
      level: "High",
      headline:
        "Claude Code + Codex devoran trabajo de mid-level engineers. Hiring junior cae 35% YoY.",
      rows: [
        { name: "Codex (OpenAI)", trend: "up", note: "Operator + Codex unificados; APIs profundas" },
        { name: "Claude Code", trend: "up-strong", note: "Adopción enterprise dispara; SDK + Skills + plugins" },
        { name: "MCP", trend: "up", note: "Estándar de facto; Anthropic + OpenAI + Google compatibles" },
        { name: "Browser agents", trend: "up", note: "Operator y Computer Use en producción regulada" },
        { name: "Devin / Replit / Cursor", trend: "up", note: "Workflows autónomos en uso real, no demo" },
      ],
      signal: "Output de mid-level eng multiplica x4. El mercado laboral cognitivo no se ajusta tan rápido.",
      risk: "Los agentes capturan margen del SaaS vertical: amenaza directa a empresas de productividad.",
    },
  ],

  secondary: [
    {
      id: "model-economics",
      title: "Model Economics",
      subtitle: "Pricing · márgenes · open weights",
      level: "Medium",
      headline: "Inferencia frontier a $0.50 / M tokens output. Suelo no encontrado.",
      rows: [
        { name: "GPT-5.5", trend: "flat", note: "$5 / $15 input/output por M tokens" },
        { name: "Claude 4.7", trend: "flat", note: "$3 / $15 — premium por reliability enterprise" },
        { name: "Gemini 3 Pro", trend: "down", note: "$2 / $8 — Google subsidia para defensa de share" },
        { name: "DeepSeek V4 (open)", trend: "down-strong", note: "$0.14 / $0.28 hosted; pesos abiertos" },
        { name: "Distillation enterprise", trend: "up", note: "1/10 del coste con ~90% capability" },
      ],
      signal: "Margen bruto de inferencia frontier <40% para todos menos Anthropic.",
      risk: "Si DeepSeek mantiene paridad funcional, los labs occidentales venden bajo coste en 2027.",
    },
  ],
};
