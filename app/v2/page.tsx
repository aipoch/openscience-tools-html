"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "zh";

const comparisonEn = [
  ["Product form", "Desktop research workbench", "Local browser workspace + desktop installers", "Commercial beta app", "Tauri desktop + headless / CLI"],
  ["Source & license", "Open source · Apache 2.0", "Open source · Apache 2.0", "Closed source", "Open source · MIT"],
  ["Platforms", "macOS · Windows · Linux", "macOS · Windows · Linux · browser UI", "macOS · Linux (beta)", "macOS · Windows · Linux · remote browser"],
  ["Model choice", "Multi-provider, gateways, Claude / Codex sign-in", "Frontier, open-weight and local models", "Claude models on eligible plans", "OpenCode provider catalog + compatible agents"],
  ["Scientific capabilities", "18 featured Skills + personal, GitHub and package imports", "309 bundled skills", "60+ curated skills and connectors", "AI4S skills pack + first-party review skills"],
  ["Research data access", "24 built-in research connectors + custom MCP", "42 built-in scientific connectors + MCP", "60+ scientific databases + connectors", "One-click science MCP connectors + custom MCP"],
  ["Execution & compute", "Python · R · local and remote SSH", "Shell · editor · local / Modal runtimes", "Local · SSH / HPC · Modal", "Python / R notebooks · SSH / Slurm · Modal"],
  ["Projects & continuity", "Projects, sessions, branching and persistent context", "Projects, files, session history and local state", "Project continuity and reusable lab tools", "Projects, memory, history and multi-pane sessions"],
  ["Artifacts & provenance", "Immutable versions with code, inputs, environment and reviewer evidence", "Local artifacts and provenance in the project", "Code, environment, description and message history", "JSONL provenance with code, inputs, runs and conversation"],
  ["Orchestration & review", "Plans, multi-agent execution and opt-in Reviewer", "Adaptive research agent with delegation", "Coordinating agent, specialists and background reviewer", "Plan / goal modes, sub-agents and review skills"],
  ["Best-aligned use", "Open, inspectable research across models, agents and disciplines", "Code-first research with a large bundled skill library", "Claude-first teams, especially life sciences", "OpenCode-centric desktop and headless automation"],
] as const;

const comparisonZh = [
  ["产品形态", "桌面科研工作台", "本地浏览器工作台＋桌面安装包", "商业 Beta 应用", "Tauri 桌面端＋无界面 / CLI"],
  ["源码与许可", "开源 · Apache 2.0", "开源 · Apache 2.0", "闭源", "开源 · MIT"],
  ["支持平台", "macOS · Windows · Linux", "macOS · Windows · Linux · 浏览器界面", "macOS · Linux（Beta）", "macOS · Windows · Linux · 远程浏览器"],
  ["模型选择", "多供应商、网关、Claude / Codex 登录", "前沿模型、开放权重模型与本地模型", "符合套餐条件的 Claude 模型", "OpenCode 模型目录＋兼容 Agent"],
  ["科学能力", "18 项精选 Skills＋个人、GitHub 与包导入", "309 项内置 Skills", "60+ 精选 Skills 与 Connectors", "AI4S Skills 包＋第一方审阅 Skills"],
  ["科研数据访问", "24 个内置科研 Connectors＋自定义 MCP", "42 个内置科学 Connectors＋MCP", "60+ 科学数据库＋Connectors", "一键科学 MCP Connectors＋自定义 MCP"],
  ["执行与算力", "Python · R · 本地与远程 SSH", "Shell · 编辑器 · 本地 / Modal 运行时", "本地 · SSH / HPC · Modal", "Python / R Notebook · SSH / Slurm · Modal"],
  ["项目与连续性", "项目、会话、分支与持久上下文", "项目、文件、会话历史与本地状态", "项目连续性与可复用实验室工具", "项目、记忆、历史与多窗格会话"],
  ["资产与溯源", "不可变版本，保留代码、输入、环境与 Reviewer 证据", "项目内的本地资产与溯源", "代码、环境、说明与完整消息历史", "JSONL 溯源，连接代码、输入、运行与对话"],
  ["编排与审阅", "计划、多 Agent 执行与可选 Reviewer", "可委派的自适应科研 Agent", "协调 Agent、专业 Agent 与后台 Reviewer", "Plan / Goal 模式、子 Agent 与审阅 Skills"],
  ["更匹配的场景", "跨模型、Agent 与学科的开放可检查科研", "拥有大型内置 Skill 库的代码优先科研", "Claude 优先团队，尤其是生命科学", "以 OpenCode 为中心的桌面与无界面自动化"],
] as const;

