import { useDispatch } from "react-redux"
import { AppDispatch } from "../../app/store"

// 1. useDispatch() - хук библиотеки react-redux, который возвращает функцию dispatch() хранилища Redux
// 2. .withTypes<AppDispatch>() – метод, добавленный в Redux Toolkit (начиная с определённой версии), который позволяет уточнить тип dispatch.
// 3. AppDispatch – это тип, который обычно создаётся на основе хранилища (store) и содержит информацию о всех доступных действиях (actions).

// Чтобы не указывать тип dispatch каждый раз, создадим кастомный хук useAppDispatch.
// Это удобная типизированная обёртка над стандартным useDispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
