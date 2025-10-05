# Плеер анимаций minecraft для мода [Emotecraft](https://modrinth.com/plugin/emotecraft)

Компоненты из этой библиотеки позволят вам добавить в ваше React приложение плеер для проигрывания
анимаций из мода [Emotecraft](https://modrinth.com/plugin/emotecraft)

![preview](./assets/preview.gif)

# Установка

```bash
npm i emotecraft-web-player
```

# Использование

```tsx
import {
  EmotePlayerScene,
  EmotePlayer,
  isValidEmote,
  type Emote
} from "emotecraft-web-player";


function App() {
  const [emote, setEmote] = useState<Emote | undefided>();
  const [skinSrc, setSkinSrc] = useState("https://mc-heads.net/skin/MrEka_");
  const [isSlim, setIsSlim] = useState(true);

  const onEmoteChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    const target = ev.target;

    if (target.files) {
      const emoteFile = target.files[0];

      emoteFile.text().then((emoteJson) => {
        const emoteOrInvalid = JSON.parse(emoteJson);
        if (isValidEmote(emoteOrInvalid))
          setEmote();
      });
    }
  }, []);

  return (
    <div style={{display: "flex"}}>
      <EmotePlayerScene style={{width: "70%", height: "100vh", margin: 0}} defaultScene>
        <EmotePlayer
          skinSrc={skinSrc}
          emote={emote}
          isSlimModel={isSlim}
        />
      </EmotePlayerScene>
      <div style={{display: "flex", flexDirection: "column", gap: 8}}>
        <label htmlFor="emote-file-input">Emote</label>
        <input onChange={onEmoteChange} id={"emote-file-input"} type="file" accept={"application/json"}/>
      </div>
    </div>
  );
}

export default App;
```

Также вы можете использовать собственную `<Scene />` из библиотеки `@react-three/fiber`
для большего контроля. Если вам хочется просто добавить собственные объекты на сцену
передайте их так же как и `<EmotePlayer />`

# Документация API

## EmotePlayerScene 

Простой wrapper для WebGL canvas для облегченной стилизации, также реализует Orbit 
Controller для управления вьюупортом
### Props
| propName      | type                | description                                                       |
|:--------------|---------------------|-------------------------------------------------------------------|
| className?    | string              | Имя класса CSS для плеера                                         |
| style?        | CSSProperties       | CSS properties для инлайн стилей плеера                           |
| skyColor?     | ColorRepresentation | Цвет неба сцены, можно передать как имя цвета так и hex           |
| defaultScene? | boolean             | Если true, то начальная сцена будет пустой, иначе дефолтная сцена |
| children?     | ReactNode           | Все объекты сцены (в том числе `<EmotePlayer />`)                 |

## EmotePlayer

Компонент анимируемого игрока

### Props

| propName             | type    | description                                                                                           |
|----------------------|---------|-------------------------------------------------------------------------------------------------------|
| skinSrc              | string  | Путь к png файлу скина который применится к модели                                                    |
| emote?               | Emote   | Объект JSON анимации Emotecraft, если undefined анимация не проигрывается, модель на исходной позиции |
| playerModelPosition? | Vector3 | Позиция на которой появится модель на сцене, по дефолту начала координат                              |
| isSlimModel?         | boolean | Сообщает тип модели, <br/> true - slim, false - default                                               |

### Ref

Кроме того вы можете управлять состоянием плеера передав в `<EmotePlayer />`
`ref` к которому привяжется `EmotePlayerAPI`, оно имеет следующий интерфейс
```typescript
type EmotePlayerAPI = {
  pause: () => void,
  resume: () => void,
  restart: () => void,
  toggle: () => void
}
```

| method  | action                                                |
|---------|:------------------------------------------------------|
| pause   | Пауза плеера                                          |
| resume  | Возобновление анимации                                |
| restart | Возврат в исходное состояние                          |
| toggle  | Переключить состояние проигрывание на противоположное |


## isValidEmote

Хелпер функция для того чтобы провалидировать полученный JSON,
работает как Type Guard Typescript