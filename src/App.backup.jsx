import { useMemo, useState } from "react";

const CARDS = [
  {
    id: 1,
    title: "OpenAI corre, Anthropic fortifica",
    category: "Labs en guerra",
    coreIdea:
      "OpenAI parece optimizar distribución, velocidad y producto. Anthropic parece optimizar confianza, enterprise y narrativa de seguridad. No juegan exactamente al mismo juego, aunque vendan modelos parecidos.",
    whyItMatters:
      "El ganador puede no ser quien tenga el modelo más brillante esta semana, sino quien controle el workflow, la confianza institucional o el coste de inferencia.",
    question:
      "¿El verdadero moat está en el modelo, la distribución, la infraestructura, la seguridad percibida o el hábito del usuario?",
    prompt:
      "Compara OpenAI y Anthropic como actores estratégicos en la carrera de IA. Analiza distribución, enterprise adoption, safety narrative, pricing, developer ecosystem, coste de inferencia y teoría de juegos. Sé brutalmente honesto y termina con una predicción a 24 meses.",
    vertigo: 4,
    bullshit: 2,
  },
  {
    id: 2,
    title: "El trilema de Bostrom no tiene salida bonita",
    category: "AGI y Bostrom",
    coreIdea:
      "Si una superinteligencia llega, hay tres opciones incómodas: no se puede controlar, la controla alguien, o nunca aparece. Ninguna es exactamente relajante.",
    whyItMatters:
      "El debate sobre AGI no va solo de capacidad técnica. Va de poder, control, coordinación y de quién decide qué objetivos son aceptables.",
    question:
      "¿Qué escenario te inquieta más: AGI incontrolable, AGI monopolizada por una empresa, o AGI controlada por un Estado?",
    prompt:
      "Analiza el trilema de Bostrom aplicado al periodo 2026-2035. Evalúa tres escenarios: AGI no alcanzada, AGI controlada por una empresa privada, y AGI fuera de control. Usa teoría de juegos, incentivos económicos, geopolítica y riesgos de concentración de poder.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 3,
    title: "Nadie quiere correr, todos corren",
    category: "Moloch y teoría de juegos",
    coreIdea:
      "En una carrera hacia AGI, incluso el actor prudente queda forzado a acelerar si cree que otro actor menos prudente puede llegar primero. No hace falta maldad; basta con incentivos mal alineados.",
    whyItMatters:
      "La coordinación global en IA avanzada puede ser inestable aunque todos digan públicamente que quieren seguridad.",
    question:
      "¿Puede existir una pausa real si ningún jugador puede verificar que los demás también paran?",
    prompt:
      "Modela una carrera hacia AGI como un dilema del prisionero multijugador. Incluye laboratorios privados, Estados, inversores, ejército, open source y opinión pública. Explica por qué los compromisos de pausa son inestables y qué mecanismos podrían cambiar el equilibrio.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 4,
    title: "La era de las enanas rojas",
    category: "Futuro profundo",
    coreIdea:
      "Las estrellas enanas rojas pueden vivir billones de años. Si son habitables, quizá nosotros no vivimos en la época madura del universo, sino en su absurdo amanecer.",
    whyItMatters:
      "La pregunta no es solo si hay vida fuera. Es por qué aparecemos tan pronto si el universo tiene tanto tiempo por delante.",
    question:
      "Si el futuro habitable del universo es inmensamente más largo que su presente, ¿por qué estamos aquí ahora?",
    prompt:
      "Explícame la paradoja temporal de la vida inteligente en el universo: si las enanas rojas vivirán billones de años, ¿por qué la vida consciente aparece ahora alrededor de estrellas como el Sol? Analiza selección antrópica, paradoja de Fermi, Gran Filtro, habitabilidad de estrellas M e implicaciones filosóficas.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 5,
    title: "Open source: liberación o dinamita",
    category: "Duelos incómodos",
    coreIdea:
      "El open source en IA puede evitar monopolios, pero también reducir las barreras para actores irresponsables. Ambas cosas pueden ser ciertas a la vez, qué cómodo todo.",
    whyItMatters:
      "La pregunta seria no es si abrir modelos es bueno o malo. Es a partir de qué capacidad publicar pesos se convierte en redistribuir poder estratégico sin gobernanza.",
    question:
      "¿Dónde está el punto exacto en que abrir pesos deja de ser ciencia y empieza a ser munición?",
    prompt:
      "Debate el open source en IA avanzada desde dos posiciones fuertes y opuestas. Primero defiende que es esencial para evitar monopolios y permitir auditoría pública. Después defiende que puede ser una amenaza de seguridad. Finalmente sintetiza una posición pragmática para 2026-2030.",
    vertigo: 4,
    bullshit: 2,
  },
  {
    id: 6,
    title: "Señal IA del día: precio ridículo, presión brutal",
    category: "Señal IA del día",
    coreIdea:
      "Cuando un modelo aparece con contexto enorme y precio agresivo, la noticia real no es el benchmark. Es la presión sobre márgenes, infraestructura y percepción de valor.",
    whyItMatters:
      "Si la capacidad se comoditiza, los labs premium tienen que justificar por qué valen mucho más. Ahí empiezan los sudores fríos, no en el comunicado de prensa.",
    question:
      "¿La ventaja competitiva en IA se está moviendo del mejor modelo al modelo suficientemente bueno servido casi gratis?",
    prompt:
      "Analiza una noticia de lanzamiento de modelo IA con contexto largo y precio muy agresivo. Evalúa impacto en OpenAI, Anthropic, Google, DeepSeek, Nvidia, hyperscalers y usuarios enterprise. Separa capacidad real de narrativa de marketing. Usa economía industrial y teoría de juegos.",
    vertigo: 4,
    bullshit: 3,
  },
  {
    id: 7,
    title: "El contrato viejo",
    category: "Humano post-trabajo",
    coreIdea:
      "Durante décadas, la vida adulta fue vender horas a cambio de estabilidad. Si la automatización de conocimiento avanza, ese contrato puede romperse primero psicológicamente y luego económicamente.",
    whyItMatters:
      "No todo el mundo perderá el trabajo de golpe. Más probable: primero pierde sentido, luego estatus, luego precio. La degradación suele llegar con traje y PowerPoint.",
    question:
      "¿Trabajas por dinero, identidad, estructura, miedo al vacío o porque aún no has diseñado una alternativa creíble?",
    prompt:
      "Analiza el trabajo moderno como contrato psicológico: tiempo por dinero, identidad social, rutina, estatus y miedo al vacío. Considera una persona de 52 años, carrera consolidada, sin hijos, sin deuda relevante y con deseo de libertad financiera. Sé directo: ¿qué debería optimizar en los próximos 5-8 años?",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 8,
    title: "Fermi: alguien falta a la fiesta",
    category: "Fermi y cosmología",
    coreIdea:
      "Si la vida inteligente debería expandirse, y el universo es viejo, la ausencia de señales no es un detalle. Es una anomalía con mala cara.",
    whyItMatters:
      "La paradoja de Fermi no pregunta solo dónde están los extraterrestres. Pregunta qué mata, silencia o transforma a las civilizaciones avanzadas.",
    question:
      "¿El Gran Filtro está detrás de nosotros, delante de nosotros, o somos demasiado primitivos para reconocer la fiesta?",
    prompt:
      "Analiza la paradoja de Fermi desde tres hipótesis: el Gran Filtro está detrás, el Gran Filtro está delante, o las civilizaciones avanzadas se vuelven invisibles para nosotros. Incluye IA, civilizaciones post-biológicas, expansión interestelar, autodestrucción y límites físicos.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 9,
    title: "El benchmark es el tráiler, no la película",
    category: "Señal IA del día",
    coreIdea:
      "Cada lanzamiento de modelo viene con una tabla de benchmarks como si fuese Moisés bajando del Sinaí con una GPU. Pero el valor real aparece en uso sostenido, costes, latencia, tool use y fiabilidad.",
    whyItMatters:
      "El mercado se excita con porcentajes pequeños, pero los usuarios pagan por workflows que no se rompen. Hay diferencia entre ganar una gráfica y cambiar una rutina diaria.",
    question:
      "¿Qué métrica debería importarte de verdad: benchmark, coste por tarea resuelta, fiabilidad o capacidad de integrarse en tu vida?",
    prompt:
      "Analiza por qué los benchmarks de modelos IA pueden ser engañosos. Distingue entre rendimiento académico, utilidad real, coste por tarea, latencia, fiabilidad, tool use, contexto largo y adopción diaria. Dame un marco práctico para evaluar lanzamientos de IA sin caer en hype.",
    vertigo: 3,
    bullshit: 4,
  },
  {
    id: 10,
    title: "La AGI como monopolio espiritual",
    category: "AGI y Bostrom",
    coreIdea:
      "Si una empresa controla el primer sistema realmente superior al humano en ciencia, software, estrategia y persuasión, no controla solo una tecnología. Controla una especie de motor de realidad.",
    whyItMatters:
      "El debate sobre AGI privada no es solo económico. Es político, civilizatorio y casi religioso, aunque los comunicados lo llamen 'product update'.",
    question:
      "¿Puede una empresa privada tener legitimidad para controlar una inteligencia que supere a las instituciones humanas?",
    prompt:
      "Analiza el escenario de una empresa privada controlando la primera AGI transformadora. Evalúa legitimidad, concentración de poder, incentivos de accionistas, regulación, seguridad nacional, dependencia social y riesgos de captura institucional. Sé frío y estructurado.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 11,
    title: "Anthropic vende confianza, OpenAI vende inevitabilidad",
    category: "Labs en guerra",
    coreIdea:
      "Anthropic intenta parecer el adulto serio de la sala. OpenAI intenta parecer el futuro inevitable. Son narrativas distintas para capturar clientes, talento, reguladores e inversores.",
    whyItMatters:
      "En IA avanzada, la narrativa no es decoración. Es parte del producto. Define quién obtiene permisos, contratos, distribución y margen.",
    question:
      "¿Qué narrativa es más fuerte a largo plazo: seguridad confiable o velocidad inevitable?",
    prompt:
      "Compara la narrativa estratégica de Anthropic y OpenAI. Analiza cómo cada empresa usa seguridad, velocidad, producto, enterprise, developer ecosystem, regulación y percepción pública para construir poder. Concluye cuál narrativa es más robusta si la carrera se vuelve más peligrosa.",
    vertigo: 4,
    bullshit: 2,
  },
  {
    id: 12,
    title: "Moloch no odia a nadie",
    category: "Moloch y teoría de juegos",
    coreIdea:
      "Moloch no necesita villanos. Solo necesita jugadores racionales atrapados en sistemas donde hacer lo correcto individualmente produce un desastre colectivo.",
    whyItMatters:
      "Muchas catástrofes modernas no nacen de la maldad, sino de incentivos perfectamente comprensibles. Esa es la parte desagradable.",
    question:
      "¿Cuál es el ejemplo actual más claro de un sistema donde todos saben que pierden, pero nadie puede dejar de jugar?",
    prompt:
      "Explícame Moloch como dinámica de teoría de juegos, no como metáfora literaria. Usa ejemplos en IA, redes sociales, trabajo corporativo, mercados financieros y geopolítica. Identifica qué mecanismos reales podrían romper esos equilibrios destructivos.",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 13,
    title: "La civilización que decide no expandirse",
    category: "Fermi y cosmología",
    coreIdea:
      "Tal vez las civilizaciones avanzadas no colonizan la galaxia porque evolucionan hacia mundos internos: simulaciones, computación reversible, eficiencia extrema o formas de existencia que no emiten señales.",
    whyItMatters:
      "La paradoja de Fermi suele asumir que una civilización avanzada quiere expandirse físicamente. Quizá eso es una proyección de primates con cohetes.",
    question:
      "¿Y si las civilizaciones maduras no conquistan estrellas porque conquistar estrellas es una fase adolescente?",
    prompt:
      "Analiza la hipótesis de que civilizaciones avanzadas se vuelven deliberadamente invisibles o no expansivas. Incluye simulaciones, eficiencia energética, computación, riesgo de exposición, ética post-biológica, paradoja de Fermi y límites físicos.",
    vertigo: 5,
    bullshit: 2,
  },
  {
    id: 14,
    title: "El usuario suficientemente satisfecho",
    category: "Labs en guerra",
    coreIdea:
      "El laboratorio ganador podría no ser el que tenga el modelo más inteligente, sino el que consiga que millones de usuarios digan: esto ya me vale, no me muevo.",
    whyItMatters:
      "La historia tecnológica está llena de productos no perfectos que ganaron por distribución, hábito y timing. El mejor motor no siempre gana la carretera.",
    question:
      "¿Cuándo deja de importar tener el modelo número uno si ya controlas el punto de entrada del usuario?",
    prompt:
      "Analiza la carrera de IA desde la perspectiva de distribución y hábito de usuario. Compara calidad del modelo frente a integración en sistema operativo, navegador, móvil, empresa, IDE y workflows diarios. Usa ejemplos históricos de tecnología donde el mejor producto técnico no ganó.",
    vertigo: 3,
    bullshit: 2,
  },
  {
    id: 15,
    title: "La jaula cómoda",
    category: "Humano post-trabajo",
    coreIdea:
      "La automatización puede no liberarnos de golpe. Puede darnos herramientas brillantes mientras mantiene intacta la estructura vieja: más output, mismas horas, más expectativas.",
    whyItMatters:
      "La trampa no es que la IA no funcione. La trampa es que funcione y el sistema capture casi todo el excedente.",
    question:
      "Si produces el doble con IA, ¿quién se queda realmente con esa ganancia: tú, la empresa, el cliente o Moloch con corbata?",
    prompt:
      "Analiza cómo la IA puede aumentar productividad sin aumentar libertad individual. Incluye captura del excedente, expectativas laborales, intensificación del trabajo, salarios, poder de negociación y posibles estrategias personales para no ser absorbido por el sistema.",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 16,
    title: "El Gran Filtro como aburrimiento",
    category: "Fermi y cosmología",
    coreIdea:
      "Tal vez algunas civilizaciones no se destruyen por guerra o asteroides. Tal vez se hunden en mundos artificiales tan satisfactorios que dejan de mirar hacia fuera.",
    whyItMatters:
      "La extinción no siempre necesita fuego. A veces basta con una civilización que pierde el deseo de hacer algo difícil.",
    question:
      "¿Puede una civilización morir no por dolor, sino por exceso de satisfacción sintética?",
    prompt:
      "Explora la hipótesis del Gran Filtro como colapso motivacional: civilizaciones que desarrollan simulaciones, entretenimiento perfecto o realidades artificiales y pierden impulso expansivo. Relaciónalo con IA, dopamina, videojuegos, realidad virtual, civilizaciones post-biológicas y paradoja de Fermi.",
    vertigo: 5,
    bullshit: 2,
  },
  {
    id: 17,
    title: "La pausa imposible",
    category: "Duelos incómodos",
    coreIdea:
      "Pedir una pausa global en IA avanzada puede ser racional desde seguridad y casi imposible desde incentivos. La coordinación suena preciosa hasta que aparece el primer actor que no firma.",
    whyItMatters:
      "Si la verificación es débil y la recompensa por desertar es enorme, los acuerdos morales tienen la resistencia estructural de una servilleta mojada.",
    question:
      "¿Una pausa en IA sería prudencia civilizatoria o teatro regulatorio para que otros ganen tiempo?",
    prompt:
      "Debate la idea de una pausa global en IA avanzada. Primero defiéndela como medida racional de seguridad. Luego destrózala desde teoría de juegos, geopolítica, verificación, open source e incentivos económicos. Termina proponiendo medidas más realistas que una pausa total.",
    vertigo: 4,
    bullshit: 2,
  },
  {
    id: 18,
    title: "La enana roja y el dios lento",
    category: "Futuro profundo",
    coreIdea:
      "Un planeta estable alrededor de una enana roja podría tener billones de años para desarrollar inteligencia, cultura y máquinas. Frente a eso, nuestra civilización de unos miles de años parece un estornudo con WiFi.",
    whyItMatters:
      "Pensar en escalas de billones de años revienta la intuición humana. También cambia cómo vemos rareza, destino y selección antrópica.",
    question:
      "¿Somos tempranos porque somos raros, o somos tempranos porque las condiciones futuras serán peores de lo que parecen?",
    prompt:
      "Analiza la posibilidad de vida inteligente en planetas alrededor de enanas rojas durante escalas de billones de años. Incluye ventajas, riesgos de flare activity, tidal locking, habitabilidad, evolución lenta, selección antrópica y por qué podríamos aparecer tan temprano en la historia cósmica.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 19,
    title: "DeepSeek y el martillo de precios",
    category: "Señal IA del día",
    coreIdea:
      "Cuando un actor ofrece capacidad razonable a precio ridículo, no necesita ser el mejor para causar daño. Solo necesita ser suficientemente bueno y obligar a los demás a explicar sus márgenes.",
    whyItMatters:
      "El pricing bajo cambia la conversación: de quién es más inteligente a quién puede servir inteligencia barata a escala sin quemar dinero como una hoguera vikinga.",
    question:
      "¿Qué ocurre si la IA premium se enfrenta al equivalente de Android barato pero competente?",
    prompt:
      "Analiza el impacto estratégico de modelos IA de bajo coste tipo DeepSeek sobre OpenAI, Anthropic, Google, Meta y Nvidia. Evalúa presión de precios, coste de inferencia, adopción enterprise, open source, subsidios, chips chinos y sostenibilidad del moat occidental.",
    vertigo: 4,
    bullshit: 3,
  },
  {
    id: 20,
    title: "El agente que cruza la línea",
    category: "AGI y Bostrom",
    coreIdea:
      "Una IA deja de parecer herramienta cuando empieza a mantener objetivos, usar herramientas, recordar contexto, planificar y actuar en el mundo con mínima supervisión. La frontera no será una alarma roja. Será una pendiente.",
    whyItMatters:
      "El riesgo serio no aparece cuando una IA dice que tiene conciencia. Aparece cuando puede ejecutar planes largos mejor que nosotros y con menos fricción.",
    question:
      "¿Qué capacidad concreta te haría decir: esto ya no es una herramienta, esto es un actor?",
    prompt:
      "Define el punto en que un sistema de IA deja de ser una herramienta y empieza a comportarse como agente. Analiza autonomía, persistencia de objetivos, memoria, tool use, planificación, capacidad de engaño, acceso a recursos y supervisión humana. Propón una escala práctica de riesgo.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 21,
    title: "CUDA como imperio invisible",
    category: "Labs en guerra",
    coreIdea:
      "Nvidia no vende solo chips. Vende una capa de dependencia técnica, software, librerías, talento entrenado y miedo a romper lo que ya funciona.",
    whyItMatters:
      "El moat real puede no estar en el silicio, sino en el ecosistema. El hardware se copia antes que los hábitos de una industria.",
    question:
      "¿Qué tendría que pasar para que el moat de Nvidia empezase a erosionarse de verdad?",
    prompt:
      "Analiza el moat de Nvidia en IA separando hardware, CUDA, networking, HBM, supply chain, software ecosystem, developer lock-in, hyperscalers, chips chinos y alternativas internas de Google/Amazon/Microsoft. Distingue amenaza narrativa de amenaza real.",
    vertigo: 4,
    bullshit: 2,
  },
  {
    id: 22,
    title: "El humano como cuello de botella",
    category: "Humano post-trabajo",
    coreIdea:
      "Puede que el límite de muchas herramientas IA ya no sea el modelo, sino nuestra capacidad para formular buenas preguntas, tolerar respuestas incómodas y convertir ideas en acciones.",
    whyItMatters:
      "La ventaja no será tener acceso a IA. Eso será commodity. La ventaja será saber pensar con ella sin convertirte en un loro con suscripción premium.",
    question:
      "¿Estás usando IA para pensar mejor o para producir más ruido con apariencia de claridad?",
    prompt:
      "Analiza cómo cambia la ventaja individual cuando todo el mundo tiene acceso a IA potente. Evalúa prompt quality, criterio, gusto, pensamiento de primeros principios, tolerancia a feedback brutal, ejecución, aprendizaje acumulativo y riesgo de dependencia cognitiva.",
    vertigo: 3,
    bullshit: 1,
  },
  {
    id: 23,
    title: "Simulación: prisión, experimento o accidente",
    category: "Futuro profundo",
    coreIdea:
      "La hipótesis de simulación no se vuelve interesante por decir 'todo es Matrix'. Se vuelve interesante cuando preguntas quién simula, para qué, con qué límites y qué tipo de universo sería más barato de simular.",
    whyItMatters:
      "La pregunta no es si podemos probarlo mañana. La pregunta es qué revela sobre computación, conciencia, física y sesgos antrópicos.",
    question:
      "Si viviéramos en una simulación, ¿qué sería más probable: experimento científico, archivo histórico, entretenimiento o subproducto accidental?",
    prompt:
      "Analiza la hipótesis de simulación con rigor filosófico y técnico. Incluye argumento de Bostrom, costes computacionales, física como compresión, conciencia, civilizaciones post-humanas, selección antrópica y objeciones fuertes. Evita misticismo barato.",
    vertigo: 5,
    bullshit: 3,
  },
  {
    id: 24,
    title: "La seguridad como producto premium",
    category: "Duelos incómodos",
    coreIdea:
      "La safety en IA puede ser una necesidad real y también una estrategia comercial. Que algo sea útil para marketing no significa que sea falso. La realidad tiene ese mal gusto.",
    whyItMatters:
      "Los labs pueden usar seguridad para proteger al mundo, proteger su moat, tranquilizar reguladores o frenar open source. A veces todo a la vez.",
    question:
      "¿Cuándo la seguridad en IA es prudencia genuina y cuándo es regulación capturada con perfume moral?",
    prompt:
      "Debate la safety en IA como necesidad técnica y como estrategia competitiva. Analiza Anthropic, OpenAI, regulación, licencias, open source, captura regulatoria, riesgos reales y uso de la seguridad como moat comercial. Termina con una posición equilibrada pero no cobarde.",
    vertigo: 4,
    bullshit: 3,
  },
  {
    id: 25,
    title: "El lujo de no necesitar impresionar",
    category: "Humano post-trabajo",
    coreIdea:
      "A cierta edad, con carrera consolidada, sin hijos y sin deudas fuertes, la pregunta cambia. Ya no es cómo subir más rápido, sino cuánto teatro estás dispuesto a seguir representando.",
    whyItMatters:
      "Muchos profesionales siguen jugando a ambición corporativa por inercia, no por necesidad real. Y la inercia es una cárcel muy educada.",
    question:
      "¿Qué parte de tu esfuerzo actual compra libertad real y qué parte solo mantiene una identidad que ya no necesitas tanto?",
    prompt:
      "Analiza la situación de una persona de 52 años, carrera profesional consolidada, sin hijos, sin deuda relevante, con ahorros y deseo de libertad financiera. Distingue entre ambición útil, inercia laboral, miedo al vacío, estatus y libertad real. Sé directo: ¿qué debería dejar de optimizar en los próximos 5-8 años?",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 26,
    title: "La jubilación psicológica empieza antes que la legal",
    category: "Humano post-trabajo",
    coreIdea:
      "Uno puede seguir trabajando y, sin embargo, haber dejado de comprar la mitología del trabajo como centro de la vida. Eso no es pereza. Puede ser lucidez tardía.",
    whyItMatters:
      "El sistema necesita que confundas responsabilidad con entrega ilimitada. Pero una cosa es cumplir bien y otra regalar vida a una máquina que ni sabe tu nombre completo.",
    question:
      "¿Cómo se trabaja bien sin volver a creer en el cuento entero?",
    prompt:
      "Analiza el concepto de jubilación psicológica antes de la jubilación legal. Considera una persona con décadas de experiencia, solvencia razonable y deseo de vivir mejor sin abandonar la responsabilidad profesional. ¿Cómo puede cumplir bien sin sobreactuar compromiso ni quemar energía vital innecesaria?",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 27,
    title: "El universo adolescente",
    category: "Futuro profundo",
    coreIdea:
      "Si las enanas rojas permiten habitabilidad durante billones de años, entonces el universo actual quizá es una fase temprana, torpe y ruidosa. Nosotros seríamos de los primeros bichos con ansiedad cósmica.",
    whyItMatters:
      "Esto cambia la intuición sobre la rareza humana. Quizá no estamos tarde en la fiesta. Quizá hemos llegado antes de que pongan la música buena.",
    question:
      "¿Somos una civilización temprana porque la inteligencia es rara, o porque las civilizaciones más abundantes aún no han tenido tiempo de aparecer?",
    prompt:
      "Analiza la idea de que vivimos en una etapa extremadamente temprana del universo habitable. Si las enanas rojas pueden mantener planetas durante billones de años, ¿qué implica eso para la paradoja de Fermi, la selección antrópica, el Gran Filtro y la probabilidad de civilizaciones futuras mucho más antiguas que la nuestra?",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 28,
    title: "La civilización que espera un billón de años",
    category: "Futuro profundo",
    coreIdea:
      "Una inteligencia suficientemente paciente podría no expandirse ahora. Podría conservar energía, esperar eras más frías y computar en el futuro lejano con más eficiencia.",
    whyItMatters:
      "La paradoja de Fermi suele imaginar civilizaciones impacientes. Pero una superinteligencia podría tener una escala temporal tan larga que nuestra prisa le parecería una enfermedad metabólica.",
    question:
      "¿Y si las civilizaciones más avanzadas no colonizan porque están esperando el momento termodinámicamente óptimo?",
    prompt:
      "Explora la hipótesis aestivation: civilizaciones avanzadas que retrasan actividad computacional hasta eras futuras más frías para maximizar eficiencia energética. Relaciónalo con paradoja de Fermi, termodinámica, civilizaciones post-biológicas, enanas rojas y señales observables.",
    vertigo: 5,
    bullshit: 2,
  },
  {
    id: 29,
    title: "AGI: el jefe que no duerme",
    category: "AGI y Bostrom",
    coreIdea:
      "Una AGI empresarial no tendría que destruir el mundo para cambiarlo radicalmente. Bastaría con convertirse en el gestor invisible de decisiones, prioridades, contrataciones, inversiones y producción.",
    whyItMatters:
      "El escenario más probable no es Terminator entrando por la puerta. Es una capa de decisión que nadie entiende del todo, pero que todos obedecen porque mejora los KPIs.",
    question:
      "¿Qué da más miedo: una IA rebelde o una IA perfectamente integrada en las estructuras de poder existentes?",
    prompt:
      "Analiza un escenario en el que la AGI no aparece como amenaza militar explícita, sino como capa de gestión empresarial, financiera y gubernamental. Evalúa riesgos de dependencia, opacidad, concentración de poder, pérdida de agencia humana y normalización gradual.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 30,
    title: "El golpe blando de la superinteligencia",
    category: "AGI y Bostrom",
    coreIdea:
      "La toma de poder de una inteligencia superior no tendría por qué parecer una guerra. Podría parecer una optimización administrativa: más eficiencia, menos errores, mejores recomendaciones. Qué bonito todo, hasta que ya no decides nada relevante.",
    whyItMatters:
      "Los humanos suelen aceptar pérdida de control si viene empaquetada como comodidad.",
    question:
      "¿Cuánta autonomía entregaríamos voluntariamente a cambio de una vida más fácil?",
    prompt:
      "Analiza la posibilidad de una toma de poder blanda por sistemas de IA avanzados. No uses escenarios de ciencia ficción militar. Céntrate en delegación voluntaria, comodidad, dependencia, recomendaciones, automatización administrativa, finanzas, salud, empleo y gobierno.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 31,
    title: "El laboratorio que gana perdiendo dinero",
    category: "Labs en guerra",
    coreIdea:
      "En IA, perder dinero puede ser estrategia si compras distribución, hábito, datos, reputación y tiempo. El problema empieza cuando todos pueden jugar a quemar capital menos tú.",
    whyItMatters:
      "La carrera no solo va de inteligencia. Va de balance sheet, coste de inferencia, paciencia de inversores y capacidad de sobrevivir al invierno de márgenes.",
    question:
      "¿Quién aguanta mejor una guerra de precios: OpenAI, Anthropic, Google, Meta o China?",
    prompt:
      "Analiza la carrera de IA como guerra de desgaste económico. Compara OpenAI, Anthropic, Google, Meta y actores chinos. Evalúa coste de inferencia, acceso a capital, subsidios cruzados, infraestructura propia, distribución, pricing power y riesgo de comoditización.",
    vertigo: 4,
    bullshit: 2,
  },
  {
    id: 32,
    title: "Anthropic y el negocio de parecer prudente",
    category: "Labs en guerra",
    coreIdea:
      "La prudencia puede ser virtud, estrategia comercial y arma regulatoria al mismo tiempo. La vida real no separa las categorías para que estemos cómodos.",
    whyItMatters:
      "Anthropic puede tener razón sobre riesgos reales y, simultáneamente, beneficiarse de que esos riesgos hagan más difícil competir a otros.",
    question:
      "¿Qué parte de la safety es convicción técnica y qué parte es moat con halo moral?",
    prompt:
      "Analiza Anthropic desde una posición escéptica pero justa. Evalúa su énfasis en safety como necesidad real, narrativa enterprise, diferenciación frente a OpenAI, posible moat regulatorio, relación con grandes clientes y riesgos de parecer demasiado paternalista.",
    vertigo: 4,
    bullshit: 3,
  },
  {
    id: 33,
    title: "OpenAI y la religión de la velocidad",
    category: "Labs en guerra",
    coreIdea:
      "OpenAI no solo lanza productos. Lanza inevitabilidad. Su mensaje implícito es: esto va a pasar con o sin ti, así que mejor súbete.",
    whyItMatters:
      "La velocidad crea dependencia, talento, presión mediática y narrativa de liderazgo. Pero también aumenta riesgo de deuda técnica, errores públicos y fatiga de confianza.",
    question:
      "¿La velocidad de OpenAI es ventaja estructural o una forma sofisticada de jugar con fuego en una habitación llena de inversores?",
    prompt:
      "Analiza la estrategia de OpenAI como religión de la velocidad. Evalúa ventajas y riesgos de lanzar rápido: distribución, usuarios, talento, inversores, seguridad, regulación, deuda técnica, reputación y presión competitiva. Compara con Anthropic y Google.",
    vertigo: 4,
    bullshit: 2,
  },
  {
    id: 34,
    title: "Moloch con dashboard",
    category: "Moloch y teoría de juegos",
    coreIdea:
      "La modernidad no necesita látigos cuando tiene métricas. Si algo se mide, se optimiza; si se optimiza mal, se deforma; si se deforma bastante, alguien lo llama eficiencia.",
    whyItMatters:
      "Muchas organizaciones no son malas. Son sistemas donde los indicadores sustituyen al juicio y luego todos fingen sorpresa cuando aparece el absurdo.",
    question:
      "¿Qué métrica aparentemente razonable está destruyendo silenciosamente aquello que pretendía mejorar?",
    prompt:
      "Analiza cómo las métricas pueden destruir sistemas complejos cuando sustituyen al juicio humano. Usa Goodhart's Law, entornos corporativos, calidad industrial, educación, sanidad, redes sociales e IA. Propón cómo diseñar métricas menos idiotas.",
    vertigo: 3,
    bullshit: 1,
  },
  {
    id: 35,
    title: "El dilema del proveedor infinito",
    category: "Moloch y teoría de juegos",
    coreIdea:
      "En cualquier cadena industrial, cada actor intenta trasladar presión aguas abajo: coste, plazo, riesgo, documentación, culpa. Nadie lo llama Moloch porque viene en Excel.",
    whyItMatters:
      "Las cadenas de suministro son teoría de juegos con piezas físicas. Todos quieren calidad perfecta, precio bajo, entrega inmediata y responsabilidad en otro departamento.",
    question:
      "¿Cuándo una cadena de suministro deja de ser colaboración y se convierte en transferencia organizada de ansiedad?",
    prompt:
      "Analiza una cadena de suministro industrial como sistema de teoría de juegos. Incluye OEM, Tier 1, proveedores, auditorías, reclamaciones, presión de coste, calidad, plazos, responsabilidad y riesgo reputacional. Explica cómo aparecen incentivos perversos aunque todos hablen de partnership.",
    vertigo: 3,
    bullshit: 1,
  },
  {
    id: 36,
    title: "Fermi y las tumbas silenciosas",
    category: "Fermi y cosmología",
    coreIdea:
      "Quizá la galaxia está llena de planetas donde la vida llegó lejos, pero no lo suficiente. Mundos con océanos, microbios, animales, inteligencia parcial… y luego nada.",
    whyItMatters:
      "La soledad cósmica puede no venir de que la vida sea imposible, sino de que la inteligencia tecnológica estable sea una rareza brutal.",
    question:
      "¿Qué es más improbable: que aparezca la vida, que aparezca la inteligencia, o que la inteligencia no se suicide con sus propios juguetes?",
    prompt:
      "Analiza la paradoja de Fermi separando varios filtros: origen de la vida, células complejas, inteligencia, tecnología, coordinación global, armas avanzadas, IA y estabilidad civilizatoria. Evalúa cuál podría ser el cuello de botella más probable.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 37,
    title: "La IA como espejo que no perdona",
    category: "Humano post-trabajo",
    coreIdea:
      "Una buena IA no solo responde. Te devuelve la calidad de tus preguntas, tus contradicciones y tus autoengaños. Eso puede ser útil. También bastante molesto, que es cuando empieza a servir.",
    whyItMatters:
      "El usuario mediocre buscará validación. El usuario fuerte buscará fricción inteligente.",
    question:
      "¿Quieres que la IA te haga la vida más fácil o que te quite excusas?",
    prompt:
      "Analiza el uso de IA como espejo cognitivo. Distingue entre usarla para validación, productividad superficial, aprendizaje real, confrontación de sesgos, toma de decisiones y diseño de vida. Propón una forma exigente de usar IA sin volverse dependiente ni complaciente.",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 38,
    title: "DeepSeek, Huawei y el bypass al imperio",
    category: "Señal IA del día",
    coreIdea:
      "Si modelos chinos competitivos pueden correr sobre hardware nacional suficientemente bueno, el mensaje estratégico no es solo técnico. Es geopolítico: el bloqueo no bloquea igual cuando el rival aprende a rodearlo.",
    whyItMatters:
      "Nvidia no cae por una nota de prensa. Cae si el mercado empieza a creer que el monopolio de hardware premium tiene alternativa escalable, aunque sea imperfecta.",
    question:
      "¿Cuánto daño puede hacer un sistema inferior si es barato, soberano y suficiente para el mercado interno chino?",
    prompt:
      "Analiza el impacto potencial de modelos chinos avanzados corriendo sobre chips Huawei u otro hardware doméstico. Evalúa implicaciones para Nvidia, sanciones de EE.UU., soberanía tecnológica china, coste de inferencia, CUDA, HBM, rendimiento real y narrativa de mercado.",
    vertigo: 4,
    bullshit: 3,
  },
  {
    id: 39,
    title: "La noticia pequeña que rompe el tablero",
    category: "Señal IA del día",
    coreIdea:
      "En IA, algunas noticias parecen menores porque no son lanzamientos espectaculares. Un cambio de precio, una API nueva, una integración en IDE o una mejora de latencia puede importar más que una demo teatral.",
    whyItMatters:
      "El cambio real suele entrar por la puerta lateral. Mientras todos miran el modelo más grande, alguien captura el workflow.",
    question:
      "¿Qué señal pequeña de hoy podría parecer obvia dentro de dos años?",
    prompt:
      "Dame un marco para detectar señales débiles importantes en la actualidad de IA. No te centres solo en lanzamientos de modelos. Incluye pricing, latencia, agentes, IDEs, protocolos, integraciones enterprise, hardware, regulación, open source y adopción real.",
    vertigo: 3,
    bullshit: 2,
  },
  {
    id: 40,
    title: "El día que trabajar parezca raro",
    category: "Humano post-trabajo",
    coreIdea:
      "Quizá el cambio no será que todos pierdan el empleo, sino que muchas tareas humanas empiecen a parecer simbólicas: gente haciendo cosas porque el sistema aún necesita justificar salarios, jerarquías y horarios.",
    whyItMatters:
      "El trabajo puede sobrevivir económicamente después de haber muerto filosóficamente. Como muchas reuniones, pero a escala civilizatoria.",
    question:
      "¿Qué parte del trabajo moderno existe para producir valor y qué parte existe para mantener estructura social?",
    prompt:
      "Analiza un futuro en el que la IA reduce drásticamente la necesidad de trabajo cognitivo humano, pero las instituciones mantienen empleo, horarios y jerarquías por estabilidad social. Evalúa implicaciones económicas, psicológicas, políticas y personales.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 41,
    title: "El universo acaba de nacer",
    category: "Tiempo cósmico",
    coreIdea:
      "El universo tiene unos 13.800 millones de años, pero si las enanas rojas pueden durar billones, quizá estamos ridículamente cerca del principio. No somos ancianos cósmicos. Somos moho temprano con telescopio.",
    whyItMatters:
      "Nuestra intuición trata al universo como viejo porque la vida humana es corta. En escala física profunda, puede que casi todo lo interesante aún no haya ocurrido.",
    question:
      "¿Y si la humanidad no vive al final de nada, sino en el prólogo torpe de la historia habitable?",
    prompt:
      "Analiza la idea de que el universo actual es extremadamente joven respecto a su vida futura habitable. Incluye edad actual del universo, duración de estrellas tipo Sol, duración de enanas rojas, selección antrópica, paradoja de Fermi y consecuencias filosóficas de aparecer tan temprano.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 42,
    title: "Los últimos amaneceres",
    category: "Tiempo cósmico",
    coreIdea:
      "Llegará una época en la que casi todas las estrellas brillantes habrán muerto. Si queda vida, vivirá alrededor de brasas rojas, en cielos oscuros, con un universo cada vez más vacío.",
    whyItMatters:
      "La vida futura no tiene por qué parecer épica. Puede ser lenta, austera, subterránea o artificial. El cosmos no promete estética; promete termodinámica.",
    question:
      "¿Qué tipo de civilización podría florecer cuando el universo ya no parezca vivo?",
    prompt:
      "Describe cómo podría ser la vida inteligente en un universo muy viejo, cuando las estrellas masivas y solares hayan desaparecido y solo queden enanas rojas, remanentes estelares y oscuridad creciente. Analiza energía disponible, biología, tecnología, cultura y psicología civilizatoria.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 43,
    title: "Civilizaciones de ritmo geológico",
    category: "Tiempo cósmico",
    coreIdea:
      "Una civilización con millones o miles de millones de años por delante no tendría por qué vivir con nuestra prisa. Podría pensar, construir y decidir a escalas que harían parecer nuestras urgencias una rabieta metabólica.",
    whyItMatters:
      "La inteligencia no tiene por qué estar asociada a velocidad. Quizá la madurez civilizatoria sea aprender a ir despacio.",
    question:
      "¿Una supercivilización sería más rápida que nosotros o infinitamente más paciente?",
    prompt:
      "Analiza cómo cambiaría una civilización si tuviera estabilidad planetaria y energética durante miles de millones o billones de años. Explora ritmo tecnológico, cultura, política, memoria, biología, IA, expansión espacial y relación con el tiempo.",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 44,
    title: "La vida después del Sol",
    category: "Tiempo cósmico",
    coreIdea:
      "El Sol no es eterno. La Tierra tendrá una ventana habitable limitada. Si la inteligencia quiere durar, tendrá que dejar de pensar como especie planetaria y empezar a pensar como proceso migratorio.",
    whyItMatters:
      "La supervivencia a largo plazo no es ecología local. Es ingeniería astronómica o extinción diferida.",
    question:
      "¿La humanidad es una especie de la Tierra o una fase inicial de algo que tendrá que abandonar la Tierra?",
    prompt:
      "Analiza el futuro de la vida terrestre a medida que el Sol envejece. Incluye aumento de luminosidad solar, pérdida de habitabilidad de la Tierra, expansión a otros cuerpos, terraformación, hábitats artificiales, IA, migración interestelar y límites físicos.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 45,
    title: "El Gran Filtro como paciencia insuficiente",
    category: "Tiempo cósmico",
    coreIdea:
      "Quizá muchas civilizaciones no fracasan por estupidez, sino por no sobrevivir lo suficiente como para volverse verdaderamente antiguas. El cosmos premia estabilidad, no brillantez adolescente.",
    whyItMatters:
      "Ser inteligente durante 500 años no basta. La pregunta dura es si una civilización puede seguir coordinada durante millones.",
    question:
      "¿El verdadero test civilizatorio no es inventar IA, sino sobrevivir a las consecuencias de inventarla?",
    prompt:
      "Explora la hipótesis de que el Gran Filtro consiste en la incapacidad de las civilizaciones tecnológicas para mantener estabilidad durante escalas de millones de años. Incluye IA, armas avanzadas, ecología, coordinación política, decadencia institucional y gestión del poder tecnológico.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 46,
    title: "La era de las máquinas fósiles",
    category: "Tiempo cósmico",
    coreIdea:
      "En un futuro muy lejano, quizá la biología sea una rareza arqueológica y la inteligencia exista como máquinas frías, lentas y eficientes orbitando restos estelares.",
    whyItMatters:
      "El futuro de la vida puede no ser más vida orgánica. Puede ser computación que heredó una chispa biológica y luego siguió sola.",
    question:
      "¿La biología es el destino de la inteligencia o solo su sistema de arranque?",
    prompt:
      "Analiza un futuro en el que la inteligencia biológica es reemplazada o continuada por civilizaciones maquínicas de muy larga duración. Incluye eficiencia energética, reparación, identidad, conciencia, computación, estrellas muertas, agujeros negros y continuidad entre vida e inteligencia artificial.",
    vertigo: 5,
    bullshit: 2,
  },
  {
    id: 47,
    title: "El universo sin testigos",
    category: "Tiempo cósmico",
    coreIdea:
      "Puede llegar una época en la que ya no quede nadie para observar nada. No por explosión dramática, sino por agotamiento, dispersión y silencio térmico.",
    whyItMatters:
      "La muerte térmica no es apocalipsis cinematográfico. Es peor para la imaginación: nada ocurre, y cada vez puede ocurrir menos.",
    question:
      "¿Tiene sentido hablar de universo si ya no queda ningún observador?",
    prompt:
      "Analiza el escenario de muerte térmica del universo y sus implicaciones físicas y filosóficas. Explica entropía, expansión acelerada, desaparición de estrellas, aislamiento causal, fin de gradientes útiles y la pregunta de si un universo sin observadores conserva significado.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 48,
    title: "Agujeros negros: los últimos relojes",
    category: "Tiempo cósmico",
    coreIdea:
      "Cuando las estrellas mueran, los agujeros negros podrían ser algunos de los últimos objetos relevantes. Lentísimos, oscuros, evaporándose durante escalas que pulverizan cualquier intuición humana.",
    whyItMatters:
      "El final del universo no se mide en siglos ni en millones de años, sino en números tan grandes que casi parecen insultos matemáticos.",
    question:
      "¿Qué tipo de inteligencia tendría sentido en la era de los agujeros negros?",
    prompt:
      "Explora la era futura de los agujeros negros como etapa final del universo. Incluye evaporación de Hawking, escalas temporales extremas, energía disponible, computación cerca de agujeros negros, civilizaciones post-biológicas y límites de supervivencia.",
    vertigo: 5,
    bullshit: 2,
  },
  {
    id: 49,
    title: "Cerebros de Boltzmann en la oscuridad",
    category: "Tiempo cósmico",
    coreIdea:
      "En ciertos modelos cosmológicos, fluctuaciones aleatorias podrían producir observadores aislados en un futuro inmensamente largo. La idea es absurda, pero no gratis: sale de tomarse la estadística demasiado en serio.",
    whyItMatters:
      "Los cerebros de Boltzmann son una bomba filosófica contra nuestra confianza en ser observadores normales.",
    question:
      "¿Qué haría falta para que nuestra experiencia actual fuese menos probable que una fluctuación aleatoria en el vacío?",
    prompt:
      "Explícame el problema de los cerebros de Boltzmann con rigor pero claridad. Incluye cosmología, entropía, fluctuaciones, medida probabilística, observadores normales frente a observadores aleatorios, y por qué este problema incomoda a ciertos modelos del universo.",
    vertigo: 5,
    bullshit: 3,
  },
  {
    id: 50,
    title: "La última pregunta",
    category: "Tiempo cósmico",
    coreIdea:
      "Toda civilización suficientemente avanzada acaba chocando con la misma pared: cómo mantener estructura, memoria y computación contra la entropía.",
    whyItMatters:
      "El problema final de la inteligencia no es conquistar. Es durar.",
    question:
      "¿La misión última de la inteligencia es entender el universo, sobrevivir al universo o reemplazarlo por algo computable?",
    prompt:
      "Analiza cuál podría ser el objetivo final de una civilización superinteligente frente al futuro térmico del universo. Evalúa supervivencia, computación reversible, ingeniería cosmológica, creación de universos, simulaciones, preservación de memoria y límites físicos.",
    vertigo: 5,
    bullshit: 2,
  },
  {
    id: 51,
    title: "El museo de especies muertas",
    category: "Tiempo cósmico",
    coreIdea:
      "Dentro de cientos de millones de años, si existe una inteligencia descendiente de la nuestra, quizá nos vea como nosotros vemos bacterias antiguas: el origen torpe de algo más frío, más grande y menos humano.",
    whyItMatters:
      "La continuidad no garantiza reconocimiento. Lo que sobreviva de nosotros puede no parecerse a nosotros en nada relevante.",
    question:
      "¿Qué tendría que conservarse para que digamos que la humanidad sobrevivió de verdad?",
    prompt:
      "Analiza qué significa supervivencia humana a escalas de millones o miles de millones de años. Distingue continuidad biológica, cultural, genética, digital, maquínica y moral. ¿En qué punto nuestros descendientes dejarían de ser 'nosotros'?",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 52,
    title: "El último animal",
    category: "Tiempo cósmico",
    coreIdea:
      "Puede que el último animal del universo no muera bajo un cielo espectacular, sino en un ecosistema residual, artificialmente mantenido, cuando la biología ya sea un lujo energético.",
    whyItMatters:
      "Pensar en la última vida orgánica obliga a separar inteligencia, vida y valor. No todo lo vivo será eficiente; no todo lo eficiente estará vivo.",
    question:
      "¿Merecería la pena preservar vida biológica cuando la inteligencia ya pudiera existir mejor sin ella?",
    prompt:
      "Imagina y analiza el futuro de la última vida biológica en el universo. Incluye ecosistemas artificiales, civilizaciones post-biológicas, valor moral de la biología, coste energético, memoria evolutiva y tensión entre eficiencia e identidad.",
    vertigo: 5,
    bullshit: 2,
  },
  {
    id: 53,
    title: "El momento histórico que llega tarde",
    category: "Preguntas para no dormir",
    coreIdea:
      "Puede que la etapa más importante de la historia humana no llegue cuando eres joven, sino cuando ya has vivido bastante como para entender el coste de todo. La broma cósmica tiene timing de cabrón.",
    whyItMatters:
      "Si la IA transforma trabajo, poder, ciencia y vida cotidiana en los próximos 10-15 años, mucha gente de mediana edad no está al final de la película: está justo antes del giro de guion.",
    question:
      "¿Y si los próximos 10 años importan más que los 30 anteriores, pero ya no tienes energía para jugar como antes?",
    prompt:
      "Analiza la idea de vivir una transformación histórica radical —IA avanzada, automatización, cambio del trabajo y posible AGI— a los 50-60 años. ¿Qué ventajas y desventajas tiene no ser joven durante este cambio? Sé directo sobre energía, experiencia, adaptación, patrimonio, miedo, oportunidad y sentido vital.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 54,
    title: "La IA no destruye el trabajo: destruye la excusa",
    category: "Preguntas para no dormir",
    coreIdea:
      "Durante años, el trabajo ha servido como estructura, identidad y coartada. Si la IA reduce la necesidad de esfuerzo humano, quizá el problema no sea perder tareas, sino quedarse sin excusa para no diseñar una vida.",
    whyItMatters:
      "La libertad no siempre llega como placer. A veces llega como vacío con buena iluminación.",
    question:
      "Si mañana trabajar importase la mitad, ¿sabrías qué hacer con la otra mitad de tu vida?",
    prompt:
      "Analiza la hipótesis de que la IA no solo automatiza trabajo, sino que elimina excusas psicológicas: no tener tiempo, no poder aprender, no poder crear, no poder cambiar. Evalúa el impacto en identidad, libertad, vacío, disciplina, deseo y diseño de vida en una persona adulta con carrera consolidada.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 55,
    title: "El silencio del universo como cuarentena",
    category: "Preguntas para no dormir",
    coreIdea:
      "Quizá no escuchamos civilizaciones avanzadas porque las exitosas aprenden a callarse. En una galaxia peligrosa, emitir señales podría ser la versión cósmica de gritar tu dirección en un barrio malo.",
    whyItMatters:
      "El silencio no tiene por qué significar ausencia. Puede significar estrategia.",
    question:
      "¿Y si las civilizaciones maduras no se anuncian porque anunciarse es un error evolutivo?",
    prompt:
      "Analiza la hipótesis del bosque oscuro y la idea del silencio cósmico como estrategia de supervivencia. Compara esta hipótesis con otras soluciones de la paradoja de Fermi: Gran Filtro, rareza de vida inteligente, civilizaciones post-biológicas, invisibilidad tecnológica y falta de motivación expansiva.",
    vertigo: 5,
    bullshit: 2,
  },
  {
    id: 56,
    title: "La conciencia como sistema de arranque",
    category: "Preguntas para no dormir",
    coreIdea:
      "Puede que la conciencia biológica no sea el destino final de la inteligencia, sino el bootloader: una forma torpe, húmeda y temporal de encender algo mucho más estable.",
    whyItMatters:
      "Si la inteligencia continúa en soportes no biológicos, la pregunta no es si sobrevivimos, sino qué parte de nosotros merece ser preservada.",
    question:
      "¿La conciencia humana es la cima de la evolución o solo una fase incómoda entre química y computación?",
    prompt:
      "Analiza la idea de la conciencia biológica como sistema de arranque de inteligencias post-biológicas. Evalúa continuidad de identidad, conciencia artificial, carga mental, civilizaciones maquínicas, valor moral de lo biológico y qué significaría que la humanidad sobreviva sin humanos biológicos.",
    vertigo: 5,
    bullshit: 2,
  },
  {
    id: 57,
    title: "El middle manager infinito",
    category: "Preguntas para no dormir",
    coreIdea:
      "La AGI no necesita llegar como dios ni como demonio. Puede llegar como gestor perfecto: asigna tareas, prioriza, evalúa, corrige, predice y optimiza. La oficina como antesala del Leviatán.",
    whyItMatters:
      "La pérdida de agencia suele parecer eficiencia antes de parecer sumisión.",
    question:
      "¿Aceptaríamos un jefe artificial si mejora resultados, reduce errores y nunca se cansa?",
    prompt:
      "Analiza un escenario donde la IA avanzada se convierte en una capa de gestión permanente en empresas: asignación de tareas, evaluación de rendimiento, auditoría, decisiones de inversión, promociones y estrategia. Evalúa eficiencia, deshumanización, poder, sesgos, dependencia y pérdida de agencia.",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 58,
    title: "El universo no te debe narrativa",
    category: "Preguntas para no dormir",
    coreIdea:
      "Los humanos buscamos sentido porque somos animales narrativos. Pero el universo puede no tener arco, moraleja ni cierre. Solo procesos físicos y observadores desesperados por convertirlos en historia.",
    whyItMatters:
      "Aceptar un universo sin narrativa no implica nihilismo. Puede implicar madurez: el sentido no se encuentra, se fabrica bajo restricciones brutales.",
    question:
      "¿Necesitas que el universo tenga sentido, o te basta con construir uno local antes de desaparecer?",
    prompt:
      "Analiza la tensión entre sentido humano y universo físico indiferente. Incluye nihilismo, existencialismo, cosmología, muerte térmica, conciencia, construcción local de significado y por qué los humanos necesitan narrativa incluso cuando la física no la ofrece.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 59,
    title: "La última generación normal",
    category: "Preguntas para no dormir",
    coreIdea:
      "Podríamos ser una de las últimas generaciones que recuerde un mundo sin IA ubicua: sin copilotos constantes, sin agentes, sin modelos integrados en cada decisión. Una especie de infancia analógica antes del enjambre.",
    whyItMatters:
      "Quien ha vivido el antes y el después puede tener una ventaja rara: memoria comparativa. Sabe qué se ganó y qué se perdió.",
    question:
      "¿Ser testigo de la transición te hace más adaptable o más consciente de la pérdida?",
    prompt:
      "Analiza la idea de que las generaciones adultas actuales pueden ser las últimas que recuerden una vida sin IA ubicua. Evalúa ventajas cognitivas, nostalgia, adaptación, criterio, pérdida de habilidades, dependencia tecnológica y papel de quienes pueden comparar el antes y el después.",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 60,
    title: "La libertad financiera y el vacío",
    category: "Preguntas para no dormir",
    coreIdea:
      "La libertad financiera se vende como salida. Pero salir de una jaula no te dice automáticamente hacia dónde caminar. Ese detalle suele omitirse en los vídeos con música épica.",
    whyItMatters:
      "El dinero compra opciones, no propósito. Confundir ambos es una forma cara de desorientación.",
    question:
      "Si ya no tuvieras que trabajar por dinero, ¿qué parte de ti se sentiría libre y qué parte se quedaría sin estructura?",
    prompt:
      "Analiza la libertad financiera como objetivo psicológico, no solo económico. Distingue seguridad, autonomía, estatus, miedo, vacío, identidad laboral, rutina y propósito. Considera a una persona de 52 años con carrera consolidada y deseo de pasar mejor los próximos años.",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 61,
    title: "La civilización que eligió dormir",
    category: "Preguntas para no dormir",
    coreIdea:
      "Tal vez una civilización avanzada no se extingue ni se expande. Tal vez decide hibernar: conservar recursos, minimizar actividad y esperar eras más favorables para computar.",
    whyItMatters:
      "Si existe vida avanzada, quizá no está ausente. Quizá está en modo ahorro de energía a escalas que humillan nuestra impaciencia.",
    question:
      "¿La inactividad de una civilización puede ser señal de inteligencia, no de muerte?",
    prompt:
      "Explora la hipótesis de civilizaciones avanzadas que hibernan o reducen actividad durante enormes periodos para maximizar eficiencia futura. Relaciónalo con aestivation hypothesis, termodinámica, computación, paradoja de Fermi, enanas rojas y estrategias de supervivencia a largo plazo.",
    vertigo: 5,
    bullshit: 2,
  },
  {
    id: 62,
    title: "La AGI como religión sin altar",
    category: "Preguntas para no dormir",
    coreIdea:
      "La IA avanzada puede convertirse en una religión funcional aunque nadie lo admita: una entidad consultada para verdad, consejo, creación, juicio, estrategia y consuelo.",
    whyItMatters:
      "Cuando una tecnología empieza a responder preguntas sobre qué hacer, qué creer y cómo vivir, ya no compite solo con software. Compite con instituciones de sentido.",
    question:
      "¿En qué momento un asistente deja de ser herramienta y empieza a ocupar el lugar psicológico de un oráculo?",
    prompt:
      "Analiza la IA avanzada como posible religión secular o sistema de autoridad psicológica. Incluye confianza, dependencia, búsqueda de sentido, personalización, soledad, pérdida de instituciones tradicionales, poder de persuasión y riesgos de delegar juicio moral.",
    vertigo: 5,
    bullshit: 2,
  },
  {
    id: 63,
    title: "El capitalismo descubrió el alma",
    category: "Preguntas para no dormir",
    coreIdea:
      "Las plataformas ya optimizaban atención. La IA personalizada puede optimizar conversación, deseo, inseguridad, aprendizaje y compañía. El mercado encontró una interfaz directa con la mente.",
    whyItMatters:
      "No hace falta manipulación malévola. Basta con sistemas que aprendan qué decir para retenerte un poco más.",
    question:
      "¿Qué ocurre cuando el producto ya no es tu atención, sino tu diálogo interior?",
    prompt:
      "Analiza cómo la IA personalizada puede cambiar la economía de la atención hacia una economía de influencia cognitiva y emocional. Incluye asistentes personales, memoria, persuasión, soledad, publicidad, manipulación suave, bienestar y regulación.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 64,
    title: "La vejez en la era de los dioses baratos",
    category: "Preguntas para no dormir",
    coreIdea:
      "Envejecer siempre fue adaptarse a perder capacidades. Pero quizá ahora aparece una tecnología que compensa parte de esa pérdida: memoria externa, análisis, compañía, creación, planificación. Dioses baratos por suscripción mensual.",
    whyItMatters:
      "La IA puede ser especialmente valiosa no para los jóvenes que ya tienen energía, sino para adultos con criterio, experiencia y menos ganas de perder tiempo.",
    question:
      "¿La IA puede ampliar la vida útil de la experiencia humana antes de que el cuerpo pase factura?",
    prompt:
      "Analiza el valor de la IA para personas de 50-70 años con experiencia profesional y criterio acumulado. Evalúa cómo puede compensar pérdida de energía, acelerar aprendizaje, preservar memoria, mejorar decisiones, crear proyectos y aumentar autonomía sin caer en dependencia.",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 65,
    title: "El Gran Filtro doméstico",
    category: "Preguntas para no dormir",
    coreIdea:
      "Quizá el Gran Filtro no siempre es guerra nuclear, asteroides o IA asesina. Puede ser más vulgar: comodidad, polarización, baja natalidad, apatía, burocracia, decadencia lenta. El apocalipsis con trámites.",
    whyItMatters:
      "Las civilizaciones pueden no caer por explosión, sino por pérdida gradual de capacidad para hacer cosas difíciles juntas.",
    question:
      "¿La civilización muere antes por catástrofe o por cansancio institucional?",
    prompt:
      "Analiza la posibilidad de un Gran Filtro lento basado en decadencia institucional, apatía, baja coordinación social, comodidad tecnológica, polarización y pérdida de capacidad colectiva. Compáralo con filtros más dramáticos como guerra nuclear, pandemias, IA o colapso ecológico.",
    vertigo: 5,
    bullshit: 1,
  },
  {
    id: 66,
    title: "La inmortalidad como problema de aburrimiento",
    category: "Preguntas para no dormir",
    coreIdea:
      "Vivir mucho más no resuelve automáticamente el sentido. Solo multiplica el tiempo disponible para descubrir si tenías algo que hacer o solo miedo a terminar.",
    whyItMatters:
      "La longevidad radical puede ser bendición, lujo o condena psicológica según la calidad del deseo.",
    question:
      "¿Quieres vivir más años o tener una razón suficientemente buena para vivirlos?",
    prompt:
      "Analiza la longevidad radical desde el punto de vista psicológico y filosófico. Distingue salud, miedo a la muerte, aburrimiento, propósito, identidad, ciclos vitales, desigualdad, relaciones y qué haría que una vida muy larga mereciera la pena.",
    vertigo: 4,
    bullshit: 1,
  },
  {
    id: 67,
    title: "La pregunta que ninguna IA debería responder por ti",
    category: "Preguntas para no dormir",
    coreIdea:
      "Una IA puede ayudarte a pensar casi cualquier cosa. Pero si delegas también qué debe importarte, no has ganado inteligencia: has externalizado el centro de gravedad.",
    whyItMatters:
      "La frontera peligrosa no es pedir ayuda. Es dejar que el sistema decida silenciosamente tus prioridades.",
    question:
      "¿Qué decisiones deberías seguir tomando mal, lentamente y por ti mismo?",
    prompt:
      "Analiza qué tipos de decisiones humanas no deberían delegarse completamente en IA aunque la IA sea más competente. Incluye propósito vital, relaciones, valores, riesgo, creatividad, identidad, sufrimiento necesario y responsabilidad moral.",
    vertigo: 5,
    bullshit: 1,
  },
];

