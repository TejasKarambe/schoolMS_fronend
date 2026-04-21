import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/signup" element={<Signup />} />

  <Route
    path="/"
    element={
      <ProtectedRoute>
        <Dashboard searchTerm={searchTerm} />
      </ProtectedRoute>
    }
  />

  <Route
    path="/classes"
    element={
      <ProtectedRoute>
        <Classes searchTerm={searchTerm} />
      </ProtectedRoute>
    }
  />

  <Route
    path="/students"
    element={
      <ProtectedRoute>
        <Students searchTerm={searchTerm} />
      </ProtectedRoute>
    }
  />

  <Route
    path="/teachers"
    element={
      <ProtectedRoute>
        <Teachers searchTerm={searchTerm} />
      </ProtectedRoute>
    }
  />

  <Route
    path="/attendance"
    element={
      <ProtectedRoute>
        <Attendance searchTerm={searchTerm} />
      </ProtectedRoute>
    }
  />

  <Route
    path="/subjects"
    element={
      <ProtectedRoute>
        <Subjects searchTerm={searchTerm} />
      </ProtectedRoute>
    }
  />

  <Route
    path="/timetable"
    element={
      <ProtectedRoute>
        <Timetable searchTerm={searchTerm} />
      </ProtectedRoute>
    }
  />
</Routes>