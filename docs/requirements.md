## Requisitos Funcionais 

| ID       | Requisito                                | Descrição                                                                                                                           |
| -------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **RF01** | **Cadastro de jogadores**                | O sistema deve permitir que o jogador informe um nome ou apelido ao final da partida, sem necessidade de autenticação ou login.     |
| **RF02** | **Receber dados do jogo**                | O site deve disponibilizar uma API para que o jogo (feito no GameMaker) envie os dados de pontuação e tempo de cada jogador.        |
| **RF03** | **Registrar pontuações**                 | A API deve armazenar no banco de dados as informações enviadas, incluindo nome do jogador, pontuação e tempo |
| **RF04** | **Exibir ranking geral**                 | O site deve exibir uma tabela de ranking ordenada pela maior pontuação e, em caso de empate, pelo menor tempo.                      |
| **RF05** | **Filtrar e paginar resultados**         | O site deve permitir filtrar o ranking pelo nome do jogador, por exemplo, e paginar os resultados para facilitar a navegação.                                 |
| **RF06** | **Atualização em tempo real** | O ranking deve atualizar automaticamente quando novas pontuações forem enviadas (via WebSocket, SSE ou revalidação ISR).            |
| **RF07** | **Painel administrativo (opcional)**     | Um painel restrito pode permitir apagar pontuações inválidas ou redefinir o ranking antes de reiniciar o evento.                    |
| **RF08** | **Exibição responsiva**                  | O site deve se adaptar corretamente a diferentes tamanhos de tela (desktop, tablet, mobile).                                        |
| **RF09** | **Feedback visual**                      | O site deve fornecer mensagens visuais claras em ações como envio de dados, carregamento e erro.                                    |

## Requisitos Não Funcionais
| ID        | Requisito                 | Descrição                                                                                                                                            |
| --------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **RNF01** | **Tecnologia principal**  | O sistema deve ser desenvolvido utilizando **Next.js**, com suporte a **API Routes**.                                                                |
| **RNF02** | **Banco de dados**        | O sistema deve utilizar um banco de dados compatível (MongoDB, PostgreSQL ou SQLite).                                                                |
| **RNF03** | **Integração com o jogo** | A comunicação entre o jogo e a API deve ocorrer via requisições HTTP (REST) seguras.                                                                 |
| **RNF04** | **Desempenho**            | O carregamento do ranking deve ocorrer em menos de 3 segundos com até 100 registros.                                                                 |
| **RNF05** | **Segurança**             | A API deve validar os dados recebidos e impedir requisições indevidas (injeção de dados, spoofing, etc.).                                            |
| **RNF06** | **Disponibilidade**       | O sistema deve permanecer disponível durante todo o evento de Halloween, com tempo de inatividade mínimo.                                            |
| **RNF07** | **Usabilidade**           | O site deve ter uma interface intuitiva e visualmente atrativa, adequada ao tema do jogo (folclore brasileiro/Saci).                                           |
| **RNF08** | **Compatibilidade**       | O site deve funcionar nos principais navegadores modernos (Chrome, Edge, Firefox, Safari).                                                           |
| **RNF09** | **Implantação**           | O sistema deve ser implantado em ambiente acessível via internet (ex: Vercel ou AWS Amplify) para que todas as máquinas possam registrar pontuações. |