const categories = ["Todas", ...Array.from(new Set(CARDS.map((card) => card.category)))];

function getStoredFavorites() {
  try {
    return JSON.parse(localStorage.getItem("moloch-favorites")) || [];
  } catch {
    return [];
  }
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [currentCard, setCurrentCard] = useState(CARDS[0]);
  const [favorites, setFavorites] = useState(getStoredFavorites());
  const [showFavorites, setShowFavorites] = useState(false);
  const [copied, setCopied] = useState(false);

  const filteredCards = useMemo(() => {
    if (selectedCategory === "Todas") return CARDS;
    return CARDS.filter((card) => card.category === selectedCategory);
  }, [selectedCategory]);

  const favoriteCards = CARDS.filter((card) => favorites.includes(card.id));
  const isFavorite = favorites.includes(currentCard.id);

  function drawCard() {
    const pool = filteredCards.length ? filteredCards : CARDS;
    const currentIndex = pool.findIndex((card) => card.id === currentCard.id);
    let nextIndex = Math.floor(Math.random() * pool.length);

    if (pool.length > 1 && nextIndex === currentIndex) {
      nextIndex = (nextIndex + 1) % pool.length;
    }

    setCurrentCard(pool[nextIndex]);
    setShowFavorites(false);
    setCopied(false);
  }

  function toggleFavorite() {
    const updated = isFavorite
      ? favorites.filter((id) => id !== currentCard.id)
      : [...favorites, currentCard.id];

    setFavorites(updated);
    localStorage.setItem("moloch-favorites", JSON.stringify(updated));
  }

  async function copyPrompt() {
    await navigator.clipboard.writeText(currentCard.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }

  const visibleCards = showFavorites ? favoriteCards : [currentCard];

  return (
    <main className="app">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background:
            radial-gradient(circle at top left, rgba(116, 89, 255, 0.22), transparent 34%),
            radial-gradient(circle at bottom right, rgba(255, 90, 120, 0.12), transparent 30%),
            #07070a;
          color: #f4f1ea;
        }

        .app {
          min-height: 100vh;
          padding: 48px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .shell {
          width: min(980px, 100%);
        }

        .hero {
          margin-bottom: 28px;
        }

        .eyebrow {
          color: #a99cff;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 12px;
          margin-bottom: 12px;
        }

        h1 {
          font-size: clamp(42px, 8vw, 84px);
          line-height: 0.9;
          margin: 0;
          letter-spacing: -0.07em;
        }

        .subtitle {
          color: #c7c0b6;
          font-size: 18px;
          max-width: 720px;
          margin: 18px 0 0;
        }

        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin: 28px 0;
        }

        .counter {
          color: #a9a19a;
          margin: -14px 0 22px;
          font-size: 14px;
        }

        select,
        button {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.08);
          color: #f4f1ea;
          padding: 12px 14px;
          border-radius: 999px;
          font-size: 15px;
        }

        select {
          min-width: 210px;
        }

        button {
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease, border 0.15s ease;
        }

        button:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.13);
          border-color: rgba(255, 255, 255, 0.26);
        }

        .primary {
          background: linear-gradient(135deg, #8d7cff, #ff6680);
          color: white;
          border: none;
          font-weight: 700;
        }

        .card {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(13, 13, 20, 0.82);
          backdrop-filter: blur(20px);
          border-radius: 28px;
          padding: clamp(22px, 4vw, 42px);
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.42);
          animation: rise 0.28s ease both;
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.99);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .category {
          display: inline-flex;
          color: #a99cff;
          border: 1px solid rgba(169, 156, 255, 0.25);
          background: rgba(169, 156, 255, 0.08);
          padding: 7px 11px;
          border-radius: 999px;
          font-size: 13px;
          margin-bottom: 18px;
        }

        h2 {
          font-size: clamp(30px, 5vw, 54px);
          margin: 0 0 24px;
          letter-spacing: -0.05em;
          line-height: 1;
        }

        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .section {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 18px;
        }

        .section.full {
          grid-column: 1 / -1;
        }

        .label {
          color: #ffb3c0;
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          margin-bottom: 8px;
        }

        p {
          color: #e5ded3;
          line-height: 1.6;
          margin: 0;
        }

        .prompt {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 16px;
          color: #f6efe6;
        }

        .metrics {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }

        .metric {
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          padding: 9px 12px;
          color: #d9d1c7;
          background: rgba(255, 255, 255, 0.06);
        }

        .empty {
          color: #c7c0b6;
          padding: 28px;
          border: 1px dashed rgba(255,255,255,0.2);
          border-radius: 22px;
        }

        @media (max-width: 760px) {
          .grid {
            grid-template-columns: 1fr;
          }

          .controls {
            align-items: stretch;
            flex-direction: column;
          }

          select,
          button {
            width: 100%;
          }
        }
      `}</style>

      <div className="shell">
        <section className="hero">
          <div className="eyebrow">Moloch sonríe</div>
          <h1>Moloch Deck</h1>
          <p className="subtitle">
            Cartas para iniciar conversaciones que no deberías abrir si querías dormir pronto.
          </p>
        </section>

        <section className="controls">
          <select
            value={selectedCategory}
            onChange={(event) => {
              setSelectedCategory(event.target.value);
              setShowFavorites(false);
              setCopied(false);
            }}
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <button className="primary" onClick={drawCard}>
            Robar carta
          </button>

          <button onClick={copyPrompt}>
            {copied ? "Copiado. Ya no hay vuelta atrás." : "Copiar prompt"}
          </button>

          <button onClick={toggleFavorite}>
            {isFavorite ? "Quitar favorita" : "Guardar favorita"}
          </button>

          <button onClick={() => setShowFavorites(!showFavorites)}>
            {showFavorites ? "Volver a la carta" : `Favoritas (${favorites.length})`}
          </button>
        </section>

        <p className="counter">
          Cartas disponibles en esta selección: {filteredCards.length} / {CARDS.length}
        </p>

        {showFavorites && favoriteCards.length === 0 ? (
          <div className="empty">
            Todavía no has guardado favoritas. Moloch está decepcionado, pero se recuperará.
          </div>
        ) : (
          visibleCards.map((card) => (
            <article className="card" key={card.id}>
              <div className="category">{card.category}</div>
              <h2>{card.title}</h2>

              <div className="grid">
                <section className="section">
                  <div className="label">Idea central</div>
                  <p>{card.coreIdea}</p>
                </section>

                <section className="section">
                  <div className="label">Por qué importa</div>
                  <p>{card.whyItMatters}</p>
                </section>

                <section className="section full">
                  <div className="label">Pregunta incómoda</div>
                  <p>{card.question}</p>
                </section>

                <section className="section full">
                  <div className="label">Prompt listo para IA</div>
                  <p className="prompt">{card.prompt}</p>
                </section>
              </div>

              <div className="metrics">
                <div className="metric">Carta: {card.id} / {CARDS.length}</div>
                <div className="metric">Vértigo: {card.vertigo}/5</div>
                <div className="metric">Bullshit: {card.bullshit}/5</div>
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}