const { spawn } = require('child_process');
const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const { Movements, goals } = require('mineflayer-pathfinder');
const pvp = require('mineflayer-pvp').plugin
const armorManager = require('mineflayer-armor-manager')

const bot = mineflayer.createBot({
    port: ,
    host: '', 
    username: '',
    version: '1.16.5',
});

// Load pathfinder and collect block plugins
bot.loadPlugin(pathfinder);
bot.loadPlugin(pvp)
bot.loadPlugin(armorManager)



// Event handler for "login" event
bot.on('login', () => {
    // Задержка в 5 секунд
    setTimeout(() => {
        // Отправляем команду /move Survival-1
        bot.chat('/move Survival-1');

        // Отправляем приветственное сообщение
        bot.chat('');

        
    }, 4000); // 5000 миллисекунд = 5 секунд
    bot.on('whisper', (username, message) => {
        // Проверяем отправителя сообщения
        if (allowedPlayers.includes(username)) {
            const regex = /следуй\s+(\S+)/; // Регулярное выражение для извлечения никнейма из сообщения
            const matches = message.match(regex); // Ищем совпадения с регулярным выражением
    
            // Проверяем, найдены ли совпадения
            if (matches && matches.length === 2) {
                const playerNickname = matches[1]; // Извлекаем никнейм игрока
                
                const targetPlayer = message.split(' ')[1];
                const player = bot.players[targetPlayer]; // Fix: Accessing player by targetPlayer
                
                // Проверяем, что игрок существует
                if (player) {
                    // Создаем объект движения для следования за игроком
                    const mcData = require('minecraft-data')(bot.version);
                    const movements = new Movements(bot, mcData);
                    bot.pathfinder.setMovements(movements);
                    // Устанавливаем цель следования за игроком
                    bot.pathfinder.setGoal(new goals.GoalFollow(player.entity, 3), true);
                    console.log(`Начато следование за игроком ${playerNickname}`);
                } else {
                    console.log(`Игрок ${targetPlayer} не найден`);
                }
            } 
            else {
                if (message.startsWith('следуй')) {
                    console.log(`Неправильный формат сообщения от ${username}. Должно быть: 'следуй никнейм'`);
                    bot.chat(`/msg ${username} Неправильный формат сообщения. Должно быть: следуй никнейм`)
                }
            }
        } else {
            if (message.startsWith('следуй')) {
                bot.chat(`/msg ${username} ${username}, мой повелитель запрещает с тобой общаться`);
            }
        }
    });
    });






    function performRandomActions() {
        setInterval(() => {
            // Здесь можно добавить случайные действия для бота
            // Например, изменение направления движения, поворот головы и т.д.
            const randomDirection = Math.random() * 2 * Math.PI;
            bot.look(randomDirection, 0);
            bot.setControlState('forward', true);
            setTimeout(() => {
                bot.setControlState('forward', false);
            }, 3000); // Длительность движения вперед
        }, 5000); // Интервал выполнения случайных действий
    }

    
bot.on('message', (message) => {
    console.log(message.toAnsi())
})

// Обработчик события "навигация достигла цели"

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Listen for console input
rl.on('line', (input) => {
    // Send chat message when user types something in console
    bot.chat(input);
});



function swingArm() {
    bot.swingArm();
    setTimeout(() => { // Имитируем отключение действия
    }, 500); // Задержка в 0.5 секунды между началом и завершением действия
}

// Добавляем случайное "стук рукой"
function randomSwingArm() {
    setInterval(() => {
        // Вызываем функцию swingArm с определенной вероятностью
        if (Math.random() < 0.9) { // Например, с вероятностью 30%
            swingArm();
        }
    }, 10000); // Интервал проверки (в миллисекундах) - например, каждые 15 секунд
}

// Вызываем функцию случайного "стука рукой"
randomSwingArm();
// Список игроков, которых бот должен слушать
const allowedPlayers = [''];