const copy = {
  en: {
    nav: ["Workbench", "Evidence", "Compare", "Control"],
    navIds: ["workbench-v2", "evidence-v2", "compare-v2", "control-v2"],
    download: "Download",
    kicker: "OPEN-SOURCE SCIENTIFIC AI WORKSPACE",
    title: ["Your research.", "One traceable workspace."],
    lede: "Plan, execute, inspect and reproduce scientific work without losing the question, the evidence or the decisions behind it.",
    primary: "Download latest",
    secondary: "View source",
    proofs: ["macOS · Windows · Linux", "Apache 2.0", "Multiple models & agents", "Local-first projects"],
    boardLabel: "RESEARCH SESSION / LIVE",
    boardCard: "Artifact provenance",
    boardCardCopy: "Every figure stays connected to its code, inputs and research record.",
    boardStatus: "REVIEWER",
    boardStatusCopy: "Evidence check ready",
    rails: ["Projects", "Models", "Agents", "Python + R", "Connectors", "Provenance"],
    systemKicker: "THE RESEARCH SYSTEM",
    systemTitle: "Questions connect to compute, evidence and writing.",
    systemBody: "AIPOCH brings papers, code, data, statistical work and scientific writing into one continuous, inspectable project.",
    systemMeta: ["01 / SOURCE", "02 / EXECUTE", "03 / VERIFY", "04 / SHARE"],
    completeKicker: "01 / THE WORKBENCH",
    completeTitle: "A complete research workbench.",
    completeBody: "Open-Science turns a research question into an explicit plan, real execution, traceable artifacts and a result you can inspect.",
    workflow: [
      ["Plan", "Define the goal, source material, methods, boundaries and expected outputs before execution."],
      ["Execute", "Run agents, code, notebooks, scientific data tools and remote compute in the project."],
      ["Verify", "Review every artifact against its inputs, environment, execution history and claims."],
    ],
    evidenceKicker: "02 / EVIDENCE BY CONSTRUCTION",
    evidenceTitle: "Every result keeps its evidence.",
    evidenceBody: "An artifact is more than a file. Open-Science keeps versioned content together with the code, inputs, observed environment, producing conversation and reviewer findings it can verify.",
    evidenceList: ["Immutable artifact versions", "Producer code and execution history", "Exact input references", "Reviewer evidence, attached to the version"],
    inspect: "Explore provenance",
    capabilitiesKicker: "03 / BUILT FOR REAL RESEARCH",
    capabilitiesTitle: "From source material to a reviewable result.",
    capabilities: [
      ["Persistent projects", "Sessions, branches, files, previews and context survive restarts and remain connected."],
      ["Executable science", "Scientific agents can run Python and R, search sources, call connectors and produce real artifacts."],
      ["Composable expertise", "Load Specialists and Skills, import from GitHub, or package methods your community can reuse."],
      ["Human control", "Choose approval modes, inspect tool activity and decide which external services receive data."],
    ],
    compareKicker: "04 / PRODUCT LANDSCAPE",
    compareTitle: "Four workbenches. Different commitments.",
    compareBody: "They share a goal—connecting AI with scientific work—but differ in openness, model choice, product surface and how research evidence is retained.",
    compareNames: ["AIPOCH\nOpen-Science", "Synthetic Sciences\nOpenScience", "Anthropic\nClaude Science", "AI4S\nOpen-Science Desktop"],
    compareLabel: "AIPOCH PICK",
    compareNote: "Publicly documented capabilities as of 3 September 2026. Catalog counts use each vendor’s own definitions and are not directly equivalent. “Best-aligned use” is an editorial inference from the cited product materials.",
    sourceTitle: "Official sources",
    sources: ["AIPOCH README", "Synthetic README", "Claude Science announcement", "AI4S README"],
    whyKicker: "05 / THE AIPOCH DIFFERENCE",
    whyTitle: "Open is an operating model, not a label.",
    whyBody: "AIPOCH keeps the workbench, capability layer and research record inspectable—while leaving researchers free to choose the models, agents and infrastructure that fit the study.",
    differentiators: [
      ["Model and agent freedom", "Select the provider and execution framework per session instead of locking the workflow to one model family."],
      ["Expertise you can move", "Skills and Specialists are readable capability packages that can be loaded, adapted and shared."],
      ["Evidence that stays attached", "Artifacts retain version-scoped provenance and reviewer findings, including what could not be verified."],
      ["Built with the community", "Researchers, domain experts, developers and institutions can contribute methods and improve capabilities together."],
    ],
    galleryKicker: "06 / ONE CONNECTED WORKSPACE",
    galleryTitle: "The files, the run and the result—side by side.",
    gallery: [
      ["Project library", "Keep uploads and generated research files organized by project and session."],
      ["Native artifact preview", "Inspect data and figures without breaking the thread of the research."],
      ["Scientific connectors", "Bring permissioned scientific data sources into the same working context."],
    ],
    controlKicker: "07 / DATA & CONTROL",
    controlTitle: "Local-first does not mean invisible data flow.",
    controlBody: "Project state and provenance stay on the computer. When a model, web search or remote connector is used, Open-Science makes the external action visible and keeps it behind the selected permission profile.",
    controlItems: ["Local project state", "System credential storage", "Permissioned tool calls", "Inspectable execution logs"],
    closeKicker: "AIPOCH / OPEN-SCIENCE",
    closeTitle: "Start with a question. Keep everything that makes the answer trustworthy.",
    closeBody: "Download the open-source workbench, inspect the code, and help build reusable scientific capability with the global research community.",
    docs: "Product overview",
    github: "Build on GitHub",
    partner: "Partner with AIPOCH",
    footer: "Open-source research infrastructure by AIPOCH.",
  },
  zh: {
    nav: ["工作台", "证据链", "产品对比", "数据控制"],
    navIds: ["workbench-v2", "evidence-v2", "compare-v2", "control-v2"],
    download: "下载",
    kicker: "开源科学 AI 工作空间",
    title: ["你的研究。", "一个可追溯的工作空间。"],
    lede: "在不丢失问题、证据与决策过程的前提下，计划、执行、检查并复现科学研究。",
    primary: "下载最新版本",
    secondary: "查看源代码",
    proofs: ["macOS · Windows · Linux", "Apache 2.0", "多模型与多 Agent", "本地优先项目"],
    boardLabel: "科研会话 / 执行中",
    boardCard: "研究资产溯源",
    boardCardCopy: "每张图表都与代码、输入和研究记录保持连接。",
    boardStatus: "REVIEWER",
    boardStatusCopy: "证据检查已就绪",
    rails: ["项目", "模型", "Agents", "Python + R", "Connectors", "溯源"],
    systemKicker: "完整的科研系统",
    systemTitle: "让问题与算力、证据和写作保持连接。",
    systemBody: "AIPOCH 将论文、代码、数据、统计分析与科学写作，组织在同一个连续、可检查的项目中。",
    systemMeta: ["01 / 来源", "02 / 执行", "03 / 验证", "04 / 分享"],
    completeKicker: "01 / 科研工作台",
    completeTitle: "一个完整的科研工作台。",
    completeBody: "Open-Science 将研究问题转化为明确计划、真实执行、可追溯资产，以及能够检查的结果。",
    workflow: [
      ["计划", "在执行之前定义目标、源材料、方法、边界与预期产出。"],
      ["执行", "在项目中运行 Agents、代码、Notebook、科学数据工具与远程算力。"],
      ["验证", "根据输入、环境、执行历史和研究主张检查每一份资产。"],
    ],
    evidenceKicker: "02 / 从一开始就保留证据",
    evidenceTitle: "每个结果，都带着它的证据。",
    evidenceBody: "科研资产不只是一个文件。Open-Science 将版本化内容与能够验证的代码、输入、运行环境、产生它的对话和 Reviewer 发现放在一起。",
    evidenceList: ["不可变的资产版本", "生成代码与执行历史", "精确的输入引用", "与版本绑定的 Reviewer 证据"],
    inspect: "探索溯源能力",
    capabilitiesKicker: "03 / 面向真实科研",
    capabilitiesTitle: "从源材料，到可审阅的结果。",
    capabilities: [
      ["持久项目", "会话、分支、文件、预览和上下文在重启后依然存在并保持连接。"],
      ["可执行科学", "科学 Agents 可以运行 Python 与 R、搜索资料、调用 Connectors 并生成真实资产。"],
      ["可组合的专业能力", "载入 Specialists 与 Skills，从 GitHub 导入，或封装社区可以复用的方法。"],
      ["人类控制", "选择批准模式、检查工具活动，并决定哪些外部服务可以接收数据。"],
    ],
    compareKicker: "04 / 产品格局",
    compareTitle: "四个工作台，不同的产品承诺。",
    compareBody: "它们都希望将 AI 与科学研究连接起来，但在开放性、模型选择、产品形态和证据保留方式上并不相同。",
    compareNames: ["AIPOCH\nOpen-Science", "Synthetic Sciences\nOpenScience", "Anthropic\nClaude Science", "AI4S\nOpen-Science Desktop"],
    compareLabel: "AIPOCH 方案",
    compareNote: "基于截至 2026 年 9 月 3 日的公开资料。能力目录数量采用各产品自己的定义，不能直接等量比较。“更匹配的场景”为根据所列官方资料做出的编辑性判断。",
    sourceTitle: "官方资料来源",
    sources: ["AIPOCH README", "Synthetic README", "Claude Science 官方公告", "AI4S README"],
    whyKicker: "05 / AIPOCH 的差异",
    whyTitle: "开放不是标签，而是一种运行方式。",
    whyBody: "AIPOCH 让工作台、能力层与研究记录保持可检查，同时让研究者自由选择适合项目的模型、Agent 和基础设施。",
    differentiators: [
      ["模型与 Agent 自由", "按会话选择供应商和执行框架，不把科研流程锁定在单一模型家族中。"],
      ["可以迁移的专业能力", "Skills 和 Specialists 是可阅读、可载入、可调整、可共享的能力包。"],
      ["始终相连的证据", "研究资产保留版本级溯源和 Reviewer 发现，也明确显示无法验证的内容。"],
      ["与社区共同构建", "研究者、领域专家、开发者和科研机构可以共同贡献方法、改进能力。"],
    ],
    galleryKicker: "06 / 一个连续的工作空间",
    galleryTitle: "文件、执行与结果，并排呈现。",
    gallery: [
      ["项目文件库", "按项目和会话组织上传文件与生成的研究资产。"],
      ["原生资产预览", "在不中断研究上下文的情况下检查数据与图表。"],
      ["科学 Connectors", "将受权限控制的科学数据源带入同一个工作上下文。"],
    ],
    controlKicker: "07 / 数据与控制",
    controlTitle: "本地优先，不等于隐藏数据流向。",
    controlBody: "项目状态与溯源记录保留在本机。当使用模型、网络搜索或远程 Connector 时，Open-Science 会显示外部操作，并让它受所选权限策略控制。",
    controlItems: ["本地项目状态", "系统安全凭据存储", "受权限控制的工具调用", "可检查的执行日志"],
    closeKicker: "AIPOCH / OPEN-SCIENCE",
    closeTitle: "从一个问题开始，保留让答案值得信任的一切。",
    closeBody: "下载开源科研工作台，检查代码，并与全球科研社区一起构建可复用的科学能力。",
    docs: "查看产品介绍",
    github: "在 GitHub 共建",
    partner: "与 AIPOCH 合作",
    footer: "AIPOCH 构建的开源科研基础设施。",
  },
} as const;

