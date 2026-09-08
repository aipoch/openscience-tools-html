"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "zh";

const copy = {
  en: {
    nav: ["Principles", "Workflow", "Tools", "FAQ"],
    navIds: ["why", "journey", "tools", "faq"],
    open: "Open the AIPOCH workbench",
    eyebrow: "AIPOCH / OPEN-SCIENCE",
    hero: ["Open-Science for", "Reproducible Research."],
    heroTagline: "Build science in the open.",
    intro:
      "Open-Science by AIPOCH is an open-source, local-first, model-agnostic research workbench. Keep questions, evidence, methods, execution and artifacts connected in one inspectable workspace.",
    explore: "Explore the Open-Science workflow",
    download: "Open the AIPOCH workbench",
    github: "Open the AIPOCH workbench",
    signal: "OPEN BY DESIGN · BUILT WITH THE RESEARCH COMMUNITY",
    whyKicker: "01 / THE OPEN-SCIENCE GAP",
    whyTitle: "Why Open-Science needs a connected workflow.",
    whyBody:
      "The hard part is keeping evidence, methods, tools, compute and outputs connected. Research should move forward—not reset at every tool boundary.",
    gaps: [
      ["Question", "Intent", "Goals get restated in every tool"],
      ["Evidence", "Sources", "Papers and data live across systems"],
      ["Method", "Design", "Expert practice is rarely executable"],
      ["Analysis", "Execution", "Environments are hard to reproduce"],
      ["Validation", "Checks", "Methods and outputs drift apart"],
      ["Outputs", "Artifacts", "Files lose context and provenance"],
    ],
    gapLabel: "OPEN-SCIENCE PRIORITIES",
    gapTerms: "ACCESS · TRANSPARENCY · REPRODUCIBILITY · PROVENANCE",
    workKicker: "02 / ONE CONNECTED WORKFLOW",
    workTitle: "Turn Open-Science principles into daily practice.",
    workBody:
      "A connected workbench gives researchers one place to organize the project, choose tools, run the work and review what happened.",
    values: [
      ["Open source", "Code you can inspect"],
      ["Model-agnostic", "Choose what fits"],
      ["Inspectable", "Review key steps and records"],
      ["Designed for reproducibility", "Keep context & records"],
    ],
    continuum: ["Ask", "Assemble", "Run", "Review"],
    journeyKicker: "03 / AN OPEN-SCIENCE WORKFLOW",
    journeyTitle: "One research question. Six traceable steps.",
    journeyBody:
      "Follow a paper-reproduction task from the first question to a result another researcher can inspect. Each step keeps its sources, decisions and outputs connected.",
    taskLabel: "EXAMPLE TASK",
    task:
      "I have the paper and the data. I want to reproduce the main result.",
    steps: [
      {
        title: "Set up the project",
        cap: "Persistent context",
        heading: "Define the target before you begin.",
        body: "Create a project, specify the result to reproduce, and add the paper and data. The workspace is designed to keep that context available across project sessions.",
        result: "A project anchored in the question and source material",
        image: "/assets/product-project.png",
      },
      {
        title: "Load expertise",
        cap: "Specialists & Skills",
        heading: "Bring the right expertise into the project.",
        body: "Load specialist context, scientific Skills, tools and data connections matched to the study.",
        result: "A study-specific set of scientific capabilities",
        image: "/assets/product-skills.png",
      },
      {
        title: "Choose your stack",
        cap: "Models · runtime",
        heading: "Choose how and where the work runs.",
        body: "Select models, agents, Python or R environments, and local or remote compute—then change them as the work evolves.",
        result: "A technical stack matched to the study",
        image: "/assets/product-project.png",
      },
      {
        title: "Approve the plan",
        cap: "Orchestration",
        heading: "Approve the plan before anything runs.",
        body: "Review goals, steps, boundaries and permissions. The agent coordinates the work while progress stays visible.",
        result: "A structured, researcher-approved execution plan",
        image: "/assets/product-plan.png",
      },
      {
        title: "Inspect outputs",
        cap: "Data & artifacts",
        heading: "Inspect every output as soon as it lands.",
        body: "Open figures, tables and notebooks inside the project. Compare outputs with the source material in split view.",
        result: "Research artifacts ready to inspect and share",
        image: "/assets/product-artifacts.png",
      },
      {
        title: "Review & rerun",
        cap: "Reviewer & provenance",
        heading: "When the result differs, trace it back.",
        body: "Compare the result with the paper, inspect code, parameters and provenance, then rerun only what needs to change.",
        result: "A documented account of matches and discrepancies",
        image: "/assets/product-reviewer.jpg",
      },
    ],
    stackKicker: "04 / OPEN-SCIENCE TOOLS",
    stackTitle: "Choose tools around the research.",
    stackBody:
      "Combine agents, models, runtimes, compute and data without losing the research context.",
    stack: [
      ["01", "Agent", "Configure compatible agent frameworks, such as Codex, Claude Code and OpenCode."],
      ["02", "Model", "Configure compatible model providers, gateways or local models."],
      ["03", "Runtime", "Use persistent Python, R and REPL environments."],
      ["04", "Compute", "Run locally or connect a remote SSH host."],
      ["05", "Data", "Connect project files and compatible research services using connectors or MCP."],
    ],
    skillKicker: "05 / SPECIALISTS & SKILLS",
    skillTitle: "Load the expertise your research needs.",
    skillBody:
      "Domain-focused skills bring structured methods into the workflow. They can be called, combined, inspected and shared across disciplines.",
    skillTags: [
      "Life science",
      "Medicine",
      "Chemistry",
      "Physics",
      "Astronomy",
      "Environment",
      "Engineering",
      "Data science",
    ],
    skillCta: "Explore scientific capabilities",
    medicineNote: "Medicine refers to methods and workflows for medical research—not diagnosis, treatment or clinical decision-making.",
    trustKicker: "06 / DATA, ARTIFACTS & TRUST",
    trustTitle: "Keep results linked to source material and run records.",
    trustBody:
      "The workbench is designed to connect source material, execution records and final artifacts inside the project.",
    trust: [
      ["Materials", "Project files, uploads, and @ / # references."],
      ["Artifacts", "Preview datasets, notebooks, figures and reports."],
      ["Provenance", "Review how an output relates to code, tools and run records."],
      ["Control", "Set approvals and permission modes for every session."],
    ],
    communityKicker: "07 / THE OPEN RESEARCH COMMONS",
    communityTitle: "Open-Science is a shared practice.",
    communityBody:
      "Researchers run workflows. Domain experts contribute methods. Developers connect tools and data. Teams share results without losing the evidence behind them.",
    roles: ["Researchers", "Domain experts", "Developers", "Research teams"],
    loop: ["Use", "Ask", "Review", "Share", "Improve"],
    faqKicker: "08 / QUESTIONS",
    faqTitle: "What Open-Science supports—and what it does not claim.",
    faqs: [
      {
        question: "Does Open-Science guarantee reproducible results?",
        answer: "No software can guarantee that a research result will be reproduced. Open-Science helps researchers preserve evidence, methods, execution records and artifacts so the work can be inspected, reviewed and rerun.",
      },
      {
        question: "Is Open-Science intended for clinical use?",
        answer: "No. Open-Science is designed for research workflows and is not intended for clinical diagnosis, treatment or other medical decisions.",
      },
    ],
    closeEyebrow: "OPEN-SCIENCE BY AIPOCH",
    closeTitle: "Build science in the open.",
    closeBody:
      "Learn the principles, follow the workflow and open the AIPOCH workbench when you are ready to run real research.",
    guide: "Open-Science guide",
    overview: "Official product overview",
    docs: "GitHub & documentation",
    footer: "Open-Science is an open-source research workbench by AIPOCH, designed to support transparent and reproducible research workflows. Research outputs should be independently reviewed. Not intended for clinical diagnosis, treatment or other medical decisions.",
    trademark: "Third-party product names and trademarks belong to their respective owners. No affiliation or endorsement is implied unless expressly stated.",
  },
  zh: {
    nav: ["开放原则", "工作流", "工具", "常见问题"],
    navIds: ["why", "journey", "tools", "faq"],
    open: "打开 AIPOCH 工作台",
    eyebrow: "AIPOCH / OPEN-SCIENCE",
    hero: ["面向可复现研究的", "Open-Science。"],
    heroTagline: "在开放中构建科学。",
    intro:
      "AIPOCH Open-Science 是一个开源、本地优先、模型自由的科研工作台，让问题、证据、方法、执行与研究资产在同一个可检查的工作空间中保持连接。",
    explore: "探索 Open-Science 工作流",
    download: "打开 AIPOCH 工作台",
    github: "打开 AIPOCH 工作台",
    signal: "以开放为原则 · 与全球科研社区共同构建",
    whyKicker: "01 / OPEN-SCIENCE 的断层",
    whyTitle: "为什么 Open-Science 需要相互连接的工作流。",
    whyBody:
      "真正困难的，是让证据、方法、工具、算力和产出始终保持连接。科研应该持续向前，而不是在每个工具边界重新开始。",
    gaps: [
      ["问题", "研究意图", "目标在不同工具间被反复重述"],
      ["证据", "资料来源", "论文和数据散落在多个系统"],
      ["方法", "研究设计", "专家经验难以直接执行"],
      ["分析", "真实执行", "代码和环境难以复现"],
      ["验证", "检查机制", "方法与结果逐渐脱节"],
      ["产出", "研究资产", "文件失去上下文与溯源"],
    ],
    gapLabel: "OPEN-SCIENCE 的重点",
    gapTerms: "开放获取 · 过程透明 · 可复现性 · 研究溯源",
    workKicker: "02 / 一个相互连接的工作流",
    workTitle: "把 Open-Science 原则带进日常科研。",
    workBody:
      "相互连接的工作台，让研究者可以在同一个地方组织项目、选择工具、执行工作，并检查发生过什么。",
    values: [
      ["开源", "代码可检查"],
      ["模型自由", "选择适合研究的方案"],
      ["可检查", "审阅关键步骤与记录"],
      ["为可复现性设计", "保留上下文与记录"],
    ],
    continuum: ["提问", "组装", "执行", "审阅"],
    journeyKicker: "03 / OPEN-SCIENCE 工作流",
    journeyTitle: "一个科研问题，六个可追溯步骤。",
    journeyBody:
      "沿着一项论文复现任务，从第一个问题走到另一位研究者可以检查的结果。每一步都保留对应的来源、决策与产出。",
    taskLabel: "示例任务",
    task: "我有论文和数据，希望复现其中的核心结果。",
    steps: [
      {
        title: "建立项目",
        cap: "持久上下文",
        heading: "开始之前，先定义目标。",
        body: "创建项目、说明需要复现的结果，并加入论文和数据。工作台的设计目标，是让这些上下文可以在项目会话间继续使用。",
        result: "一个以问题和源材料为锚点的研究项目",
        image: "/assets/product-project.png",
      },
      {
        title: "载入专业能力",
        cap: "专家与 Skills",
        heading: "把正确的专业能力带进项目。",
        body: "载入与研究匹配的专家上下文、科学 Skills、工具和数据连接。",
        result: "一套适配研究任务的科学能力",
        image: "/assets/product-skills.png",
      },
      {
        title: "选择技术栈",
        cap: "模型 · 运行时",
        heading: "选择工作如何运行、在哪里运行。",
        body: "选择模型、Agent、Python 或 R 环境，以及本地或远程算力，并可随研究进展调整。",
        result: "一套与研究匹配的技术栈",
        image: "/assets/product-project.png",
      },
      {
        title: "批准计划",
        cap: "编排与权限",
        heading: "执行之前，先批准计划。",
        body: "检查目标、步骤、边界和权限。Agent 负责协调工作，而进展始终可见。",
        result: "一份由研究者确认的结构化执行计划",
        image: "/assets/product-plan.png",
      },
      {
        title: "检查产出",
        cap: "数据与资产",
        heading: "每一份产出生成后都能立即检查。",
        body: "在项目中打开图表、表格和 Notebook，并在分屏中与源材料直接比对。",
        result: "可检查、可分享的研究资产",
        image: "/assets/product-artifacts.png",
      },
      {
        title: "审阅与重跑",
        cap: "Reviewer 与溯源",
        heading: "当结果不一致时，追溯它。",
        body: "将结果与论文对照，检查代码、参数与来源记录，只重新运行需要改变的部分。",
        result: "关于一致与差异的完整记录",
        image: "/assets/product-reviewer.jpg",
      },
    ],
    stackKicker: "04 / OPEN-SCIENCE 工具",
    stackTitle: "围绕研究选择工具。",
    stackBody: "组合 Agent、模型、运行时、算力与数据，同时保留研究上下文。",
    stack: [
      ["01", "Agent", "配置兼容的 Agent 框架，例如 Codex、Claude Code 与 OpenCode。"],
      ["02", "模型", "配置兼容的模型提供商、网关或本地模型。"],
      ["03", "运行时", "使用持久化的 Python、R 和 REPL 环境。"],
      ["04", "算力", "在本地运行，或连接远程 SSH 主机。"],
      ["05", "数据", "通过 Connector 或 MCP 连接项目文件与兼容的科研服务。"],
    ],
    skillKicker: "05 / 专家与 SKILLS",
    skillTitle: "载入你的研究真正需要的专业能力。",
    skillBody:
      "面向具体领域的 Skills 将结构化方法带入工作流，并支持跨学科调用、组合、检查与分享。",
    skillTags: [
      "生命科学",
      "医学",
      "化学",
      "物理",
      "天文学",
      "环境科学",
      "工程",
      "数据科学",
    ],
    skillCta: "探索科学能力",
    medicineNote: "Medicine 指用于医学研究的方法与工作流，不用于诊断、治疗或其他临床决策。",
    trustKicker: "06 / 数据、资产与信任",
    trustTitle: "让研究结果与源材料和运行记录保持连接。",
    trustBody: "工作台的设计目标，是在项目中连接源材料、执行记录与最终研究资产。",
    trust: [
      ["材料", "项目文件、上传内容，以及 @ / # 引用。"],
      ["研究资产", "预览数据集、Notebook、图表和报告。"],
      ["溯源", "检查产出与代码、工具调用和运行记录的关系。"],
      ["控制", "为每个会话设置批准流程与权限模式。"],
    ],
    communityKicker: "07 / 开放科研共同体",
    communityTitle: "Open-Science 是一种共同实践。",
    communityBody:
      "研究者运行工作流，领域专家贡献方法，开发者连接工具与数据，研究团队在不丢失证据脉络的前提下分享结果。",
    roles: ["研究者", "领域专家", "开发者", "研究团队"],
    loop: ["使用", "提问", "审阅", "分享", "改进"],
    faqKicker: "08 / 常见问题",
    faqTitle: "Open-Science 支持什么，以及不承诺什么。",
    faqs: [
      {
        question: "Open-Science 能保证研究结果被成功复现吗？",
        answer: "不能。任何软件都无法保证一项研究结果一定能被复现。Open-Science 帮助研究者保留证据、方法、执行记录与研究资产，使研究工作更便于检查、审阅与重新运行。",
      },
      {
        question: "Open-Science 可以用于临床用途吗？",
        answer: "不可以。Open-Science 面向科研工作流，不用于临床诊断、治疗或其他医学决策。",
      },
    ],
    closeEyebrow: "OPEN-SCIENCE BY AIPOCH",
    closeTitle: "在开放中构建科学。",
    closeBody:
      "了解开放原则，沿着工作流实践；当你准备运行真实科研任务时，打开 AIPOCH 工作台。",
    guide: "Open-Science 指南",
    overview: "官方产品介绍",
    docs: "GitHub 与文档",
    footer: "Open-Science 是 AIPOCH 推出的开源科研工作台，旨在支持透明、可复现的科研工作流。研究产出应由专业人员独立审阅，不用于临床诊断、治疗或其他医学决策。",
    trademark: "第三方产品名称和商标归其各自权利人所有。除非另有明确说明，不代表存在关联、合作或背书。",
  },
} as const;

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [activeStep, setActiveStep] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const c = copy[lang];
  const step = c.steps[activeStep];

  useEffect(() => {
    const syncProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      document.documentElement.style.setProperty("--scroll-progress", String(progress));
    };
    syncProgress();
    window.addEventListener("scroll", syncProgress, { passive: true });
    window.addEventListener("resize", syncProgress);
    return () => {
      window.removeEventListener("scroll", syncProgress);
      window.removeEventListener("resize", syncProgress);
    };
  }, []);

  return (
    <main className={lang === "zh" ? "lang-zh" : ""}>
      <div className="scroll-progress" aria-hidden="true" />
      <header className="site-header">
        <div className="brand">
          <a className="brand-home" href="#top" aria-label="Open-Science home">
            <img className="brand-logo" src="/open-science-primary-logo.svg" alt="" aria-hidden="true" />
          </a>
          <a className="brand-by" href="https://aipoch.com/" target="_blank" rel="noreferrer" aria-label="Visit the AIPOCH website">by AIPOCH</a>
        </div>

        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          {c.nav.map((item, index) => (
            <a key={item} href={`#${c.navIds[index]}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>
              EN
            </button>
            <button className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")} aria-pressed={lang === "zh"}>
              中文
            </button>
          </div>
          <a className="header-cta" href="https://aipoch.com/open-science" target="_blank" rel="noreferrer">
            {c.open} <span aria-hidden="true">↗</span>
          </a>
          <button className="menu-button" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation">
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-copy reveal-in">
          <p className="eyebrow">{c.eyebrow}</p>
          <h1>
            <span>{c.hero[0]}</span>
            <span className="highlight-line">{c.hero[1]}</span>
          </h1>
          <p className="hero-tagline">{c.heroTagline}</p>
          <p className="hero-intro">{c.intro}</p>
          <div className="hero-actions">
            <a className="button primary" href="#workbench">{c.explore} <span aria-hidden="true">↓</span></a>
            <a className="text-link" href="https://aipoch.com/open-science" target="_blank" rel="noreferrer">{c.download} <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero-art reveal-in" aria-hidden="true">
          <img src="/assets/open-science-city.png" alt="" />
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
        </div>
        <div className="hero-signal"><span className="signal-dot" />{c.signal}</div>
        <a href="#why" className="scroll-cue" aria-label="Scroll to the research gap"><span>SCROLL</span><i /></a>
      </section>

      <section className="section section-light gap-section" id="why">
        <div className="section-head two-col">
          <p className="kicker">{c.whyKicker}</p>
          <div>
            <h2>{c.whyTitle}</h2>
            <p className="section-intro">{c.whyBody}</p>
          </div>
        </div>
        <div className="gap-track">
          {c.gaps.map((gap, index) => (
            <article className="gap-item" key={gap[0]}>
              <div className="gap-node"><span>{String(index + 1).padStart(2, "0")}</span></div>
              <p className="micro">{gap[1]}</p>
              <h3>{gap[0]}</h3>
              <p>{gap[2]}</p>
            </article>
          ))}
        </div>
        <div className="lost-line">
          <span>{c.gapLabel}</span>
          <div />
          <strong>{c.gapTerms}</strong>
        </div>
      </section>

      <section className="section workbench-section" id="workbench">
        <div className="workbench-copy">
          <p className="kicker">{c.workKicker}</p>
          <h2>{c.workTitle}</h2>
          <p className="section-intro">{c.workBody}</p>
          <div className="values-grid">
            {c.values.map((value) => (
              <div className="value" key={value[0]}>
                <strong>{value[0]}</strong>
                <span>{value[1]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="product-stage">
          <div className="product-window main-window">
            <div className="window-bar"><span/><span/><span/><b>OPEN-SCIENCE / PROJECT</b></div>
            <img src="/assets/product-project.png" alt="Open-Science project workspace" />
          </div>
          <div className="product-window floating-window">
            <img src="/assets/product-plan.png" alt="Open-Science research plan" />
          </div>
          <span className="stage-label">A SHARED, PERSISTENT RESEARCH SPACE</span>
        </div>
        <div className="continuum" aria-label="Open-Science workflow">
          {c.continuum.map((item, index) => (
            <div key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong>{index < c.continuum.length - 1 && <i>→</i>}</div>
          ))}
        </div>
      </section>

      <section className="section journey-section" id="journey">
        <div className="section-head two-col">
          <p className="kicker">{c.journeyKicker}</p>
          <div>
            <h2>{c.journeyTitle}</h2>
            <p className="section-intro">{c.journeyBody}</p>
          </div>
        </div>
        <div className="task-strip"><span>{c.taskLabel}</span><p>{c.task}</p></div>
        <div className="journey-tabs" role="tablist" aria-label="Research journey steps">
          {c.steps.map((item, index) => (
            <button
              key={item.title}
              role="tab"
              aria-selected={activeStep === index}
              aria-controls="journey-panel"
              onClick={() => setActiveStep(index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
              <small>{item.cap}</small>
            </button>
          ))}
        </div>
        <div className="journey-panel" id="journey-panel" role="tabpanel">
          <div className="journey-copy">
            <p className="micro">USER JOURNEY · {String(activeStep + 1).padStart(2, "0")} / 06</p>
            <h3>{step.heading}</h3>
            <p>{step.body}</p>
            <div className="result-line"><span>OUTPUT</span><strong>{step.result}</strong></div>
            <div className="journey-controls">
              <button onClick={() => setActiveStep((activeStep + 5) % 6)} aria-label="Previous step">←</button>
              <span>{activeStep + 1} / 6</span>
              <button onClick={() => setActiveStep((activeStep + 1) % 6)} aria-label="Next step">→</button>
            </div>
          </div>
          <div className="journey-image" key={`${lang}-${activeStep}`}>
            <img src={step.image} alt={step.title} />
          </div>
        </div>
      </section>

      <section className="section stack-section" id="tools">
        <div className="stack-lead">
          <p className="kicker">{c.stackKicker}</p>
          <h2>{c.stackTitle}</h2>
          <p className="section-intro">{c.stackBody}</p>
          <div className="stack-equation" aria-hidden="true">
            <span>MODEL</span><i>+</i><span>AGENT</span><i>+</i><span>RUNTIME</span><i>+</i><span>DATA</span>
          </div>
        </div>
        <div className="stack-list">
          {c.stack.map((item) => (
            <article key={item[0]}>
              <span>{item[0]}</span>
              <h3>{item[1]}</h3>
              <p>{item[2]}</p>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className="section skills-section">
        <div className="skills-noise" aria-hidden="true" />
        <div className="skills-copy">
          <p className="kicker">{c.skillKicker}</p>
          <h2>{c.skillTitle}</h2>
          <p className="section-intro">{c.skillBody}</p>
          <div className="skill-tags">
            {c.skillTags.map((tag, index) => <span key={tag}><i>{String(index + 1).padStart(2, "0")}</i>{tag}</span>)}
          </div>
          <p className="medicine-note">{c.medicineNote}</p>
          <a className="button yellow" href="https://aipoch.com/open-science" target="_blank" rel="noreferrer">{c.skillCta} <span>↗</span></a>
        </div>
        <div className="skills-visual">
          <div className="yellow-orbit" aria-hidden="true" />
          <div className="product-window dark-window">
            <div className="window-bar"><span/><span/><span/><b>SKILLS / MARKETPLACE</b></div>
            <img src="/assets/product-skills.png" alt="Open-Science skills marketplace" />
          </div>
        </div>
      </section>

      <section className="section trust-section">
        <div className="section-head two-col">
          <p className="kicker">{c.trustKicker}</p>
          <div>
            <h2>{c.trustTitle}</h2>
            <p className="section-intro">{c.trustBody}</p>
          </div>
        </div>
        <div className="trust-layout">
          <div className="trust-list">
            {c.trust.map((item, index) => (
              <article key={item[0]}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{item[0]}</h3><p>{item[1]}</p></div>
              </article>
            ))}
          </div>
          <div className="artifact-collage">
            <figure className="artifact-main"><img src="/assets/product-artifacts.png" alt="Research artifacts in split view" /></figure>
            <figure className="artifact-review"><img src="/assets/product-reviewer.jpg" alt="Open-Science reviewer interface" /></figure>
            <span className="collage-note">MATERIAL → EXECUTION → ARTIFACT → CLAIM</span>
          </div>
        </div>
      </section>

      <section className="community-section" id="community">
        <div className="community-copy">
          <p className="kicker">{c.communityKicker}</p>
          <h2>{c.communityTitle}</h2>
          <p className="section-intro">{c.communityBody}</p>
        </div>
        <div className="community-art">
          <img src="/assets/open-science-city.png" alt="A conceptual open research commons" />
          <div className="role-label role-one"><span>01</span>{c.roles[0]}</div>
          <div className="role-label role-two"><span>02</span>{c.roles[1]}</div>
          <div className="role-label role-three"><span>03</span>{c.roles[2]}</div>
          <div className="role-label role-four"><span>04</span>{c.roles[3]}</div>
        </div>
        <div className="community-loop">
          <span>CONTRIBUTION LOOP</span>
          <div>{c.loop.map((item, index) => <b key={item}>{item}{index < c.loop.length - 1 && <i>↔</i>}</b>)}</div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="faq-heading">
          <p className="kicker">{c.faqKicker}</p>
          <h2>{c.faqTitle}</h2>
        </div>
        <div className="faq-list">
          {c.faqs.map((faq, index) => (
            <details key={faq.question} open={index === 0}>
              <summary>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{faq.question}</strong>
                <i aria-hidden="true">+</i>
              </summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <div className="closing-grid" aria-hidden="true" />
        <p className="eyebrow">{c.closeEyebrow}</p>
        <h2>{c.closeTitle}</h2>
        <p className="closing-body">{c.closeBody}</p>
        <div className="closing-actions">
          <a
            href={lang === "zh" ? "https://aipoch.com/docs/zh-Hans/intro/" : "https://aipoch.com/docs/intro/"}
            target="_blank"
            rel="noreferrer"
          ><span>01</span>{c.guide}<i>↗</i></a>
          <a href="https://aipoch.com/open-science" target="_blank" rel="noreferrer"><span>02</span>{c.overview}<i>↗</i></a>
          <a href="https://github.com/aipoch/open-science" target="_blank" rel="noreferrer"><span>03</span>{c.docs}<i>↗</i></a>
        </div>
      </section>

      <footer>
        <div className="brand footer-brand"><a className="brand-home" href="#top" aria-label="Open-Science home"><img className="brand-logo" src="/open-science-primary-logo.svg" alt="" aria-hidden="true" /></a><a className="brand-by" href="https://aipoch.com/" target="_blank" rel="noreferrer" aria-label="Visit the AIPOCH website">by AIPOCH</a></div>
        <div className="footer-copy"><p>{c.footer}</p><p>{c.trademark}</p></div>
        <div><span>© 2026 AIPOCH</span><a href="#top">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}