// Обработчик личных сообщений от игроков ZERO991002 и oladabebra
bot.on('whisper', (username, message) => {
    // Проверяем отправителя сообщения
    if (allowedPlayers.includes(username)) {
        const regex = /заварнь\s+(\S+)\s+(.+)/; // Регулярное выражение для извлечения никнейма и причины из сообщения
        const matches = message.match(regex); // Ищем совпадения с регулярным выражением

        // Проверяем, найдены ли совпадения и есть ли оба захвата
        if (matches && matches.length === 3) {
            const playerNickname = matches[1]; // Извлекаем никнейм игрока
            const reason = matches[2]; // Извлекаем причину

            // Отправляем команду /warn с никнеймом игрока и причиной в чат
            bot.chat(`/warn ${playerNickname} ${reason}`);
            console.log(`Выдано предупреждение игроку ${playerNickname} по причине: ${reason}`);
        } else {
            if (message.startsWith('заварнь')) {
                console.log(`Неправильный формат сообщения от ${username}. Должно быть: 'заварнь никнейм причина'`);
                bot.chat(`/msg ${username} Неправильный формат сообщения. Должно быть: заварнь никнейм причина`)
            }
        }
    } else {
        if (message.startsWith('заварнь')) {
            bot.chat(`/msg ${username} ${username}, мой повелитель запрещает с тобой общаться`);
        }
    }
});

bot.on('whisper', (username, message) => {
    // Проверяем отправителя сообщения
    if (allowedPlayers.includes(username)) {
        const regex = /замьють\s+(\S+)\s+(\d+)\s+(.+)/; // Регулярное выражение для извлечения никнейма, времени и причины из сообщения
        const matches = message.match(regex); // Ищем совпадения с регулярным выражением

        // Проверяем, найдены ли совпадения и есть ли оба захвата
        if (matches && matches.length === 4) {
            const playerNickname = matches[1]; // Извлекаем никнейм игрока
            const time = matches[2]+'m'; // Извлекаем время
            const reason = matches[3]; // Извлекаем причину

            // Отправляем команду /mute с никнеймом игрока, временем и причиной в чат
            bot.chat(`/mute ${playerNickname} ${time} ${reason}`);
            console.log(`Замьютил игрока ${playerNickname} на ${time} по причине: ${reason}`);
        } else {
            if (message.startsWith('замьють')) {
                console.log(`Неправильный формат сообщения от ${username}. Должно быть: 'замьють никнейм время причина'`);
                bot.chat(`/msg ${username} Неправильный формат сообщения. Должно быть: замьють никнейм время причина`);
            }
        }
    } else {
        if (message.startsWith('замьють')) {
            bot.chat(`/msg ${username} ${username}, мой повелитель запрещает с тобой общаться`);
        }
    }
});
bot.on('whisper', (username, message) => {
    // Проверяем отправителя сообщения
    if (allowedPlayers.includes(username)) {
        const regex = /забань\s+(\S+)\s+(\d+)\s+(.+)/; // Регулярное выражение для извлечения никнейма, времени и причины из сообщения
        const matches = message.match(regex); // Ищем совпадения с регулярным выражением

        // Проверяем, найдены ли совпадения и есть ли оба захвата
        if (matches && matches.length === 4) {
            const playerNickname = matches[1]; // Извлекаем никнейм игрока
            const time = matches[2]+'m'; // Извлекаем время
            const reason = matches[3]; // Извлекаем причину

            // Отправляем команду /mute с никнеймом игрока, временем и причиной в чат
            bot.chat(`/ban ${playerNickname} ${time}m ${reason}`);
            console.log(`Забанил игрока ${playerNickname} на ${time} по причине: ${reason}`);
        } else {
            if (message.startsWith('забань')) {
                console.log(`Неправильный формат сообщения от ${username}. Должно быть: 'забань никнейм время причина'`);
                bot.chat(`/msg ${username} Неправильный формат сообщения. Должно быть: забань никнейм время причина`)
            }
        }
        
    } else {
        if (message.startsWith('забань')) {
            bot.chat(`/msg ${username} ${username}, мой повелитель запрещает с тобой общаться`);
        }
        
        
        
    }
});




const greetings = [
    'Привет!',
    'Здарова!',
    'Саламчик!',
    'qq',
    'ку-ку',
    'Здарова',
  ];
setTimeout(() => {
  bot.on('whisper', (username, message) => {
    if (message.toLowerCase() === 'привет' || message.toLowerCase() ===  'qq') {
      // Отправляем случайное приветственное сообщение
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      bot.whisper(username, randomGreeting);
      return;
    }
  });}, 5000);



