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
import PVHome from './pages/PVHome';
import PVExisting from './pages/PVExisting';
import Wedding from './pages/Wedding';
import Banquet from './pages/Banquet';
import Costume from './pages/Costume';
import Beauty from './pages/Beauty';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import Mascot from './pages/Mascot';
import ESMobile from './pages/ESMobile';

import Analytics from './pages/Analytics';
import SalesVenue from './pages/SalesVenue';
import CostumeManagement from './pages/CostumeManagement';

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
      { path: 'analytics',   Component: Analytics },
      { path: 'analytics/sales-venue', Component: SalesVenue },
      { path: 'costume-management', Component: CostumeManagement },
      { path: '*',           Component: Homepage },
    ],
  },
  {
    Component: RootLayout,
    children: [
      { index: true, Component: Overview },
      { path: 'concept', Component: Home },
      { path: 'mascot', Component: Mascot },
      { path: 'pv', Component: PV },
      { path: 'pv-home', Component: PVHome },
      { path: 'pv/wedding', Component: Wedding },
      { path: 'pv/banquet', Component: Banquet },
      { path: 'pv/costume', Component: Costume },
      { path: 'pv/beauty', Component: Beauty },
      { path: 'pv-existing', Component: PVExisting },
      { path: 'showcase', Component: Showcase },
      { path: 'system', Component: System },
      { path: 'mypage', Component: MyPage },
      { path: 'system/es-mobile', Component: ESMobile },
      { path: '*', Component: NotFound },
    ],
  },
]);