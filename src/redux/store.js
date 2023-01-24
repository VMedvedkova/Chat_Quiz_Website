import { createStore, compose, applyMiddleware } from 'redux'
import rootReduser from './reducers/index.js'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/index'

const sagaMiddleware = createSagaMiddleware()

// const store = compose(
//     applyMiddleware(sagaMiddleware),
//     // window.devToolsExtension && window.devToolsExtension(),
// )(createStore)(rootReduser)

// 

// export default store

const composeEnhancers = 
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const configureStore = preloadedState => createStore(
    rootReduser,
    preloadedState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
)

const store = configureStore({});

sagaMiddleware.run(rootSaga)

export default store
