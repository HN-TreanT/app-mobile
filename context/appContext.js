import {io} from 'socket.io-client'
import React from 'react'
import { serverConfig } from '../constants/serverConfig'
export let socket = io(serverConfig.server)
export const AppContext = React.createContext()