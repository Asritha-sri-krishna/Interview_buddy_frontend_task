import React, { useState, Suspense, lazy } from 'react';
import { UsersProvider } from './context/UsersContext';
import LoadingSpinner from './components/Common/LoadingSpinner';
import ErrorBoundary from './components/Common/ErrorBoundary';

const UserListPage = lazy(() => import('./pages/UserListPage'));
const MyProfilePage = lazy(() => import('./pages/MyProfilePage'));

function App() {
  const [currentView, setCurrentView] = useState('users');
  const [selectedUserId, setSelectedUserId] = useState(null);

  const handleViewChange = (view, userId = null) => {
    setCurrentView(view);
    if (userId) {
      setSelectedUserId(userId);
    }
    window.scrollTo(0, 0);
  };

  return (
    <ErrorBoundary>
      <UsersProvider>
        <div className="min-h-screen bg-gray-50">
          <Suspense fallback={<LoadingSpinner />}>
            {currentView === 'users' ? (
              <UserListPage onViewChange={handleViewChange} />
            ) : (
              <MyProfilePage userId={selectedUserId} onViewChange={handleViewChange} />
            )}
          </Suspense>
        </div>
      </UsersProvider>
    </ErrorBoundary>
  );
}

export default App;