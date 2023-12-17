// routes
import Router from './routes';
import { MotionLazyContainer } from './components/animate';

export default function App() {
  return (
    <MotionLazyContainer>
      <Router />
    </MotionLazyContainer>

  );
}