const sourceLinks = [
  "https://github.com/aipoch/open-science#readme",
  "https://github.com/synthetic-sciences/openscience#readme",
  "https://www.anthropic.com/news/claude-science-ai-workbench",
  "https://github.com/ai4s-research/open-science#readme",
];

export default function OpenScienceV2() {
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const c = copy[lang];
  const comparison = lang === "en" ? comparisonEn : comparisonZh;

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty(
        "--v2-progress",
        String(max > 0 ? window.scrollY / max : 0),
      );
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <main className={`v2-site ${lang === "zh" ? "v2-zh" : ""}`}>
      <div className="v2-progress" aria-hidden="true" />
      <header className="v2-header">
        <a className="v2-brand" href="#v2-top" aria-label="AIPOCH Open-Science home">
          <img src="/assets/aipoch-mark.png" alt="AIPOCH" />
          <i />
          <span>OPEN-SCIENCE</span>
        </a>
        <nav className={menuOpen ? "v2-nav is-open" : "v2-nav"} aria-label="Primary navigation">
          {c.nav.map((item, index) => (
            <a key={item} href={`#${c.navIds[index]}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <div className="v2-header-actions">
          <div className="v2-language" role="group" aria-label="Language">
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
            <button className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")} aria-pressed={lang === "zh"}>中文</button>
          </div>
          <a className="v2-download" href="https://aipoch.com/open-science/download">{c.download}<span>↗</span></a>
          <button className="v2-menu" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation"><span /><span /></button>
        </div>
      </header>

      <section className="v2-hero" id="v2-top">
        <div className="v2-hero-copy">
          <p className="v2-kicker"><i>✦</i>{c.kicker}</p>
          <h1><span>{c.title[0]}</span><span>{c.title[1]}</span></h1>
          <p className="v2-lede">{c.lede}</p>
          <div className="v2-actions">
            <a className="v2-button primary" href="https://aipoch.com/open-science/download">{c.primary}<span>↗</span></a>
            <a className="v2-button secondary" href="https://github.com/aipoch/open-science" target="_blank" rel="noreferrer">⌘ &nbsp; {c.secondary}<span>↗</span></a>
          </div>
          <div className="v2-proof-row">
            {c.proofs.map((proof) => <span key={proof}><i>✓</i>{proof}</span>)}
          </div>
        </div>
        <div className="v2-hero-board" aria-label="Open-Science product preview">
          <div className="v2-board-head"><span><i />{c.boardLabel}</span><b>OS / 0.25</b></div>
          <div className="v2-board-screen"><img src="/assets/v2-workspace.png" alt="Open-Science research workspace" /></div>
          <article className="v2-insight-card"><span>01 / {c.boardCard}</span><strong>{c.boardCardCopy}</strong><i>→</i></article>
          <article className="v2-status-card"><span>{c.boardStatus}</span><b>PASS</b><p>{c.boardStatusCopy}</p></article>
        </div>
      </section>

      <div className="v2-rail" aria-label="Open-Science foundations">
        {c.rails.map((item) => <span key={item}>{item}</span>)}
      </div>

      <section className="v2-system" aria-label={c.systemKicker}>
        <img src="/assets/aipoch-system-map.png" alt="AIPOCH Open-Science system architecture connecting research tools and evidence" />
        <div className="v2-system-copy">
          <p className="v2-kicker">00 / {c.systemKicker}</p>
          <h2>{c.systemTitle}</h2>
          <p>{c.systemBody}</p>
          <div>{c.systemMeta.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </section>

      <section className="v2-section v2-workbench" id="workbench-v2">
        <div className="v2-section-copy">
          <p className="v2-kicker">{c.completeKicker}</p>
          <h2>{c.completeTitle}</h2>
          <p>{c.completeBody}</p>
        </div>
        <div className="v2-workflow-grid">
          {c.workflow.map((item, index) => (
            <article key={item[0]}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div className={`v2-workflow-mark mark-${index + 1}`} aria-hidden="true"><i /><i /><i /></div>
              <h3>{item[0]}</h3>
              <p>{item[1]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="v2-evidence" id="evidence-v2">
        <div className="v2-evidence-media">
          <div className="v2-image-frame"><img src="/assets/v2-csv-preview.jpg" alt="Open-Science artifact preview beside its research session" /></div>
          <div className="v2-code-note"><span>ARTIFACT / FIGURE_01</span><b>sha256: 4f7c…9a2d</b><p>code · inputs · environment · review</p></div>
        </div>
        <div className="v2-evidence-copy">
          <p className="v2-kicker">{c.evidenceKicker}</p>
          <h2>{c.evidenceTitle}</h2>
          <p>{c.evidenceBody}</p>
          <div className="v2-check-list">{c.evidenceList.map((item) => <span key={item}><i>✓</i>{item}</span>)}</div>
          <a href="https://github.com/aipoch/open-science#data-permissions-and-trust" target="_blank" rel="noreferrer">{c.inspect}<span>↗</span></a>
        </div>
      </section>

      <section className="v2-section v2-capabilities">
        <div className="v2-section-copy compact">
          <p className="v2-kicker">{c.capabilitiesKicker}</p>
          <h2>{c.capabilitiesTitle}</h2>
        </div>
        <div className="v2-cap-grid">
          {c.capabilities.map((item, index) => (
            <article key={item[0]}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i aria-hidden="true">✦</i>
              <h3>{item[0]}</h3>
              <p>{item[1]}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="v2-comparison" id="compare-v2">
        <div className="v2-compare-head">
          <p className="v2-kicker">{c.compareKicker}</p>
          <div><h2>{c.compareTitle}</h2><p>{c.compareBody}</p></div>
        </div>
        <div className="v2-table-wrap" role="region" aria-label="Horizontal product comparison table">
          <table>
            <thead>
              <tr>
                <th scope="col">{lang === "en" ? "Capability" : "对比维度"}</th>
                {c.compareNames.map((name, index) => (
                  <th scope="col" key={name} className={index === 0 ? "aipoch-col" : ""}>
                    {index === 0 && <em>{c.compareLabel}</em>}
                    {name.split("\n").map((part) => <span key={part}>{part}</span>)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row[0]}>
                  <th scope="row">{row[0]}</th>
                  {row.slice(1).map((value, index) => <td key={`${row[0]}-${index}`} className={index === 0 ? "aipoch-col" : ""}>{value}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="v2-compare-note">{c.compareNote}</p>
        <div className="v2-sources"><span>{c.sourceTitle}</span>{c.sources.map((source, index) => <a href={sourceLinks[index]} target="_blank" rel="noreferrer" key={source}>{index + 1}. {source} ↗</a>)}</div>
      </section>

      <section className="v2-section v2-difference">
        <div className="v2-difference-intro">
          <p className="v2-kicker">{c.whyKicker}</p>
          <h2>{c.whyTitle}</h2>
          <p>{c.whyBody}</p>
        </div>
        <div className="v2-difference-list">
          {c.differentiators.map((item, index) => (
            <article key={item[0]}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item[0]}</h3><p>{item[1]}</p></div></article>
          ))}
        </div>
      </section>

      <section className="v2-gallery">
        <div className="v2-gallery-head">
          <p className="v2-kicker">{c.galleryKicker}</p>
          <h2>{c.galleryTitle}</h2>
        </div>
        <div className="v2-gallery-grid">
          {["/assets/v2-project-files.jpg", "/assets/v2-csv-preview.jpg", "/assets/v2-connectors.jpg"].map((image, index) => (
            <figure key={image}>
              <div><img src={image} alt={c.gallery[index][0]} /></div>
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span><h3>{c.gallery[index][0]}</h3><p>{c.gallery[index][1]}</p></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="v2-control" id="control-v2">
        <div className="v2-control-copy">
          <p className="v2-kicker">{c.controlKicker}</p>
          <h2>{c.controlTitle}</h2>
          <p>{c.controlBody}</p>
        </div>
        <div className="v2-control-grid">
          {c.controlItems.map((item, index) => <span key={item}><i>{String(index + 1).padStart(2, "0")}</i><b>✓</b>{item}</span>)}
        </div>
      </section>

      <section className="v2-close">
        <div className="v2-close-art" aria-hidden="true"><img src="/assets/open-science-city.png" alt="" /></div>
        <div className="v2-close-copy">
          <p className="v2-kicker">{c.closeKicker}</p>
          <h2>{c.closeTitle}</h2>
          <p>{c.closeBody}</p>
          <div className="v2-close-actions">
            <a className="v2-button primary" href="https://aipoch.com/open-science/download">{c.primary}<span>↗</span></a>
            <a className="v2-text-link" href="https://aipoch.com/open-science/overview?lang=en" target="_blank" rel="noreferrer">{c.docs} ↗</a>
          </div>
        </div>
      </section>

      <footer className="v2-footer">
        <div className="v2-brand"><img src="/assets/aipoch-mark.png" alt="AIPOCH" /><i /><span>OPEN-SCIENCE</span></div>
        <p>{c.footer}</p>
        <div><a href="https://github.com/aipoch/open-science" target="_blank" rel="noreferrer">{c.github} ↗</a><a href="https://aipoch.com/contact-us" target="_blank" rel="noreferrer">{c.partner} ↗</a><a href="#v2-top">TOP ↑</a></div>
      </footer>
    </main>
  );
}
