# Auditoría a fondo — claritystateai.com (2026-06-12)

> Diagnóstico maestro para elevar el sitio público de Clarity State AI.
> **Objetivo #1 del sitio (decidido por JMP):** convertir a un prospecto escéptico (un Gerente General) a **agendar el diagnóstico de 30 min**. Estilo objetivo = Arkham (confianza ejecutiva, UNA sola CTA).
> **Disparador del frente:** el "Powered by Clarity" de la sala 27RL enlaza a este sitio en 5+ lugares. Si Mario hace clic, aterriza aquí. No puede decepcionar.
> Fuente: 3 auditorías paralelas (CRO/sitio · sistema de marca · material reutilizable del Hub de JPP).

---

## Veredicto

**El sitio NO necesita rediseño — hiciste bien en preferirlo.** Su sistema visual (Fraunces + Inter, alternancia crema/navy, particle field estilo Aaru, pull-quotes editoriales) y su copy auténtico anti-humo son **activos reales**. Las brechas son de **completitud de conversión y credibilidad**, no de estética. Le falta el último 20% de rigor para no decepcionar a un GG que llega con expectativas altas.

Esto **destraba** el bloqueo que teníamos ("JMP debe decir qué le gusta del sitio"): la auditoría lo articuló por evidencia. Confírmame si te suena (abajo, "Qué conservar").

---

## 1. Qué conservar (los activos — no romper)

**Visual:**
- Tipografía con criterio: **Fraunces 500** (serif display) en titulares + **Inter** en cuerpo → aire editorial/ejecutivo tipo Arkham.
- Alternancia de fondos oscuro/crema `#f4f1ea` con contraste WCAG AA verificado y documentado (oficio que un sitio amateur no tiene).
- **Particle field** del hero (canvas vanilla, respeta `prefers-reduced-motion`, referente Aaru) → textura "viva" coherente con "memoria viva".
- Pull-quotes (Fraunces italic) y tarjeta de caso principal a ancho completo.

**Copy (voz de dueño, anti-humo):**
- Kicker del hero: *"El conocimiento de tu negocio vive en cabezas, no en sistemas. Y cuando rota una persona, se va con ella."*
- H1: *"El cerebro de tu empresa, con una memoria viva."*
- Manifiesto: *"El humano decide. El cerebro le da claridad."* (desactiva el miedo "la IA me reemplaza").
- Sección **"El cerebro en acción"** (4 preguntas reales) — lo más fuerte para un GG.
- Testimonio del GG de flores sobre continuidad/rotación — prueba social del ICP exacto.
- Cierre honesto: *"sin formularios ni embudos... En 30 minutos sabemos si tiene sentido seguir."*

**Estratégico ya resuelto:** el embudo es de **una sola acción** (conversación), sin captura ni mailing. El `js/main.js` **ya no tiene** el webhook de Systeme.io (modelo viejo muerto). Quedó WhatsApp + Calendly.

---

## 2. Hallazgos por prioridad

### 🔴 BLOCKING (rompe la conversión o la primera impresión del prospecto clave)

1. **og-image inexistente.** `index.html:37` apunta a `/assets/images/og-image.png` que **no existe** (el propio HTML lo admite con un TODO). Mario llega vía un link compartido "Powered by Clarity"; si ese link se comparte, la preview sale rota. *Primera impresión dañada antes de entrar.*
2. **Navegación móvil muerta.** `navbar-links { display:none }` en ≤768px **sin menú hamburguesa**. En móvil no se navega por secciones. La mayoría del inbound (LinkedIn/IG/TikTok) es móvil.
3. **Ebooks sin salida.** Los 3 ebooks tienen **0 enlaces** (ni a WhatsApp, ni a Calendly, ni de vuelta al sitio) y **no están enlazados** desde index.html → páginas huérfanas. Todo el inbound que cae ahí muere.

### 🟠 ALTO (deja credibilidad/dinero sobre la mesa con el GG escéptico)

4. **Cero cifras de resultado.** Brecha #1 de credibilidad. **Ya tenemos la munición honesta** (ver §3): 90.2% Plazoleta anónimo, validado out-of-sample.
5. **Sin eventos de conversión en GA4/Clarity.** El clic-a-agendar no se mide; el embudo está ciego en su paso más importante.
6. **Compliance con enlaces muertos.** Footer promete "NDA", "Roadmap SOC2", "Política de datos" → los 3 a `href="#"`. Prometer justo lo que tranquiliza al GG y no entregar es peor que no tenerlo.
7. **Falta sección "qué incluye / entregables".** Para una compra de $10K, el comprador necesita ver el alcance tangible antes de la llamada.
8. **Doble CTA co-igual** (WhatsApp + Calendly, ambos botón grande) en hero y cierre → diluye la "una sola CTA" Arkham. Jerarquizar una primaria; la otra como enlace de texto.
9. **Sin CTA intermedia** tras el pico de deseo ("El cerebro en acción" / testimonio) — se desperdicia el momento de mayor intención.
10. **CVP "Cerebro Operativo" viola el anti-patrón #1 del skill `copy-ejecutivo`.** "Cerebro operativo" es vocabulario-humo; traducir a la versión funcional ("un sistema que centraliza el conocimiento y responde en segundos").

### 🟡 MEDIO

