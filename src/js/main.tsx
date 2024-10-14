import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SetLocation from './SetLocation';
import CreateGardenGroup from './CreateGardenGroup';
import '../scss/index.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Includes Popper.js
import AddPlantsToGardenGroup from './AddPlantsToGardenGroup';

const router = createBrowserRouter([
  {
    path: '/addplants/:gardenGroupId',
    element: <AddPlantsToGardenGroup />
  },
  {
    path: '/creategardengroup',
    element: <CreateGardenGroup />
  },
  {
    path: '/',
    element: <SetLocation />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
