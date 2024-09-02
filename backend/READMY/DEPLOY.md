### Deploy

1. Создаю [виртуальный сервер](https://help.sweb.ru/nachal6naya-nastrojka-ubuntu-server-2204_1290.html) (при оформлении надо загрузить SSH ключи) на spaceweb и получаю данные доступа к серверу (login: root, password - xxxxxx)
2. Создаю нового пользователя (шаг 2) vik:
   - из root `adduser vik`=>password=>пропускаю доп. инфо=>`y`
   - административные задачи от имени пользователя root через sudo `usermod -aG sudo vik`
3. Связываю сервер "vik@server_ip" с компом: генерирую SSH если надо или использую готовые (для github в яндекс практикуме) ключи на компе, если не добавил при создании сервера
   - `ssh-keygen -t rsa -b 4096 -C "sfoto116@yandex.ru"` => `Enter`=>`Enter`=>password_key=>`eval $(ssh-agent -s)`=>`ssh-add ~/.ssh/id_rsa`
   - привязать к github `clip < ~/.ssh/id_rsa.pub` - если надо.
   - добавляю на сервер `ssh-copy-id -i ~/.ssh/id_rsa.pub server_login@server_ip`
4. Связываю сервер с github: `ssh-keygen`=>`cd .ssh/`=>`sudo nano ключ_pub`=>копирую и вставляю в github
5. Обновление ПО: `sudo apt update`=>`sudo apt list --upgradable`=>`sudo apt upgrade`=>`sudo reboot`
6. Установка на сервер (C:\Users\user\Desktop\Cправочные материалы\Деплой\14 Подготовка и деплой бэкенда.pdf):
   - node,
   - [mongo](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/),
   - nginx,
     - конфигурация: содаем символическую ссылку между sites-available и sites-enabled (Для конфигурации по умолчанию (default) символическая ссылка уже создана)
     - переходим `cd /etc/nginx/sites-available` создаем файл конфиг `sudo touch имя_файла`
     - переходим `cd ../sites-enabled` создаем ссылку `sudo ln -s /etc/nginx/sites-available/имя_файла имя_файла` проверяем ссылку
     - проверяем конфигурацию `sudo nginx -t` и если успешно перезагружаем `sudo systemctl reload nginx`
   - pm2
     - дополнительно пришлось поставить `sudo npm install -g bun` для запроса `pm2 start src/main.ts` из папки backend
