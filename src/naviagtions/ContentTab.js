import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ContentRoutes } from "./routes";
import HomePage from "../pages/HomePage";
import StoreinfoPage from "../pages/StoreinfoPage";
import StoreListPage from "../pages/StoreListPage";
import MapPage from "../pages/MapPage";
import OrderPage from "../pages/OrderPage";
import TicketPage from "../pages/TicketPage";
import BoardPage from "../pages/BoardPage";

const Tab = createBottomTabNavigator();

const ContentTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ContentRoutes.HomePage.name}
    >
      <Tab.Screen name={ContentRoutes.HomePage.name} component={HomePage} />
      <Tab.Screen name={ContentRoutes.MapPage.name} component={MapPage} />
      <Tab.Screen
        name={ContentRoutes.StoreinfoPage.name}
        component={StoreinfoPage}
      />
      <Tab.Screen
        name={ContentRoutes.StoreListPage.name}
        component={StoreListPage}
      />
      <Tab.Screen name={ContentRoutes.OrderPage.name} component={OrderPage} />
      <Tab.Screen name={ContentRoutes.TickPage.name} component={TicketPage} />
      <Tab.Screen name={ContentRoutes.BoardPage.name} component={BoardPage} />
    </Tab.Navigator>
  );
};

export default ContentTab;
