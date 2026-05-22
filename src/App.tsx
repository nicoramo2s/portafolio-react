import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Database,
  Server,
  Cloud,
  ChevronRight,
  Download,
  Terminal,
  Cpu,
  Globe,
  Briefcase,
  GraduationCap,
} from "lucide-react";

// --- Types ---
interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  deployLink?: string;
  type: "Backend" | "Fullstack";
}

interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  tech: string[];
}

// --- Data ---
const SKILLS = [
  {
    category: "Backend Core",
    items: ["PHP", "Laravel", "NestJS", "Node.js", "TypeScript"],
    icon: <Server className="w-5 h-5 text-blue-400" />,
  },
  {
    category: "Databases & Events",
    items: ["MySQL", "PostgreSQL", "Redis (Jobs/Queues)", "MongoDB"],
    icon: <Database className="w-5 h-5 text-emerald-400" />,
  },
  {
    category: "IA & Integración",
    items: [
      "Desarrollo Asistido con IA",
      "Integración de LLMs (OpenAI)",
      "APIs de Terceros",
      "Swagger",
    ],
    icon: <Cpu className="w-5 h-5 text-purple-400" />,
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "Git", "AWS (EC2, S3, RDS)", "Nginx"],
    icon: <Cloud className="w-5 h-5 text-cyan-400" />,
  },
];

