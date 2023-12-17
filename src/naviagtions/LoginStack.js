import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { ContentRoutes } from './routes';
import LoginPage from '../pages/LoginPage';
import Navigation from './Navigation';

const Stack = createNativeStackNavigator();

const LoginStack = () => {
    return (
    <Stack.Navigator initialRouteName={ContentRoutes.Login.name} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ContentRoutes.Login.name} component={LoginPage}/>
        <Stack.Screen name={ContentRoutes.Main.name} component={Navigation}/>
    </Stack.Navigator>
    );
};

export default LoginStack;