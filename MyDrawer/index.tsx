import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Pages/login';
import LectorQR from '../Pages/lectorqr';
import DetallePago from '../Pages/detallePago';
import AgregarPadro from '../Pages/agregarPadron';
const Stack = createStackNavigator();
function MyDrawer() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name = "Lector QR!" >
          {props => <LectorQR {...props} ></LectorQR>}
        </Stack.Screen>
        <Stack.Screen name = "Lector QR">
          {props => <LectorQR {...props} > </LectorQR>}
        </Stack.Screen>
        <Stack.Screen name = "Detalles del pago" >
          {props => <DetallePago {...props} > </DetallePago>}
        </Stack.Screen>
        <Stack.Screen name = "Agregar A Tombola">
         {props => <AgregarPadro {...props}></AgregarPadro>} 
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyDrawer;    