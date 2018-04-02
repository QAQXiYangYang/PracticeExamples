import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import S from "./components/styled-components"
const routes = [
    { path: '/sandwiches',
        component: S
    },
    // { path: '/tacos',
    //     component: Tacos,
    //     routes: [
    //         { path: '/tacos/bus',
    //             component: Bus
    //         },
    //         { path: '/tacos/cart',
    //             component: Cart
    //         }
    //     ]
    // }
]

export default routes