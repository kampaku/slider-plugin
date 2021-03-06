# Слайдер

---

[Демо-страница](https://slider-plugin.vercel.app/)

### Команды:

`npm run i` - установка зависимостей

`npm run start` - режим разработки

`npm run build` - сборка

`npm run test` - запуск тестов

`npm run coverage` - проверка покрытия тестами

`npm run lint` - запуск eslint

Плагин состоит из следующих классов:

+ **Model**

  Хранит и обрабатывает данные слайдера
+ **View**

  Отвечает за отрисовку слайдера. В свою очередь имеет свои классы:

  + Thumb  — бегунок
  + Track — область для движения бегунка
  + Scale — шкала слайдера
  + Tip — отображает значение бегунка

+ **Presenter**

  Обеспечивает передачу данных между моделью и видом

+ **Observable**

  Класс от которого наследуются модель и вид. Позволяет подписываться наблюдателям и оповещает их при изменении данных

+ **SuperSlider**

  Создаёт апи для управления слайдером

### Использование
`(#element).superSlider(settings)`
#### Settings

```
interface SliderOptions {
  min: number; //обязательный параметр
  max: number; //обязательный параметр
  step?: number; // по-умолчанию - 1
  from?: number; // по-умолчанию min
  to?: number; // по-умолчанию max
  vertical?: boolean; // по-умолчанию false
  tip?: boolean; // по-умолчанию false
  range?: boolean; // по-умолчанию false
  connect?: boolean; // по-умолчанию false
  scale?: boolean; // по-умолчанию false
}
```
### API
+ `attach(observer)` - подписывает наблюдателя
+ `detach(observer)` - отписывает наблюдателя
+ `setMin(number)` / `getMin()` - устанавливает / получает минимальное значение
+ `setMax(number)` / `getMax()` - устанавливает / получает максимальное значение
+ `setFrom(number)` / `getFrom()` - устанавливает / получает значение "от"
+ `setTo(number)` / `getTo()` - устанавливает / получает значение "до"
+ `setStep(number)` / `getStep()` - устанавливает / получает значение шага
+ `setVertical(boolean)` / `getVertical()` - устанавливает / получает ориентацию слайдера
+ `setConnect(boolean)` / `getConnect()` - устанавливает / получает шкалу, которая заполняет выбранный промежуток значений
+ `setRange(boolean)` / `getRange()` - устанавливает / получает вид бегунка: одиночный или интервал
+ `setScale(boolean)` / `getScale()` - устанавливает / получает шкалу со значениями под слайдером
+ `setTip(boolean)` / `getTip()` - устанавливает / получает элемент над бегунком с настоящим значением

#### Совместимость:
  + jquery 3.6.0
  + Node 16.13.0
### UML диаграмма:

![](https://files.catbox.moe/oja187.png)