const kakdela = [
    'ты мне не друг, забудь мой номер',
    'плоха',
    'отстань от меня!',
    'мне грустна',
    'Заебись!',
    'нормикс',
  ];

  bot.on('whisper', (username, message) => {
    // Проверяем, содержит ли сообщение одно из ключевых слов
    if (message.toLowerCase() === 'как дела' || message.toLowerCase() === 'как делишки?' || message.toLowerCase() === 'как дела?' || message.toLowerCase() === 'я ебу') {
      // Отправляем случайное сообщение
      const randomResponse = kakdela[Math.floor(Math.random() * kakdela.length)];
      bot.whisper(username, randomResponse);
    }
  });
  
  const fs = require('fs');

  // Функция для загрузки оскорблений из файла JSON
  function loadOskFromFile(filePath) {
      try {
          const data = fs.readFileSync(filePath, 'utf8');
          return JSON.parse(data);
      } catch (err) {
          console.error('Ошибка при загрузке оскорблений из файла:', err.message);
          return [];
      }
  }
// Функция для сохранения данных о замученных пользователях в файл
  function saveMutedUsers(users) {
      try {
          fs.writeFileSync(mutedUsersFilePath, JSON.stringify(users, null, 2));
      } catch (err) {
          console.error('Ошибка при сохранении данных о замученных пользователях:', err.message);
      }
  }
  const ktoi = [
    'Я бот разработанный ZERO',
    'Я точно не бот',
    'хз, может быть я и человек. Я сам пока не определился!'
  ];
  bot.on('whisper', (username, message) => {
    // Проверяем, содержит ли сообщение одно из ключевых слов
    if (message.toLowerCase() === 'Ты кто?' || message.toLowerCase() === 'ты кто' || message.toLowerCase() === 'кто ты такой?') {
      // Отправляем случайное сообщение
      const randomResponse = ktoi[Math.floor(Math.random() * ktoi.length)];
      bot.whisper(username, randomResponse);
    }
  });
  bot.on('whisper', (username, message) => {
    if (message === 'телепортируйся') { // Проверяем личное сообщение
        bot.chat('/call ' + username); // Отправляем команду телепортации к игроку, который отправил сообщение
    }
    if (message.toLowerCase().includes('кто онлайн')) {
        let onlinePlayers = Object.keys(bot.players).join(', ');
        bot.whisper(username,`Сейчас онлайн: ${onlinePlayers}`);
    }
});

bot.on('playerCollect', (collector, itemDrop) => {
    if (collector !== bot.entity) return
  
    setTimeout(() => {
      const sword = bot.inventory.items().find(item => item.name.includes('sword'))
      if (sword) bot.equip(sword, 'hand')
    }, 150)
  })
  
  bot.on('playerCollect', (collector, itemDrop) => {
    if (collector !== bot.entity) return
  
    setTimeout(() => {
      const shield = bot.inventory.items().find(item => item.name.includes('shield'))
      if (shield) bot.equip(shield, 'off-hand')
    }, 250)
  })
  
  let guardPos = null
  
  function guardArea (pos) {
    guardPos = pos.clone()
  
    if (!bot.pvp.target) {
      moveToGuardPos()
    }
  }
  bot.on('whisper', (username, message) => {
    if (message === 'guard') {
      const player = bot.players[username]
  
      if (!player) {
        bot.chat("I can't see you.")
        return
      }
  
      bot.chat('I will guard that location.')
      guardArea(player.entity.position)
    }
  
    if (message === 'Я готов к бою') {
      const player = bot.players[username]
  
      if (!player) {
        bot.chat("I can't see you.")
        return
      }
  
      bot.chat('/msg'+ [username] +'уже бегу!')
      bot.pvp.attack(player.entity)
    }
  
    if (message === 'stop') {
      bot.chat('I will no longer guard this area.')
      stopGuarding()
    }
  })
  bot.on('whisper', (username, message) => {
    if (username === bot.username) return; // Игнорируем собственные сообщения
    if (message === 'сядь') {
      bot.chat('/sit'); // Выполняем команду сидения
    }
  });

