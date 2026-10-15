# Integração de cache do tema SmartFull

O tema funciona com os nomes convencionais `application.css` e `theme.js`.
Para usar arquivos com data e invalidar corretamente o HTML de Atividade,
copie `redmine_smartfull_theme_cache/` para a pasta `plugins/` do Redmine.
O plugin não possui migrations e não altera arquivos originais do Redmine.

Após uma mudança no tema, execute `npm run build` na raiz do tema. O build
gera `theme-release.json`, `stylesheets/application-AAAAMMDD-HASH.css` e
`javascripts/theme-AAAAMMDD-HASH.js`. A data considera America/Sao_Paulo e o
hash depende do conteúdo de ambos os arquivos. O comando `npx grunt release`
também pode gerar a versão depois de compilar o CSS separadamente.

Publique os arquivos gerados junto com o manifesto, execute
`bundle exec rake assets:precompile RAILS_ENV=production` no Redmine e
reinicie o serviço. A integração aponta para os novos nomes automaticamente.
O validador de cache de Atividade inclui a versão e o identificador do tema:
uma versão nova retorna HTML novo mesmo quando os eventos não mudaram.
Feeds Atom e temas sem manifesto mantêm o comportamento original.

Preserve arquivos versionados anteriores durante a publicação para atender
páginas que ainda tenham referências antigas. Para remover a integração,
remova somente `plugins/redmine_smartfull_theme_cache/` e reinicie o Redmine.
