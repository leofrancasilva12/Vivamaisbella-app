# Viva Mais Bella — aplicativo

App (PWA) de acompanhamento de tratamentos da Viva Mais Bella, publicado em https://app-vivamaisbella.vercel.app

| Arquivo | O que é |
|---|---|
| `index.html` | App da equipe (telas, estilos, abertura) |
| `js/app-vmb.js` | Toda a lógica do app |
| `paciente.html` | Página que a cliente recebe pelo link |
| `sw.js` | Service worker: atualização e notificações |
| `manifest.webmanifest`, `icon-512.png`, `lotus.svg` | Instalação no celular |
| `abertura.mp4`, `img/` | Vídeo e imagens da abertura |
| `vercel.json` | Configuração da Vercel |

As perguntas da anamnese (`js/servicos.js`) vêm do repositório da ficha
(Anameneseavivamaisbella): mudou uma pergunta lá, o app acompanha.

Banco de dados: Supabase (o mesmo da ficha).
