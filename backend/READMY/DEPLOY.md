### Deploy

1. Создаю виртуальный сервер (при заявке надо загрузить SSH ключи) на spaceweb и получаю данные доступа к серверу (login: root, password - xxxxxx)
2. Связываю сервер с компом: [генерирую SSH](https://help.sweb.ru/nachal6naya-nastrojka-ubuntu-server-2204_1290.html) если надо или использую готовые (для github в яндекс практикуме) ключи на компе, если не добавил при создании сервера
   - `ssh-keygen -t rsa -b 4096 -C "sfoto116@yandex.ru"` => `Enter`=>`Enter`=>password_key=>`eval $(ssh-agent -s)`=>`ssh-add ~/.ssh/id_rsa`
   - привязать к github `clip < ~/.ssh/id_rsa.pub` - если надо.
   - добавляю на сервер `ssh-copy-id -i ~/.ssh/id_rsa.pub server_login@server_ip`
3. Связываю сервер с github: `ssh-keygen`=>`cd .ssh/`=>`sudo nano ключ_pub`=>копирую и вставляю в github
4. Установка на сервер (C:\Users\user\Desktop\Cправочные материалы\Деплой\14 Подготовка и деплой бэкенда.pdf): node, [mongo](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/), nginx,
