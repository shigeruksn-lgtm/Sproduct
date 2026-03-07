import { createBrowserRouter } from 'react-router';
import RootLayout from './components/RootLayout';
import HomeLayout from './components/HomeLayout';
import Overview from './pages/Overview';
import Home from './pages/Home';
import Showcase from './pages/Showcase';
import Homepage from './pages/Homepage';
import System from './pages/System';
import VenueManagement from './pages/VenueManagement';
import VisitManagement from './pages/VisitManagement';
import CustomerManagement from './pages/CustomerManagement';
import EventManagement from './pages/EventManagement';
import Schedule from './pages/Schedule';
import PV from './pages/PV';
import PVExisting from './pages/PVExisting';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/home',
    Component: HomeLayout,
    children: [
      { index: true,         Component: Homepage },
      { path: 'visit',       Component: VisitManagement },
      { path: 'venue',       Component: VenueManagement },
      { path: 'hotel',       Component: CustomerManagement },
      { path: 'event',       Component: EventManagement },
      { path: 'schedule',    Component: Schedule },
      { path: '*',           Component: Homepage },
    ],
  },
  {
    Component: RootLayout,
    children: [
      { index: true, Component: Overview },
      { path: 'concept', Component: Home },
      { path: 'pv', Component: PV },
      { path: 'pv-existing', Component: PVExisting },
      { path: 'showcase', Component: Showcase },
      { path: 'system', Component: System },
      { path: 'mypage', Component: MyPage },
      { path: '*', Component: NotFound },
    ],
  },
]);