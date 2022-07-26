# Задание

`SomeConvenientWidget` загружается долго :(
Поступил продуктовый запрос на показ спиннера пока грузится `SomeConvenientWidget` (не меняя сам виджет!)
и показом текста под этим спиннером, который меняется каждые N секунды на следующий

Что нужно сделать:
- написать удобный инструмент для работы с переводами, чтобы без проп дриллинга (!!!) можно было просто
   использовать какой-нибудь метод i18n(key), который будет возвращать перевод по ключу
- использовать строки из messages. По контексту понятно, что они делают, но на всякий случай уточню:
   - Loading.First, Loading.Second, Loading.Third - сменяются друг за другом каждые N секунды
   - Error.Timeout - ошибка, которая показывается когда превышен лимит по времени >N
   - Success.LoadingFinished - сообщение об удачной загрузке виджета
- для собственной разработки как-нибудь замедлить отображение SomeConvenientWidget чтобы кейс отрабатывал
- реализовать спиннер с сменой текстов

### Заметки по реализации

[Ссылка на рабочий билд](https://stiivenson.github.io/nomads-task/)

- задержка загрузки виджета реализована через хук `useManualDelay`
     - значение задержки выбирается случайным образом из заданного массива (список значений выведен на главном экране)
- для передачи доступных переводов используется `TranslationProvider`
- чтобы не менять реализацию виджета, добавил обертку в виде HOC - `withLoadingTrack`, функция принимает значение времени, через которое будет происходит смена шага загрузки
- всего шагов загрузки 3, каждый берет строку для значения `Loading`
- для перезагрузки виджета и выбора нового значения необходимо нажать кнопку на главном экране (виджет перемонтируется из-за изменения key)

---

# Dev notes

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

Run `yarn` or `npm install` to load all dependencies.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