11. **logo.svg de 2.2 MB** cargado 3× → lastre de LCP, peor en móvil.
12. **Falta manejo de objeciones / FAQ** (datos seguros, reemplaza a mi gente, qué pasa si no funciona, cuánto cuesta). El patrón `.faq-item` ya existe en CSS sin usar.
13. **Riesgo de hero "vacío" en viewports cortos** en móvil (text-shade + particles tapan el copy) — verificar en dispositivo real.
14. **"Quiénes somos" sin credenciales verificables**; el "programa internacional" se menciona sin nombre → para un escéptico suena evasivo.
15. **Falta el "techo" cinematográfico de Aaru:** glassmorphism/profundidad por capas, showcase de producto con cifra, grid de credibilidad ejecutiva (foto + cargo + logos "trusted by"). El "piso" de Arkham (sobriedad) ya está.

### ⚪ BAJO (higiene)
16. Doble carga de fuentes (`@import` CSS + `<link>` HTML). 17. Inconsistencia de destino del label "Metodología" (navbar vs footer). 18. Foto de perfil 752 KB sin `loading=lazy`. 19. `styles.css` (3.237 líneas) arrastra CSS legacy v1+v2 que se pisan.

---

## 3. La oportunidad de cohesión (el Hub es el yacimiento del sitio)

El Hub de JPP ya maduró la materia prima elevada. **Pública y segura:**

- **Frase-ancla** (la mejor): *"Clarity convierte el conocimiento disperso de tu empresa en un sistema que recuerda, responde y anticipa, para que decidas en segundos y resistas las crisis."*
- **Gancho con datos públicos:** *"82% de las grandes empresas colombianas subirá su presupuesto de IA, pero solo 6% de LatAm reporta impacto real. Mucho gasto, poco valor."* (Microsoft-IDC 2024 / McKinsey 2025 — citables.)
- **La cifra honesta, anónima:** *"En un exportador agroindustrial B2B de ~40 años, el sistema clasifica el proceso crítico con 90.2% de precisión, validado fuera de muestra. Decisiones que tomaban 15-20 días se resuelven en minutos."* Creíble *porque* declara su frontera.
- **Cita del cliente (anónima):** *"condensamos información, estructuramos, y el humano se dedica a analizar y decidir en tiempo oportuno."*
- **El "centro vacío" como posicionamiento:** consultoras caras arriba / chatbots tácticos abajo / Clarity en el centro (IA + memoria + riesgo + decisión, boutique, español, ticket medio).
- **Ecuación de valor pública:** ~$10K-$50K, ~90 días, ROI medible.
- **Registro ejecutivo** (`copy-ejecutivo`): answer-first, concreción sobre metáfora, regla de 90 segundos, cero "cerebro operativo"/"empodera"/"sinergia", cero guion largo de cara al cliente.

---

## 4. 🚫 Lista negra (existe en el Hub, JAMÁS al sitio público)

Inversión $100K de JPP · cap-table (~10.1% JPP / ~89.9% JMP) · valoración pre-money $1.0M y sensibilidad · nombres **Juan Pablo Paredes / Mario / Joli Foods** · identidad de **Plazoleta** ("Flores de la Plazoleta", "Pablo Bazzani", flores/Alstroemeria si lo hace identificable) · proyecciones de revenue/IRR/múltiplos · comp del fundador · CAC/success fees y originadores · pipeline con nombres reales · vertical family offices.

**Regla de oro:** el caso Plazoleta es público **solo** como "exportador agroindustrial B2B anónimo" + 90.2% con contexto metodológico + antes/después (15-20 días → minutos) + cita sin atribución.

---

## 5. Plan priorizado (propuesta — pendiente go de JMP)

**Ola 1 — Que no decepcione a Mario (rápido, alto impacto, sin rediseño):**
- Generar **og-image** alineada al CVP actual (navy/cian + headline).
- **Hamburguesa** móvil (o nav simplificada) para no perder navegación.
- **Jerarquizar la CTA** única (Arkham): una primaria sólida + la otra como texto.
- Arreglar **enlaces muertos** del footer (compliance) o quitarlos hasta tenerlos.
- **Eventos de conversión** en GA4 (clic WhatsApp/Calendly) → dejar de estar ciegos.

**Ola 2 — Credibilidad para el GG escéptico:**
- Insertar la **cifra honesta 90.2%** anónima (bloque de prueba con fuente declarada).
- Sección **"qué incluye / entregables"** + ecuación de valor.
- **FAQ / manejo de objeciones** (patrón CSS ya existe).
- **CTA intermedia** tras "El cerebro en acción".
- Traducir el **CVP "cerebro operativo"** al registro `copy-ejecutivo`.

**Ola 3 — El "techo" cinematográfico (elevar la percepción premium):**
- **Showcase de producto** con cifra (estilo Aaru).
- **Grid de credibilidad ejecutiva** (foto + cargo + logos).
- Profundidad por capas (glass) y una "fuente de luz" ancla.
- Optimizar `logo.svg` (2.2 MB) y consolidar el CSS.

---

### Archivos clave
- Sitio: `claritystateai-site/index.html`, `css/styles.css` (3.237 líneas, v1+v2), `js/main.js` (particle field)
- Marca: `08_CLARITY_STATE_AI/brand/brand.css`, `brand/BRAND-GUIDELINES.md`
- Hub (yacimiento, privado): `paredes-portal-jpp/.../hub-jpp/inversion/` (01-pitch, 08-caso-plazoleta)
- Skill registro: `~/.claude/skills/copy-ejecutivo/`
- Cifra honesta: `clientes/flores-plazoleta/RESUMEN-EJECUTIVO-SESION-2026-06-09.md`
- Referentes: `crisalida/references/referentes.md`, `aliados/paredes/referentes-ux/00-brief-aaru-arkham.md`
</content>
</invoke>
