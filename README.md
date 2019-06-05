# Three js Earth UTTP api


### Installation

```
npm install
```

### Start Dev Server

```
npm start
```

### Build Prod Version

```
npm run build
```

`const earth = new Earth(id)` - инициализация приложения с указанием `id` html тега

| Function name | Description                    |
| ------------- | ------------------------------ |
|`move(x, y, z)`|Запустить вращение земли по координатам, без параметров остановится|
| `enableControls(flag)`   | true - разрешено управлять пользователю, false - нет |
| `axis()`   | Отображение осей |
| `newCity(name, {lat, lon})`   | Создание города на шаре |
| `showCity(name, time)`   | Перенос положение экрана к городу |
