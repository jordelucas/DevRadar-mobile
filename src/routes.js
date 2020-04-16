import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main'
import Profile from './pages/Profile'

const Routes = createAppContainer(
    createStackNavigator({
        Main: {
            Profile: {
                screen: Profile,
                navigationOptions: {
                    title: 'Perfil no Github'
                }
            },
            screen: Main,
            navigationOptions: {
                title: 'DevRadar'
            }
        },
    })
)

export default Routes;