const EXPERIENCES: Experience[] = [
  {
    company: "Papyrus Libreria",
    role: "Desarrollador Full Stack",
    period: "Mayo 2026 - Presente",
    description: [
      "Diseño y desarrollo de la arquitectura backend para un sistema de automatización comercial, control de stock y facturación electrónica utilizando NestJS y Node.js.",
      "Implementación de flujos de trabajo optimizados mediante desarrollo asistido con IA, incrementando notablemente la velocidad de entrega de funcionalidades.",
      "Construcción de módulos modulares y escalables, asegurando la consistencia de datos y un sistema robusto de permisos por roles.",
    ],
    tech: [
      "NestJS",
      "Node.js",
      "TypeScript",
      "Desarrollo Asistido con IA",
      "Git",
    ],
  },
  {
    company: "Nube",
    role: "Backend Developer PHP - Laravel",
    period: "Marzo 2025 - Mayo 2026 (1 año 3 meses)",
    description: [
      "Desarrollo y mantenimiento de funcionalidades críticas en el backend utilizando PHP y Laravel para sistemas empresariales.",
      "Diseño e implementación de procesos automatizados en segundo plano mediante Jobs y Queues (Redis), optimizando el rendimiento del servidor y mejorando los tiempos de respuesta del usuario.",
      "Construcción de APIs REST robustas, manejo seguro de autenticación (JWT/Sanctum) y optimización de consultas complejas con Eloquent ORM y MySQL.",
      "Integración exitosa con APIs externas, integración con OpenAI para la automatización de cargas de stock y control de versiones bajo flujos de trabajo con Git.",
    ],
    tech: [
      "PHP",
      "Laravel",
      "MySQL",
      "Redis (Queues/Jobs)",
      "OpenAI API",
      "Git",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    title: "Trabajo Listo",
    description:
      "Creado con el propósito de simplificar y agilizar el proceso de búsqueda de servicios. La función principal de la aplicación es brindar una plataforma que permite a los usuarios buscar servicios posteados por profesionales, realizar consultas, contactar al profesional y contratar el servicio.",
    tech: ["Node.js", "NestJS", "MongoDB", "Docker", "TypeScript"],
    type: "Backend",
    link: "https://github.com/nicoramo2s/trabajo_listo",
    deployLink: "https://c16-10-m-node-react.vercel.app/",
  },
  {
    title: "App Ecommerce Microservice",
    description:
      "Proyecto backend basado en NestJS con arquitectura de microservicios. Implementa un flujo base de productos utilizando un API Gateway HTTP que delega operaciones a un microservicio de productos con transporte TCP.",
    tech: ["NestJS", "TypeScript", "PostgreSQL", "Docker", "TCP Transport"],
    type: "Backend",
    link: "https://github.com/nicoramo2s/nest-microservice-eccomerce-app",
    deployLink: "#",
  },
  {
    title: "Laravel E-Commerce API",
    description:
      "API robusta especializada para comercio electrónico construida con Laravel. Cuenta con Jobs en segundo plano, colas (Queues) con Redis, autenticación robusta mediante Laravel Sanctum e integración con Pasarela de pagos.",
    tech: ["PHP", "Laravel", "MySQL", "Redis (Queues/Jobs)", "Sanctum"],
    type: "Backend",
    link: "https://github.com/nicoramo2s",
    deployLink: "#",
  },
  {
    title: "API Blog",
    description:
      "Backend API potente desarrollada con NestJS y TypeScript, enfocada en buenas prácticas de arquitectura (Clean Architecture), autenticación modular, carga de archivos y alta escalabilidad de endpoints.",
    tech: ["TypeScript", "NestJS", "Node.js", "PostgreSQL"],
    type: "Backend",
    link: "https://github.com/nicoramo2s/blog-api-nestjs",
    deployLink: "#",
  },
];

// --- Components ---

const SectionHeading = ({
  title,
  icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 mb-12">
    <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
      {icon}
    </div>
    <h2 className="text-3xl font-bold tracking-tight text-white">{title}</h2>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-blue-500/20 to-transparent ml-4"></div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<
    "experience" | "education" | "certifications"
  >("experience");

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-gray-300 font-sans selection:bg-blue-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 rounded-full blur-[120px]"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0b]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center font-bold text-white text-sm">
              DR
            </div>
            <span className="font-mono text-sm tracking-tighter text-white font-medium">
              DARIO_RAMOS.json
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="hover:text-blue-400 transition-colors">
              Sobre mí
            </a>
            <a href="#skills" className="hover:text-blue-400 transition-colors">
              Habilidades
            </a>
            <a
              href="#experience"
              className="hover:text-blue-400 transition-colors"
            >
              Trayectoria
            </a>
            <a
              href="#projects"
              className="hover:text-blue-400 transition-colors"
            >
              Proyectos
            </a>
            <a
              href="mailto:Nicolasramo2s@hotmail.com"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all"
            >
              Contactar
            </a>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32">
        {/* Hero Section */}
        <section className="mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Disponible para nuevos desafíos
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Dario Nicolas Ramos
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mb-8">
              <span className="text-blue-400 font-medium">
                Backend Developer
              </span>{" "}
              | Node.js & NestJS | TypeScript | PHP & Laravel | Diseñado de
              Arquitecturas Orientadas a Eventos e Integración de IA
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.linkedin.com/in/dario-nicolas-ramos"
                target="_blank"
                rel="no-referrer"
                className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-all"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </a>
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Ver Proyectos
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-32">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <SectionHeading
                title="Sobre mí"
                icon={<Terminal className="w-5 h-5 text-blue-400" />}
              />
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Soy un apasionado{" "}
                  <span className="text-white font-medium">
                    Desarrollador Backend
                  </span>{" "}
                  enfocado en crear APIs REST eficientes, automatizaciones y
                  sistemas empresariales altamente escalables. Cuento con una
                  base muy sólida en{" "}
                  <span className="text-white font-medium">PHP y Laravel</span>,
                  donde he implementado procesamiento de tareas asíncronas
                  optimizadas en segundo plano mediante Jobs y Queues con Redis.
                </p>
                <p>
                  Actualmente, complemento mi trayectoria con tecnologías en
                  auge como{" "}
                  <span className="text-white font-medium">
                    TypeScript, Node.js y NestJS
                  </span>
                  . Me enfoco en optimizar flujos usando desarrollo asistido con
                  Inteligencia Artificial, diseñar arquitecturas orientadas a
                  eventos y construir integraciones potentes con modelos de
                  lenguaje masivos (LLMs / OpenAI API) para fusionar el software
                  tradicional con la era de la IA.
                </p>
                <div className="pt-4 flex gap-4">
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-2xl">1.5+</span>
                    <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">
                      Año Exp.
                    </span>
                  </div>
                  <div className="h-10 w-[1px] bg-white/10 mx-2"></div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-2xl">10+</span>
                    <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">
                      Proyectos
                    </span>
                  </div>
                  <div className="h-10 w-[1px] bg-white/10 mx-2"></div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-2xl">8+</span>
                    <span className="text-gray-500 text-xs uppercase tracking-widest font-bold">
                      Tecnologías Core
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-500/10 to-transparent p-1 rounded-2xl border border-white/5"
            >
              <div className="bg-[#121214] p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Cpu className="w-24 h-24 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-6">
                  Fortalezas Clave
                </h3>
                <ul className="space-y-4">
                  {[
                    "Arquitecturas Orientadas a Eventos",
                    "Tareas Asíncronas (Jobs & Queues con Redis)",
                    "Integración Inteligente de Modelos de IA (LLMs)",
                    "Desarrollo de REST APIs robustas",
                    "Desarrollo Asistido por IA (Optimización de tiempos)",
                    "Buenas Prácticas de Ingeniería (SOLID & Código Limpio)",
                  ].map((strength, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-32">
          <SectionHeading
            title="Habilidades Técnicas"
            icon={<Cpu className="w-5 h-5 text-blue-400" />}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SKILLS.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all hover:bg-white/[0.04]"
              >
                <div className="mb-4 flex items-center gap-3">
                  {skill.icon}
                  <h3 className="text-white font-semibold">{skill.category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 rounded bg-white/5 text-gray-400 text-xs border border-white/5 group-hover:border-white/10 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trayectoria Section */}
        <section id="experience" className="mb-32">
          <SectionHeading
            title="Trayectoria"
            icon={<Briefcase className="w-5 h-5 text-blue-400" />}
          />

          <div className="flex flex-wrap gap-4 mb-8 p-1 bg-white/[0.02] rounded-lg w-fit border border-white/5">
            <button
              onClick={() => setActiveTab("experience")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === "experience" ? "bg-blue-600 text-white shadow-lg" : "hover:text-white"}`}
            >
              Experiencia Laboral
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === "education" ? "bg-blue-600 text-white shadow-lg" : "hover:text-white"}`}
            >
              Educación
            </button>
            <button
              onClick={() => setActiveTab("certifications")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${activeTab === "certifications" ? "bg-blue-600 text-white shadow-lg" : "hover:text-white"}`}
            >
              Certificaciones
            </button>
          </div>

          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === "experience" ? (
                <motion.div
                  key="exp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  {EXPERIENCES.map((exp, i) => (
                    <div
                      key={i}
                      className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-blue-500/20"
                    >
                      <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                      <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {exp.role}
                          </h3>
                          <div className="text-blue-400 font-medium flex items-center gap-2">
                            {exp.company}
                            <span className="text-gray-600 text-xs">•</span>
                            <span className="text-gray-500 text-sm">
                              {exp.period}
                            </span>
                          </div>
                        </div>
                      </div>
                      <ul className="space-y-3 mb-6 max-w-3xl">
                        {exp.description.map((item, j) => (
                          <li
                            key={j}
                            className="flex gap-3 text-gray-400 text-base leading-relaxed"
                          >
                            <span className="text-blue-500 mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {exp.tech.map((t, j) => (
                          <span
                            key={j}
                            className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs text-blue-300 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : activeTab === "education" ? (
                <motion.div
                  key="edu"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-12"
                >
                  <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-blue-500/20">
                    <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
                    <h3 className="text-xl font-bold text-white">
                      Ingeniería Eléctrica y Electrónica
                    </h3>
                    <div className="text-blue-400 font-medium mb-2">
                      Universidad Nacional de San Juan{" "}
                      <span className="text-gray-500 text-sm ml-2">
                        (2016 - 2019)
                      </span>
                    </div>
                    <p className="text-gray-400">
                      Formación técnica avanzada en sistemas complejos, lógica y
                      resolución de problemas de ingeniería.
                    </p>
                  </div>
                  <div className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[2px] before:bg-blue-500/20">
                    <div className="absolute left-[-4px] top-1 w-2 h-2 rounded-full bg-blue-500"></div>
                    <h3 className="text-xl font-bold text-white">
                      Desarrollador Backend Java
                    </h3>
                    <div className="text-blue-400 font-medium mb-2">
                      Alura{" "}
                      <span className="text-gray-500 text-sm ml-2">
                        (Febrero de 2024 - Diciembre de 2024)
                      </span>
                    </div>
                    <p className="text-gray-400 font-normal">
                      Programa intensivo focalizado en Java, Spring Boot,
                      programación orientada a objetos (POO), bases de datos y
                      desarrollo de lógica de negocio backend.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="cert"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block mb-2">
                        PHP & Laravel
                      </span>
                      <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                        Laravel 9, 10, 11 - Aplicaciones y Sitios Web con PHP 8
                        y MVC
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                      Certificación integral en la creación de servicios backend
                      dinámicos usando PHP moderno, arquitectura
                      modelo-vista-controlador, seguridad y Eloquent.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-2">
                        Desarrollo Backend
                      </span>
                      <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                        Programa Oracle Next Education F2 T6 Back-end
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                      Formación integral auspiciada por Oracle y Alura enfocada
                      en microservicios, APIs REST, lógica POO y bases de datos
                      relacionales.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/20 hover:bg-white/[0.04] transition-all flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest block mb-2">
                        Node.js Ecosystem
                      </span>
                      <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                        Bootcamp de JavaScript en el Backend
                      </h4>
                    </div>
                    <p className="text-sm text-gray-500 mt-4 leading-relaxed">
                      Especialización de desarrollo backend en NodeJS, Express,
                      middleware de autenticación, diseño de base de datos NoSQL
                      y APIs escalables.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32">
          <SectionHeading
            title="Proyectos Destacados"
            icon={<Globe className="w-5 h-5 text-blue-400" />}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] hover:border-blue-500/20 transition-all"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Database className="w-6 h-6" />
                  </div>
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a
                      href={project.link}
                      className="text-gray-400 hover:text-white"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href={project.link}
                      className="text-gray-400 hover:text-white"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, j) => (
                    <span
                      key={j}
                      className="text-[10px] uppercase tracking-widest font-bold text-blue-400/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={project.deployLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-white/5 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors border border-white/5 text-center flex items-center justify-center gap-2 group/btn"
                >
                  Ver en producción
                  <ExternalLink className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA / Contact Section */}
        <section className="mb-32 py-16 px-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12 translate-x-12 -translate-y-6">
            <Server className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Listo para construir algo escalable?
            </h2>
            <p className="text-white/80 text-lg mb-10">
              Actualmente estoy abierto a nuevas oportunidades como Backend
              Developer. Hablemos sobre cómo puedo aportar valor a tu equipo
              técnico.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:Nicolasramo2s@hotmail.com"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
              >
                Envíame un Email
              </a>
              <a
                href="https://www.linkedin.com/in/dario-nicolas-ramos"
                className="px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
              >
                Ver LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-bold text-white text-[10px]">
                DR
              </div>
              <span className="font-bold text-white">Dario Ramos</span>
            </div>
            <p className="text-sm text-gray-500 max-w-sm">
              Backend Developer especializado en sistemas distribuidos y
              arquitectura de microservicios con enfoque en rendimiento y
              calidad de código.
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="mailto:Nicolasramo2s@hotmail.com"
              className="p-3 bg-white/[0.02] border border-white/5 rounded-full hover:bg-white/[0.05] hover:text-blue-400 transition-all"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/dario-nicolas-ramos"
              className="p-3 bg-white/[0.02] border border-white/5 rounded-full hover:bg-white/[0.05] hover:text-blue-400 transition-all"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/nicoramo2s"
              className="p-3 bg-white/[0.02] border border-white/5 rounded-full hover:bg-white/[0.05] hover:text-blue-400 transition-all"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-white/[0.02] text-center text-xs text-gray-600 flex justify-center items-center gap-4">
          <span>© {new Date().getFullYear()} Dario Nicolas Ramos</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>{" "}
            System Status: Operational
          </span>
        </div>
      </footer>
    </div>
  );
}
